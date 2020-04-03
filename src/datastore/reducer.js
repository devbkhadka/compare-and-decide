import {
    UPDATE_ITEMS,
    UPDATE_LANGUAGE, 
    ADD_ATTRIBUTE, 
    UPDATE_ITEM_ATTRIBUTE_VALUE 
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

        case ADD_ATTRIBUTE:
            if(payload.data) {
                return {...state, attributes: [...state.attributes, payload.data]}
            }
            return state
        case UPDATE_ITEM_ATTRIBUTE_VALUE:
            {
                const {item, attr, value} = payload.data
                const newState = {...state, items: {...state.items}}
                newState.items[item.title] = {...item, values: {...item.values, [attr]: value}}
                return newState
            }
        case UPDATE_LANGUAGE:
            return {...state, language: payload.data}
        default:
            return state
    }
}
