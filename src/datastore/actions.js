import { UPDATE_ITEMS, 
    UPDATE_LANGUAGE, 
    UPDATE_ATTRIBUTES,
    UPDATE_PREFERRED_ITEM
} from './constants'

import {COMPARISION_STATUS} from './reducer'

export const ITEMS_KEY = 'items-key'
export const ATTRIBUTES_KEY = 'attributes-key'
export const PREFETED_ITEM_TITLE_KEY = 'prefered-item-key'

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

        const preferedItemTitle = localStorage.getItem(PREFETED_ITEM_TITLE_KEY)
        if(preferedItemTitle){
            dispatch(updatePreferedItemTitle(preferedItemTitle))
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

export function setPreferedItemTitle(itemTitle) {
    return (dispatch, getState) => {
        const state = getState()
        const curPreferedTitle = state.preferedItemTitle

        const item = state.items[itemTitle]
        if(!item) {
            // TODO: This branch not tested
            return
        }
        if(curPreferedTitle){
            // TODO: This branch not tested
            state.items[curPreferedTitle].comparisionStatus = undefined
        }
        item.comparisionStatus = COMPARISION_STATUS.ITEM_PREFERED

        localStorage.setItem(ITEMS_KEY, JSON.stringify(state.items))
        localStorage.setItem(PREFETED_ITEM_TITLE_KEY, item.title)

        dispatch(updateItems(state.items))
        dispatch(updatePreferedItemTitle(item.title))
        
    }
}

export function updatePreferedItemTitle(itemTitle) {
    return {
        type: UPDATE_PREFERRED_ITEM,
        data: itemTitle
    }
}

export function rejectItem(itemTitle){
    return (dispatch, getState) => {
        const state = getState()
        state.items[itemTitle].comparisionStatus = COMPARISION_STATUS.ITEM_REJECTED

        localStorage.setItem(ITEMS_KEY, JSON.stringify(state.items))
        dispatch(updateItems(state.items))
    }
}