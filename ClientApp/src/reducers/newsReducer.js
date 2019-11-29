import { newNews, setNewsState, editNewsState, deleteNewsState } from '../constants/constants'

export const newsReducer = (state = [], action) => {
    switch (action.type) {
        case newNews:
            return state.concat(action.data);
        case setNewsState:
            return action.data
        case editNewsState:
            return state.map(news => news.id === action.data.id ? action.data : news)
        case deleteNewsState:
            return state.filter(news => news.id !== action.data)
        default:
            return state;
    }
}