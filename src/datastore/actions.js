
import { ADD_ITEM_WITH_TITLE } from './constants'

export function addItemWithTitle(title) {
    return {
        type: ADD_ITEM_WITH_TITLE,
        data: title
    }
}