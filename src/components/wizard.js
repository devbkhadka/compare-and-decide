import React from 'react'

import { Paper, Tabs, Tab, Box, makeStyles, IconButton } from '@material-ui/core'
import {ArrowBack, ArrowForward} from '@material-ui/icons';
import TabPanel from './tab_panel'

const getClasses = makeStyles(theme=>({
    root: {
        height:'100%'
    },
    tabHeading: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.primary.contrastText
    },
    tabPanel: {
        padding: 20,
        height: "100%"
    },
    buttonContainer: {
        padding: 20
    }

}))


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
    const classes = getClasses()

    return <Box display='flex' flexDirection='column' className={classes.root}>
        <Paper className={classes.tabHeading} square>
            <Tabs
                className='tabs'
                value={value}
                onChange={onTabChange}
                >
                {tabs.map((tab, i)=><Tab data-testid={'tab-' + i} key={i} label={tab}></Tab>)}
            </Tabs>
        </Paper>
        <Box flexGrow={1}>
            { children && children.map((child,i)=>{
                return <TabPanel index={i} key={i} value={value} className={classes.tabPanel}>
                    {child}
                </TabPanel>
            }) }
        </Box>
        <Box display='flex' justifyContent='space-between' className={classes.buttonContainer}>
            <IconButton data-testid="prev" onClick={()=>stepTabBy(-1)}>
                <ArrowBack  fontSize='large' />
            </IconButton>
            <IconButton data-testid="next" onClick={()=>stepTabBy(1)}>
                <ArrowForward fontSize='large'/>
            </IconButton>
        </Box>
        
    </Box>
}

