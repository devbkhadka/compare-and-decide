import React from 'react'
import { Typography, withStyles } from '@material-ui/core'

// TODO: this file not tested
export default withStyles(theme=>({
    root: {
        margin: theme.spacing(1)
    }
}))((props)=><Typography {...props} variant='h5'/>)