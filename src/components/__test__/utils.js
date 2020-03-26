import React from 'react'
import { IntlProvider } from 'react-intl'
import { render } from '@testing-library/react'

export function renderWithIntl(component) {
    return render(<IntlProvider locale="en" messages={{}}>{ component }</IntlProvider>)
}