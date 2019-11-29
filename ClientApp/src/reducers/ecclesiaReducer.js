import {
    setDeaneriesState, editDeaneryState, createNewDeanery, deleteDeaneryState,
    createNewParish, editParishState, deleteParishState,
    createNewMass, editMassState, deleteMassState,
    createNewConfession, editConfessionState, deleteConfessionState
} from '../constants/constants'

export const ecclesiaReducer = (state = [], action) => {
    switch (action.type) {
        case createNewDeanery:
            return state.concat(action.data);
        case setDeaneriesState:
            return action.data
        case editDeaneryState:
            return state.map(ecclesia => ecclesia.id === action.data.id ? action.data : ecclesia)
        case deleteDeaneryState:
            return state.filter(ecclesia => ecclesia.id !== action.data)
        //For Parishes
        case createNewParish:
            return state.map(ecclesia => 
                ecclesia.id === action.data.deaneryId ? { ...ecclesia, parishes: ecclesia.parishes.concat(action.data) } : ecclesia)
        case editParishState:
            if (action.data.data.deaneryId === action.data.deaneryId) {
                return state.map(ecclesia => ecclesia.id === action.data.deaneryId
                    ?
                        {
                        ...ecclesia, parishes: ecclesia.parishes.map(parish => parish.id === action.data.data.id ? action.data.data : parish)
                        }
                    :
                    ecclesia)
            }
            const deaneriesWithParishRemoved = state.map(ecclesia => ecclesia.id === action.data.deaneryId ?
                { ...ecclesia, parishes: ecclesia.parishes.filter(parish => parish.id !== action.data.data.id) } :
                ecclesia)
            return deaneriesWithParishRemoved.map(deanery => deanery.id === action.data.data.deaneryId ?
                { ...deanery, parishes: deanery.parishes.concat(action.data.data) } : deanery)
        case deleteParishState:
            console.log(action)
            return state.map(ecclesia => ecclesia.id === action.data.deaneryId ?
                { ...ecclesia, parishes: ecclesia.parishes.filter(parish => parish.id !== action.data.id) } : ecclesia)
        //end of parishes
        
        //for confessions
        case createNewConfession:
            return state.map(ecclesia =>
                ecclesia.id === action.data.deaneryId ? {
                    ...ecclesia, parishes: ecclesia.parishes.map(parish => parish.id === action.data.data.parishId ?
                        { ...parish, confessions: parish.confessions.concat(action.data.data) } : parish)
                } : ecclesia)
        case editConfessionState:
            return state.map(ecclesia => ecclesia.id === action.data.deaneryId
                ?
                {
                    ...ecclesia, parishes: ecclesia.parishes.map(parish => parish.id === action.data.data.parishId ?
                        {
                            ...parish,
                            confessions: parish.confessions.map(confession => confession.id === action.data.data.id ? action.data.data : confession)
                        } : parish)
                }
                :
                ecclesia)
        case deleteConfessionState:
            console.log(action)
            return state.map(ecclesia => ecclesia.id === action.data.deaneryId ?
                {
                    ...ecclesia, parishes: ecclesia.parishes.map(parish => parish.id === action.data.parishId ?
                        {
                            ...parish,
                            confessions: parish.confessions.filter(confession => confession.id !== action.data.id)
                        } : parish)
                } : ecclesia)
        //end confessions

        //for masses
        case createNewMass:
            console.log(action)
            return state.map(ecclesia =>
                ecclesia.id === action.data.deaneryId ? {
                    ...ecclesia, parishes: ecclesia.parishes.map(parish => parish.id === action.data.data.parishId ?
                        { ...parish, masses: parish.masses.concat(action.data.data) } : parish)
                } : ecclesia)
        case editMassState:
            return state.map(ecclesia => ecclesia.id === action.data.deaneryId
                    ?
                    {
                    ...ecclesia, parishes: ecclesia.parishes.map(parish => parish.id === action.data.data.parishId ?
                        {
                            ...parish,
                            masses: parish.masses.map(mass => mass.id === action.data.data.id ? action.data.data : mass)
                        } : parish)
                    }
                    :
                    ecclesia)
        case deleteMassState:
            console.log(action)
            return state.map(ecclesia => ecclesia.id === action.data.deaneryId ?
                {
                    ...ecclesia, parishes: ecclesia.parishes.map(parish => parish.id === action.data.parishId ?
                        {
                            ...parish,
                            masses: parish.masses.filter(mass => mass.id !== action.data.id)
                        } : parish)
                } : ecclesia)
        //end masses
        default:
            return state;

    }
}