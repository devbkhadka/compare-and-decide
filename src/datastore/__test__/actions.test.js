import {addItemWithTitle, updateLanguage} from '../actions'

describe('Test actions', ()=>{
    test('addItemWithTitle action correctly created', ()=>{
        expect(addItemWithTitle('Test title')).toMatchSnapshot()
    })

    test('updateLanguage action correctly created', ()=> {
        expect(updateLanguage('np')).toMatchSnapshot()
    })
})