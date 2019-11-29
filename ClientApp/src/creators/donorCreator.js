import {
    setDonorsState,
    viewDonorState,
    deleteDonorState
} from '../constants/constants'



export const setDonor = (data) => {
    return { type: setDonorsState, data }
}

export const viewDonor = (data) => {
    return { type: viewDonorState, data }
}

export const deleteDonor = (data) => {
    return { type: deleteDonorState, data }
}
