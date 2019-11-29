import { createStore } from 'redux';
import { rootReducer } from '../reducers/root/rootReducer'

const store = createStore(rootReducer)


export default store;