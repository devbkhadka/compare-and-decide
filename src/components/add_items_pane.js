import React, {useState} from 'react'
import {
    Box,
    makeStyles,
} from '@material-ui/core'

import { joinClss } from '../utils/css_utils'
import ItemListPane from './ItemListPane'
import ItemAttributesPane from './ItemAttributesPane'

const useStyles = makeStyles(theme=>({
    root: {
        
    },
    fullHeight: {
        height: '100%'
    },
    leftPanel: {
        width: '250px',
        overflow: 'scroll',
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    rightPanel: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        flexGrow: 1
    }
}))


export default function AddItems(props) {

    const [selectedItem, setSelectedItem] = useState(null)
    
    const classes = useStyles()

    const handleItemSelected = (newSelectedItem)=>{
        setSelectedItem(newSelectedItem)
    }

    return <Box display='flex' className={joinClss(classes.root, classes.fullHeight)}>
                <Box display='flex' flexDirection='column' 
                    className={ joinClss(classes.fullHeight, classes.leftPanel)}>
                    <ItemListPane onItemSelected={handleItemSelected}></ItemListPane>
                </Box>
                <Box display='flex' flexDirection='column' className={ joinClss(classes.fullHeight, classes.rightPanel)}>
                    <ItemAttributesPane item={selectedItem}></ItemAttributesPane>
                </Box>
            </Box>
}
