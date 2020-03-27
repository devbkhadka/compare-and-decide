import React from 'react'
import { renderWithProvider } from './utils'
import { fireEvent } from '@testing-library/react'
import { addAttribute } from '../../datastore/actions'
import ItemAttributesPane from '../ItemAttributesPane'

const render = (component, state={attributes: []})=> renderWithProvider(component, state)
describe("ItemAttributesPane Test", ()=>{
    it('should dispatch addAttribute action when add button clicked', ()=>{
        const [rendered, store] = render(<ItemAttributesPane item='Mock Item'></ItemAttributesPane>)

        const input = rendered.getByPlaceholderText('Add New Attribute')
        const addButton = rendered.getByTestId('btnAdd')

        fireEvent.change(input, {target:{value:'Name'}})
        fireEvent.click(addButton)

        fireEvent.change(input, {target:{value:'Age'}})
        fireEvent.click(addButton)

        expect(store.getActions()).toEqual([addAttribute('Name'), addAttribute('Age')])
    })
})