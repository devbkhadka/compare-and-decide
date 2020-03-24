import reducer from '../reducer'
import { addItemWithTitle } from '../actions'

describe('Test reducer', ()=>{
    it('should return initial state when no state passed', ()=>{
        const initialState = reducer(undefined, {})
        expect(initialState).toEqual({
            items: []
        })
    })

    it('should handle adding item with title', ()=>{
        let state = reducer(undefined, {})
        state = reducer(state, addItemWithTitle('Test title 1'))
        state = reducer(state, addItemWithTitle('Test title 2'))
        
        const expectedState = {
            items: ['Test title 1', 'Test title 2']
        }
        expect(state).toEqual(expectedState)
    })
})