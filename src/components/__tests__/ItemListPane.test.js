import React from 'react'
import { fireEvent, act } from '@testing-library/react'
import * as ReactRedux from 'react-redux'
import { renderWithProvider } from '../../utils/testUtils'
import { addItemWithTitle as mockAddItemWithTitle, deleteItem } from '../../datastore/actions'
import ItemListPane from '../ItemListPane'
import * as fixtures from '../../utils/fixtures'
import ConfirmDialog from '../shared/ConfirmDialog'

const render = (component, state={items:{}})=> renderWithProvider(component, state)

jest.mock('../../datastore/actions')
const mockDispatch = jest.fn()
jest.spyOn(ReactRedux, 'useDispatch')
ReactRedux.useDispatch.mockImplementation(()=>mockDispatch)
jest.mock('../shared/ConfirmDialog')
ConfirmDialog.mockImplementation(()=>null)

describe("ItemListPane Test", ()=>{
    beforeEach(()=>{
        mockDispatch.mockClear()
    })
    it('should dispatch addItemWithTitle action when add button clicked', async ()=>{
        const [rendered] = render(<ItemListPane></ItemListPane>)

        const input = rendered.getByPlaceholderText('add new items')
        const addButton = rendered.getByTestId('btnAdd')
        
        fireEvent.change(input, {target:{value: 'Item 1'}})
        fireEvent.click(addButton)

        expect(mockAddItemWithTitle).toBeCalledWith('Item 1')
        expect(mockDispatch).toBeCalledWith(mockAddItemWithTitle())
    })

    it('should match saved snapshot', ()=>{
        const [rendered] = render(<ItemListPane></ItemListPane>)
        expect(rendered.baseElement).toMatchSnapshot()
    })

    it('should render items from redux store', ()=>{
        const items = {
            ['item1']: { 
                title: 'Item1',
            }, 
            ['item2']: {
                title: 'Item2',
            }
        }
        const [rendered] = render(<ItemListPane></ItemListPane>, {items})

        rendered.getByText('Item1')
        rendered.getByText('Item2')
    })

    it('should trigger onItemSelected event when a item is clicked', ()=>{
        const items = {
            ['item1']: { 
                title: 'Item1',
            }, 
            ['item2']: {
                title: 'Item2',
            }
        }
        const mockOnItemSelected = jest.fn()
        const [rendered] = render(<ItemListPane onItemSelected={mockOnItemSelected}/>, {items})
        fireEvent.click(rendered.getByText('Item2'))

        expect(mockOnItemSelected).toBeCalledWith(items['item2'])
    })

    it('should trigger onItemSelected for 1st item when only one item exists', async ()=>{
        const mockOnItemSelected = jest.fn()
        const items = {
            ['item1']: { 
                title: 'Item1',
            }
        }
        render(<ItemListPane onItemSelected={mockOnItemSelected}/>, {items})
        
        expect(mockOnItemSelected).toBeCalledWith({title: 'Item1'})
    })

    describe('Item Deletion', ()=>{
        beforeEach(()=>{
            const items = fixtures.getDummyItems()
            const [{getByText}] = render(<ItemListPane />, {items})
    
            ConfirmDialog.mockClear()
            const elemItem2 = getByText('Item2')
            const btnDelete = elemItem2.querySelector('svg')
            deleteItem.mockClear()
            mockDispatch.mockClear()
            fireEvent.click(btnDelete)
        })
        it('should open confirm dialog when delete icon clicked', ()=>{
            const {data} = ConfirmDialog.mock.calls[0][0]
            expect(data).toBe('Item2')
        })
    
        it('should dispatch deleteItem action if confirmed', ()=>{
            const {onConfirmed, data} = ConfirmDialog.mock.calls[0][0]
            act(()=>onConfirmed(true, data))
            expect(deleteItem).toBeCalledWith('Item2')
            expect(mockDispatch).toBeCalledWith(deleteItem())
        })

        it('should not dispatch deleteItem action if canceled', ()=>{
            const {onConfirmed, data} = ConfirmDialog.mock.calls[0][0]
            act(()=>onConfirmed(false, data))
            expect(mockDispatch).not.toBeCalled()
        })
    })
    
})