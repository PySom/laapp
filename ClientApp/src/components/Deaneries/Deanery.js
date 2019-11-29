import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import api from '../../sideEffects/apis/api'
import { useForm } from '../../customHooks/useForm'
import ParishList from '../Parishes/Parish';

const noDataItem = {
    colSpan: '4',
    style: {
        textAlign: 'center'
    }
}


const DeaneryList = ({ setDeaneries, isBusy, ...props }) => {
    const [display, setDisplay] = useState(false)
    const allDeaneries = props.ecclesia.map(deanery => { return { name: deanery.name, id: deanery.id } })
    useEffect(() => {
        isBusy(true)
        api.getAll('deaneries')
            .then(response => {
                setDeaneries(response)
                isBusy(false)
            })
            .catch(err => console.error(err))
    }, [setDeaneries, isBusy])

    const create = (model) => {
        isBusy(true)
        api.create('deaneries', model)
            .then(response => {
                props.createDeanery(response)
                isBusy(false)
            })
            .catch(err => console.error(err))
    }

    const edit = (model) => {
        isBusy(true)
        api.updateWithId('deaneries', model)
            .then(response => {
                props.editDeanery(response)
                isBusy(false)
            })
            .catch(err => console.error(err))
    }

    const deleter = (id) => {
        isBusy(true)
        api.deleteWithId(`deaneries/${id}`)
            .then(response => {
                props.deleteDeanery(id)
                isBusy(false)
            })
            .catch(err => console.error(err))
    }

    return (
        <div>
            <button type="button" onClick={() => setDisplay(!display)}>Add Deanery</button>
            <Table striped>
                <thead>
                    <tr>
                        <th>S/N</th>
                        <th>Name</th>
                        <th>Other</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                {
                    props.ecclesia.length > 0 ?
                        props.ecclesia.map((content, index) =>
                            <Deanery key={content.id} deaneries={allDeaneries}
                                createParish={props.createParish}
                                editParish={props.editParish}
                                deleteParish={props.deleteParish}
                                createMass={props.createMass}
                                editMass={props.editMass}
                                deleteMass={props.deleteMass}
                                createConfession={props.createConfession}
                                editConfession={props.editConfession}
                                deleteConfession={props.deleteConfession}
                                isBusy={isBusy} sn={++index} onDelete={deleter} onEdit={edit} {...content} />)
                        : <thead>
                            <tr>
                                <td {...noDataItem}>No item yet...
                            </td>
                            </tr>
                        </thead>
                }

            </Table>
            <DeaneryForm className={display ? 'd-block' : 'd-none'} creator={true} isBusy={isBusy} onSubmit={create} />
        </div>

    )
}

const Deanery = (props) => {
    const [display, setDisplay] = useState(false);
    const additionalProps = {
        creator: false,
        className: display ? 'd-block' : 'd-none',
        onEdit: (data) => props.onEdit(data),
        onDelete: (id) => props.onDelete(id),
    }


    const parishProps = () => {
        return {
            parishes: props.parishes,
            isBusy: props.isBusy,
            createParish: props.createParish,
            editParish: props.editParish,
            deleteParish: props.deleteParish,
            createMass: props.createMass,
            editMass: props.editMass,
            deleteMass: props.deleteMass,
            createConfession: props.createConfession,
            editConfession: props.editConfession,
            deleteConfession: props.deleteConfession,
            deaneries: props.deaneries,
            parentDeaneryId: props.id
        }
    }

    return (
        <tbody>
            <tr style={{color: 'red', fontWeight: 500}}>
                <td>{props.sn}</td>
                <td>{props.name}</td>
                <td>{props.other}</td>
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
                <td {...noDataItem}><DeaneryForm {...{ ...props, ...additionalProps }} /></td>
            </tr>
            <tr>
                <td {...noDataItem}><ParishList {...parishProps()} /></td>
                
            </tr>
        </tbody>


    )
}

const DeaneryForm = (props) => {
    const idField = useForm('hidden', (props.id || 0))
    const nameField = useForm('text', (props.name || ''))
    const otherField = useForm(null, (props.other || ''))

    const prepareData = () => {
        return {
            id: idField.main.value,
            name: nameField.main.value,
            other: otherField.main.value
        }
        
    }

    const resetFields = () => {
        nameField.onSetChange('')
        otherField.onSetChange('')
    }

    const submitForm = (e) => {
        e.preventDefault();
        props.creator ? props.onSubmit(prepareData()) : props.onEdit(prepareData())
        if (props.creator) {
            resetFields();
        }

    }

    return (
        <form className={props.className} onSubmit={submitForm}>
            <input {...idField.main} />
            <div>
                <label>Add Name: </label>
                <input {...nameField.main} />
            </div>
            <div>
                <label>Add other details: </label>
                <textarea {...otherField.main}></textarea>
            </div>
            

            <button type='submit'>
                {props.creator ? 'Create Deanery' : 'Edit Deanery'}
            </button>
            {!props.creator && <button onClick={(e) => props.onDelete(idField.main.value)} type='button'>Delete Deanery</button>}
        </form>

    )
}

export default DeaneryList