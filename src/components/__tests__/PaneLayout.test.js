import React from 'react'
import {render} from '@testing-library/react'
import PaneLayout from '../PaneLayout'

console.error = jest.fn()
describe('PaneLayout', ()=>{
    it('should raise error if number of children is not exactly two', ()=>{
        expect(()=>render(<PaneLayout></PaneLayout>)).toThrowErrorMatchingSnapshot()
        expect(()=>render(<PaneLayout><div></div></PaneLayout>)).toThrowErrorMatchingSnapshot()
        expect(()=>render(<PaneLayout>
                            <div></div>
                            <div></div>
                            <div></div>
                        </PaneLayout>)).toThrowErrorMatchingSnapshot()
    })

    it('should render children to left and right pane', ()=>{
        const rendered = render(
        <PaneLayout>
            <div>I am left pane</div>
            <div>I am right pane</div>
        </PaneLayout>)

        const leftPane = rendered.getByText('I am left pane')
        const rightPane = rendered.getByText('I am right pane')

        expect(leftPane.parentElement['className']).toContain('leftPanel')
        expect(rightPane.parentElement['className']).toContain('rightPanel')
    })

    test('snapshot is matching', ()=>{
        const rendered = render(
            <PaneLayout>
                <div>I am left pane</div>
                <div>I am right pane</div>
            </PaneLayout>)
        expect(rendered.baseElement).toMatchSnapshot()
    })

    
})