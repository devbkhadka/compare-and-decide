import React from 'react'

import ComparisionGridPane from '../ComparisionGridPane'
import { renderWithProvider } from '../../utils/testUtils'
import {remainingItemsSelector as mockRemainingItemsSelector} from '../../datastore/selectors'
import { within, fireEvent } from '@testing-library/react'
import {
    setPreferedItemTitle as mockSetPreferedItemTitle,
    rejectItem as mockRejectItem
} from '../../datastore/actions'
import { COMPARISION_STATUS } from '../../datastore/reducer'

jest.mock('../../datastore/actions')
mockSetPreferedItemTitle.mockImplementation(()=>()=>null)
mockRejectItem.mockImplementation(()=>()=>null)
jest.mock('../../datastore/selectors')

jest.spyOn(global, 'confirm')

describe('ComparisionGridPane Component', ()=>{
    const copyBaseState = ()=>{
        const state = {
            items:{
                Item1: {
                    title: 'Item1',
                    values: {
                        attr1: 'Item1-Value1',
                        attr2: 'Item1-Value2',
                        attr3: 'Item1-Value3'
                    }
                },
                Item2: {
                    title: 'Item2',
                    values: {
                        attr2: 'Item2-Value2',
                        attr3: 'Item2-Value3'
                    }
                },
                Item3: {
                    title: 'Item3',
                    values: {
                        attr1: 'Item3-Value1',
                        attr2: 'Item3-Value2',
                        attr3: 'Item3-Value3'
                    }
                },
                Item4: {
                    title: 'Item4',
                    values: {
                        attr3: 'Item4-Value3'
                    }
                }
            },
            attributes: ['attr1', 'attr2', 'attr3']
        }
        return JSON.parse(JSON.stringify(state))
    }
    describe('When prefered item not selected', ()=>{
        const state = copyBaseState()
        const {Item2, Item3, Item4} = state.items
        beforeEach(()=>{
            mockRemainingItemsSelector.mockImplementation(()=>{
                return [Item2, Item3, Item4]
            }).mockName('nonEmptyRemainingItemSelector')
        })
        it('Should show message to select prefered item', ()=>{
            const [rendered] = renderWithProvider(<ComparisionGridPane/>, copyBaseState())
            rendered.getByText(/Please select a prefered item.*/)
            expect(rendered.queryByTestId('root-content')).toBeNull()
        })
    })
        

    describe('When prefered item is selected and items are remaining', ()=>{
        const state = copyBaseState()
        const {Item2, Item3, Item4} = state.items
        state.preferedItemTitle = Item2.title
        beforeEach(()=>{
            mockRemainingItemsSelector.mockImplementation(()=>{
                return [Item3, Item4]
            }).mockName('nonEmptyRemainingItemSelector')
        })
        
        it('Should show comparision between prefered Item and 1st Item from remaining', ()=>{
            const [rendered] = renderWithProvider(<ComparisionGridPane/>, state)
            expect(rendered.queryAllByText(/Item2-Value\d/).length).toBe(2)
            expect(rendered.queryAllByText(/Item3-Value\d/).length).toBe(3)
        })

        describe("Select prefered item", ()=>{
            let btnForPrefered
            let btnForOther
            beforeEach(()=>{
                const [rendered] = renderWithProvider(<ComparisionGridPane/>, state)
    
                const preferedTitle = rendered.getByText(Item2.title)
                const otherTitle = rendered.getByText(Item3.title)
    
                btnForPrefered = within(preferedTitle.parentElement).getByTestId('btnCheck')
                btnForOther = within(otherTitle.parentElement).getByTestId('btnCheck')
            })

            afterEach(()=>{
                mockSetPreferedItemTitle.mockClear()
                mockRejectItem.mockClear()
            })
    
            it("Should be able to choose prefered item again as prefered", ()=>{
                global.confirm.mockImplementation(()=>true)
                fireEvent.click(btnForPrefered)
                expect(mockSetPreferedItemTitle).toBeCalledWith(Item2.title)
                expect(mockRejectItem).toBeCalledWith(Item3.title)
            })

            it("Should be able to choose other item as prefered", ()=>{
                global.confirm.mockImplementation(()=>true)
                fireEvent.click(btnForOther)
                expect(mockSetPreferedItemTitle).toBeCalledWith(Item3.title)
                expect(mockRejectItem).toBeCalledWith(Item2.title)
            })

            it("Should be able to cancel selection after clicking item", ()=>{
                global.confirm.mockImplementation(()=>false)
                fireEvent.click(btnForPrefered)
                expect(mockSetPreferedItemTitle).not.toBeCalled()
            })
        })
        
        // Should be able to add comment on the item
        
    })

    
    describe("When prefered item is selected and all comparision finished", ()=>{
        const state = copyBaseState()
        const {Item2, Item3, Item4} = state.items
        state.preferedItemTitle = Item2.title
        Item3.comparisionStatus = COMPARISION_STATUS.ITEM_REJECTED
        Item4.comparisionStatus = COMPARISION_STATUS.ITEM_REJECTED

        beforeEach(()=>{
            mockRemainingItemsSelector.mockImplementation(()=>{
                return []
            }).mockName('emptyRemainingItemsSelector')
        })
        
        it("should show last prefered item as selection", ()=>{
            const [rendered] = renderWithProvider(<ComparisionGridPane/>, state)
            expect(rendered.baseElement).toMatchSnapshot()
        })
    })
        
})