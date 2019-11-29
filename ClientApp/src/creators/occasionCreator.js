import {
    setOcassionsState,
    createNewOcassion,
    editOcassionState,
    deleteOcassionState
} from '../constants/constants'

export const createOccasion = (data) => {
    return { type: createNewOcassion, data }
}

export const setOccasion = (data) => {
    return { type: setOcassionsState, data }
}

export const editOccasion = (data) => {
    return { type: editOcassionState, data }
}

export const deleteOccasion = (data) => {
    return { type: deleteOcassionState, data }
}
