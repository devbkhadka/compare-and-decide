import React from 'react'
import {ThemeProvider, CssBaseline} from '@material-ui/core'
import '../src/index.css'
import theme from '../src/styles/theme'


// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />
}