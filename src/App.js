import React from 'react';
import { Provider } from 'react-redux'

import TabbedWizard from './components/wizard'
import Overview from './components/overview'
import store from './datastore/store'
import AddItem from './components/add_items'

import './App.css';

function App() {
  
  return (
    <Provider store={store}>
      <TabbedWizard tabs={['tab1 >>', 'tab2 >>', 'tab3 >>']}>
          <Overview/>
          <AddItem></AddItem>
          <div>Tab 3</div>
        </TabbedWizard>
    </Provider>
    
  );
}

export default App;
