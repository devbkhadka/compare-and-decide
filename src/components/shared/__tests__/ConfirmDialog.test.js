import React from 'react'
import { fireEvent } from '@testing-library/react'
import {renderWithIntl as render} from '../../../utils/testUtils'
import ConfirmDialog from '../ConfirmDialog'

describe('ConfrimDialog', ()=>{
    it('should not open when data is null', ()=>{
        const {baseElement} = render(<ConfirmDialog title='dummy title' 
            message='dummy message' data={null}/>)
        expect(baseElement.text).toBe('')
    })

    it('should display title and message', ()=>{
        const {queryByText} = render(<ConfirmDialog title='dummy title' 
            message='dummy message' data={{}}/>)
        expect(queryByText('dummy title')).not.toBeNull()
        expect(queryByText('dummy message')).not.toBeNull()
    })

    it('should call onConfirmed with "true, data" as parameter when Yes clicked', ()=>{
        const onConfirmed = jest.fn()
        const {getByText} = render(<ConfirmDialog title='dummy title' 
            message='dummy message' data='dummy data' onConfirmed={onConfirmed}/>)
        
        fireEvent.click(getByText('Yes'))
        expect(onConfirmed).toBeCalledWith(true, 'dummy data')
    })

    it('should call onConfirmed with "false, data" as parameter when Cancel clicked', ()=>{
        const onConfirmed = jest.fn()
        const {getByText} = render(<ConfirmDialog title='dummy title' 
            message='dummy message' data='dummy data' onConfirmed={onConfirmed}/>)
        
        fireEvent.click(getByText('Cancel'))
        expect(onConfirmed).toBeCalledWith(false, 'dummy data')
    })
})