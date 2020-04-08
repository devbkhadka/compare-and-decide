const dummyItems = JSON.stringify({
    Item1: {
        title: 'Item1',
        values: {}
    },
    Item2: {
        title: 'Item2',
        values: {}
    },
    Item3: {
        title: 'Item3',
        values: {}
    },
    Item4: {
        title: 'Item4',
        values: {}
    }
})

const dummyAttributes = JSON.stringify(['attr1', 'attr2', 'attr3', 'attr4'])

const dummyItemsWithValues = JSON.stringify({
    Item1: {
        title: 'Item1',
        values: {
            'attr1': 'Item1-Value1',
            'attr2': 'Item1-Value2',
            'attr3': 'Item1-Value3',
            'attr4': 'Item1-Value4'
        }
    },
    Item2: {
        title: 'Item2',
        values: {
            'attr2': 'Item2-Value2',
            'attr4': 'Item4-Value4'
        }
    },
    Item3: {
        title: 'Item3',
        values: {
            'attr1': 'Item3-Value1',
            'attr2': 'Item3-Value2',
            'attr3': 'Item3-Value3',
        }
    },
    Item4: {
        title: 'Item4',
        values: {}
    }
})

const dummyAttributesDelAttr3 = JSON.stringify(['attr1', 'attr2', 'attr4'])
const dummyItemsDelAttr3 = JSON.stringify({
    Item1: {
        title: 'Item1',
        values: {
            'attr1': 'Item1-Value1',
            'attr2': 'Item1-Value2',
            'attr4': 'Item1-Value4'
        }
    },
    Item2: {
        title: 'Item2',
        values: {
            'attr2': 'Item2-Value2',
            'attr4': 'Item4-Value4'
        }
    },
    Item3: {
        title: 'Item3',
        values: {
            'attr1': 'Item3-Value1',
            'attr2': 'Item3-Value2',
        }
    },
    Item4: {
        title: 'Item4',
        values: {}
    }
})

export const getDummyItems = ()=> JSON.parse(dummyItems)
export const getDummyItemsWithValues = ()=> JSON.parse(dummyItemsWithValues)
export const getDummyItemsDelAttr3 = ()=> JSON.parse(dummyItemsDelAttr3)
export const getDummyAttributes = () => JSON.parse(dummyAttributes)
export const getDummyAttributesDelAttr3 = () => JSON.parse(dummyAttributesDelAttr3)
export const getDummyState = ()=> ({
    items: getDummyItems(),
    attributes: getDummyAttributes(),
})