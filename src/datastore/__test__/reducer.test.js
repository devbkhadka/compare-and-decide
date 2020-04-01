import reducer from '../reducer'
import { addItemWithTitle, updateLanguage, addAttribute, updateItemAttributeValue} from '../actions'

describe('Reducer', ()=>{
    describe('Operations on Items', ()=>{
        it('should return empty items initially', ()=>{
            const initialState = reducer(undefined, {})
            expect(initialState.items).toEqual([])
        })
    
        it('should handle adding item with title', ()=>{
            let state = reducer(undefined, {})
            state = reducer(state, addItemWithTitle('Test title 1'))
            state = reducer(state, addItemWithTitle('Test title 2'))
            
            const expectedState = {
                items: {
                    ['Test title 1']: {title: 'Test title 1', values: {}}, 
                    ['Test title 2']: {title: 'Test title 2', values: {}}
                }
            }
            expect(state.items).toEqual(expectedState.items)
        })

        it('should not change state if duplicate title given', ()=>{
            const state = {
                items: {
                    ['Test title 1']: {
                        title: 'Test title 1'
                    },
                    ['Test title 2']: {
                        title: 'Test title 2'
                    }
                }
            }

            const newState = reducer(state, addItemWithTitle('Test title 1'))
            expect(newState).toBe(state)
        })
    })

    describe('Operations on Langauge', ()=>{
        it('should handle change language request', ()=>{
            let state = reducer(undefined, {})
            state = reducer(state, updateLanguage('np'))
            expect(state.language).toBe('np')
        })
    
        it('should return en as default language initially', ()=>{
            let state = reducer(undefined, {})
            expect(state.language).toBe('en')
        })
    })
    

    describe('Operations on Attributes', ()=>{
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

    describe('Operations on Item Attribute Values', ()=>{
        it('should set given value to given item attribute', ()=>{
            const state = {
                items: {
                    'Item 1':{title: 'Item 1', values: {}}, 
                    'Item 2': {title: 'Item 2', values: {}}, 
                    'Item 3': {title: 'Item 3', values: {}}
                }
            }
            const newState = reducer(state, updateItemAttributeValue(state.items['Item 1'], 'Fake Attribute', 'Fake Value'))
            state.items['Item 1'].values['Fake Attribute'] = 'Fake Value'

            expect(state.items).not.toBe(newState.items)
            expect(state.items['Item 1']).not.toBe(newState.items['Item 1'])
            expect(state.items['Item 1']).toEqual(newState.items['Item 1'])
        })
    })
})