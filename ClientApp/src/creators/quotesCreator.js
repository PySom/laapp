import { newQuote, setNewQuote, editQuoteState, deleteQuoteState } from '../constants/constants'

export const createQuote = (data) => {
    return { type: newQuote, data }
}

export const setQuotes = (data) => {
    return { type: setNewQuote, data }
}

export const editQuotes = (data) => {
    return { type: editQuoteState, data }
}

export const deleteQuotes = (data) => {
    return { type: deleteQuoteState, data }
}

