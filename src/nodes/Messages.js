import {memo, useState} from 'react'
import {NodeToolbar,Position} from 'reactflow'
import {Label,DataContent,EditContentBar } from '../components/ContentType'

import './messages.css'

const MessagesNodeType = ({id,data,selected})=>{
    const [ edit, setEdit ] = useState(false)

    return(
        <div className="node-content" >
            <NodeToolbar isVisible={selected} position={Position.Top} >
                <button
                    onClick={e=>setEdit(state=>!state)}
                >{edit?"Save":"Edit"}</button>
            </NodeToolbar>
            <Label id={id} label={data.label}/>
            <EditContentBar parentID={id} show={true}/>
            {
                data.contentsCollection.map( content => 
                    <DataContent key={content.id} parentID={id} content={content}/>
                )
            }
        </div>
    )
}
export default memo(MessagesNodeType)
