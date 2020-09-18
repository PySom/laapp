import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import api from '../../sideEffects/apis/api'
import { useForm } from '../../customHooks/useForm'
import TextEditor from '../TextEditor/TextEditor';

const noDataItem = {
    colSpan: '4'
}


const QuotesList = ({ setQuotes, isBusy, ...props }) => {
    const [display, setDisplay] = useState(false)
    useEffect(() => {
        isBusy(true)
        api.getAll('quotes')
            .then(response => {
                setQuotes(response)
                isBusy(false)
            })
            .catch(err => console.error(err))
    }, [setQuotes, isBusy])

    const createNewQuote = (model) => {
        isBusy(true)
        api.create('quotes', model)
            .then(quote => {
                props.createQuote(quote)
                isBusy(false)
            })
            .catch(err => console.error(err))
    }

    const editQuote = (newsObject) => {
        isBusy(true)
        api.updateWithId('quotes', newsObject)
            .then(quote => {
                props.editQuotes(quote)
                isBusy(false)
            })
            .catch(err => console.error(err))
    }

    const deleteQuote = (id) => {
        if (window.confirm("Should we delete this?")) {
            isBusy(true)
            api.deleteWithId(`quotes/${id}`)
                .then(quote => {
                    props.deleteQuotes(id)
                    isBusy(false)
                })
                .catch(err => console.error(err))
        }
        
    }


    return (
        <div className="f-width">
            <button type="button" onClick={() => setDisplay(!display)}>Add Quote</button>
            <QuotesForm className={display ? 'd-block' : 'd-none'} creator={true} isBusy={isBusy} onSubmit={createNewQuote} />
            <Table striped>
                <thead>
                    <tr>
                        <th>S/N</th>
                        <th>Content</th>
                        <th>Date to Show</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                {
                    props.quotes.length > 0 ?
                        props.quotes.map((content, index) => <Quotes key={content.id} isBusy={isBusy} sn={++index} onDelete={deleteQuote} onEdit={editQuote} {...content} />)
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
        creator: false,
        className: display ? 'd-block' : 'd-none',
        onEdit: (data) => props.onEdit(data),
        onDelete: (id) => props.onDelete(id),
    }

    return (
        <tbody>
            <tr>
                <td>{props.sn}</td>
                <td>{props.content}</td>
                <td>{new Date(props.showOn).toDateString()}</td>
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
                <td {...noDataItem}><QuotesForm {...{ ...props, ...additionalProps }} /></td>
            </tr>
        </tbody>


    )
}

const QuotesForm = (props) => {
    const idField = useForm('hidden', (props.id || 0))
    const showOnField = useForm('date', (props.showOn ? new Date(props.showOn).toLocaleDateString('en-CA') : ''))
    const contentField = useForm(null, (props.content || ''))

    const prepareData = () => {
        return {
            id: idField.main.value,
            showOn: showOnField.main.value,
            content: contentField.main.value
        }
    }

    const resetFields = () => {
        showOnField.onSetChange('')
        contentField.onSetChange('')
    }

    const submitForm = (e) => {
        e.preventDefault();
        props.creator ? props.onSubmit(prepareData()) : props.onEdit(prepareData())
        if (props.creator) {
            resetFields();
        }
    }


    return (
        <div className="g-form">
            <form className={props.className} onSubmit={submitForm}>
                <input {...idField.main} />
                <div>
                    <label>Add Quote: </label>
                    <TextEditor {...contentField.main} />
                </div>
                <div>
                    <label>Show this quote on: </label>
                    <input {...showOnField.main} />
                </div>

                <button type='submit'>
                    {props.creator ? 'Create Quote' : 'Edit Quote'}
                </button>
                {!props.creator && <button onClick={(e) => props.onDelete(idField.main.value)} type='button'>Delete Quote</button>}
            </form>
        </div>
        

    )
}

export default QuotesList