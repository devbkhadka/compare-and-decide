import React from 'react'
import {
    Box,
    makeStyles,
} from '@material-ui/core'

import { joinClss } from '../utils/css_utils'

const useStyles = makeStyles(theme=>({
    root: {
        
    },
    fullHeight: {
        height: '100%'
    },
    leftPanel: {
        width: '250px',
        minWidth: '250px',
        overflow: 'scroll',
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    rightPanel: {
        marginLeft: theme.spacing(2),
        flexGrow: 1
    }
}))

export default ({children})=>{
    const classes = useStyles()
    if(!children || children.length!==2){
        throw Error('PanelLayout should have exactly 2 children, 1st for right pane and 2nd for left pane')
    }
    return <Box display='flex' className={joinClss(classes.root, classes.fullHeight)}>
                <Box display='flex' flexDirection='column' 
                    className={ joinClss(classes.fullHeight, classes.leftPanel)}>
                    {children[0]}
                </Box>
                <Box display='flex' flexDirection='column' 
                    className={ joinClss(classes.fullHeight, classes.rightPanel)}>
                    {children[1]}
                </Box>
            </Box>
}
