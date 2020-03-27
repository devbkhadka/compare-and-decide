import reducer from '../reducer'
import { addItemWithTitle, updateLanguage, addAttribute } from '../actions'

describe('Test reducer', ()=>{
    it('should return empty items initially', ()=>{
        const initialState = reducer(undefined, {})
        expect(initialState.items).toEqual([])
    })

    it('should handle adding item with title', ()=>{
        let state = reducer(undefined, {})
        state = reducer(state, addItemWithTitle('Test title 1'))
        state = reducer(state, addItemWithTitle('Test title 2'))
        
        const expectedState = {
            items: ['Test title 1', 'Test title 2']
        }
        expect(state.items).toEqual(expectedState.items)
    })

    it('should handle change language request', ()=>{
        let state = reducer(undefined, {})
        state = reducer(state, updateLanguage('np'))
        expect(state.language).toBe('np')
    })

    it('should return en as default language initially', ()=>{
        let state = reducer(undefined, {})
        expect(state.language).toBe('en')
    })

    it('should return empty array for attributes initially', ()=>{
        let state = reducer(undefined, {})
        expect(state.attributes).toEqual([])
    })

    it('should handle addAttributes request', ()=>{
        let state = reducer(undefined, {})
        state = reducer(state, addAttribute('Name'))
        state = reducer(state, addAttribute('Age'))

        expect(state.attributes).toEqual(['Name', 'Age'])

    })
})