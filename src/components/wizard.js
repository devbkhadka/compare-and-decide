import React from 'react'

import { Paper, Tabs, Tab } from '@material-ui/core'
import TabPanel from './tab_panel'

export default function Wizard({tabs, children}) {
    const [value, setValue] = React.useState(0)
    const onTabChange = (event, newValue)=>{
        setValue(newValue)
    }
    return <div>
        <Paper>
            <Tabs
            className='tabs'
            value={value}
            onChange={onTabChange}
            >
            {tabs.map((tab, i)=><Tab data-testid={'tab-' + i} key={i} label={tab}></Tab>)}
            </Tabs>
        </Paper>
        <div>
            { children && children.map((child,i)=>{
                return <TabPanel index={i} key={i} value={value}>
                    {child}
                </TabPanel>
            }) }
        </div>
    </div>
}