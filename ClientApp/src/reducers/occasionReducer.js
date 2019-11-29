import {
    setOcassionsState,
    createNewOcassion,
    editOcassionState,
    deleteOcassionState
} from '../constants/constants'

export const ocacasionReducer = (state = [], action) => {
    switch (action.type) {
        case createNewOcassion:
            return state.concat(action.data);
        case setOcassionsState:
            return action.data
        case editOcassionState:
            return state.map(occasion => occasion.id === action.data.id ? action.data : occasion)
        case deleteOcassionState:
            return state.filter(occasion => occasion.id !== action.data)
        default:
            return state;
    }
}