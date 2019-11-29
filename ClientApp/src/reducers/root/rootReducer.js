import { combineReducers } from 'redux'
import { newsReducer } from '../newsReducer'
import { loaderReducer } from '../loaderReducer'
import { quotesReducer } from '../quotesReducer'
import { ecclesiaReducer } from '../ecclesiaReducer'
import { donationReducer } from '../donationReducer'
import { ocacasionReducer } from '../occasionReducer'
import { reflectionReducer } from '../reflectionReducer'
import { donorReducer } from '../donorReducer'

export const rootReducer = combineReducers({
    news: newsReducer,
    loading: loaderReducer,
    quotes: quotesReducer,
    ecclesia: ecclesiaReducer,
    donations: donationReducer,
    occasions: ocacasionReducer,
    reflections: reflectionReducer,
    donors: donorReducer,
})