import { isLoading } from '../constants/constants'

export const isBusy = (status) => {
    return { type: isLoading, data: status }
}