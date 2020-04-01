import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    TextField, 
    Tabs, 
    Tab, 
    Box,
    IconButton,
    Typography,
    withStyles,
    useTheme,
} from '@material-ui/core'
import {AddCircleRounded as Add} from '@material-ui/icons'
import { addItemWithTitle } from '../datastore/actions'

const StyledTab = withStyles(theme=>({
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    wrapped: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        '&.Mui-selected': {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText
        }
    }
})) (Tab)

export default function ItemListPane({ onItemSelected }) {
    const [itemTitle, setItemTitle] = useState('')
    const items = useSelector(state=>state.items)
    const dispatch = useDispatch()

    const [activeTab, setActiveTab] = useState(Object.keys(items).length>0?0:null)
    const handleItemTitleChanged = (e)=>{
        setItemTitle(e.target.value)
    }
    const handleAdd = (e) => {
        dispatch(addItemWithTitle(itemTitle))
        setItemTitle('')
    }

    const handleKeyUp = (e) => {
        if(e.key === 'Enter'){
            handleAdd(e)
        }
    }

    const handleActiveItemChanged = (newValue) => {
        setActiveTab(newValue)
        onItemSelected && onItemSelected(items[Object.keys(items)[newValue]])
    }

    useEffect(()=>{
        if(!activeTab && Object.keys(items).length===1){
            handleActiveItemChanged(0)
        }
    })
    const theme = useTheme()
    return <>
        <Typography variant='h5' style={{marginBottom: theme.spacing(1)}}>
            Items
        </Typography>
        <Box display='flex' style={{marginRight: theme.spacing(1)}}>
            <TextField style={{flexGrow:1}} required data-testid='inpNewitem' 
                value={itemTitle} onChange={ handleItemTitleChanged }
                onKeyUp={handleKeyUp} placeholder='Add New Item'/>
            <IconButton data-testid='btnAdd' onClick={handleAdd}>
                <Add>Add</Add>
            </IconButton>
        </Box>
        <Tabs orientation="vertical" variant="scrollable" value={activeTab}
            onChange={(e, value)=>handleActiveItemChanged(value)}>
            {
                Object.keys(items).map((key, i)=><StyledTab key={i} label={items[key].title} wrapped/>)
            }
        </Tabs>
    </>
}