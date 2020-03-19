import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '@material-ui/core'

import { addItemWithTitle } from '../datastore/actions'

export default function AddItem(props) {

    const items = useSelector(state=>state.items)
    const dispatch = useDispatch()
    let input

    const handleAdd = (e) => {
        dispatch(addItemWithTitle(input.value))
    }

    return <div>
        <input type='text' ref={(inp)=>{input = inp}}></input>
        <Button onClick={handleAdd}>Add</Button>
        <ul>
            { items.map((item, i) => (<li key={i}>{item}</li>)) }
        </ul>
    </div>
} 