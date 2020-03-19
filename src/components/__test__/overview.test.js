import React from 'react'
import { render } from '@testing-library/react'

import Overview from '../overview'

describe("Test Overview Component", ()=>{
    it('Should render the content correctly', ()=> {
        const overview = render(<Overview></Overview>).baseElement

        expect(overview).toMatchSnapshot()
    })
}) 