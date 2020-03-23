import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    Input, 
    List, 
    ListItem, 
    ListItemText, 
    Divider, 
    Box,
    Button
} from '@material-ui/core'

import { addItemWithTitle } from '../datastore/actions'

export default function AddItem(props) {

    let itemTitle
    const items = useSelector(state=>state.items)
    const dispatch = useDispatch()
    
    const handleItemTitleChanged = (e)=>{
        itemTitle = e.target.value
    }
    const handleAdd = (e) => {
        dispatch(addItemWithTitle(itemTitle))
    }

    return <div>
        <Box display='flex' style={{marginBottom: 10}}>
            <Input style={{flexGrow:1}} required data-testid='inpNewitem' label='Add item title' onChange={ handleItemTitleChanged }/>
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
    </div>
} 