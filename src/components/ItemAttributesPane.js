import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    Box,
    Typography,
    TextField,
    IconButton,
    useTheme,
    makeStyles
} from '@material-ui/core'
import {AddCircleRounded as Add} from '@material-ui/icons'
import { FormattedMessage, defineMessages } from 'react-intl'
import { addAttribute, updateItemAttributeValue } from '../datastore/actions'

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
    const [attrName, setAttrName] = useState('')
    const attributes = useSelector(state=>state.attributes)
    const dispatch = useDispatch()
    const classes = useStyles()

    
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

    const handleAttrValueChanged = (i, attribute, value)=>{
        dispatch(updateItemAttributeValue(i, attribute, value))
    }

    const theme = useTheme()
    return <>
        <Typography variant='h5' style={{marginBottom: theme.spacing(1)}}>
            {item? item.title: <FormattedMessage {...messages.attributes} />}
        </Typography>
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
    </>
}
