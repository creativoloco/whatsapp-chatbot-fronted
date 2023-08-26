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


const EditContentBar = ({ showBar, parentID, contentID = null, }) => {
    const { addContent, removeContent } = useStore(selector(parentID), shallow)

    return(
        <div
            className={ 'edit-content-bar' + (showBar ? '':' opacity-zero' ) }
        >
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
                <span className='labelText'> insert image bellow</span>
            </button>
            {
                contentID &&
                <>
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

const TextContent = ({ content, onChangeContent })=>{
    const [editable, setEditable] = useState( false )
    
    return(
        <>
            {
                editable
                    ?  <textarea
                        className='nodrag nowheel text-content'
                        name={content.id}
                        placeholder="add some text..."
                        value={content.data}
                        onChange={onChangeContent}
                        autoComplete="off"
                        autoCorrect="off"
                        spellCheck={false}
                        onBlur={()=>setEditable(false)}
                    />
                    : <p
                        className='text-content'
                        onDoubleClick={()=>setEditable(true)}
                    >{content.data}</p>
            }
        </>
    )
}

const OptionContent = ({content,onChangeContent })=>{
    return (
        <>
            <TextContent content={content} onChangeContent={onChangeContent} />
            <Handle type="source" position={Position.Right} id={content.id}/>
        </>
    )
}

const DataContent = ({parentID, content})=>{
    const {setContent} = useStore( selector(parentID), shallow )
    const [contentData, setContentData] = useState(content)
    const [showBar, setShowBar] = useState(false)

    const onChangeContent = e => setContentData( prev => ({
        ...prev,
        data: e.target.value
    }))
    
    return(
        <div
            className='data-content'
            onMouseEnter={()=>setShowBar(true)}
            onMouseLeave={()=>setShowBar(false)}
        >
            <div className={ 'data-content-move-bar' +
                    (showBar ? '':' opacity-zero' ) }>
                <button><img src="move-icon.svg"/></button>
                <button><img src="move-icon.svg"/></button>
            </div>
            <div className='data-content-info'>
                <label htmlFor={content.id}>{content.type} message:</label>
                {
                    (content.type == "text") &&
                        <TextContent
                            content={contentData} 
                            onChangeContent={onChangeContent}
                        />
                }
                {
                    (content.type == "option") &&
                        <OptionContent
                            content={content}
                            onChangeContent={onChangeContent}
                        />
                }

            </div>
            <EditContentBar
                parentID={parentID}
                contentID={content.id}
                showBar = {showBar}
            />
        </div>
    )
}

export {Label,EditContentBar, DataContent};
