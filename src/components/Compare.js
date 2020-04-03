import React from 'react'
import PaneLayout from './PaneLayout'
import ComparisionListPane from './ComparisionListPane'
import ComparisionGridPane from './ComparisionGridPane'

export default (props)=>{
    return <PaneLayout>
        <ComparisionListPane/>
        <ComparisionGridPane/>
    </PaneLayout>
}