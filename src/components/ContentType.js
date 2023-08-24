import {useState} from 'react'
import {Handle,Position} from 'reactflow'
import {shallow} from 'zustand/shallow'

import { useStore } from '../store'
import './content-type.css'

const selector = id => store => ({
    setLabel:      e => store.updateNodeLabel(id, e.target.value ),
    addContent:    e => store.addContent( id, {...e.target.dataset}),
    removeContent: e => store.removeContent(id,e.target.value),
    setContent:    e => store.updateNodeContent(id, {
                         ...e.target.dataset, //data,type 
                         data: e.target.value
                     }),
})

const EditContentBar = ({ parentID, contentID = null, show }) => {
    const { addContent, removeContent } = useStore(selector(parentID), shallow)

    return(
        <div className={show ? "edit-content-bar": "noDisplay"}>
            <button
                className='addOptionContent'
                onClick={addContent}
                data-type="option"
                data-content-id={contentID}
            > option</button>
            <button
                className='addTextContent'
                onClick={addContent}
                data-type="text"
                data-content-id={contentID}
            > text </button>
            {
                contentID &&
                    <button
                        className='removeContent'
                        onClick={removeContent}
                        value={contentID}
                    > remove </button>
            }
        </div>
    )
}

const Label = ({id,label})=>{
    const {setLabel} = useStore( selector(id), shallow )
    return(
        <div className='field'>
            <Handle id={ id } type="target" position={Position.Left} />
            <label htmlFor="label">Label:</label>
            <input
                className='nodrag'
                name="label"
                value={label}
                onChange={setLabel}
            />
        </div>)
}

const TextContent = ({content, onSetContent })=>{
    return(
        <textarea
            className='nodrag nowheel'
            name={content.id}
            data-type={content.type}
            data-content-id={content.id}
            rows={5}
            style={{resize:"none",overflow:"scroll"}}
            value={content.data}
            onChange={onSetContent}
        />
    )
}

const OptionContent = ({content,onSetContent})=>{
    return (
        <>
            <TextContent content={content} onSetContent={onSetContent}/>
            <Handle type="source" position={Position.Right} id={content.id}/>
        </>
    )
}

const DataContent = ({parentID, content})=>{
    const {setContent} = useStore( selector(parentID), shallow )
    const [showBar, setShowBar] = useState(false)
    return(
        <div
            className='field'
            onMouseEnter={e=>setShowBar(true)}
            onMouseLeave={e=>setShowBar(false)}
        >
            <label htmlFor={content.id}> Content type: {content.type} </label>
            { content.type =="text" &&
                <TextContent content={content} onSetContent={setContent}/> }
            { content.type =="option" &&
                <OptionContent content={content} onSetContent={setContent}/> }
            <EditContentBar
                parentID={parentID}
                contentID={content.id}
                show={showBar}
            />
        </div>
    )
}

export {Label,EditContentBar, DataContent};
