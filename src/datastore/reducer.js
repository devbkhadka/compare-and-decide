import {
    UPDATE_ITEMS,
    UPDATE_LANGUAGE, 
    UPDATE_ATTRIBUTES,  
} from './constants'

const initialState = {
    items:{},
    attributes:[],
    language: 'en'
}

export default function (state=initialState, payload) {
    switch(payload.type) {
        case UPDATE_ITEMS:
            return {...state, items: {...payload.data}}

        case UPDATE_ATTRIBUTES:
            return {...state, attributes: [...payload.data]}

        case UPDATE_LANGUAGE:
            return {...state, language: payload.data}
        default:
            return state
    }
}
