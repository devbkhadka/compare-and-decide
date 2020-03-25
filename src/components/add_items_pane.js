import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    Input, 
    Tabs, 
    Tab, 
    Box,
    Typography,
    TextField,
    IconButton,
    makeStyles,
    withStyles,
} from '@material-ui/core'

import {AddCircleRounded as Add} from '@material-ui/icons'

import { addItemWithTitle } from '../datastore/actions'
import { joinClss } from '../utils/css_utils'

const useStyles = makeStyles(theme=>({
    root: {
        
    },
    fullHeight: {
        height: '100%'
    },
    leftPanel: {
        width: '250px',
        overflow: 'scroll',
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    rightPanel: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        flexGrow: 1
    },
    tabs: {

    }
}))

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

export default function AddItems(props) {

    const [itemTitle, setItemTitle] = useState('')
    const [activeTab, setActiveTab] = useState(0)

    const items = useSelector(state=>state.items)
    const dispatch = useDispatch()
    
    const handleItemTitleChanged = (e)=>{
        setItemTitle(e.target.value)
    }
    const handleAdd = (e) => {
        dispatch(addItemWithTitle(itemTitle))
        setItemTitle('')
    }

    const handleActiveItemChanged = (e, newValue) => {
        setActiveTab(newValue)
    }

    const classes = useStyles()

    return <Box display='flex' className={joinClss(classes.root, classes.fullHeight)}>
                <Box display='flex' flexDirection='column' 
                    className={ joinClss(classes.fullHeight, classes.leftPanel)}>
                    <Box display='flex' style={{marginBottom: 10, marginRight: 10}}>
                        <Input style={{flexGrow:1, marginRight:20}} required data-testid='inpNewitem' 
                            label='Add item title' value={itemTitle} onChange={ handleItemTitleChanged }
                            placeholder='Item title here'/>
                        <IconButton>
                            <Add data-testid='btnAdd' onClick={handleAdd}>Add</Add>
                        </IconButton>
                    </Box>
                    <Tabs orientation="vertical" variant="scrollable" 
                        className={classes.tabs} value={activeTab}
                        onChange={handleActiveItemChanged}>
                        {
                            items.map((item, i)=><StyledTab key={i} label={item} wrapped/>)
                        }
                    </Tabs>
                </Box>
                <Box className={ joinClss(classes.fullHeight, classes.rightPanel)}>
                    <Typography variant='h4' style={{marginBottom:20}}>
                        {items[activeTab]}
                    </Typography>
                    <Box display='flex' flexWrap>
                        <TextField name='attr1' label='Attr 1'></TextField>
                        <TextField name='attr2' label='Attr 2'></TextField>
                    </Box>
                    
                    
                </Box>
            </Box>
} 