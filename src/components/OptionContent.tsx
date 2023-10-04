import { Handle, Position } from 'reactflow'
import { TextContent } from "./TextContent"
import {useContext, useEffect} from 'react'
import {ContentContext} from '../context/contentContext'
import {useStore} from '../store'


const FlagButton = () => {
    const {id} = useContext(ContentContext)
    const toogleFlag = useStore( store => store.toogleFlag )
    const isFlagged = useStore( store => store.isFlagged(id) )
    const onFlag = () => toogleFlag( id ) 
    return (
        <>
            <button
                className={ `flag-button${isFlagged? " flagged":""}` }
                onClick={onFlag}
            >
                {isFlagged ? "marked" : "mark" }
            </button>
        </>
    )
}

export const OptionContent = ()=>{
    const {id} = useContext(ContentContext)
    return (
        <>
            <FlagButton/>
            <Handle
                type="source"
                id={id.replace("content","handle")}
                position={Position.Right}
            />
            <TextContent />
        </>
    )
}
