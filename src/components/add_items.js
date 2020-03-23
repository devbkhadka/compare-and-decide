import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    Input, 
    List, 
    ListItem, 
    ListItemText, 
    Divider, 
    Box,
    Button,
    makeStyles,
} from '@material-ui/core'

import { addItemWithTitle } from '../datastore/actions'
import { joinClss } from '../utils/css_utils'

const useStyles = makeStyles({
    root: {
    
    },
    fullHeight: {
        height: '100%'
    },
    leftPanel: {
        width: '25%'
    },
    rightPanel: {
        flexGrow: 1
    }
})

export default function AddItem(props) {

    const [itemTitle, setItemTitle] = useState('')
    const items = useSelector(state=>state.items)
    const dispatch = useDispatch()
    
    const handleItemTitleChanged = (e)=>{
        setItemTitle(e.target.value)
    }
    const handleAdd = (e) => {
        dispatch(addItemWithTitle(itemTitle))
    }

    const classes = useStyles()

    return <Box display='flex' className={joinClss(classes.root, classes.fullHeight)}>
                <Box display='flex' flexDirection='column' 
                    className={ joinClss(classes.fullHeight, classes.leftPanel)}>
                    <Box display='flex' style={{marginBottom: 10}}>
                        <Input style={{flexGrow:1, marginRight:20}} required data-testid='inpNewitem' 
                            label='Add item title' onChange={ handleItemTitleChanged }/>
                        <Button data-testid='btnAdd' onClick={handleAdd}>Add</Button>
                    </Box>
                    <List style={{backgroundColor: 'theme.palette.background.paper'}}>
                        { items.map((item, i) => 
                            (<ListItem>
                                <ListItemText key={i} primary={item}></ListItemText>
                                <Divider/>
                            </ListItem>)) 
                        }
                    </List>
                </Box>
                <Box className={ joinClss(classes.fullHeight, classes.rightPanel)}>
                        Here will be form or table
                </Box>
            </Box>
} 