import React from 'react'
import { makeStyles, Typography, AppBar, FormControl, Select, MenuItem, withStyles } from '@material-ui/core'
import {FormattedMessage, defineMessages} from 'react-intl'
import { useSelector, useDispatch } from 'react-redux'
import { updateLanguage } from '../datastore/actions'


const useStyles = makeStyles(theme=>({
    root: {
        flexDirection: 'row'
    },
    appBarTitle: {
        padding:theme.spacing(1),
        flexGrow: 1
      },
}))

const messages = defineMessages({
    title: 'Compare And Decide'
})

export default function CustomAppBar() {
    const classes = useStyles()
    
    return  <AppBar position="static" className={classes.root}>
                <Typography variant="h6" className={classes.appBarTitle}>
                    <FormattedMessage {...messages.title}/>
                </Typography>
                <LanguageSelect></LanguageSelect>
            </AppBar>
}


const StyledSelect = withStyles(theme=>({
    root: {
        margin: theme.spacing(1)
    },
    icon: {
        color: theme.palette.primary.contrastText
    },
    select: {
        color: theme.palette.primary.contrastText
    }
}))(Select)

function LanguageSelect() {
    const language = useSelector(state=>state.language)
    const dispatch = useDispatch()

    const handleLanguageChange = (e)=> {
        dispatch(updateLanguage(e.target.value))
    }

    return <FormControl>
        <StyledSelect data-testid='language-select' value={language} onChange={handleLanguageChange}>
            <MenuItem value='en'>EN</MenuItem>
            <MenuItem value='np'>NP</MenuItem>
        </StyledSelect>
    </FormControl>
}