import React from 'react'
import { renderWithProvider } from '../../utils/testUtils'

import AddItemsPane from '../AddItemsPane'
import ItemListPane from '../ItemListPane'
import ItemAttributesPane from '../ItemAttributesPane'
import { act } from 'react-dom/test-utils'

jest.mock('../ItemListPane')
jest.mock('../ItemAttributesPane')


const receiveItemListPaneProps = jest.fn()
const receiveItemAttributesPaneProps = jest.fn()
ItemListPane.mockImplementation(({onItemSelected})=>{
    receiveItemListPaneProps(onItemSelected)
    return null
})

ItemAttributesPane.mockImplementation(({item})=>{
    receiveItemAttributesPaneProps(item)
    return null
})

const state = {
    items: {
        Item1: {
            title: 'Item1'
        },
        Item2: {
            title: 'Item2'
        }
    }
}

describe('Test AddItem Component', ()=>{
    beforeEach(()=>{
        receiveItemListPaneProps.mockReset()
        receiveItemAttributesPaneProps.mockReset()
    })
    it('should render ItemListPane and ItemAttributesPane', ()=>{
        renderWithProvider(<AddItemsPane/>, state)

        expect(receiveItemListPaneProps).toBeCalled()
        expect(receiveItemAttributesPaneProps).toBeCalledWith(null)
    })  

    it('should re-render when onItemSelected event is fired', ()=>{
        renderWithProvider(<AddItemsPane/>, state)

        const onItemSelected = receiveItemListPaneProps.mock.calls[0][0]
        act(()=>{
            onItemSelected(state.items.Item2)
        })
        expect(receiveItemAttributesPaneProps).toBeCalledWith(state.items.Item2)
    })
})