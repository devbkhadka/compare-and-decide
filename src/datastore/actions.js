
import { ADD_ITEM_WITH_TITLE, UPDATE_LANGUAGE } from './constants'

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