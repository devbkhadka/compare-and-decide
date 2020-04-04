import React from 'react'

import {defineMessages} from 'react-intl'

import TabbedWizard from './Wizard'
import Overview from './Overview'
import AddItemsPane from './AddItemsPane'
import AddItemsGrid from './AddItemsGrid'


const steps = [ 
    defineMessages({overview: 'Overview >>'}), 
    defineMessages({addItemPane: 'Add Items Pane >>'}), 
    defineMessages({addItemGrid: 'Add Items Grid >>'}), 
    defineMessages({tab3: 'tab3 >>'})
  ]

export default function Dashboard() {
    return <TabbedWizard tabs={steps}>
        <Overview />
        <AddItemsPane />
        <AddItemsGrid />
        <div>Tab 3</div>
    </TabbedWizard>
}