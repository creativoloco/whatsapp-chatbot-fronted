import {memo, useContext} from 'react'
import { Handle, Position} from 'reactflow'

import { TextContent } from './TextContent'
import {NodeContext} from '../context/nodeContext'


export const NodeTitle = memo(()=>{
    const {id, setTitle,data} = useContext(NodeContext)
    return(
        <div className='node-title'>
            <Handle id={ id } type="target" position={Position.Left} />
            <label htmlFor={id}>
                <TextContent customText={data.title} customHandler={setTitle} />
            </label>
        </div>)
})
