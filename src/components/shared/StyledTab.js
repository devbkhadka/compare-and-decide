import React from 'react'
import {withStyles, Tab} from '@material-ui/core'

export default withStyles(theme=>({
    root: {
        width: '100%'
    },
    wrapper: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
    },
    wrapped: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        '&.Mui-selected': {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText
        }
    }
})) (props=><Tab icon={<span></span>} {...props}/>)
