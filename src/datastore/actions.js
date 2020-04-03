import { UPDATE_ITEMS, 
    UPDATE_LANGUAGE, 
    ADD_ATTRIBUTE, 
    UPDATE_ITEM_ATTRIBUTE_VALUE } from './constants'

const ITEMS_KEY = 'items'

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
    return {
        type: ADD_ATTRIBUTE,
        data: attribute
    }
}

export function updateItemAttributeValue(item, attr, value) {
    return {
        type: UPDATE_ITEM_ATTRIBUTE_VALUE,
        data: {item, attr, value}
    }
}