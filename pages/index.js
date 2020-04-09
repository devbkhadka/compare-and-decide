import React from 'react';
import { Provider } from 'react-redux'
import Head from 'next/head'

import App from '../src/App';
import store from '../src/datastore/store'

const IndexPage = ()=><Provider store={store}>
    <Head>
        <title>Compare And Decide</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"></link>
    </Head>
    <App />
</Provider>

export default IndexPage