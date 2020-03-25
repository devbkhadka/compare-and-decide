import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl'

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import messages_en from './translations/en.json'
import messages_np from './translations/np.json'

const messages={
    'np': messages_np,
    'en': messages_en
}


const language = 'np'

ReactDOM.render(
    <IntlProvider locale={language}  messages={messages[language]}>
        <App />
    </IntlProvider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
