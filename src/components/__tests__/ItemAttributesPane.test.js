import React from 'react'
import { renderWithProvider } from '../../utils/testUtils'
import { fireEvent } from '@testing-library/react'
import { 
    updateItemAttributeValue as mockUpdateItemAttributeValue
} from '../../datastore/actions'
import ItemAttributesPane from '../ItemAttributesPane'

jest.mock('../../datastore/actions')
mockUpdateItemAttributeValue.mockImplementation(()=>()=>null)


const render = (component, state={attributes: []})=> renderWithProvider(component, state)
describe("ItemAttributesPane Test", ()=>{
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
        
        expect(mockUpdateItemAttributeValue).
            toBeCalledWith(initialState.items['Item 2'], 'attr 3', 'fake attr value')

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