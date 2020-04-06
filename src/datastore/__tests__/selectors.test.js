import { remainingItemsSelector, rejectedItemsSelector } from '../selectors'
import { COMPARISION_STATUS } from '../reducer'

describe('selectors', ()=>{
    describe('when there is no items', ()=>{
        const state = {
            items:{}
        }
        it('should return empty array', ()=>{
            expect(remainingItemsSelector(state)).toEqual([])
            expect(rejectedItemsSelector(state)).toEqual([])
        })
    })

    describe('where there are some items', ()=>{
        const state = {
            items:{
                Item1: {
                    title: 'Item1',
                    comparisionStatus: COMPARISION_STATUS.ITEM_REJECTED
                },
                Item2: {
                    title: 'Item1',
                    comparisionStatus: COMPARISION_STATUS.ITEM_PREFERED
                },
                Item3: {
                    title: 'Item1',
                    comparisionStatus: COMPARISION_STATUS.ITEM_REJECTED
                },
                Item4: {
                    title: 'Item1',
                }
            }
        }
        test('remainingItemsSelector should return items with no comparisionStatus', ()=>{
            expect(remainingItemsSelector(state)).toEqual([state.items.Item4])
        })
        test('rejectedItemsSelector should return items with comparisionStatus rejected', ()=>{
            expect(rejectedItemsSelector(state)).toEqual([state.items.Item1, state.items.Item3])
        })
    })
})