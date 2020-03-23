import React from 'react'

import { Box } from '@material-ui/core'

export default function TabPanel({value, index, children, className}) {
    return value===index ? (<Box className={className}>
        { children }
    </Box>) : null
}
