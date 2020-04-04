import React from 'react'
import { fireEvent, waitForElement } from '@testing-library/react'

import CustomAppBar from '../CustomAppBar'
import { renderWithProvider as render } from '../../utils/testUtils'
import { updateLanguage } from '../../datastore/actions'


describe("CustomAppBar Component Test", ()=>{
    it('should have title text', ()=>{
        const [appBar] = render(<CustomAppBar></CustomAppBar>, {language: 'en'})
        appBar.getByText('Compare And Decide')
    })

    it('should dispatch updateLanguage action when language is selected', async ()=>{
        const [rendered, store] = render(<CustomAppBar></CustomAppBar>, {language: 'en'})
        const select = rendered.getByText('EN')
        fireEvent.mouseDown(select)
        const np =  await waitForElement(()=>rendered.getByText('NP'))
        fireEvent.click(np)

        const actions = store.getActions()
        expect(actions).toEqual([updateLanguage('np')])
    })

})