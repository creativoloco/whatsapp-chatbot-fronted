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


const EditContentBar = ({
    parentID,
    contentID = null,
    toogleEditable, 
    editable}) => {
    const { addContent, removeContent } = useStore(selector(parentID), shallow)

    return(
        <div className="edit-content-bar" >
            <button
                className='editContent'
                onClick={toogleEditable}
            >
                <img src="edit-icon.svg"/>
                <span className='labelText'> { editable ? "editing...": "edit"}</span>
            </button>
            {
                !editable
                    && <>
                        <button
                            className='insertContent'
                            onClick={addContent}
                            data-type="option"
                            data-content-id={contentID}
                        >
                            <img src="insert-option-icon.svg"/>
                            <span className='labelText'> move up</span>
                        </button>
                        <button
                            className='insertContent'
                            onClick={addContent}
                            data-type="option"
                            data-content-id={contentID}
                        >
                            <img src="insert-option-icon.svg"/>
                            <span className='labelText'> move down</span>
                        </button>
                        <button
                            className='insertContent'
                            onClick={addContent}
                            data-type="option"
                            data-content-id={contentID}
                        >
                            <img src="insert-option-icon.svg"/>
                            <span className='labelText'> insert option</span>
                        </button>
                        <button
                            className='insertContent'
                            onClick={addContent}
                            data-type="text"
                            data-content-id={contentID}
                        >
                            <img src="insert-text-icon.svg"/>
                            <span className='labelText'> insert text</span>
                        </button>
                        <button
                            className='insertContent'
                            onClick={addContent}
                            data-type="text"
                            data-content-id={contentID}
                        >
                            <img src="insert-image-icon.svg"/>
                            <span className='labelText'> insert image bello</span>
                        </button>
                    </>
            }
            {
                contentID
                    && <>
                        <button
                            className='removeContent'
                            onClick={removeContent}
                            value={contentID}
                        >
                            <img src="remove-icon.svg"/>
                            <span className='labelText'> insert image bello</span>
                        </button>
                    </>
            }
        </div>
    )
}

const Label = ({id,label})=>{
    const {setLabel} = useStore( selector(id), shallow )
    return(
        <div className='field'>
            <Handle id={ id } type="target" position={Position.Left} />
            <label htmlFor={id}>Label:</label>
            <input
                className='nodrag'
                name={id}
                value={label}
                onChange={setLabel}
            />
        </div>)
}

const TextContent = ({content, onSetContent,editable })=>{
    return(
        <>
            {
                editable
                    ?  <textarea
                        className='nodrag nowheel text-content'
                        name={content.id}
                        data-type={content.type}
                        data-content-id={content.id}
                        placeholder="add some text..."
                        value={content.data}
                        onChange={onSetContent}
                        autoComplete="off"
                        autoCorrect="off"
                        spellCheck={false}
                    />
                    : <p className='text-content'>{content.data}</p>
            }
        </>
    )
}

const OptionContent = ({content,onSetContent, editable})=>{
    return (
        <>
            <TextContent
                editable={editable}
                content={content}
                onSetContent={onSetContent}
            />
            <Handle type="source" position={Position.Right} id={content.id}/>
        </>
    )
}

const DataContent = ({parentID, content})=>{
    const {setContent} = useStore( selector(parentID), shallow )
    const [editable, setEditable] = useState( false )
    return(
        <div className='field' >
            <label htmlFor={content.id}>{content.type} message:</label>
            {
                (content.type == "text") &&
                    <TextContent
                        editable={editable}
                        content={content} 
                        onSetContent={setContent}
                    />
            }
            {
                (content.type == "option") &&
                    <OptionContent
                        editable={editable}
                        content={content}
                        onSetContent={setContent}
                    />
            }
            <EditContentBar
                parentID={parentID}
                contentID={content.id}
                toogleEditable={()=>setEditable(state=>!state)}
                editable={editable}
            />
        </div>
    )
}

export {Label,EditContentBar, DataContent};
