import {
    setDonorsState,
    viewDonorState,
    deleteDonorState
} from '../constants/constants'

export const donorReducer = (state = [], action) => {
    switch (action.type) {
        case setDonorsState:
            return action.data
        case viewDonorState:
            return state.map(donor => donor.id === action.data.id ? action.data : donor)
        case deleteDonorState:
            return state.filter(donor => donor.id !== action.data)
        default:
            return state;
    }
}