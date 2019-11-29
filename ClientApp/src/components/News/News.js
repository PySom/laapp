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


const NewsList = ({ setNews, isBusy, ...props }) => {
    const [display, setDisplay] = useState(false)
    useEffect(() => {
        isBusy(true)
        api.getAll('news')
            .then(news => {
                setNews(news)
                isBusy(false)
            })
            .catch(err => console.error(err))
    }, [setNews, isBusy])

    const createNewNews = (newsObject) => {
        isBusy(true)
        api.create('news', newsObject)
            .then(news => {
                props.createNews(news)
                isBusy(false)
            })
            .catch(err => console.error(err))
    }

    const editNews = (newsObject) => {
        isBusy(true)
        api.updateWithId(`news`, newsObject)
            .then(news => {
                props.editNews(news)
                isBusy(false)
            })
            .catch(err => console.error(err))
    }

    const deleteNews = (id) => {
        isBusy(true)
        api.deleteWithId(`news/${id}`)
            .then(news => {
                props.deleteNews(id)
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
                        <th>Brief</th>
                        <th>Date Posted</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                {
                    props.news.length > 0 ?
                        props.news.map((content, index) => <News key={content.id} isBusy={isBusy} sn={++index} onDelete={deleteNews} onEdit={editNews} {...content} />)
                        : <thead>
                            <tr>
                                <td {...noDataItem}>No item yet...
                            </td>
                            </tr>
                        </thead>
                }

            </Table>
            <NewsForm className={display ? 'd-block' : 'd-none'} creator={true} isBusy={isBusy} onSubmit={createNewNews} />
        </div>
        
    )
}

const News = (props) => {
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
                <td>{new Date(props.datePosted).toString()}</td>
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
                <td {...noDataItem}><NewsForm {...{ ...props, ...additionalProps } } /></td>
            </tr>
        </tbody>
        

    )
}

const NewsForm = (props) => {
    const idField = useForm('hidden', (props.id || 0))
    const titleField = useForm('text', (props.title || ''))
    const briefField = useForm('text', (props.brief || ''))
    const contentField = useForm(null, (props.content || ''))
    const fileField = useFormFile()
    const filesUpload = uploader.useFileUpload();

    const prepareData = () => {
        const preparatory = {
            id: idField.main.value,
            title: titleField.main.value,
            brief: briefField.main.value,
            content: contentField.main.value,
            image: filesUpload.value || props.image
        }
        if (props.creator) {
            return preparatory
        }
        return {
            ...preparatory,
            datePosted: props.datePosted
        }
    }

    const resetFields = () => {
        titleField.onSetChange('')
        briefField.onSetChange('')
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
                <label>Add Brief: </label>
                <input {...briefField.main} />
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

export default NewsList