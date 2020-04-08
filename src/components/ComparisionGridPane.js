import React from 'react'
import {Box, makeStyles, Grid, Hidden, Typography, IconButton} from '@material-ui/core'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Title from './shared/Title'
import { useSelector, useDispatch } from 'react-redux'
import { remainingItemsSelector } from '../datastore/selectors'
import { setPreferedItemTitle, rejectItem } from '../datastore/actions';

const useStyles = makeStyles((theme)=>({
    root: {
        position: 'relative',
        height: '100%'
    },
    separator: {
        height: '100%',
        '& > .seperatorBorder': {
            borderRight: `1px solid ${theme.palette.divider}`,
        } 
    },
    content: {
        position: 'absolute'
    },
    attribute: {
        fontWeight: 'bold'
    },
    columnHeader: {
        display: 'flex'
    }
    
}))

const ComparisionGridPane = ()=> {
    const classes = useStyles()
    const attributes = useSelector(state=>state.attributes)
    const preferedItem = useSelector(state=>state.items[state.preferedItemTitle])
    const otherItem = useSelector(state=>remainingItemsSelector(state)[0])
    const dispatch = useDispatch()

    const selectPreferedItem = (item)=> {
        const rejected = item===preferedItem? otherItem: preferedItem
        dispatch(setPreferedItemTitle(item.title))
        dispatch(rejectItem(rejected.title))
    }

    return (!!preferedItem) ? <Box data-testid="root-content" className={classes.root}>
        <Grid container spacing={2} className={classes.content}>
            {!otherItem ? 
                <Grid item xs={12}>
                    <Title>You have choosen "{preferedItem.title}"</Title>
                </Grid>
                :
                <>
                    <Hidden xsDown>
                        <Grid item xs={12} sm={!!otherItem?2:4}>
                            <Title>Attributes</Title>
                        </Grid>
                    </Hidden>
                    <Grid item sm={!!otherItem?5:8} xs={12} className={classes.columnHeader} >
                        <Title>{preferedItem.title}</Title> 
                        <IconButton data-testid='btnCheck' onClick={()=>selectPreferedItem(preferedItem)}>
                            <CheckCircleIcon fontSize='small'/>
                        </IconButton>
                    </Grid>
                </>
            }
            {!!otherItem && 
                <Grid item sm={5} xs={12} className={classes.columnHeader}>
                    <Title >{otherItem.title}</Title>
                    <IconButton data-testid='btnCheck' onClick={()=>selectPreferedItem(otherItem)}>
                        <CheckCircleIcon fontSize='small'/>
                    </IconButton>
                </Grid>
            }
            {attributes.map((attr,i)=>(
                <React.Fragment key={`${attr}-${i}`}>
                    <Grid item xs={12} sm={!!otherItem?2:4} className={classes.attribute}>
                        <Typography variant="body1">{attr}</Typography>
                    </Grid>
                    <Grid item xs={6} sm={!!otherItem?5:8}>
                        <Typography variant="body1">
                            {preferedItem.values && preferedItem.values[attr]}
                        </Typography>
                    </Grid>
                    {!!otherItem && 
                        <Grid item xs={6} sm={5}>
                            <Typography variant="subtitle1">
                                {otherItem.values && otherItem.values[attr]}
                            </Typography>
                        </Grid>
                    }
                </React.Fragment>
            ))}

        </Grid>
        <Hidden xsDown>
            {!!otherItem && 
                <Grid container className={classes.separator}>
                    <Grid item sm={2} />
                    <Grid item sm={5} className='seperatorBorder'/>
                    <Grid item sm={5} />
                </Grid>
            }
        </Hidden>
    </Box> : 
    <Typography variant='body1'>Please select a prefered item from left pane to start comparision</Typography>
}

export default ComparisionGridPane