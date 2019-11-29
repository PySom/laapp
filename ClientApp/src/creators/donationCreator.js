import {
    setDonationsState,
    createNewDonation,
    editDonationState,
    deleteDonationState
} from '../constants/constants'

export const createDonation = (data) => {
    return { type: createNewDonation, data }
}

export const setDonation = (data) => {
    return { type: setDonationsState, data }
}

export const editDonation = (data) => {
    return { type: editDonationState, data }
}

export const deleteDonation = (data) => {
    return { type: deleteDonationState, data }
}

