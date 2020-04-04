import React from 'react'

import { Paper, Tabs, Tab, Box, makeStyles, IconButton } from '@material-ui/core'
import {ArrowBack, ArrowForward} from '@material-ui/icons';
import TabPanel from './TabPanel'

import formattedText from '../utils/translations'

const getClasses = makeStyles(theme=>({
    root: {
        height:'100%'
    },
    tabHeading: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.primary.contrastText
    },
    tabPanel: {
        padding: theme.spacing(2),
        paddingBottom: 0,
        overflow: "hidden",
        height: '100%'
    },
    buttonContainer: {
        padding: theme.spacing(2),
        paddingTop: 0,
    },
    fullHeight: {
        height: '100%'
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
                {tabs.map((tab, i)=><Tab data-testid={'tab-' + i} key={i} label={formattedText(tab)}></Tab>)}
            </Tabs>
        </Paper>
        <Box flexGrow={1} className={classes.tabPanel}>
            { children && children.map((child,i)=>{
                return <TabPanel index={i} key={i} value={value} className={classes.fullHeight}>
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

