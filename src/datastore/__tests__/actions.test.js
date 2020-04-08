import {addItemWithTitle, 
    updateLanguage, 
    addAttribute,
    updateItems,
    loadStateFromStorage,
    ITEMS_KEY,
    ATTRIBUTES_KEY,
    updateAttributes,
    updateItemAttributeValue,
    setPreferedItemTitle,
    PREFETED_ITEM_TITLE_KEY,
    updatePreferedItemTitle as updatePreferedItemTitle,
    rejectItem,
    deleteAttribute,
    deleteItem,
    clearComparisionStatus
} from '../actions'
import { COMPARISION_STATUS } from '../reducer'
import * as fixtures from '../../utils/fixtures'

function assertItemsUpdatedAndSaved(items, dispatch) {
    expect(localStorage.setItem).toBeCalledWith(ITEMS_KEY, JSON.stringify(items))
    expect(dispatch).toBeCalledWith(updateItems(items))
}

function assertItemsLoadedFromStorage(items, dispatch){
    expect(localStorage.getItem).toBeCalledWith(ITEMS_KEY)
    expect(dispatch).toBeCalledWith(updateItems(items))
}

function assertAttributesUpdatedAndSaved(expectedAttributes, mockDispatch){
    expect(localStorage.setItem).toBeCalledWith(ATTRIBUTES_KEY, JSON.stringify(expectedAttributes))
    expect(mockDispatch).toBeCalledWith(updateAttributes(expectedAttributes))
}

function assertAttributeLoadedFromStorage(attributes, dispatch) {
    expect(localStorage.getItem).toBeCalledWith(ATTRIBUTES_KEY)
    expect(dispatch).toBeCalledWith(updateAttributes(attributes))
}

function assertPreferedItemUpdatedAndSaved(itemTitle, mockDispatch) {
    expect(localStorage.setItem).toBeCalledWith(PREFETED_ITEM_TITLE_KEY, itemTitle)
    expect(mockDispatch).toBeCalledWith(updatePreferedItemTitle(itemTitle))
}

function assertPreferedItemLoadedFromStorage(itemTitle, mockDispatch) {
    expect(localStorage.getItem).toBeCalledWith(PREFETED_ITEM_TITLE_KEY)
    expect(mockDispatch).toBeCalledWith(updatePreferedItemTitle(itemTitle))
}

describe('Test actions', ()=>{
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation(()=>null)
    jest.spyOn(Storage.prototype, 'getItem')

    beforeEach(()=>{
        Storage.prototype.setItem.mockClear()
        Storage.prototype.getItem.mockClear()
    })

    describe('Items', ()=>{
        test('addItemWithTitle add item and save it to localstorage', ()=>{
            const items = fixtures.getDummyItems()
            const Item4 = items.Item4
            delete items.Item4

            const mockDispatch = jest.fn()
            addItemWithTitle(Item4.title)(mockDispatch, ()=>({items}))

            const expectedItems = fixtures.getDummyItems()
            assertItemsUpdatedAndSaved(expectedItems, mockDispatch)

        })

        test('addItemWithTitle will not add new item if it already exists', ()=>{
            const dispatch = jest.fn()
            addItemWithTitle('Item 1')(dispatch, ()=>({items:{['Item 1']: {}}}))

            expect(localStorage.setItem).not.toBeCalled()
            expect(dispatch).not.toBeCalled()
        })

        test('updateItem returns correct item object', ()=>{
            const items = fixtures.getDummyItems()
            expect(updateItems(items)).toMatchSnapshot()
        })

        test('loadStateFromStorage loads items from local storage', ()=>{
            const mockItems = fixtures.getDummyItems()
            const mockDispatch = jest.fn()
            Storage.prototype.getItem.
                mockImplementation((key)=>key==ITEMS_KEY? JSON.stringify(mockItems): null)
            
            loadStateFromStorage()(mockDispatch)

            assertItemsLoadedFromStorage(mockItems, mockDispatch)
        })
        
        it('doesn\'t update state if localstorage donot have items ', ()=>{
            const mockDispatch = jest.fn()
            Storage.prototype.getItem.
                mockImplementation(()=>null)

            loadStateFromStorage()(mockDispatch)
            
            expect(mockDispatch).not.toBeCalled()
        })
    })

    describe('Item Deletion', ()=>{
        it('should delete item and save the items to localstorage', ()=>{
            const items = fixtures.getDummyItems()
            const mockDispatch = jest.fn()
            deleteItem('Item2')(mockDispatch, ()=>({items}))
            const expectedItems = fixtures.getDummyItems()
            delete expectedItems.Item2
            assertItemsUpdatedAndSaved(expectedItems, mockDispatch)
        })
    })

    describe('Attributes', ()=>{
        test('addAttribute adds atributes to state and save it to local storage', ()=>{
            const attributes = fixtures.getDummyAttributes()
            const mockDispatch = jest.fn()

            const expectedAttributes = [...attributes, 'attr5']
            addAttribute('attr5')(mockDispatch, ()=>({attributes}))
            
            assertAttributesUpdatedAndSaved(expectedAttributes, mockDispatch)
        })

        test('addAttribute doesn\'t add empty attribute', ()=>{
            const attributes = fixtures.getDummyAttributes()
            const mockDispatch = jest.fn()

            addAttribute('')(mockDispatch, ()=>({attributes}))
            expect(mockDispatch).not.toBeCalled()
        })

        test('addAttribute doesn\'t add duplicate attribute', ()=>{
            const attributes = fixtures.getDummyAttributes()
            const mockDispatch = jest.fn()

            addAttribute('attr1')(mockDispatch, ()=>({attributes}))
            expect(mockDispatch).not.toBeCalled()
        })

        test('updateAttributes returns action correctly', ()=>{
            expect(updateAttributes(fixtures.getDummyAttributes())).toMatchSnapshot()
        })

        test('loadStateFromStorage loads attributes from storage', ()=>{
            const attributes = fixtures.getDummyAttributes()
            Storage.prototype.getItem.
                mockImplementation((key)=>key==ATTRIBUTES_KEY? JSON.stringify(attributes): null)
            const mockDispatch = jest.fn()
            
            loadStateFromStorage()(mockDispatch)
            assertAttributeLoadedFromStorage(attributes, mockDispatch)

        })

        test('loadStateFromStorage donot update attributes if not exists on storage', ()=>{
            const mockDispatch = jest.fn()
            Storage.prototype.getItem.
                mockImplementation((key)=>null)

            loadStateFromStorage()(mockDispatch)
            expect(mockDispatch).not.toBeCalled()
        })

        test('deleteAttribute deletes given attribute and save attributes to storage', ()=>{
            const mockDispatch = jest.fn()
            const attributes = fixtures.getDummyAttributes()
            
            deleteAttribute(attributes[2])(mockDispatch, ()=>({attributes}))

            const expectedAttributes = fixtures.getDummyAttributesDelAttr3()
            assertAttributesUpdatedAndSaved(expectedAttributes, mockDispatch)
        })

        test('deleteAttribute removes deleted attributes from all items', ()=>{
            const mockDispatch = jest.fn()
            const attributes = fixtures.getDummyAttributes()
            const items = fixtures.getDummyItemsWithValues()
            
            deleteAttribute(attributes[2])(mockDispatch, ()=>({attributes, items}))

            const expectedItems = fixtures.getDummyItemsDelAttr3()
            assertItemsUpdatedAndSaved(expectedItems, mockDispatch)
        })

    })

    describe('updateItemAttributeValue', ()=>{
        it('should update item attribute and save it to storage', ()=>{
            const state = fixtures.getDummyState()

            const mockDispatch = jest.fn()
            const func =updateItemAttributeValue(state.items.Item1, 'Fake Attribute', 'Fake Value')
            func(mockDispatch, ()=>state)
            
            state.items['Item1'].values['Fake Attribute'] = 'Fake Value'

            assertItemsUpdatedAndSaved(state.items, mockDispatch)
        })
    })

    describe('setPreferedItemTitle', ()=>{
        const state = fixtures.getDummyState()

        beforeEach(()=>{
            jest.resetAllMocks()
        })

        it('should set prefered item and save it to localstorage', ()=>{
            const mockDispatch = jest.fn()
            const mockGetState = ()=>state
            setPreferedItemTitle(state.items['Item2'].title)(mockDispatch, mockGetState)
            const expectedItem = state.items['Item2']
            expectedItem.comparisionStatus = COMPARISION_STATUS.ITEM_PREFERED

            assertItemsUpdatedAndSaved(state.items, mockDispatch)
            assertPreferedItemUpdatedAndSaved(expectedItem.title, mockDispatch)
        })

        it('loadStateFromStorage should load preferedItemTitle', ()=>{
            Storage.prototype.getItem.
                mockImplementation((key)=>key==PREFETED_ITEM_TITLE_KEY? 'saved prefered item title': null)
            const mockDispatch = jest.fn()
            
            loadStateFromStorage()(mockDispatch)
            assertPreferedItemLoadedFromStorage('saved prefered item title', mockDispatch)
        })
    })

    describe('Clear Comparision Status', ()=>{
        it('should clear comparision status of rejected item', ()=>{
            const items = fixtures.getDummyItems()
            items.Item2.comparisionStatus = COMPARISION_STATUS.ITEM_REJECTED
            const mockDispatch = jest.fn()
            clearComparisionStatus(items.Item2.title)(mockDispatch, ()=>({items}))

            const expectedItems = fixtures.getDummyItems()
            assertItemsUpdatedAndSaved(expectedItems, mockDispatch)
        })
        it('should clear comparision status of prefered item', ()=>{
            const items = fixtures.getDummyItems()
            items.Item2.comparisionStatus = COMPARISION_STATUS.ITEM_PREFERED
            const mockDispatch = jest.fn()
            clearComparisionStatus(items.Item2.title)(mockDispatch, ()=>(
                {items, preferedItemTitle: items.Item2.title}))

            const expectedItems = fixtures.getDummyItems()
            assertItemsUpdatedAndSaved(expectedItems, mockDispatch)
            assertPreferedItemUpdatedAndSaved(undefined, mockDispatch)
        })
    })

    test('rejectItem sets item to be reject and save items to localstorege', ()=>{
        const state = fixtures.getDummyState()
        const mockDispatch = jest.fn()
        const item2 = state.items[Object.keys(state.items)[1]]
        rejectItem(item2.title)(mockDispatch, ()=>state)
        item2.comparisionStatus = COMPARISION_STATUS.ITEM_REJECTED
        assertItemsUpdatedAndSaved(state.items, mockDispatch)
    })


    test('updateLanguage action correctly created', ()=> {
        expect(updateLanguage('np')).toMatchSnapshot()
    })

})
