import React from 'react'
import {render} from '@testing-library/react'

import MockPaneLayout from '../PaneLayout'
import Compare from '../Compare'
import ComparisionListPane from '../ComparisionListPane'
import ComparisionGridPane from '../ComparisionGridPane'
const PaneLayout = jest.requireActual('../PaneLayout')

jest.mock('../PaneLayout')
MockPaneLayout.mockImplementation(()=>null)
describe('Compare Component', ()=>{
    it('should render PaneLayout component with ComparisionListPane and ComparisionGridPane', ()=>{
        render(<Compare></Compare>)
        expect(MockPaneLayout).toBeCalled()
        
        const [listPane, gridPane] = MockPaneLayout.mock.calls[0][0].children
        
        expect(listPane.type).toBe(ComparisionListPane)
        expect(gridPane.type).toBe(ComparisionGridPane)
    })

})