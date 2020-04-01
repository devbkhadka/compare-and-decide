import React from 'react'
import { renderWithProvider } from './utils'
import { fireEvent } from '@testing-library/react'
import { addItemWithTitle } from '../../datastore/actions'
import ItemListPane from '../ItemListPane'

const render = (component, state={items:[]})=> renderWithProvider(component, state)

describe("ItemListPane Test", ()=>{
    it('should dispatch addItemWithTitle action when add button clicked', async ()=>{
        const [rendered, store] = render(<ItemListPane></ItemListPane>)

        const input = rendered.getByPlaceholderText('Add New Item')
        const addButton = rendered.getByTestId('btnAdd')
        
        fireEvent.change(input, {target:{value: 'Item 1'}})
        fireEvent.click(addButton)

        fireEvent.change(input,  {target:{value: 'Item 2'}})
        fireEvent.click(addButton)

        expect(store.getActions()).toEqual([addItemWithTitle('Item 1'), addItemWithTitle('Item 2')])
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
        const [rendered] = render(<ItemListPane onItemSelected={mockOnItemSelected}/>, {items})
        
        expect(mockOnItemSelected).toBeCalledWith({title: 'Item1'})
    })
})