import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import api from '../../sideEffects/apis/api'
import { useForm, useFormFile } from '../../customHooks/useForm'
import uploader from '../../customHooks/useFileUpload'
import TextEditor from '../TextEditor/TextEditor';

const noDataItem = {
    colSpan: '4'
}


const OccasionList = ({ setOccasion, isBusy, ...props }) => {
    const [display, setDisplay] = useState(false)
    useEffect(() => {
        isBusy(true)
        api.getAll('occasions')
            .then(response => {
                setOccasion(response)
                isBusy(false)
            })
            .catch(err => console.error(err))
    }, [setOccasion, isBusy])

    const create= (model) => {
        isBusy(true)
        api.create('occasions', model)
            .then(response => {
                props.createOccasion(response)
                isBusy(false)
            })
            .catch(err => console.error(err))
    }

    const edit = (model) => {
        isBusy(true)
        api.updateWithId('occasions', model)
            .then(response => {
                props.editOccasion(response)
                isBusy(false)
            })
            .catch(err => console.error(err))
    }

    const deleter = (id) => {
        if (window.confirm("Should we delete this?")) {
            isBusy(true)
            api.deleteWithId(`occasions/${id}`)
                .then(response => {
                    props.deleteOccasion(id)
                    isBusy(false)
                })
                .catch(err => console.error(err))
        }
        
    }


    return (
        <div className="f-width">
            <button type="button" onClick={() => setDisplay(!display)}>Add Event</button>
            <OccasionForm className={display ? 'd-block' : 'd-none'} creator={true} isBusy={isBusy} onSubmit={create} />
            <Table striped>
                <thead>
                    <tr>
                        <th>S/N</th>
                        <th>Title</th>
                        <th>Brief</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                {
                    props.occasions.length > 0 ?
                        props.occasions.map((content, index) => <Occasion key={content.id} isBusy={isBusy} sn={++index} onDelete={deleter} onEdit={edit} {...content} />)
                        : <thead>
                            <tr>
                                <td {...noDataItem}>No item yet...
                            </td>
                            </tr>
                        </thead>
                }

            </Table>
        </div>

    )
}

const Occasion = (props) => {
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
                <td>{props.brief}</td>
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
                <td {...noDataItem}><OccasionForm {...{ ...props, ...additionalProps }} /></td>
            </tr>
        </tbody>


    )
}

const OccasionForm = (props) => {
    const idField = useForm('hidden', (props.id || 0))
    const titleField = useForm('text', (props.title || ''))
    const startDateField = useForm('datetime-local', props.startDate ? props.startDate : '')
    const endDateField = useForm('datetime-local', props.endDate ? props.endDate : '')
    const briefField = useForm('null', (props.brief || ''))
    const contentField = useForm(null, (props.content || ''))
    const fileField = useFormFile()
    const filesUpload = uploader.useFileUpload();

    const prepareData = () => {
        return {
            id: idField.main.value,
            title: titleField.main.value,
            brief: briefField.main.value,
            startDate: startDateField.main.value,
            endDate: endDateField.main.value,
            content: contentField.main.value,
            image: filesUpload.value || props.image
        }
    }

    const resetFields = () => {
        titleField.onSetChange('')
        briefField.onSetChange('')
        contentField.onSetChange('')
        startDateField.onSetChange('')
        endDateField.onSetChange('')
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
            .then(() => props.isBusy(false))
    }

    return (
        <div className="g-form">
            <form className={props.className} onSubmit={submitForm}>
                {props.image && <img src={filesUpload.value || props.image} alt={props.title} className='img-fluid' />}
                <input {...idField.main} />
                <div>
                    <label>Add Title: </label>
                    <input {...titleField.main} />
                </div>
                <div>
                    <label>Add Brief: </label>
                    <TextEditor {...briefField.main} />
                </div>
                <div>
                    <label>Add Content: </label>
                    <TextEditor {...briefField.main} />
                </div>
                <div>
                    <label>Event will start on: </label>
                    <input {...startDateField.main} />
                </div>
                <div>
                    <label>Event will end on: </label>
                    <input {...endDateField.main} />
                </div>
                <div>
                    <label>Upload Image: </label>
                    <input type='file' onChange={fileField.onChange} />
                </div>
                {fileField.value &&
                    <button type="button" onClick={fileUploadHandler}>
                        {props.creator && 'Add event image'}
                        {!props.creator && props.image && 'Edit image'}
                        {!props.creator && !props.image && 'Add an image to this event'}
                    </button>
                }

                <br />
                <button type='submit'>
                    {props.creator ? 'Create Event' : 'Edit Event'}
                </button>
                {!props.creator && <button onClick={(e) => props.onDelete(idField.main.value)} type='button'>Delete Event</button>}
            </form>
        </div>
        

    )
}

export default OccasionList