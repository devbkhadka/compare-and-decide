import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    TextField, 
    Tabs, 
    Box,
    IconButton,
    useTheme,
} from '@material-ui/core'
import {AddCircleRounded as Add, Delete} from '@material-ui/icons'
import { addItemWithTitle, deleteItem } from '../datastore/actions'
import { defineMessages, FormattedMessage } from 'react-intl'
import StyledTab from './shared/StyledTab'
import Title from './shared/Title'
import ConfirmDialog from './shared/ConfirmDialog'

const messages = defineMessages({
    title: 'Items',
    addNewItem: 'add new items',
    addBtnText: 'Add',
    confirmItemDeteteTitle: 'Alert!',
    comfirmItemDeleteMessage: 'Are you sure you want to delete "{deleteItemTitle}"'
})

export default function ItemListPane({ onItemSelected }) {
    const [itemTitle, setItemTitle] = useState('')
    const [deleteItemTitle, triggerDeleteFor] = useState(null)
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

    const confirmItemDeletion = (e) =>{
        e.stopPropagation()
        const key = e.currentTarget.getAttribute('data-key')
        triggerDeleteFor(key)
    }

    const deleteItemConfirmed = (yes, itemTitle)=> {
        if(yes) {
            dispatch(deleteItem(itemTitle))
        }
        triggerDeleteFor(null)
    }

    useEffect(()=>{
        if(!activeTab && Object.keys(items).length>=1){
            handleActiveItemChanged(0)
        }
    })
    const theme = useTheme()
    return <>
        <Title>
            <FormattedMessage {...messages.title}/>
        </Title>
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
                Object.keys(items).map((key, i)=>
                    <StyledTab key={i} label={items[key].title} wrapped
                        icon={<Delete data-key={key} onClick={confirmItemDeletion} color='action' />}
                    />
                )
            }
        </Tabs>
        <ConfirmDialog title={<FormattedMessage {...messages.comfirmItemDeleteMessage}/>}
            message={<FormattedMessage {...messages.comfirmItemDeleteMessage} values={{deleteItemTitle}}/>} 
            data={deleteItemTitle} 
            onConfirmed={deleteItemConfirmed}
            />
    </>
}