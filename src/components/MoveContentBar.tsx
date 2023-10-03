import { memo, useCallback, useContext } from 'react'
import {eventDelegationSelector} from '../helpers/eventDelegationSelector'
import {ContentContext} from '../context/contentContext'

export const MoveContentBar = memo( () => {
    const {move} = useContext(ContentContext)

    // handler function uses event delegation
    const onClick:React.MouseEventHandler<HTMLDivElement>=useCallback((event)=>{
        const element = eventDelegationSelector( event, "BUTTON")
        if(!element) return;
        move(element.getAttribute("value")||"")
    },[move])

    return ( 
        <div className='data-content-move-bar' onClick={onClick}>
            <button value="up"><img src="move-icon.svg"/></button>
            <button value="down"><img src="move-icon.svg"/></button>
        </div>
           )
})
