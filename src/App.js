import React from 'react';
import { Provider } from 'react-redux'
import { ThemeProvider } from '@material-ui/core/styles';
import { AppBar, makeStyles, Typography, Box} from '@material-ui/core'

import theme from './styles/theme'
import TabbedWizard from './components/wizard'
import Overview from './components/overview'
import store from './datastore/store'
import AddItem from './components/add_items'

import './App.css';

const useStyles = makeStyles(theme=>({
  root:{
    height: '100vh'
  },
  appBarTitle: {
    padding:10
  }
}))


function App() {
  const classes = useStyles()
  return (
    <ThemeProvider theme={theme}>
      <Box display='flex' flexDirection='column' className={classes.root}>
        <Box>
          <AppBar position="static" >
            <Typography variant="h6" className={classes.appBarTitle}>
                Compare And Decide
            </Typography>
          </AppBar>
        </Box>
        <Box flexGrow={1}>
          <Provider store={store}>
            <TabbedWizard tabs={['Overview >>', 'Add Items >>', 'tab3 >>']}>
                <Overview/>
                <AddItem></AddItem>
                <div>Tab 3</div>
            </TabbedWizard>
          </Provider>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
