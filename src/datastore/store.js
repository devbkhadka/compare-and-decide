import {createStore, applyMiddleware, compose} from 'redux'
import ReduxThunk from 'redux-thunk'
import reducer from './reducer'


export const middleWares = [ReduxThunk]

const devToolEnhancer = (window && window.__REDUX_DEVTOOLS_EXTENSION__ && 
                            window.__REDUX_DEVTOOLS_EXTENSION__())
let enhancer = applyMiddleware(...middleWares)
if(devToolEnhancer) {
    enhancer = compose(enhancer, devToolEnhancer)
} 

const store = createStore(reducer, enhancer)

export default store
