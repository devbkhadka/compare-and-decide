import reducer from '../reducer'
import { updateItems, updateLanguage, updateAttributes, updatePreferedItemTitle} from '../actions'

describe('Reducer', ()=>{
    describe('Operations on Items', ()=>{
        it('should return empty items initially', ()=>{
            const initialState = reducer(undefined, {})
            expect(initialState.items).toEqual({})
        })
    
        it('should update items', ()=>{
            const items = {
                ['Item 1']: {
                    title: 'Item 1',
                    values: {}
                },
                ['Item 2']: {
                    title: 'Item 2',
                    values: {}
                }
            }
            const newState = reducer(undefined, updateItems(items))
            expect(newState.items).not.toBe(items)
            expect(newState.items).toEqual(items)
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
    
        it('should handle updateAttributes request', ()=>{
            const state = {attributes: ['Attr 1', 'Attr 2']}
            const attributes = ['Attr 3', 'Attr 4']

            const newState = reducer(state, updateAttributes(attributes))

            expect(newState.attributes).toEqual(attributes)
            expect(newState.attributes).not.toBe(attributes)
    
        })
    })

    describe('PreferedItemTitle', ()=>{
        it('should be able to update prefered item title', ()=>{
            const state = {PreferedItemTitle: 'old prefered item'}
            const newState = reducer(state, updatePreferedItemTitle('new prefered item'))
            expect(newState.preferedItemTitle).toBe('new prefered item')
        })
    })
})