import { UPDATE_ITEMS, 
    UPDATE_LANGUAGE, 
    UPDATE_ATTRIBUTES
} from './constants'

export const ITEMS_KEY = 'items-key'
export const ATTRIBUTES_KEY = 'attributes-key'

export function addItemWithTitle(title) {
    return (dispatch, getState) => {

        const state = getState()
        if(!title || state.items[title]) {
            return
        }

        const item = {
            title: title,
            values: {}
        }
        state.items[item.title] = item
        localStorage.setItem(ITEMS_KEY, JSON.stringify(state.items))
        dispatch(updateItems(state.items))
    }
}

export function loadStateFromStorage() {
    return dispatch => {
        const itemsJson = localStorage.getItem(ITEMS_KEY)
        if(itemsJson) {
            dispatch(updateItems(JSON.parse(itemsJson)))
        }

        const attributesJson = localStorage.getItem(ATTRIBUTES_KEY)
        if(attributesJson) {
            dispatch(updateAttributes(JSON.parse(attributesJson)))
        }
    }
}

export function updateItems(items) {
    return {
        type: UPDATE_ITEMS,
        data: items
    }
}

export function updateLanguage(language) {
    return {
        type: UPDATE_LANGUAGE,
        data: language
    }
}

export function addAttribute(attribute) {
    return (dispatch, getState)=>{
        const attributes = getState().attributes
        if(attribute) {
            attributes.push(attribute)
            localStorage.setItem(ATTRIBUTES_KEY, JSON.stringify(attributes))
            dispatch(updateAttributes(attributes))
        }
    }
}

export function updateAttributes(attributes) {
    return {
        type: UPDATE_ATTRIBUTES,
        data: attributes
    }
}

export function updateItemAttributeValue(item, attr, value) {
    return (dispatch, getState) => {
        const state = getState()
        const newItems = {...state.items}
        newItems[item.title] = {...item, values: {...item.values, [attr]: value}}
        
        localStorage.setItem(ITEMS_KEY, JSON.stringify(newItems))
        dispatch(updateItems(newItems))
    }
}