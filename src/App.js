import React from 'react';
import { Provider, useSelector } from 'react-redux'
import { ThemeProvider } from '@material-ui/core/styles';
import { makeStyles, Box} from '@material-ui/core'
import {IntlProvider} from 'react-intl'

import './App.css';

import theme from './styles/theme'
import Dashboard from './components/Dashboard'
import CustomAppBar from './components/CustomAppBar'

import messages_en from './translations/en.json'
import messages_np from './translations/np.json'

const messages={
  en: messages_en,
  np: messages_np
}

const useStyles = makeStyles(theme=>({
  '@global': {
    'html, body': {
      height: '100%'
    }
  },
  root:{
    height: '100vh'
  },
  container: {
    overflow: 'hidden'
  }
}))


function App() {
  const classes = useStyles()
  const language = useSelector(state=>state.language)
  return (
    <IntlProvider locale={language}  messages={messages[language]}>
        <ThemeProvider theme={theme}>
          <Box display='flex' flexDirection='column' className={classes.root}>
            <Box>
              <CustomAppBar></CustomAppBar>
            </Box>
            <Box flexGrow={1} className={classes.container}>
              <Dashboard></Dashboard>
            </Box>
          </Box>
        </ThemeProvider>
    </IntlProvider>
  );
}

export default App;
