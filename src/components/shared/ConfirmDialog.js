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


const StyledDialog = withStyles({
    paper: {
        width: 400,
        height: 200
    }
})(Dialog)

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
            <Button variant='outlined' onClick={()=>handleClose(true)}>Yes</Button>
            <Button variant='outlined' onClick={()=>handleClose(false)}>Cancel</Button>
        </DialogActions>
    </StyledDialog>
}