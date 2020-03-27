
import { ADD_ITEM_WITH_TITLE, UPDATE_LANGUAGE, ADD_ATTRIBUTE } from './constants'

export function addItemWithTitle(title) {
    return {
        type: ADD_ITEM_WITH_TITLE,
        data: title
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