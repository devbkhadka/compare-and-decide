import React from 'react'
import {useDispatch} from 'react-redux'
import {within, fireEvent} from '@testing-library/dom'
import { renderWithProvider } from '../../utils/testUtils'
import ComparisionListPane from '../ComparisionListPane'
import {setPreferedItemTitle as mockSetPreferedItem} from '../../datastore/actions'
import { COMPARISION_STATUS } from '../../datastore/reducer'


jest.mock('../../datastore/actions')

describe('ComparisionListPane Component', ()=>{
    const getStateCopy = () =>{
        const baseState = {
            items: {
                Item1: {
                    title: 'Item1',
                    values: {}
                },
                Item2: {
                    title: 'Item2',
                    values: {}
                },
                Item3: {
                    title: 'Item3',
                    values: {}
                },
                Item4: {
                    title: 'Item4',
                    values: {}
                }
            },
            attributes: ['attr1', 'attr2', 'attr3', 'attr4']
        }

        return JSON.parse(JSON.stringify(baseState))

    }

    
    describe("When prefered item not selected", ()=>{
        beforeEach(()=>{
            jest.restoreAllMocks()
            jest.resetAllMocks()
        })

        it('Should list all items under "Remaining Items" section', ()=>{
            const state = getStateCopy()
            const [rendered] = renderWithProvider(<ComparisionListPane/>, state)

            const sectionRemainingItems = rendered.getByText('Remaining Items')
            for(const key of Object.keys(state.items)) {
                within(sectionRemainingItems.parentElement).getByText(state.items[key].title)
            }

            expect(rendered.queryByText('Prefered Item')).toBeNull()
            expect(rendered.queryByText('Rejected Items')).toBeNull()
        })

        it('Should be able to select one item as prefered item', ()=>{
            const state = getStateCopy()
            const [rendered, store] = renderWithProvider(<ComparisionListPane/>, state)
            
            jest.spyOn(global, "confirm").mockImplementation(()=>true)
            const func = jest.fn()
            mockSetPreferedItem.mockImplementation(()=>func)

            const item3 = rendered.getByText(state.items.Item3.title)
            fireEvent.click(item3)

            expect(mockSetPreferedItem).toBeCalledWith(state.items.Item3.title)
            expect(func.mock.calls[0][0].name).toBe('dispatch')
            expect(func.mock.calls[0][1].name).toBe('getState')
            
        })

        it('should not select prefered item if user cancels the conformation', ()=>{
            const state = getStateCopy()
            const [rendered, store] = renderWithProvider(<ComparisionListPane/>, state)
            
            jest.spyOn(global, "confirm").mockImplementation(()=>false)
            mockSetPreferedItem.mockImplementation(()=>()=>null)

            const item2 = rendered.getByText(state.items.Item2.title)
            fireEvent.click(item2)

            expect(mockSetPreferedItem).not.toBeCalled()
            mockSetPreferedItem.mockRestore()
            
        })

    })

    describe('When prefered item is selected', ()=>{
        const state = getStateCopy()
        beforeEach(()=>{
            const preferedItem = state.items['Item1']
            preferedItem.comparisionStatus = COMPARISION_STATUS.ITEM_PREFERED
            state.preferedItemTitle = preferedItem.title
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
            jest.spyOn(global, "confirm").mockImplementation(()=>true)
            mockSetPreferedItem.mockImplementation(()=>()=>null)

            const item2 = rendered.getByText(state.items.Item2.title)
            fireEvent.click(item2)

            expect(mockSetPreferedItem).not.toBeCalled()
            mockSetPreferedItem.mockRestore()
        })
     
    })
        


    describe('When comparison is in progress', ()=>{
        let state
        beforeEach(()=>{
            state = getStateCopy()
            state.items.Item2.comparisionStatus = COMPARISION_STATUS.ITEM_REJECTED
            state.items.Item4.comparisionStatus = COMPARISION_STATUS.ITEM_REJECTED
            state.preferedItemTitle = state.items.Item3.title
            state.items.Item3.comparisionStatus = COMPARISION_STATUS.ITEM_PREFERED
        })
        it('Should show comparired items under "Rejected Items"', ()=>{
            const [rendered] = renderWithProvider(<ComparisionListPane/>, state)
            
            const section1 = rendered.getByText('Prefered Item').parentElement
            const section2 = rendered.getByText('Remaining Items').parentElement
            const section3 = rendered.getByText('Rejected Items').parentElement

            
            within(section1).getByText(state.preferedItemTitle)
            within(section2).getByText(state.items.Item1.title)
            expect(within(section3).getAllByText(/Item\d/).length).toBe(2)
        })
        
    })
})