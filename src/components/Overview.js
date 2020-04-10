import React from 'react'
import { Typography, Box} from '@material-ui/core'
import {List, ListItem, ListItemText, ListItemIcon} from '@material-ui/core'
import {Star} from '@material-ui/icons'
import { FormattedMessage, defineMessages } from 'react-intl'


const steps = [
    defineMessages({step1: 'List all items from which you want to decide from with its attribute'}),
    defineMessages({step2: 'Select one prefered item based on intution'}),
    defineMessages({step3: `Now compare the current prefered item with each item one at a time. In each comparasion choose one item you prefer and eliminate other until all items are compared`}),
    defineMessages({step4:'Last prefered item remaining will be your choice. Hurray you have made the decision'})
]
const messages = defineMessages({
    title: "Make Decision in Three Easy Steps"
})

export default function Overview(props) {
    return <Box data-testid='overview'>
        <Typography variant='h4' style={{marginBottom:20}}>
            <FormattedMessage {...messages.title} />
        </Typography>
        
        <List>
            {steps.map((text, i)=>(<BulletPoint text={<FormattedMessage {...text[`step${i+1}`]} />} key={i}></BulletPoint>))}
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