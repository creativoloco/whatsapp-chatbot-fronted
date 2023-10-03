import { memo, useCallback, useContext } from 'react'

import {ButtonEditBar} from './ButtonEditBar'
import {ContentContext} from '../context/contentContext'
import {eventDelegationSelector} from '../helpers/eventDelegationSelector'

export const InsertContentBar = memo( () => {
    const {insert,remove} = useContext(ContentContext)

    const onClick:React.MouseEventHandler<HTMLDivElement>=useCallback((event)=>{
        const element = eventDelegationSelector( event, "BUTTON")
        if(!element) return;

        // remove or instert actions
        const type = element.dataset.type;
        ( type === "remove" ) ? remove(): insert(type||"")
    },[remove, insert])

    return (
        <div className='edit-content-bar' onClick={onClick} >
            <ButtonEditBar type="text"  />
            <ButtonEditBar type="option"/>
            <ButtonEditBar type="image" />
            <ButtonEditBar type="video" />
            <ButtonEditBar type="file"  />
            <ButtonEditBar type="remove"/>
        </div>
    )
})
