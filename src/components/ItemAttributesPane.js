import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    Box,
    Typography,
    TextField,
    IconButton,
    useTheme
} from '@material-ui/core'
import {AddCircleRounded as Add} from '@material-ui/icons'
import { addAttribute } from '../datastore/actions'

export default function ItemAttributesPane({item}) {
    const [attrName, setAttrName] = useState('')
    const attributes = useSelector(state=>state.attributes)
    const dispatch = useDispatch()

    const handleAdd = (e)=>{
        dispatch(addAttribute(attrName))
        setAttrName('')
    }

    const handleAttNameChanged = (e)=>{
        setAttrName(e.target.value)
    }

    const theme = useTheme()
    return <>
        <Typography variant='h5' style={{marginBottom: theme.spacing(1)}}>
            {item? item: 'Attributes'}
        </Typography>
        <Box display='flex'>
            <TextField style={{flexGrow:1}} name='addAttributes' 
                placeholder='Add New Attribute'
                onChange={handleAttNameChanged} value={attrName}/>
            <IconButton data-testid='btnAdd' onClick={handleAdd}>
                <Add>Add</Add>
            </IconButton>
        </Box>
        
        
        <Box display='flex' flexGrow={1} flexDirection='column' style={{overflow: 'scroll'}}>
            { attributes.map((attr, i)=> <TextField key={`attr-${i}`} name={`attr-${i}`} label={attr}></TextField>)}
        </Box>
    </>
}
