import React from 'react'
import {within, fireEvent} from '@testing-library/dom'
import * as ReactRedux from 'react-redux'
import { renderWithProvider } from '../../utils/testUtils'
import ComparisionListPane from '../ComparisionListPane'
import {
    setPreferedItemTitle as mockSetPreferedItem,
    clearComparisionStatus as mockClearComparisionStatus
} from '../../datastore/actions'
import { COMPARISION_STATUS } from '../../datastore/reducer'
import * as fixtures from '../../utils/fixtures'


jest.mock('../../datastore/actions')
jest.spyOn(ReactRedux, 'useDispatch')
ReactRedux.useDispatch.mockReturnValue(jest.fn())
mockSetPreferedItem.mockReturnValue(jest.fn())
mockClearComparisionStatus.mockReturnValue(jest.fn())

describe('ComparisionListPane Component', ()=>{
    
    describe("When prefered item not selected", ()=>{
        beforeEach(()=>{
            ReactRedux.useDispatch.mockClear()
            mockSetPreferedItem.mockClear()
        })

        it('Should list all items under "Remaining Items" section', ()=>{
            const state = fixtures.getDummyState()
            const [rendered] = renderWithProvider(<ComparisionListPane/>, state)

            const sectionRemainingItems = rendered.getByText('Remaining Items')
            for(const key of Object.keys(state.items)) {
                within(sectionRemainingItems.parentElement).getByText(state.items[key].title)
            }

            expect(rendered.queryByText('Prefered Item')).toBeNull()
            expect(rendered.queryByText('Rejected Items')).toBeNull()
        })

        it('Should be able to select one item as prefered item', ()=>{
            const state = fixtures.getDummyState()
            const [rendered, store] = renderWithProvider(<ComparisionListPane/>, state)
            
            const item3 = rendered.getByText(state.items.Item3.title)
            fireEvent.click(item3)

            expect(mockSetPreferedItem).toBeCalledWith(state.items.Item3.title)
            expect(ReactRedux.useDispatch()).toBeCalledWith(mockSetPreferedItem())
            
        })

    })

    describe('When prefered item is selected', ()=>{
        const state = fixtures.getDummyState()
        beforeEach(()=>{
            const preferedItem = state.items['Item1']
            preferedItem.comparisionStatus = COMPARISION_STATUS.ITEM_PREFERED
            state.preferedItemTitle = preferedItem.title
            mockSetPreferedItem.mockClear()
        })

        it('Should show prefered item under section "Prefered Item"', ()=>{
            const [rendered] = renderWithProvider(<ComparisionListPane/>, state)

            const elmPreferedItem = rendered.getByText('Prefered Item')
            within(elmPreferedItem.parentElement).getByText(state.preferedItemTitle)

        })

        it('Should show remaining items under "Remaining Items" section', ()=>{
            const [rendered] = renderWithProvider(<ComparisionListPane/>, state)
            const sectionRemainingItems = rendered.getByText('Remaining Items')
            const remainingItems = within(sectionRemainingItems.parentElement).getAllByText(/Item\d/)
            expect(remainingItems.length).toBe(3)
        })

        it('Should not be able to select new prefered item', ()=>{
            const [rendered] = renderWithProvider(<ComparisionListPane/>, state)
            mockSetPreferedItem.mockImplementation(()=>()=>null)

            const item2 = rendered.getByText(state.items.Item2.title)
            fireEvent.click(item2)

            expect(mockSetPreferedItem).not.toBeCalled()
            mockSetPreferedItem.mockRestore()
        })
     
    })
        


    describe('When comparison is in progress', ()=>{
        let state, sectionPrefered, sectionRemaining, sectionRejected
        beforeEach(()=>{
            state = fixtures.getDummyState()
            state.items.Item2.comparisionStatus = COMPARISION_STATUS.ITEM_REJECTED
            state.items.Item4.comparisionStatus = COMPARISION_STATUS.ITEM_REJECTED
            state.preferedItemTitle = state.items.Item3.title
            state.items.Item3.comparisionStatus = COMPARISION_STATUS.ITEM_PREFERED

            const [rendered] = renderWithProvider(<ComparisionListPane/>, state)
            
            sectionPrefered = rendered.getByText('Prefered Item').parentElement
            sectionRemaining = rendered.getByText('Remaining Items').parentElement
            sectionRejected = rendered.getByText('Rejected Items').parentElement

            ReactRedux.useDispatch().mockClear()
        })
        it('Should show compaired items under "Rejected Items"', ()=>{  
            within(sectionPrefered).getByText(state.preferedItemTitle)
            within(sectionRemaining).getByText(state.items.Item1.title)
            expect(within(sectionRejected).getAllByText(/Item\d/).length).toBe(2)
        })

        it('should be able to clear comparision status of rejected item', ()=>{
            const elemItem4 = within(sectionRejected).getByText(state.items.Item4.title)
            fireEvent.click(elemItem4.querySelector('svg'))

            expect(mockClearComparisionStatus).toBeCalledWith(state.items.Item4.title)
            expect(ReactRedux.useDispatch()).
                toBeCalledWith(mockClearComparisionStatus(state.items.Item4.title))
        })

        it('should be able to clear comparision status of prefered item', ()=>{
            const elemItem3 = within(sectionPrefered).getByText(state.items.Item3.title)
            fireEvent.click(elemItem3.querySelector('svg'))

            expect(mockClearComparisionStatus).toBeCalledWith(state.items.Item3.title)
            expect(ReactRedux.useDispatch()).
                toBeCalledWith(mockClearComparisionStatus(state.items.Item3.title))
        })
        
    })
})