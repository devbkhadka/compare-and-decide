import React from 'react';
import { Provider } from 'react-redux'
import { ThemeProvider } from '@material-ui/core/styles';
import { AppBar, makeStyles, Typography, Box} from '@material-ui/core'
import {FormattedMessage, defineMessages} from 'react-intl'

import theme from './styles/theme'
import TabbedWizard from './components/wizard'
import Overview from './components/overview'
import store from './datastore/store'
import AddItemsPane from './components/add_items_pane'
import AddItemsGrid from './components/add_items_grid'

import './App.css';

const useStyles = makeStyles(theme=>({
  '@global': {
    'html, body': {
      height: '100%'
    }
  },
  root:{
    height: '100vh'
  },
  appBarTitle: {
    padding:10
  },
  container: {
    overflow: 'hidden'
  }
}))


function App() {
  const classes = useStyles()
  const steps = [ 
    defineMessages({overview: 'Overview >>'}), 
    defineMessages({addItemPane: 'Add Items Pane >>'}), 
    defineMessages({addItemGrid: 'Add Items Grid >>'}), 
    defineMessages({tab3: 'tab3 >>'})
  ]
  return (
    <ThemeProvider theme={theme}>
      <Box display='flex' flexDirection='column' className={classes.root}>
        <Box>
          <AppBar position="static" >
            <Typography variant="h6" className={classes.appBarTitle}>
              <FormattedMessage id='App.title'
                defaultMessage='Compare And Decide' />
            </Typography>
          </AppBar>
        </Box>
        <Box flexGrow={1} className={classes.container}>
          <Provider store={store}>
            <TabbedWizard tabs={steps}>
                <Overview/>
                <AddItemsPane></AddItemsPane>
                <AddItemsGrid></AddItemsGrid>
                <div>Tab 3</div>
            </TabbedWizard>
          </Provider>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
