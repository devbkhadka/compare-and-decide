import React from 'react'

import { Paper, Tabs, Tab, Button } from '@material-ui/core'
import TabPanel from './tab_panel'

export default function TabbedWizard({tabs, children}) {
    const [value, setValue] = React.useState(0)
    const onTabChange = (event, newValue)=>{
        setValue(newValue)
    }
    const stepTabBy = (count) => {
        const newValue = value + count
        if(newValue>=0 && newValue<children.length) {
            setValue(newValue)
        }
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
        <div style={{padding: 20}}>
            { children && children.map((child,i)=>{
                return <TabPanel index={i} key={i} value={value}>
                    {child}
                </TabPanel>
            }) }
        </div>
        <Button data-testid="prev" onClick={()=>stepTabBy(-1)}>Previous</Button>
        <Button data-testid="next" onClick={()=>stepTabBy(1)}>Next</Button>
    </div>
}

