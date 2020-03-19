import React from 'react';

import TabbedWizard from './components/wizard'
import Overview from './components/overview'

import './App.css';

function App() {
  
  return (
   <TabbedWizard tabs={['tab1 >>', 'tab2 >>', 'tab3 >>']}>
      <Overview/>
      <div>Tab 2</div>
      <div>Tab 3</div>
    </TabbedWizard>
    
  );
}

export default App;
