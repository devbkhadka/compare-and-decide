import React from 'react'

import { Box } from '@material-ui/core'

export default function TabPanel({value, index, children}) {
    return value===index ? (<Box className='tab-panel'>
        { children }
    </Box>) : null
}
