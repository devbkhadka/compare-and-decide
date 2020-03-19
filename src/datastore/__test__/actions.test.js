import {addItemWithTitle} from '../actions'

describe('Test actions', ()=>{
    test('addItemWithTitle action correctly created', ()=>{
        expect(addItemWithTitle('Test title')).toMatchSnapshot()
    })
    
})