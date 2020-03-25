import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import TabbedWizard from '../wizard'

describe("Test Wizard Component", ()=>{
    const wizardWithContent = <TabbedWizard tabs={['tab1', 'tab2']}>
                                <div>Tab1 content</div>
                                <div>Tab2 content</div>
                            </TabbedWizard>
    it("should render tabs correctly", ()=> {
        const wizard = render(<TabbedWizard tabs={['tab1', 'tab2']}></TabbedWizard>)
        
        wizard.getByText('tab1')
        wizard.getByText('tab2')
    })

    it("should show first panel when rendered", ()=> {
        const wizard = render(wizardWithContent)

        wizard.getByText('Tab1 content')

        expect(wizard.queryByText('Tab2 content')).toBe(null)
    })

    test("clicking on tab should change the tab", ()=> {
        const wizard = render(wizardWithContent)

        fireEvent.click(wizard.getByTestId('tab-1'))

        wizard.getByText('Tab2 content')

        expect(wizard.queryByText('Tab1 content')).toBe(null)
        
    })

    test("clicking next buttion takes to next tab", () => {
        const wizard = render(wizardWithContent)

        const nextButton = wizard.getByTestId('next')

        fireEvent.click(nextButton)
        wizard.getByText('Tab2 content')

        // clicking again at last step will not change tab
        fireEvent.click(nextButton)
        wizard.getByText('Tab2 content')
    })

    test("clicking prev buttion takes to previous tab", () => {
        const wizard = render(wizardWithContent)

        fireEvent.click(wizard.getByTestId('tab-1'))
        const prevButton = wizard.getByTestId('prev')

        fireEvent.click(prevButton)
        wizard.getByText('Tab1 content')

        // clicking again at 1st step will not change tab
        fireEvent.click(prevButton)
        wizard.getByText('Tab1 content')
    })

    test('Wizard snapshot is not changed', ()=>{
        const wizard = render(wizardWithContent)

        expect(wizard.baseElement).toMatchSnapshot()
    })

})
