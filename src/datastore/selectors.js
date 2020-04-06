import { COMPARISION_STATUS } from './reducer'

const itemsSelector = (items, selector)=>{
    const selectedItems = []
    for(const key of Object.keys(items)){
        const item = items[key]
        if(selector(item)){
            selectedItems.push(item)
        }
    }
    return selectedItems
}

export const remainingItemsSelector = state=> itemsSelector(state.items, item=>!item.comparisionStatus)
export const rejectedItemsSelector = state =>
    itemsSelector(state.items, item=> item.comparisionStatus===COMPARISION_STATUS.ITEM_REJECTED)