import {addItemWithTitle, 
    updateLanguage, 
    addAttribute,
    updateItems
} from '../actions'

describe('Test actions', ()=>{

    describe('Items', ()=>{
        beforeEach(()=>{
            jest.spyOn(Storage.prototype, 'setItem').mockImplementation(()=>null)
        })

        afterEach(()=>{
            jest.restoreAllMocks()
        })

        test('addItemWithTitle add item and save it to localstorage', ()=>{
            addItemWithTitle('Item 1')(jest.fn(), ()=>({items:{}}))
            let expectedState = {
                items: {
                    ['Item 1']: {
                        title: 'Item 1',
                        values: {}
                    }
                }
            }

            expect(localStorage.setItem).toBeCalledWith('items', JSON.stringify(expectedState.items))

            addItemWithTitle('Item 2')(jest.fn(), ()=>expectedState)
            expectedState.items['Item 2'] =  {
                title: 'Item 2',
                values: {}
            }

            expect(localStorage.setItem).toBeCalledWith('items', JSON.stringify(expectedState.items))

        })

        test('addItemWithTitle dispatches updateItems action', ()=>{
            const dispatch = jest.fn()
            addItemWithTitle('Item 1')(dispatch, ()=>({items:{}}))
            let expectedState = {
                items: {
                    ['Item 1']: {
                        title: 'Item 1',
                        values: {}
                    }
                }
            }
            expect(dispatch).toBeCalledWith(updateItems(expectedState.items))
        })

        test('addItemWithTitle will not add new item if it already exists', ()=>{
            const dispatch = jest.fn()
            addItemWithTitle('Item 1')(dispatch, ()=>({items:{['Item 1']: {}}}))

            expect(localStorage.setItem).not.toBeCalled()
            expect(dispatch).not.toBeCalled()
        })

        test('updateItem returns correct item object', ()=>{
            const items = {
                ['Item 1']: {
                    title: 'Item 1',
                    values: {
                        ['abc']: 'xyz'
                    }
                }
            }
            expect(updateItems(items)).toMatchSnapshot()
        })
    })

    test('updateLanguage action correctly created', ()=> {
        expect(updateLanguage('np')).toMatchSnapshot()
    })

    test('addAttribute action correctly created', ()=> {
        expect(addAttribute('Name')).toMatchSnapshot()
    })
})