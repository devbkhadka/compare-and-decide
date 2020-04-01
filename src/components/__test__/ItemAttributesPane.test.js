import React from 'react'
import { renderWithProvider } from './utils'
import { fireEvent } from '@testing-library/react'
import { addAttribute, updateItemAttributeValue, addItemWithTitle } from '../../datastore/actions'
import ItemAttributesPane from '../ItemAttributesPane'

const render = (component, state={attributes: []})=> renderWithProvider(component, state)
describe("ItemAttributesPane Test", ()=>{
    it('should dispatch addAttribute action when add button clicked', ()=>{
        const [rendered, store] = render(<ItemAttributesPane item='Mock Item'></ItemAttributesPane>)

        const input = rendered.getByPlaceholderText('add new attribute')
        const addButton = rendered.getByTestId('btnAdd')

        fireEvent.change(input, {target:{value:'Name'}})
        fireEvent.click(addButton)

        fireEvent.change(input, {target:{value:'Age'}})
        fireEvent.click(addButton)

        expect(store.getActions()).toEqual([addAttribute('Name'), addAttribute('Age')])
    })

    it('should display title of item passed to it', ()=>{
        const [rendered] = render(<ItemAttributesPane item={{title: 'Mock Item'}}></ItemAttributesPane>)

        rendered.getByText('Mock Item')
    })

    it('should dispatch updateItemAttributeValue when attribute textfield changed', ()=>{
        const initialState = {
            items: {
                'Item 1': {title: 'Item 1', values: {}}, 
                'Item 2': {title: 'Item 2', values:{}}
            },
            attributes: ['attr 1', 'attr 2', 'attr 3']
        }
        const [rendered, store] = render(<ItemAttributesPane 
            item={initialState.items['Item 2']}/>, initialState)
        const input = rendered.getByTestId('attr-2')
        fireEvent.change(input, {target: {value: 'fake attr value'}})
        const [action] = store.getActions()
        expect(action).toEqual(
            updateItemAttributeValue(initialState.items['Item 2'], 'attr 3', 'fake attr value')
        )
    })

    it('should load attribute values to the text fields', ()=>{
        const initialState = {
            items: {
                'Item 1': {
                    title: 'Item 1', 
                    values: {
                        'attr 2': 'value 1',
                        'attr 3': 'value 2'
                    }
                }
            },
            attributes: ['attr 1', 'attr 2', 'attr 3'],

        }

        const [rendered, store] = render(<ItemAttributesPane 
            item={initialState.items['Item 1']}/>, initialState)
        const inp1 = rendered.getByTestId('attr-0')
        const inp2 = rendered.getByTestId('attr-1')
        const inp3 = rendered.getByTestId('attr-2')
        
        expect(inp1.value).toBe('')
        expect(inp2.value).toBe('value 1')
        expect(inp3.value).toBe('value 2')
    })
})