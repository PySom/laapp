import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import api from '../../sideEffects/apis/api'
import { useForm, useFormFile } from '../../customHooks/useForm'
import uploader from '../../customHooks/useFileUpload'
import TextEditor from '../TextEditor/TextEditor';

const noDataItem = {
    colSpan: '4'
}


const DonationList = ({ setDonation, isBusy, ...props }) => {
    const [display, setDisplay] = useState(false)
    useEffect(() => {
        isBusy(true)
        api.getAll('donations')
            .then(response => {
                setDonation(response)
                isBusy(false)
            })
            .catch(err => console.error(err))
    }, [setDonation, isBusy])

    const create = (model) => {
        isBusy(true)
        api.create('donations', model)
            .then(response => {
                props.createDonation(response)
                isBusy(false)
            })
            .catch(err => console.error(err))
    }

    const edit = (model) => {
        isBusy(true)
        api.updateWithId('donations', model)
            .then(response => {
                props.editDonation(response)
                isBusy(false)
            })
            .catch(err => console.error(err))
    }

    const deleter = (id) => {
        if (window.confirm("Should we delete this?")) {
            isBusy(true)
            api.deleteWithId(`donations/${id}`)
                .then(response => {
                    props.deleteDonation(id)
                    isBusy(false)
                })
                .catch(err => console.error(err))
        }
        
    }


    return (
        <div className="f-width">
            <button type="button" onClick={() => setDisplay(!display)}>Add Donations</button>
            <DonationForm className={display ? 'd-block' : 'd-none'} creator={true} isBusy={isBusy} onSubmit={create} />
            <Table striped>
                <thead>
                    <tr>
                        <th>S/N</th>
                        <th>Title</th>
                        <th>Content</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                {
                    props.donations.length > 0 ?
                        props.donations.map((content, index) => <Donation key={content.id} isBusy={isBusy} sn={++index} onDelete={deleter} onEdit={edit} {...content} />)
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

const Donation = (props) => {
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
                <td {...noDataItem}><DonationForm {...{ ...props, ...additionalProps }} /></td>
            </tr>
        </tbody>


    )
}

const DonationForm = (props) => {
    const idField = useForm('hidden', (props.id || 0))
    const titleField = useForm('text', (props.title || ''))
    const contentField = useForm(null, (props.content || ''))
    const fileField = useFormFile()
    const filesUpload = uploader.useFileUpload();
    const videoField = useFormFile()
    const videoUpload = uploader.useFileUpload();

    const prepareData = () => {
        return {
            id: idField.main.value,
            title: titleField.main.value,
            content: contentField.main.value,
            image: filesUpload.value || props.image,
            video: videoUpload.value || props.video
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
            .then(() => props.isBusy(false))
    }

    const videoUploadHandler = (e) => {
        props.isBusy(true)
        videoUpload.onUpload(e, videoField.value)
            .then(() => props.isBusy(false))

    }

    return (
        <div className="g-form">
            <form className={props.className} onSubmit={submitForm}>
                {props.image && <img src={filesUpload.value || props.image} alt={props.title} className='img-fluid' />}
                {props.video && <video src={videoUpload.value || props.video} alt={props.title} controls autoPlay></video>}
                <input {...idField.main} />
                <div>
                    <label>Add Title: </label>
                    <input {...titleField.main} />
                </div>
                <div>
                    <label>Add Content: </label>
                    <TextEditor {...contentField.main} />
                </div>
                <div>
                    <label>Upload Image: </label>
                    <input type='file' onChange={fileField.onChange} />
                </div>
                {fileField.value &&
                    <button type="button" onClick={fileUploadHandler}>
                        {props.creator && 'Add donation image'}
                        {!props.creator && props.image && 'Edit image'}
                        {!props.creator && !props.image && 'Add an image to this donation'}
                    </button>
                }

                <div>
                    <label>Upload Video: </label>
                    <input type='file' onChange={videoField.onChange} />
                </div>
                {videoField.value &&
                    <button type="button" onClick={videoUploadHandler}>
                        {props.creator && 'Add donation video'}
                        {!props.creator && props.image && 'Edit image'}
                        {!props.creator && !props.image && 'Add an image to this donation'}
                    </button>
                }

                <br />
                <button type='submit'>
                    {props.creator ? 'Create Donation' : 'Edit Donation'}
                </button>
                {!props.creator && <button onClick={(e) => props.onDelete(idField.main.value)} type='button'>Delete Donation</button>}
            </form>
        </div>
        

    )
}

export default DonationList