import { ADD_ITEM_WITH_TITLE, UPDATE_LANGUAGE } from './constants'

const initialState = {
    items:[],
    language: 'en'
}

export default function (state=initialState, payload) {
    switch(payload.type) {
        case ADD_ITEM_WITH_TITLE:
            if(payload.data){
                return {...state, items: [...state.items, payload.data]}
            }
            return state
        case UPDATE_LANGUAGE:
            return {...state, language: payload.data}
        default:
            return state
    }
}