import React from 'react'
import { Provider } from 'react-redux'
import { IntlProvider } from 'react-intl'
import { render } from '@testing-library/react'
import configureMockStore from 'redux-mock-store'
import {middleWares} from '../datastore/store'
import ReduxThunk from 'redux-thunk'


const mockStore = configureMockStore(middleWares)

export function renderWithIntl(component) {
    return render(<IntlProvider locale="en" messages={{}}>{ component }</IntlProvider>)
}

export function renderWithProvider(component, initialState={language: 'en'}) {
    const store = mockStore(initialState)
    return [render(<Provider store={store}>
        <IntlProvider locale="en" messages={{}}>{ component }</IntlProvider>
    </Provider>), store]
}