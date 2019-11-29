import { newQuote, setNewQuote, editQuoteState, deleteQuoteState } from '../constants/constants'

export const quotesReducer = (state = [], action) => {
    switch (action.type) {
        case newQuote:
            return state.concat(action.data);
        case setNewQuote:
            return action.data
        case editQuoteState:
            return state.map(quote => quote.id === action.data.id ? action.data : quote)
        case deleteQuoteState:
            return state.filter(quote => quote.id !== action.data)
        default:
            return state;
    }
}