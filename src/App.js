import React from 'react';

import { Button } from '@material-ui/core';
import Wizard from './components/wizard'
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
    <Wizard tabs={['tab1', 'tab2', 'tab3']}>
      <TabPanel>Tab 1</TabPanel>
      <TabPanel>Tab 2</TabPanel>
      <TabPanel>Tab 3</TabPanel>
    </Wizard>
  );
}

export default App;
