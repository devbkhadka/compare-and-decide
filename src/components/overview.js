import React from 'react'
import { Typography, Box} from '@material-ui/core'
import {List, ListItem, ListItemText, ListItemIcon} from '@material-ui/core'
import {Star} from '@material-ui/icons'

export default function Overview(props) {
    const steps = [
        'List all items from which you want to decide from with its attribute',
        'Select one prefered item based on intution',
        'Now compare the current prefered item with each item one at a time.' +
        'In each comparasion choose one item you prefer and eliminate other until all items are compared',
        'Last prefered item remaining will be your choice. Hurray you have made the decision' 
    ]
    return <Box>
        <Typography variant='h4' style={{marginBottom:20}}>
            Make Decision in Three Easy Steps
        </Typography>
        
        <List>
            {steps.map((text, i)=>(<BulletPoint text={text} key={i}></BulletPoint>))}
        </List>
        
    </Box>
}


function BulletPoint({text}) {
    return <ListItem>
            <ListItemIcon>
                <Star />
            </ListItemIcon>
            <ListItemText
                primary={text}
            />
        </ListItem>
}