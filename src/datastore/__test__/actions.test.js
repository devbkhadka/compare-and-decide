import {addItemWithTitle, updateLanguage, addAttribute} from '../actions'

describe('Test actions', ()=>{
    test('addItemWithTitle action correctly created', ()=>{
        expect(addItemWithTitle('Test title')).toMatchSnapshot()
    })

    test('updateLanguage action correctly created', ()=> {
        expect(updateLanguage('np')).toMatchSnapshot()
    })

    test('addAttribute action correctly created', ()=> {
        expect(addAttribute('Name')).toMatchSnapshot()
    })
})