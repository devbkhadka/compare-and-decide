import React from 'react'
import Dashboard from '../Dashboard'

import { renderWithIntl as render } from '../../utils/testUtils'

describe('Dashboard Component Test', ()=>{
    it('should pass steps to tabs property of TabbedWizard', ()=>{

        const rendered = render(<Dashboard></Dashboard>)

        rendered.getByText('Overview >>')
        rendered.getByText('Add Items Pane >>')
        rendered.getByText('Add Items Grid >>')
        
        // should have rendered first tab overview
        rendered.getByTestId('overview')
        
    }) 
})