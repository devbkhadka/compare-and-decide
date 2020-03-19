import React from 'react';

import TabbedWizard from './components/wizard'

import './App.css';

function App() {
  
  return (
   <TabbedWizard tabs={['tab1 >>', 'tab2 >>', 'tab3 >>']}>
      <div>Tab 1</div>
      <div>Tab 2</div>
      <div>Tab 3</div>
    </TabbedWizard>
    
  );
}

export default App;
