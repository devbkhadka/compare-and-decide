import React from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    DialogActions,
    withStyles,
    Button
} from '@material-ui/core'
import { FormattedMessage, defineMessages } from 'react-intl'


const StyledDialog = withStyles({
    paper: {
        width: 400,
        height: 200
    }
})(Dialog)

const messages = defineMessages({
    yes: 'Yes',
    cancel: 'Cancel'
})

export default ({title, message, onConfirmed, data})=>{
    const handleClose = (yes)=>{
            onConfirmed(yes, data)
    }
    return <StyledDialog onClose={()=>handleClose(false)} open={!!data}>
        {title && <DialogTitle>{title}</DialogTitle>}
        <DialogContent>
            {message && <Typography variant="body1">{!!data && message}</Typography>}
        </DialogContent>
        <DialogActions>
            <Button variant='outlined' onClick={()=>handleClose(true)}>
                <FormattedMessage {...messages.yes} />
            </Button>
            <Button variant='outlined' onClick={()=>handleClose(false)}>
                <FormattedMessage {...messages.cancel} />
            </Button>
        </DialogActions>
    </StyledDialog>
}