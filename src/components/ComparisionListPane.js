import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTheme, Typography, Box, makeStyles } from '@material-ui/core'
import { Undo } from '@material-ui/icons'

import StyledTab from './shared/StyledTab'
import { setPreferedItemTitle, clearComparisionStatus } from '../datastore/actions'
import { remainingItemsSelector, rejectedItemsSelector } from '../datastore/selectors'

const useStyles = makeStyles((theme)=>({
    section: {
        marginBottom: theme.spacing(3)
    }
}))

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
                    Prefered Item
                </Typography>
                <StyledTab label={preferedItem.title} wrapped
                    icon={<Undo color='action' onClick={()=>handleClearStatus(preferedItem.title)}/>}
                />
            </Box>
        }
        {remainingItems.length>0 &&
            <Box className={classes.section}>
                <Typography variant='h5' style={{marginBottom: theme.spacing(1)}}>
                    Remaining Items
                </Typography>
                {remainingItems.map((item, i)=>
                    <StyledTab key={item.title} onClick={(e)=>handleItemClicked(i)}
                    label={item.title}  wrapped/>)
                }
            </Box>
        }
        {rejectedItems.length>0 &&
            <Box className={classes.section}>
                <Typography variant='h5' style={{marginBottom: theme.spacing(1)}}>
                    Rejected Items
                </Typography>
                {rejectedItems.map(item=>
                    <StyledTab key={item.title} label={item.title} wrapped
                        icon={<Undo color='action' onClick={()=>handleClearStatus(item.title)} />}
                    />
                )}
            </Box>
        }
     </>
}

export default ComparisionListPane