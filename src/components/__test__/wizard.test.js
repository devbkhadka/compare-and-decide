import React from 'react'
import ReactDOM from 'react-dom'
import { render, fireEvent } from '@testing-library/react'

import TabbedWizard from '../wizard'
import TabPanel from '../tab_panel'

describe("Test Wizard Component", ()=>{
    it("should render tabs correctly", ()=> {
        const wizard = render(<TabbedWizard tabs={['tab1', 'tab2']}></TabbedWizard>)
        
        wizard.getByText('tab1')
        wizard.getByText('tab2')
    })

    it("should show first panel when rendered", ()=> {
        const wizard = render(
            <TabbedWizard tabs={['tab1', 'tab2']}>
                <TabPanel>Tab1 content</TabPanel>
                <TabPanel>Tab2 content</TabPanel>
            </TabbedWizard>
        )

        wizard.getByText('Tab1 content')

        expect(wizard.queryByText('Tab2 content')).toBe(null)
    })

    it("clicking on tab should change the tap", ()=> {
        const wizard = render(
            <TabbedWizard tabs={['tab1', 'tab2']}>
                <TabPanel>Tab1 content</TabPanel>
                <TabPanel>Tab2 content</TabPanel>
            </TabbedWizard>
        )

        fireEvent.click(wizard.getByTestId('tab-1'))

        wizard.getByText('Tab2 content')
        
    })

    test('Wizard snapshot is not changed', ()=>{
        const wizard = render(
            <TabbedWizard tabs={['tab1', 'tab2']}>
                <TabPanel>Tab1 content</TabPanel>
                <TabPanel>Tab2 content</TabPanel>
            </TabbedWizard>
        )

        expect(wizard.baseElement).toMatchSnapshot()
    })

})

