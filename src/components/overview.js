import React from 'react'
import { Typography } from '@material-ui/core'

export default function Overview(props) {
    return <box>
        <Typography variant='body1'>
            This tool helps you choose one item from multiple items in three easy steps.
        </Typography>
        <ul>
            <li>List all items and its attributes based on which you will do comparision</li>
            <li>At first select any item you prefer based on your intusion</li>
            <li>Now compare the current prefered item with each item one at a time. 
                In each comparasion choose one item you prefere and eliminate other until all items are compared</li>
            <li>Prefered item in the last comparision will be your choice</li>
        </ul>
    </box>
}