import React from 'react'
import { renderWithProvider } from './utils'
import { fireEvent, waitForElement } from '@testing-library/react'
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
})