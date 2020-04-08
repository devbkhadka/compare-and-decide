import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    Box,
    TextField,
    makeStyles,
    Button
} from '@material-ui/core'
import { FormattedMessage, defineMessages } from 'react-intl'
import { updateItemAttributeValue } from '../datastore/actions'
import ManageAttributes from './ManageAttributes'
import Title from './shared/Title'

const useStyles = makeStyles(theme=>({
    textFieldContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'flex-start',
        flexGrow: 1,
        overflow: 'scroll',
        '&>div': {
            width: '50%',
            minWidth: '200px',
            boxSizing: 'border-box',
            padding: theme.spacing(1)
        },
        '& label': {
            left: 'inherit'
        }
    }
}))

const messages = defineMessages({
    attributes: 'Attributes',
    addAttribute: 'add new attribute',
    addBtnText: 'Add'
})

export default function ItemAttributesPane({item}) {
    const attributes = useSelector(state=>state.attributes)
    const dispatch = useDispatch()
    const classes = useStyles()
    const [openDialog, setOpenDialog] = useState(false)

    const handleAttrValueChanged = (i, attribute, value)=>{
        dispatch(updateItemAttributeValue(i, attribute, value))
    }

    const showDialog = ()=> {
        setOpenDialog(true)
    }
    const closeDialog = ()=> {
        setOpenDialog(false)
    }

    return <>
        <Box display='flex' justifyContent="space-between" alignItems='center'>
            <Title style={{flexGrow:1}}>
                {item? item.title: <FormattedMessage {...messages.attributes} />}
            </Title>
            <Button variant="contained" style={{margin: 8, flexShrink:1}} onClick={ showDialog }>Manage Attributes</Button>
        </Box>
        
        <Box className={classes.textFieldContainer}>
            { attributes.map((attr, i)=> 
                <TextField key={`attr-${i}`} 
                    inputProps={{ "data-testid": `attr-${i}` }} 
                    onChange={(e)=>handleAttrValueChanged(item, attr, e.target.value)} 
                    name={`attr-${i}`}
                    value={item && item.values[attr]?item.values[attr]:''}
                    label={attr}/>
            )}
        </Box>

        

        <ManageAttributes open={openDialog} onClose={closeDialog}></ManageAttributes>
    </>
}
