import React from 'react'

export default function TabPanel({value, index, children}) {
    return <div className='tap-panel'>
        { value===index && children }
    </div>
}