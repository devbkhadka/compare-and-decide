import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTheme, Typography, Box, makeStyles } from '@material-ui/core'
import { Undo } from '@material-ui/icons'

import StyledTab from './shared/StyledTab'
import { setPreferedItemTitle, clearComparisionStatus } from '../datastore/actions'
import { remainingItemsSelector, rejectedItemsSelector } from '../datastore/selectors'
import { defineMessages, FormattedMessage } from 'react-intl'

const useStyles = makeStyles((theme)=>({
    section: {
        marginBottom: theme.spacing(3)
    },
    remainingItem: {
        
    },
    rejectedItem: {
        
    },
    preferedItem: {
        
    }
}))

const messages = defineMessages({
    preferedItem: 'Prefered Item',
    remainingItems: 'Remaining Items',
    rejectedItems: 'Rejected Items'
})

const ComparisionListPane =  (props)=> {
    
    const remainingItems = useSelector(remainingItemsSelector)
    const rejectedItems = useSelector(rejectedItemsSelector)
    const preferedItem = useSelector(state=>state.items[state.preferedItemTitle])
    
    const theme = useTheme()
    const classes = useStyles()
    const dispatch = useDispatch()

    const handleItemClicked = (newValue) => {
        if(preferedItem) {
            return
        }
        const selectedItem = remainingItems[newValue]
        dispatch(setPreferedItemTitle(selectedItem.title))
    }

    const handleClearStatus = (title) => {
        dispatch(clearComparisionStatus(title))
    }

    return <>
        {preferedItem && 
            <Box className={classes.section}>
                <Typography variant='h5' style={{marginBottom: theme.spacing(1)}}>
                    <FormattedMessage {...messages.preferedItem}/>
                </Typography>
                <StyledTab label={preferedItem.title} wrapped className={classes.preferedItem}
                    icon={<Undo onClick={()=>handleClearStatus(preferedItem.title)}/>}
                />
            </Box>
        }
        {remainingItems.length>0 &&
            <Box className= {classes.section}>
                <Typography variant='h5' style={{marginBottom: theme.spacing(1)}}>
                    <FormattedMessage {...messages.remainingItems}/>
                </Typography>
                {remainingItems.map((item, i)=>
                    <StyledTab key={item.title} onClick={(e)=>handleItemClicked(i)}
                    label={item.title}  wrapped className={classes.remainingItem}/>)
                }
            </Box>
        }
        {rejectedItems.length>0 &&
            <Box className={classes.section}>
                <Typography variant='h5' style={{marginBottom: theme.spacing(1)}}>
                    <FormattedMessage {...messages.rejectedItems}/>
                </Typography>
                {rejectedItems.map(item=>
                    <StyledTab key={item.title} label={item.title} wrapped className={classes.rejectedItem}
                        icon={<Undo onClick={()=>handleClearStatus(item.title)} />}
                    />
                )}
            </Box>
        }
     </>
}

export default ComparisionListPane