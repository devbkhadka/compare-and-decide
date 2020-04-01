import React, {useState} from 'react'
import ItemListPane from './ItemListPane'
import ItemAttributesPane from './ItemAttributesPane'
import { useSelector } from 'react-redux'
import PaneLayout from './PaneLayout'



export default function AddItems(props) {
    const [selectedItem, setSelectedItem] = useState(null)
    const items = useSelector(state=>state.items)

    const handleItemSelected = (newSelectedItem)=>{
        setSelectedItem(newSelectedItem)
    }

    return <PaneLayout>
        <ItemListPane onItemSelected={handleItemSelected}></ItemListPane>
        <ItemAttributesPane item={selectedItem && items[selectedItem.title]}></ItemAttributesPane>
    </PaneLayout>
    
}
