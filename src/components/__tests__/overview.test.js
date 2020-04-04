import React from 'react'
import { renderWithIntl as render } from '../../utils/testUtils'

import Overview from '../overview'

describe("Test Overview Component", ()=>{
    it('Should render the content correctly', ()=> {
        const overview = render(<Overview></Overview>).baseElement

        expect(overview).toMatchSnapshot()
    })
}) 