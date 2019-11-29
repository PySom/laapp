import {
    setReflectionsState,
    createNewReflection,
    editReflectionState,
    deleteReflectionState
} from '../constants/constants'

export const createReflection = (data) => {
    return { type: createNewReflection, data }
}

export const setReflection = (data) => {
    return { type: setReflectionsState, data }
}

export const editReflection = (data) => {
    return { type: editReflectionState, data }
}

export const deleteReflection = (data) => {
    return { type: deleteReflectionState, data }
}
