import React from 'react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import { fireEvent, waitForElement } from '@testing-library/react'

import CustomAppBar from '../CustomAppBar'
import { renderWithIntl as render } from './utils'
import { updateLanguage } from '../../datastore/actions'

const mockStore = configureMockStore([])

describe("CustomAppBar Component Test", ()=>{
    it('should have title text', ()=>{
        const store = mockStore({language: 'en'})
        const appBar = render(<Provider store={store}><CustomAppBar></CustomAppBar></Provider>)
        appBar.getByText('Compare And Decide')
    })

    it('should dispatch updateLanguage action when language is selected', async ()=>{
        const store = mockStore({language: 'en'})
        const rendered = render(<Provider store={store}><CustomAppBar></CustomAppBar></Provider>)
        const select = rendered.getByText('EN')
        fireEvent.mouseDown(select)
        const np =  await waitForElement(()=>rendered.getByText('NP'))
        fireEvent.click(np)

        const actions = store.getActions()
        expect(actions).toEqual([updateLanguage('np')])
    })

})