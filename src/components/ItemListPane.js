import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    TextField, 
    Tabs, 
    Box,
    IconButton,
    Typography,
    useTheme,
} from '@material-ui/core'
import {AddCircleRounded as Add} from '@material-ui/icons'
import { addItemWithTitle } from '../datastore/actions'
import { defineMessages, FormattedMessage } from 'react-intl'
import StyledTab from './shared/StyledTab'

const messages = defineMessages({
    title: 'Items',
    addNewItem: 'add new items',
    addBtnText: 'Add'
})

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
            //TODO: This branch not tested
            handleAdd(e)
        }
    }

    const handleActiveItemChanged = (newValue) => {
        setActiveTab(newValue)
        onItemSelected && onItemSelected(items[Object.keys(items)[newValue]])
    }

    useEffect(()=>{
        if(!activeTab && Object.keys(items).length>=1){
            handleActiveItemChanged(0)
        }
    })
    const theme = useTheme()
    return <>
        <Typography variant='h5' style={{marginBottom: theme.spacing(1)}}>
            <FormattedMessage {...messages.title}/>
        </Typography>
        <Box display='flex' style={{marginRight: theme.spacing(1)}}>
            <FormattedMessage {...messages.addNewItem}>
                { (addNewItem)=>
                <TextField style={{flexGrow:1}} required data-testid='inpNewitem' 
                    value={itemTitle} onChange={ handleItemTitleChanged }
                    onKeyUp={handleKeyUp} placeholder={addNewItem}/>
                }
            </FormattedMessage>
            <IconButton data-testid='btnAdd' onClick={handleAdd}>
                <Add><FormattedMessage {...messages.addBtnText}/> </Add>
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