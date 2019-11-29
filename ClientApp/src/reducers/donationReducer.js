import {
    setDonationsState,
    createNewDonation,
    editDonationState,
    deleteDonationState } from '../constants/constants'

export const donationReducer = (state = [], action) => {
    switch (action.type) {
        case createNewDonation:
            return state.concat(action.data);
        case setDonationsState:
            return action.data
        case editDonationState:
            return state.map(donation => donation.id === action.data.id ? action.data : donation)
        case deleteDonationState:
            return state.filter(donation => donation.id !== action.data)
        default:
            return state;
    }
}