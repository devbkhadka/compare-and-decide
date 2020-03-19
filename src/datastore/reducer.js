import { ADD_ITEM_WITH_TITLE } from './constants'

const initialState = {
    items:[]
}

export default function (state=initialState, payload) {
    switch(payload.type) {
        case ADD_ITEM_WITH_TITLE:
            return {...state, items: [payload.data, ...state.items]}
        
        default:
            return state
    }
}