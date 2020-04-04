import React, { useEffect } from 'react';
import { useSelector } from 'react-redux'
import { ThemeProvider } from '@material-ui/core/styles';
import { makeStyles, Box} from '@material-ui/core'
import {IntlProvider} from 'react-intl'
import { useDispatch } from 'react-redux'

import './App.css';

import theme from './styles/theme'
import Dashboard from './components/Dashboard'
import CustomAppBar from './components/CustomAppBar'

import messages_np from './translations/np.json'
import { loadStateFromStorage } from './datastore/actions';

const messages={
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
  const dispatch = useDispatch()

  useEffect(()=>{
    console.log('App component rendered')
    dispatch(loadStateFromStorage())
  })

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
