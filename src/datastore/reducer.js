import { ADD_ITEM_WITH_TITLE } from './constants'

const initialState = {
    items:[]
}

export default function (state=initialState, payload) {
    switch(payload.type) {
        case ADD_ITEM_WITH_TITLE:
            if(payload.data){
                return {...state, items: [...state.items, payload.data]}
            }
        
        default:
            return state
    }
}