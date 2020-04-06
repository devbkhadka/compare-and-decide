import {
    UPDATE_ITEMS,
    UPDATE_LANGUAGE, 
    UPDATE_ATTRIBUTES,
    UPDATE_PREFERRED_ITEM,  
} from './constants'

const initialState = {
    items:{},
    attributes:[],
    language: 'en'
}

export const COMPARISION_STATUS = {
    ITEM_REJECTED: 'item-rejected',
    ITEM_PREFERED: 'item-prefered'
}


export default function (state=initialState, payload) {
    switch(payload.type) {
        case UPDATE_ITEMS:
            return {...state, items: {...payload.data}}

        case UPDATE_ATTRIBUTES:
            return {...state, attributes: [...payload.data]}
        
        case UPDATE_PREFERRED_ITEM:
            return {...state, preferedItemTitle: payload.data}

        case UPDATE_LANGUAGE:
            return {...state, language: payload.data}
        default:
            return state
    }
}
