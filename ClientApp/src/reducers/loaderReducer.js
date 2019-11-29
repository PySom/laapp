import { isLoading } from '../constants/constants'

export const loaderReducer = (state = false, action) => {
    switch (action.type) {
        case isLoading:
            return action.data
        default:
            return state;
    }
}