import {
    setDeaneriesState, editDeaneryState, createNewDeanery, deleteDeaneryState,
    createNewParish, editParishState, deleteParishState,
    createNewMass, editMassState, deleteMassState,
    createNewConfession, editConfessionState, deleteConfessionState
} from '../constants/constants'

export const createDeanery = (data) => {
    return { type: createNewDeanery, data }
}

export const setDeaneries = (data) => {
    return { type: setDeaneriesState, data }
}

export const editDeanery = (data) => {
    return { type: editDeaneryState, data }
}

export const deleteDeanery = (data) => {
    return { type: deleteDeaneryState, data }
}

export const createParish = (data) => {
    return { type: createNewParish, data }
}

export const editParish = (data) => {
    return { type: editParishState, data }
}

export const deleteParish = (data) => {
    return { type: deleteParishState, data }
}

export const createMass = (data) => {
    return { type: createNewMass, data }
}

export const editMass = (data) => {
    return { type: editMassState, data }
}

export const deleteMass = (data) => {
    return { type: deleteMassState, data }
}

export const createConfession = (data) => {
    return { type: createNewConfession, data }
}

export const editConfession = (data) => {
    return { type: editConfessionState, data }
}

export const deleteConfession = (data) => {
    return { type: deleteConfessionState, data }
}
