import React from 'react'
import {Box, makeStyles, Grid, Hidden, Typography, IconButton} from '@material-ui/core'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Title from './shared/Title'
import { useSelector, useDispatch } from 'react-redux'
import { remainingItemsSelector } from '../datastore/selectors'
import { setPreferedItemTitle, rejectItem } from '../datastore/actions';
import { defineMessages, FormattedMessage } from 'react-intl';

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
        fontWeight: 'bold',
        backgroundColor: theme.palette.action.selected
    },
    columnHeader: {
        display: 'flex',
        backgroundColor: theme.palette.action.selected,
        justifyContent: 'space-between'
    }
    
}))

const messages = defineMessages({
    title: 'You have choosen "{itemTitle}"',
    selectPreferedItem: 'Please select a prefered item from left pane to start comparision',
    attributes: 'Attributes'
})

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
                <Grid item xs={12} >
                    <Title>
                        <FormattedMessage {...messages.title} values={{itemTitle: preferedItem.title}}/>
                    </Title>
                </Grid>
                :
                <>
                    <Hidden smDown>
                        <Grid item xs={12} md={!!otherItem?2:4} className={classes.columnHeader}>
                            <Title><FormattedMessage {...messages.attributes}/></Title>
                        </Grid>
                    </Hidden>
                    <Grid item md={!!otherItem?5:8} xs={12} className={classes.columnHeader} >
                        <Title>{preferedItem.title}</Title> 
                        <IconButton data-testid='btnCheck' onClick={()=>selectPreferedItem(preferedItem)}>
                            <CheckCircleIcon color='action' />
                        </IconButton>
                    </Grid>
                </>
            }
            {!!otherItem && 
                <Grid item md={5} xs={12} className={classes.columnHeader}>
                    <Title >{otherItem.title}</Title>
                    <IconButton data-testid='btnCheck' onClick={()=>selectPreferedItem(otherItem)}>
                        <CheckCircleIcon color='action'/>
                    </IconButton>
                </Grid>
            }
            {attributes.map((attr,i)=>(
                <React.Fragment key={`${attr}-${i}`}>
                    <Grid item xs={12} md={2} className={classes.attribute}>
                        <Typography variant="subtitle1">{attr}</Typography>
                    </Grid>
                    <Grid item xs={6} md={!!otherItem?5:8}>
                        <Typography variant="body1">
                            {preferedItem.values && preferedItem.values[attr]}
                        </Typography>
                    </Grid>
                    {!!otherItem && 
                        <Grid item md={5} >
                            <Typography variant="body1">
                                {otherItem.values && otherItem.values[attr]}
                            </Typography>
                        </Grid>
                    }
                </React.Fragment>
            ))}

        </Grid>
        <Hidden smDown>
            {!!otherItem && 
                <Grid container className={classes.separator}>
                    <Grid item md={2} />
                    <Grid item md={5} className='seperatorBorder'/>
                    <Grid item md={5} />
                </Grid>
            }
        </Hidden>
    </Box> : 
    <Typography variant='body1'>
        <FormattedMessage {...messages.selectPreferedItem} />
    </Typography>
}

export default ComparisionGridPane