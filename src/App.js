import React from 'react';

import { Button } from '@material-ui/core';
import TabbedWizard from './components/wizard'
import TabPanel from './components/tab_panel'

import './App.css';

function App() {
  const [value, setValue] = React.useState(0)
  const onTabChange = (event, newValue) => {
    setValue(newValue)
  }
  const step = (count) => {
    setValue(value+count)
  }
  return (
    <TabbedWizard tabs={['tab1', 'tab2', 'tab3']}>
      <div>Tab 1</div>
      <div>Tab 2</div>
      <div>Tab 3</div>
    </TabbedWizard>
  );
}

export default App;
