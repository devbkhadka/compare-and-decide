import React from 'react'
import { renderWithProvider } from '../utils/testUtils'
import { loadStateFromStorage } from '../datastore/actions'
import App from '../App'

jest.mock('../datastore/actions')
describe('App', ()=>{
    it('should load state from local storage when rendered', ()=>{
        loadStateFromStorage.mockImplementation(()=>()=>null)
        renderWithProvider(<App/>)
        expect(loadStateFromStorage).toBeCalled()
    })
})