import React, { useState } from 'react';
import { Table } from 'reactstrap';
import api from '../../sideEffects/apis/api'
import { useForm, useFormFile } from '../../customHooks/useForm'
import uploader from '../../customHooks/useFileUpload'
import MassList from '../Masses/Mass';
import ConfessionList from '../Confessions/Confession';

const noDataItem = {
    colSpan: '4',
    style: {
        textAlign: 'center'
    }
}


const ParishList = ({ setParishes, isBusy, ...props }) => {
    const [display, setDisplay] = useState(false)
    const create = (model) => {
        isBusy(true)
        api.create('parishes', model)
            .then(response => {
                props.createParish(response)
                isBusy(false)
            })
            .catch(err => console.error(err))
    }

    const edit = (model, id) => {
        isBusy(true)
        api.updateWithId('parishes', model)
            .then(response => {
                const actionData = {
                    data: response,
                    deaneryId: id
                }
                props.editParish(actionData)
                isBusy(false)
            })
            .catch(err => console.error(err))
    }

    const deleter = (id, deaneryId) => {
        isBusy(true)
        api.deleteWithId(`parishes/${id}`)
            .then(response => {
                props.deleteParish({id, deaneryId})
                isBusy(false)
            })
            .catch(err => console.error(err))
    }


    return (
        <div>
            <button type="button" onClick={() => setDisplay(!display)}>Add Parish</button>
            <Table striped>
                <thead>
                    <tr>
                        <th>S/N</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Parish Priest</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                {
                    props.parishes.length > 0 ?
                        props.parishes.map((content, index) =>
                            <Parish key={content.id}
                                createMass={props.createMass}
                                editMass={props.editMass}
                                deleteMass={props.deleteMass}
                                createConfession={props.createConfession}
                                editConfession={props.editConfession}
                                deleteConfession={props.deleteConfession}
                                isBusy={isBusy} sn={++index} parentDeaneryId={props.parentDeaneryId} deaneries={props.deaneries} onDelete={deleter} onEdit={edit} {...content} />)
                        : <thead>
                            <tr>
                                <td {...noDataItem}>No item yet...
                            </td>
                            </tr>
                        </thead>
                }

            </Table>
            <ParishForm className={display ? 'd-block' : 'd-none'} creator={true} deaneries={props.deaneries} parentDeaneryId={props.parentDeaneryId} isBusy={isBusy} onSubmit={create} />
        </div>

    )
}

const Parish = (props) => {
    const [display, setDisplay] = useState(false);
    const additionalProps = {
        creator: false,
        className: display ? 'd-block' : 'd-none',
        onEdit: (data, id) => props.onEdit(data, id),
        onDelete: (id, deaneryId) => props.onDelete(id, deaneryId),
        deaneries: props.deaneries,
        parentDeaneryId: props.parentDeaneryId
    }


    const massProps = () => {
        return {
            isBusy: props.isBusy,
            createMass: props.createMass,
            editMass: props.editMass,
            deleteMass: props.deleteMass,
            parentDeaneryId: props.parentDeaneryId,
            parentParishId: props.id,

        }
    }

    const confessionProps = () => {
        return {
            isBusy: props.isBusy,
            createConfession: props.createConfession,
            editConfession: props.editConfession,
            deleteConfession: props.deleteConfession,
            parentDeaneryId: props.deaneryId,
            parentParishId: props.id,

        }
    }
    return (
        <tbody>
            <tr>
                <td>{props.sn}</td>
                <td>{props.name}</td>
                <td>{props.address}</td>
                <td>{props.parishPriest}</td>
                <td>
                    <button type='button' onClick={() => props.onDelete(props.id, props.deaneryId)}>
                        Delete
                    </button>
                    <button type='button' onClick={() => setDisplay(!display)}>
                        Edit
                    </button>
                </td>
            </tr>
            <tr>
                <td {...noDataItem}><ParishForm {...{ ...props, ...additionalProps }} /></td>
            </tr>
            <tr>
                <td {...noDataItem}><MassList masses={props.masses} {...massProps()} /></td>

            </tr>
            <tr>
                <td {...noDataItem}><ConfessionList confessions={props.confessions} {...confessionProps()} /></td>

            </tr>
        </tbody>


    )
}

const ParishForm = (props) => {
    const idField = useForm('hidden', (props.id || 0))
    const deaneryIdField = useForm(null, (props.deaneryId || props.parentDeaneryId))
    const nameField = useForm('text', (props.name || ''))
    const longitudeField = useForm('number', (props.longitude || 0))
    const latitudeField = useForm('number', (props.latitude || 0))
    const addressField = useForm('text', (props.address || ''))
    const mapUrlField = useForm('url', (props.mapUrl || ''))
    const parishPriestField = useForm('text', (props.parishPriest || ''))
    const totalPriestsField = useForm('number', (props.totalPriests || 0))
    const emailField = useForm('email', (props.email || ''))
    const phoneField = useForm('tel', (props.phone || ''))
    const fileField = useFormFile()
    const filesUpload = uploader.useFileUpload();
    const myInitialDeaneryId = props.parentDeaneryId

    const prepareData = () => {
        return {
            id: idField.main.value,
            name: nameField.main.value,
            longitude: longitudeField.main.value,
            latitude: latitudeField.main.value,
            address: addressField.main.value,
            mapUrl: mapUrlField.main.value,
            parishPriest: parishPriestField.main.value,
            totalPriests: totalPriestsField.main.value,
            email: emailField.main.value,
            phone: phoneField.main.value,
            deaneryId: deaneryIdField.main.value,
            image: filesUpload.value || props.image
        }
    }

    const resetFields = () => {
        nameField.onSetChange('')
        longitudeField.onSetChange('')
        latitudeField.onSetChange('')
        addressField.onSetChange('')
        mapUrlField.onSetChange('')
        parishPriestField.onSetChange('')
        totalPriestsField.onSetChange('')
        emailField.onSetChange('')
        phoneField.onSetChange('')
    }

    const submitForm = (e) => {
        e.preventDefault();
        props.creator ? props.onSubmit(prepareData()) : props.onEdit(prepareData(), myInitialDeaneryId)
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
                <label>parish name: </label>
                <input {...nameField.main} />
            </div>
            <div>
                <label>parish address: </label>
                <input {...addressField.main} />
            </div>
            <div>
                <label>Add parish email: </label>
                <input {...emailField.main} />
            </div>
            <div>
                <label>parish phone number: </label>
                <input {...phoneField.main} />
            </div>
            <div>
                <label>parish priest: </label>
                <input {...parishPriestField.main} />
            </div>
            <div>
                <label>total priests: </label>
                <input {...totalPriestsField.main} />
            </div>
            <div>
                <label>longitude if you know please: </label>
                <input {...longitudeField.main} />
            </div>
            <div>
                <label>latitude if you know please: </label>
                <input {...latitudeField.main} />
            </div>
            <div>
                <label>church map url if you know please: </label>
                <input {...mapUrlField.main} />
            </div>
            <div>
                <label>Deanery: </label>
                <select value={deaneryIdField.main.value} onChange={deaneryIdField.main.onChange}>
                    <option value="0"> -- Choose / change deanery -- </option>
                    {props.deaneries.map(deanery => <option key={deanery.id} value={deanery.id}>{deanery.name}</option>)}
                </select>
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
                {props.creator ? 'Create Parish' : 'Edit Parish'}
            </button>
            {!props.creator && <button onClick={(e) => props.onDelete(idField.main.value, props.deaneryId)} type='button'>Delete Parish</button>}
        </form>

    )
}

export default ParishList