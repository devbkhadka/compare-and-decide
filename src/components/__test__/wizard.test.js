import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import TabbedWizard from '../wizard'

describe("Test Wizard Component", ()=>{
    it("should render tabs correctly", ()=> {
        const wizard = render(<TabbedWizard tabs={['tab1', 'tab2']}></TabbedWizard>)
        
        wizard.getByText('tab1')
        wizard.getByText('tab2')
    })

    it("should show first panel when rendered", ()=> {
        const wizard = render(
            <TabbedWizard tabs={['tab1', 'tab2']}>
                <div>Tab1 content</div>
                <div>Tab2 content</div>
            </TabbedWizard>
        )

        wizard.getByText('Tab1 content')

        expect(wizard.queryByText('Tab2 content')).toBe(null)
    })

    it("clicking on tab should change the tab", ()=> {
        const wizard = render(
            <TabbedWizard tabs={['tab1', 'tab2']}>
                <div>Tab1 content</div>
                <div>Tab2 content</div>
            </TabbedWizard>
        )

        fireEvent.click(wizard.getByTestId('tab-1'))

        wizard.getByText('Tab2 content')
        
    })

    test('Wizard snapshot is not changed', ()=>{
        const wizard = render(
            <TabbedWizard tabs={['tab1', 'tab2']}>
                <div>Tab1 content</div>
                <div>Tab2 content</div>
            </TabbedWizard>
        )

        expect(wizard.baseElement).toMatchSnapshot()
    })

})

