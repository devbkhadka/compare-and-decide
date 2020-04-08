import React, { useState } from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    List,
    ListItem,
    Box,
    IconButton,
    TextField,
    ListItemText,
    withStyles,
} from '@material-ui/core'
import {Add, Delete} from '@material-ui/icons'
import { FormattedMessage, defineMessages } from 'react-intl'
import {addAttribute, deleteAttribute} from '../datastore/actions'
import { useDispatch, useSelector } from 'react-redux'
import ConfirmDialog from './shared/ConfirmDialog'


const messages = defineMessages({
    attributes: 'Attributes',
    addAttribute: 'add new attribute',
    addBtnText: 'Add'
})

const StyledDialog = withStyles({
    paper: {
        width: 400,
        height: 400
    }
})(Dialog)

export default ({onClose, open})=> {
    const dispatch = useDispatch()
    const [attrName, setAttrName] = useState('')
    const [itemToDelete, triggerDeleteFor] = useState(null)

    const attributes = useSelector(state=>state.attributes)

    const handleAdd = (e)=>{
        dispatch(addAttribute(attrName))
        setAttrName('')
    }

    const handleAttNameChanged = (e)=>{
        setAttrName(e.target.value)
    }

    const handleKeyUp = (e) => {
        if(e.key === 'Enter'){
            handleAdd(e)
        }
    }

    const handleDeleteAttribute = (confirmed, attr)=>{
        if(confirmed){
            dispatch(deleteAttribute(attr))
        }
        triggerDeleteFor(null)
    }

    return (
        <>
            <StyledDialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
                <DialogTitle id="simple-dialog-title">Manage Attributes</DialogTitle>
                <DialogContent>
                    <Box display='flex'>
                        <FormattedMessage {...messages.addAttribute}>
                            {(placeholder)=>
                                <TextField style={{flexGrow:1}} name='addAttributes' 
                                placeholder={placeholder}
                                onChange={handleAttNameChanged} value={attrName}
                                onKeyUp = {handleKeyUp}
                                />
                            }
                        </FormattedMessage>
                        <IconButton data-testid='btnAdd' onClick={handleAdd}>
                        <Add><FormattedMessage {...messages.addBtnText}/></Add>
                        </IconButton>
                    </Box>
                    <List>
                        {attributes.map((attr, i)=>
                            <ListItem key={attr}>
                                <ListItemText>{attr}</ListItemText>
                                <IconButton onClick={()=>triggerDeleteFor(attr)}>
                                    <Delete/>
                                </IconButton>
                            </ListItem>)
                        }
                    </List>
                </DialogContent>
            </StyledDialog>
            <ConfirmDialog data={itemToDelete} 
                title= 'Alert!'
                message={`Are you sure you want to delete"${itemToDelete}"`}
                onConfirmed={handleDeleteAttribute}
                />
        </>
    )
}