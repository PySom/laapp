import React, { useState } from 'react';
import { Table } from 'reactstrap';
import api from '../../sideEffects/apis/api'
import { useForm } from '../../customHooks/useForm'
import { showDayOfWeek } from '../../helpers/dayOfWeek'

const noDataItem = {
    colSpan: '4',
    style: {
        textAlign: 'center'
    }
}


const ConfessionList = ({ setConfessions, isBusy, ...props }) => {
    const [display, setDisplay] = useState(false)

    const create = (model, id) => {
        isBusy(true)
        api.create('confessions', model)
            .then(response => {
                props.createConfession({ data: response, deaneryId: id })
                isBusy(false)
            })
            .catch(err => console.error(err))
    }

    const edit = (model, id) => {
        isBusy(true)
        api.updateWithId('confessions', model)
            .then(response => {
                props.editConfession({ data: response, deaneryId: id })
                isBusy(false)
            })
            .catch(err => console.error(err))
    }

    const deleter = (id, parishId, deaneryId) => {
        isBusy(true)
        api.deleteWithId(`confessions/${id}`)
            .then(response => {
                props.deleteConfession({ id, parishId, deaneryId })
                isBusy(false)
            })
            .catch(err => console.error(err))
    }


    return (
        <div>
            <button type="button" onClick={() => setDisplay(!display)}>Add confession time</button>
            <ConfessionForm className={display ? 'd-block' : 'd-none'}
                parentDeaneryId={props.parentDeaneryId}
                parentParishId={props.parentParishId}
                creator={true} isBusy={isBusy} onSubmit={create} />
            <Table striped>
                <thead>
                    <tr>
                        <th>S/N</th>
                        <th>Day of the Week</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                    </tr>
                </thead>
                {
                    props.confessions.length > 0 ?
                        props.confessions.map((content, index) => <Confession key={content.id}
                            parentDeaneryId={props.parentDeaneryId}
                            parentParishId={props.parentParishId}
                            isBusy={isBusy} sn={++index} onDelete={deleter} onEdit={edit} {...content} />)
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

const Confession = (props) => {
    const [display, setDisplay] = useState(false);
    const additionalProps = {
        creator: false,
        className: display ? 'd-block' : 'd-none',
        onEdit: (data, id) => props.onEdit(data, id),
        onDelete: (id, parishId, deaneryId) => props.onDelete(id, parishId, deaneryId),
    }

    return (
        <tbody>
            <tr>
                <td>{props.sn}</td>
                <td>{showDayOfWeek(props.day)}</td>
                <td>{new Date(props.startTime).toLocaleTimeString()}</td>
                <td>{new Date(props.endTime).toLocaleTimeString()}</td>
                <td>
                    <button type='button' onClick={() => props.onDelete(props.id, props.parentParishId, props.parentDeaneryId)}>
                        Delete
                    </button>
                    <button type='button' onClick={() => setDisplay(!display)}>
                        Edit
                    </button>
                </td>
            </tr>
            <tr>
                <td {...noDataItem}><ConfessionForm {...{ ...props, ...additionalProps }} /></td>
            </tr>
        </tbody>


    )
}

const ConfessionForm = (props) => {
    const idField = useForm('hidden', (props.id || 0))
    const startDateField = useForm('time', (props.startTime ? new Date(props.startTime).toTimeString().split(' ')[0] : ''))
    const endDateField = useForm('time', (props.endTime ? new Date(props.endTime).toTimeString().split(' ')[0] : ''))
    const dayField = useForm(null, (props.day || 0))

    const prepareData = () => {
        console.log(props.parentParishId)
        return {
            id: idField.main.value,
            parishId: props.parentParishId,
            startTime: startDateField.main.value,
            endTime: endDateField.main.value,
            day: dayField.main.value
        }
    }

    const resetFields = () => {
        dayField.onSetChange(0)
        startDateField.onSetChange('')
        endDateField.onSetChange('')
    }

    const submitForm = (e) => {
        console.log(prepareData())
        e.preventDefault();
        props.creator ? props.onSubmit(prepareData(), props.parentDeaneryId) : props.onEdit(prepareData(), props.parentDeaneryId)
        if (props.creator) {
            resetFields();
        }
    }


    return (
        <div className="g-form">
            <form className={props.className} onSubmit={submitForm}>
                <input {...idField.main} />
                <div>
                    <label>Select Day of Week: </label>
                    <select value={dayField.main.value} onChange={dayField.main.onChange}>
                        <option value="0">Sunday</option>
                        <option value="1">Monday</option>
                        <option value="2">Tuesday</option>
                        <option value="3">Wednesday</option>
                        <option value="4">Thursday</option>
                        <option value="5">Friday</option>
                        <option value="6">Saturday</option>
                    </select>
                </div>
                <div>
                    <label>Add Mass Start Time: </label>
                    <input {...startDateField.main} />
                </div>
                <div>
                    <label>Tentative period for Mass to end: </label>
                    <input {...endDateField.main} />
                </div>


                <button type='submit'>
                    {props.creator ? 'Create Confession' : 'Edit Confession'}
                </button>
                {!props.creator && <button onClick={(e) => props.onDelete(idField.main.value, props.parentParishId, props.parentDeaneryId)} type='button'>Delete Confession</button>}
            </form>
        </div>
        

    )
}

export default ConfessionList