import React from 'react'

import {defineMessages} from 'react-intl'

import TabbedWizard from './wizard'
import Overview from './overview'
import AddItemsPane from './add_items_pane'
import AddItemsGrid from './add_items_grid'


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