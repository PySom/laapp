import { newNews, setNewsState, editNewsState, deleteNewsState } from '../constants/constants'

export const createNews = (data) => {
    return { type: newNews, data}
}

export const setNews = (data) => {
    return { type: setNewsState, data }
}

export const editNews = (data) => {
    return { type: editNewsState, data }
}

export const deleteNews = (data) => {
    return { type: deleteNewsState, data }
}

