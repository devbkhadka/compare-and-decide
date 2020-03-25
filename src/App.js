import React from 'react';
import { Provider } from 'react-redux'
import { ThemeProvider } from '@material-ui/core/styles';
import { AppBar, makeStyles, Typography, Box} from '@material-ui/core'

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
        <Box flexGrow={1} className={classes.container}>
          <Provider store={store}>
            <TabbedWizard tabs={['Overview >>', 'Add Items >>', 'Add Items 2 >>', 'tab3 >>']}>
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
