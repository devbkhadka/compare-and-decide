import React from 'react'
import { FormattedMessage } from 'react-intl'

export default function formattedText(message) {
    let key
    for(key in message) {break}
    return <FormattedMessage {...message[key]} />
}