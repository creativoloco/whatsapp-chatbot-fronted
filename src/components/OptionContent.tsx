import { Handle, Position } from 'reactflow'
import { TextContent } from "./TextContent"
import {useContext} from 'react'
import {ContentContext} from '../context/contentContext'

export const OptionContent = ()=>{
    const {id} = useContext(ContentContext)
    return (
        <>
            <TextContent />
            <Handle
                type="source"
                id={id.replace("content","handle")}
                position={Position.Right}
            />
        </>
    )
}
