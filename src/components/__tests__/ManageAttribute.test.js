import React from 'react'
import { renderWithProvider } from '../../utils/testUtils'
import { fireEvent } from '@testing-library/react'
import { 
    addAttribute as mockAddAttribute, 
    deleteAttribute as mockDeleteAttribute
} from '../../datastore/actions'
import ManageAttributes from '../ManageAttributes'
import MockConfirmDialog from '../shared/ConfirmDialog'
import { act } from 'react-dom/test-utils'
import * as ReactRedux from 'react-redux'

jest.mock('../../datastore/actions')

jest.mock('../shared/ConfirmDialog')
MockConfirmDialog.mockImplementation(()=>null)

const dispatch = jest.fn()
jest.spyOn(ReactRedux, 'useDispatch')
ReactRedux.useDispatch.mockImplementation(()=>dispatch)

const render = (component, state={attributes: []})=> renderWithProvider(component, state)

describe("ManageAttribute", ()=>{
    
    it('should not display content when "false" passed in "open" prop', ()=>{
        const [ rendered ] = render(<ManageAttributes open={false} />)
        expect(rendered.baseElement.text).toBe("")
    })

    it('should dispatch addAttribute action when add button clicked', ()=>{
        const [ rendered ] = render(<ManageAttributes open={true} onClose={()=>null}/>)
        const input = rendered.getByPlaceholderText('add new attribute')
        const addButton = rendered.getByTestId('btnAdd')

        fireEvent.change(input, {target:{value:'Name'}})
        fireEvent.click(addButton)

        
        expect(mockAddAttribute).toBeCalledWith('Name')
        expect(dispatch).toBeCalledWith(mockAddAttribute())
    })

    it('clicking outside the dialog should fire onClose event',  ()=>{
        const mockOnClose = jest.fn()
        render(<ManageAttributes open={true} onClose={mockOnClose}/>)
        
        fireEvent.keyDown(document.activeElement, { key: 'Esc' })
        expect(mockOnClose).toBeCalled()
        
    })

    it('should list attributes for state', ()=>{
        const attrs = ['attr1', 'attr2', 'attr3', 'attr4']
        const [{getAllByText}] = render(<ManageAttributes open={true} />, {attributes: attrs})

        expect(getAllByText(/attr\d/).length).toBe(4)
    })


    describe('When Confirm Dialog Opened', ()=>{
        beforeEach(()=>{
            const attrs = ['attr1', 'attr2', 'attr3', 'attr4']
            const [{baseElement}] = render(<ManageAttributes open={true} />, {attributes: attrs})
            MockConfirmDialog.mockClear()
            fireEvent.click(baseElement.querySelectorAll('li>button')[2])
            mockDeleteAttribute.mockClear()
            dispatch.mockClear()
        })
        it('should open dialog to confirm delete when delete button clicked', ()=>{
            expect(MockConfirmDialog).toBeCalled()
        })
    
        it('should dispatch deleteAttribute function when confirmed yes', ()=>{
            const {data, onConfirmed} = MockConfirmDialog.mock.calls[0][0]
            act(
                ()=>onConfirmed(true, data)
            )
            
            expect(mockDeleteAttribute).toBeCalledWith('attr3')
            expect(dispatch).toBeCalledWith(mockDeleteAttribute())
        })
    
        it('should not dispatch deleteAttribute function when canceled', ()=>{
            const {data, onConfirmed} = MockConfirmDialog.mock.calls[0][0]
            act(
                ()=>onConfirmed(false, data)
            )
            expect(mockDeleteAttribute).not.toBeCalled()
        })
    })
    
})