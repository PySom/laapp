import {
    setReflectionsState,
    createNewReflection,
    editReflectionState,
    deleteReflectionState
} from '../constants/constants'

export const reflectionReducer = (state = [], action) => {
    switch (action.type) {
        case createNewReflection:
            return state.concat(action.data);
        case setReflectionsState:
            return action.data
        case editReflectionState:
            return state.map(reflection => reflection.id === action.data.id ? action.data : reflection)
        case deleteReflectionState:
            return state.filter(reflection => reflection.id !== action.data)
        default:
            return state;
    }
}