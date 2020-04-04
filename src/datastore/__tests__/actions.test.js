import {addItemWithTitle, 
    updateLanguage, 
    addAttribute,
    updateItems,
    loadStateFromStorage,
    ITEMS_KEY,
    ATTRIBUTES_KEY,
    updateAttributes,
    updateItemAttributeValue
} from '../actions'

describe('Test actions', ()=>{
    beforeEach(()=>{
        jest.spyOn(Storage.prototype, 'setItem').mockImplementation(()=>null)
    })

    afterEach(()=>{
        jest.restoreAllMocks()
    })

    describe('Items', ()=>{
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

            expect(localStorage.setItem).toBeCalledWith(ITEMS_KEY, JSON.stringify(expectedState.items))

            addItemWithTitle('Item 2')(jest.fn(), ()=>expectedState)
            expectedState.items['Item 2'] =  {
                title: 'Item 2',
                values: {}
            }

            expect(localStorage.setItem).toBeCalledWith(ITEMS_KEY, JSON.stringify(expectedState.items))

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

        test('loadStateFromStorage loads items from local storage', ()=>{
            const mockItems = {
                'item 1': {
                    title: 'item 1'
                },
                'item 2': {
                    title: 'item 2'
                }

            }
            const mockDispatch = jest.fn()
            jest.spyOn(Storage.prototype, 'getItem').
                mockImplementation((key)=>key==ITEMS_KEY? JSON.stringify(mockItems): null)
            
            loadStateFromStorage()(mockDispatch)

            expect(localStorage.getItem).toBeCalledWith(ITEMS_KEY)
            expect(mockDispatch).toBeCalledWith(updateItems(mockItems))
        })
        
        it('doesn\'t update state if localstorage donot have items ', ()=>{
            const mockDispatch = jest.fn()
            jest.spyOn(Storage.prototype, 'getItem').
                mockImplementation(()=>null)

            loadStateFromStorage()(mockDispatch)
            
            expect(mockDispatch).not.toBeCalled()
        })
    })

    describe('Attributes', ()=>{
        test('addAttribute adds atributes to state and save it to local storage', ()=>{
            const initialState = {attributes: ['attr 1', 'attr 2']}
            const mockDispatch = jest.fn()

            addAttribute('attr 3')(mockDispatch, ()=>initialState)
            const expectedAttributes = ['attr 1', 'attr 2', 'attr 3']
            expect(localStorage.setItem).toBeCalledWith(ATTRIBUTES_KEY, JSON.stringify(expectedAttributes))
            expect(mockDispatch).toBeCalledWith(updateAttributes(expectedAttributes))
        })

        test('addAttribute doesn\'t add empty attribute', ()=>{
            const initialState = {attributes: ['attr 1', 'attr 2']}
            const mockDispatch = jest.fn()

            addAttribute('')(mockDispatch, ()=>initialState)
            expect(mockDispatch).not.toBeCalled()
        })

        test('updateAttributes returns action correctly', ()=>{
            expect(updateAttributes('Attr 1')).toMatchSnapshot()
        })

        test('loadStateFromStorage loads attributes from storage', ()=>{
            const attributes = ['attr 1', 'attr 2']
            jest.spyOn(Storage.prototype, 'getItem').
                mockImplementation((key)=>key==ATTRIBUTES_KEY? JSON.stringify(attributes): null)
            const mockDispatch = jest.fn()
            
            loadStateFromStorage()(mockDispatch)
            expect(localStorage.getItem).toBeCalledWith(ATTRIBUTES_KEY)
            expect(mockDispatch).toBeCalledWith(updateAttributes(attributes))

        })

        test('loadStateFromStorage donot update attributes if not exists on storage', ()=>{
            const mockDispatch = jest.fn()
            jest.spyOn(Storage.prototype, 'getItem').
                mockImplementation((key)=>null)

            loadStateFromStorage()(mockDispatch)
            expect(mockDispatch).not.toBeCalled()
        })
    })

    describe('updateItemAttributeValue', ()=>{
        it('should update item attribute and save it to storage', ()=>{
            const state = {
                items: {
                    'Item 1':{title: 'Item 1', values: {}}, 
                    'Item 2': {title: 'Item 2', values: {}}, 
                    'Item 3': {title: 'Item 3', values: {}}
                }
            }

            const mockDispatch = jest.fn()
            const func =updateItemAttributeValue(state.items['Item 1'], 'Fake Attribute', 'Fake Value')
            func(mockDispatch, ()=>state)
            
            state.items['Item 1'].values['Fake Attribute'] = 'Fake Value'

            expect(localStorage.setItem).toBeCalledWith(ITEMS_KEY, JSON.stringify(state.items))
            expect(mockDispatch).toBeCalledWith(updateItems(state.items))
        })
    })


    test('updateLanguage action correctly created', ()=> {
        expect(updateLanguage('np')).toMatchSnapshot()
    })

})