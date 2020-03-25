import React from 'react'

import { Box, Input, Typography, makeStyles } from '@material-ui/core'
import { joinClss } from '../utils/css_utils'

const useRowStyles = makeStyles(theme=>({
    root: {
        display: 'flex',
        alignItems: 'flex-end',
        
    },
    rowHeader: {
        flexGrow: 1,
        backgroundColor: theme.palette.secondary.main,
        margin: '0px'
    },
    rowItem: {
        flexGrow: 1
    },
    standardMargin: {
        padding: theme.spacing(1)
    }
}))

function AddItemRow({attributes, item}) {
    const classes = useRowStyles()
    return <Box className={classes.root}>
        { [ <Typography variant='body' className={ joinClss(classes.standardMargin, classes.rowHeader)}>{item.title}</Typography>,
            ...attributes.map((attr, i)=>
                <Input name={`${attr}-${i}`} className={joinClss(classes.standardMargin, classes.rowItem)} 
                value={item[attr]} placeholder={attr}></Input>)]}
    </Box>
}


export default function AddItem2(props) {
    const items = [{title: 'item 1'}, {title: 'item 2'}, {title: 'item 3'}]
    const attrs = ['attr 1', 'attr 2', 'attr 3', 'attr 4']  
    return <Box display='flex' flexDirection='column'>
        {items.map((item, i)=><AddItemRow attributes={attrs} item={item}></AddItemRow>)}
    </Box>
}

