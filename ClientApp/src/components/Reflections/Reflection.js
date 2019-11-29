import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import api from '../../sideEffects/apis/api'
import { useForm, useFormFile } from '../../customHooks/useForm'
import uploader from '../../customHooks/useFileUpload'

const noDataItem = {
    colSpan: '4',
    style: {
        textAlign: 'center'
    }
}


const ReflectionList = ({ setReflection, isBusy, ...props }) => {
    const [display, setDisplay] = useState(false)
    useEffect(() => {
        isBusy(true)
        api.getAll('reflections')
            .then(reflection => {
                setReflection(reflection)
                isBusy(false)
            })
            .catch(err => console.error(err))
    }, [setReflection, isBusy])

    const createReflection = (model) => {
        isBusy(true)
        api.create('reflections', model)
            .then(reflection => {
                props.createReflection(reflection)
                isBusy(false)
            })
            .catch(err => console.error(err))
    }

    const editReflection = (model) => {
        isBusy(true)
        api.updateWithId('reflections', model)
            .then(reflection => {
                props.editReflection(reflection)
                isBusy(false)
            })
            .catch(err => console.error(err))
    }

    const deleteReflection = (id) => {
        isBusy(true)
        api.deleteWithId(`reflections/${id}`)
            .then(reflection => {
                props.deleteReflection(id)
                isBusy(false)
            })
            .catch(err => console.error(err))
    }


    return (
        <div>
            <button type="button" onClick={() => setDisplay(!display)}>Add News</button>
            <Table striped>
                <thead>
                    <tr>
                        <th>S/N</th>
                        <th>Title</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                {
                    props.reflections.length > 0 ?
                        props.reflections.map((content, index) => <Reflection key={content.id} isBusy={isBusy} sn={++index} onDelete={deleteReflection} onEdit={editReflection} {...content} />)
                        : <thead>
                            <tr>
                                <td {...noDataItem}>No item yet...
                            </td>
                            </tr>
                        </thead>
                }

            </Table>
            <ReflectionForm className={display ? 'd-block' : 'd-none'} creator={true} isBusy={isBusy} onSubmit={createReflection} />
        </div>

    )
}

const Reflection = (props) => {
    const [display, setDisplay] = useState(false);
    const additionalProps = {
        creator: false,
        className: display ? 'd-block' : 'd-none',
        onEdit: (data) => props.onEdit(data),
        onDelete: (id) => props.onDelete(id),
    }

    return (
        <tbody>
            <tr>
                <td>{props.sn}</td>
                <td>{props.title}</td>
                <td>{props.content}</td>
                <td>
                    <button type='button' onClick={() => props.onDelete(props.id)}>
                        Delete
                    </button>
                    <button type='button' onClick={() => setDisplay(!display)}>
                        Edit
                    </button>
                </td>
            </tr>
            <tr>
                <td {...noDataItem}><ReflectionForm {...{ ...props, ...additionalProps }} /></td>
            </tr>
        </tbody>


    )
}

const ReflectionForm = (props) => {
    const idField = useForm('hidden', (props.id || 0))
    const titleField = useForm('text', (props.title || ''))
    const contentField = useForm(null, (props.content || ''))
    const fileField = useFormFile()
    const filesUpload = uploader.useFileUpload();

    const prepareData = () => {
        return {
            id: idField.main.value,
            title: titleField.main.value,
            content: contentField.main.value,
            image: filesUpload.value || props.image
        }
    }

    const resetFields = () => {
        titleField.onSetChange('')
        contentField.onSetChange('')
    }

    const submitForm = (e) => {
        e.preventDefault();
        props.creator ? props.onSubmit(prepareData()) : props.onEdit(prepareData())
        if (props.creator) {
            resetFields();
        }

    }

    const fileUploadHandler = (e) => {
        props.isBusy(true)
        filesUpload.onUpload(e, fileField.value)
        props.isBusy(false)
    }

    return (
        <form className={props.className} onSubmit={submitForm}>
            {props.image && <img src={filesUpload.value || props.image} alt={props.title} className='img-fluid' />}
            <input {...idField.main} />
            <div>
                <label>Add Title: </label>
                <input {...titleField.main} />
            </div>
            <div>
                <label>Add Content: </label>
                <textarea {...contentField.main}></textarea>
            </div>
            <div>
                <label>Upload Image: </label>
                <input type='file' onChange={fileField.onChange} />
            </div>
            {fileField.value &&
                <button type="button" onClick={fileUploadHandler}>
                    {props.creator && 'Add news image'}
                    {!props.creator && props.image && 'Edit image'}
                    {!props.creator && !props.image && 'Add an image to this news'}
                </button>
            }

            <br />
            <button type='submit'>
                {props.creator ? 'Create News' : 'Edit news'}
            </button>
            {!props.creator && <button onClick={(e) => props.onDelete(idField.main.value)} type='button'>Delete News</button>}
        </form>

    )
}

export default ReflectionList