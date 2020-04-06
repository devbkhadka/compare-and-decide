import React from 'react'

import {defineMessages} from 'react-intl'

import TabbedWizard from './Wizard'
import Overview from './Overview'
import AddItemsPane from './AddItemsPane'
import Compare from './Compare'


const steps = [ 
    defineMessages({overview: 'Overview >>'}), 
    defineMessages({addItemPane: 'Add Items >>'}), 
    defineMessages({addItemGrid: 'Compare >>'})
  ]

export default function Dashboard() {
    return <TabbedWizard tabs={steps}>
        <Overview />
        <AddItemsPane />
        <Compare />
    </TabbedWizard>
}