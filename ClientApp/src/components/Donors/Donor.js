import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import api from '../../sideEffects/apis/api'

const noDataItem = {
    colSpan: '4'
}


const DonorList = ({ setDonor, isBusy, ...props }) => {
    useEffect(() => {
        isBusy(true)
        api.getAll('donors')
            .then(response => {
                setDonor(response)
                isBusy(false)
            })
            .catch(err => console.error(err))
    }, [setDonor, isBusy])


    const viewDonor = (id) => {
        isBusy(true)
        api.getItemWithId(`donors/${id}`)
            .then(response => {
                props.viewDonor(response)
                isBusy(false)
            })
            .catch(err => console.error(err))
    }

    const deleteDonor = (id) => {
        if (window.confirm("Should we delete this?")) {
            isBusy(true)
            api.deleteWithId(`donors/${id}`)
                .then(response => {
                    props.deleteDonor(id)
                    isBusy(false)
                })
                .catch(err => console.error(err))
        }
        
    }


    return (
        <div className="f-width">
            <Table striped>
                <thead>
                    <tr>
                        <th>S/N</th>
                        <th>Donor's Name</th>
                        <th>Donated for</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                {
                    props.donors.length > 0 ?
                        props.donors.map((content, index) => <Quotes key={content.id} isBusy={isBusy} sn={++index} onDelete={deleteDonor} onView={viewDonor} {...content} />)
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

const Quotes = (props) => {
    const [display, setDisplay] = useState(false);
    const additionalProps = {
        className: display ? 'd-block' : 'd-none',
        onView: (id) => props.onView(id),
        onDelete: (id) => props.onDelete(id),
    }

    return (
        <tbody>
            <tr>
                <td>{props.sn}</td>
                <td>{`${props.user.firstName} ${props.user.surName}`}</td>
                <td>{props.donation.title}</td>
                <td>
                    <button type='button' onClick={() => props.onDelete(props.id)}>
                        Delete
                    </button>
                    <button type='button' onClick={() => setDisplay(!display)}>
                        View Details
                    </button>
                </td>
            </tr>
            <tr>
                <td {...noDataItem}><DonorDetail {...{ ...props, ...additionalProps }} /></td>
            </tr>
        </tbody>


    )
}

const DonorDetail = (props) => {
    return (
        <div className={props.className}>
            <p>Donor's Name: {`${props.user.firstName} ${props.user.surName}`}</p>
            <p>Donor's Email: {props.user.email}</p>
            <p>Donor's Phone number: {props.user.phoneNumber || 'Donor do not have a phone number'}</p>
            <p>Donated for: {props.donation.title}</p>
            <p>With amount: {props.amount}</p>
            <p>On: {new Date(props.dateDonated).toLocaleString()}</p>
        </div>
    )
}

export default DonorList