import {memo, useCallback, useEffect, useRef, useState} from 'react'
import ReactPlayer from 'react-player'
import {Handle,Position, useUpdateNodeInternals} from 'reactflow'

import { useStore } from '../store'
import './content-type.css'

const ButtonEditBar = ({type})=>{
    return (
        <button className='edit-content-bar-button' data-type={type} >
            <img className='button-img' src={`edit-bar-${type}-icon.svg`}/>
            <span className='button-text'>{type}</span>
        </button>
    )
}

const InsertContentBar = memo( ({
    id,
    insertContentCallback,
    removeContentCallback
}) => {
    const onClickHandler = useCallback( e => {
        const el =  (e.target.nodeName === "BUTTON" )
            ? e.target
            : (e.target.parentElement.nodeName === "BUTTON")
                ? e.target.parentElement
                : null
        
        if(!el) return

        const type = el.dataset.type;

        if(type==="remove")
            removeContentCallback( id )
        else
            insertContentCallback( id )( type )

    },[ id ])

    return (
        <div className='edit-content-bar' onClick={onClickHandler} >
            <ButtonEditBar type="option"/>
            <ButtonEditBar type="text"  />
            <ButtonEditBar type="image" />
            <ButtonEditBar type="video" />
            <ButtonEditBar type="file"  />
            { id && <ButtonEditBar type="remove"/> }
        </div>
    )
})

const NodeTitle = memo(({ id, title })=>{
    return(
        <div className='field'>
            <Handle id={ id } type="target" position={Position.Left} />
            <label htmlFor={id}>Title:</label>
            <p>{title}</p>
        </div>)
})

const VideoContent = ({ content, onChangeData })=>{
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
                        onChange={onChangeData}
                        autoComplete="off"
                        autoCorrect="off"
                        spellCheck={false}
                        onBlur={()=>setEditable(false)}
                    />
                    : <p
                        className='text-content'
                        style={{height:"1.2rem", overflow:"hidden"}}
                        onDoubleClick={()=>setEditable(true)}
                    >{content.data}</p>
            }
            <ReactPlayer
                width={"100%"}
                height={"100px"}
                light={true}
                url={content.data}/>
        </>
    )
}

const ImageContent = ({ content, onChangeData })=>{
    const [editable, setEditable] = useState( false )

    return(
        <>
            {
                editable ?  <textarea
                    className='nodrag nowheel text-content'
                    name={content.id}
                    placeholder="add some text..."
                    value={content.data}
                    onChange={onChangeData}
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck={false}
                    onBlur={()=>setEditable(false)}
                />
                : <p
                    className='text-content'
                    style={{height:"1.2rem", width: "100%", overflow:"hidden"}}
                    onDoubleClick={()=>setEditable(true)}
                >{content.data}</p>
            }
            <img src={content.data} style={{
                width: "100%", maxHeight:"100px",
                display: "block", padding: 10,
                boxSizing:"border-box"
            }}/>
        </>
    )
}

const TextContent = ({ id, data, onChangeData })=>{
    const [editable, setEditable] = useState( false )
    const [text, setText ] = useState( data )
    const onChange = e => setText( e.target.value )

    // save data state to store after 2 sec
    useEffect( ()=>{
        if( editable ){
            const timeoutID = setTimeout( () => onChangeData(text), 2000 )
            return ()=> clearTimeout(timeoutID)
        }
    },[text])
    
    return(
        <>
            {
                editable
                    ?  <textarea
                        className='nodrag nowheel text-content'
                        placeholder="add some text..."
                        autoComplete="off"
                        autoCorrect="off"
                        name={id}
                        value={text}
                        onChange={onChange}
                        spellCheck={false}
                        onBlur={()=>setEditable(false)}
                    />
                    : <p
                        className='text-content'
                        onClick={()=>setEditable(true)}
                    >{text}</p>
            }
        </>
    )
}

const FileContent = ({ content, onChangeData })=>{
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
                        onChange={onChangeData}
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

const OptionContent = ({content,onChangeData })=>{
    return (
        <>
            <TextContent content={content} onChangeData={onChangeData} />
            <Handle type="source" position={Position.Right} id={content.id}/>
        </>
    )
}

const MoveContentBar = memo( ({moveCallback}) => {

    // handler function uses event delegation
    const onClick = useCallback((event) => {
        const el =  (event.target.nodeName === "BUTTON" )
            ? event.target
            : (event.target.parentElement.nodeName === "BUTTON")
                ? event.target.parentElement
                : null
        if(!el) return
        moveCallback(el.value)
    },[moveCallback])

    return ( 
        <div className= 'data-content-move-bar' onClick={onClick}>
            <button value="up"><img src="move-icon.svg"/></button>
            <button value="down"><img src="move-icon.svg"/></button>
        </div>
    )
})

// content: {type:"", id:"", data:""}
const DataContent =  ({
    id,
    type,
    data,
    moveContentCallback,
    editDataCallback
}) => {

    const moveCallback = useCallback( value =>
        moveContentCallback( id )( value ),
        [ moveContentCallback, id ]
    )
    const onChangeData = useCallback( value =>
        editDataCallback( id )( value ),
        [id]
    )

    return(
        <>
            <MoveContentBar moveCallback={ moveCallback } />
            <div className='data-info'>
                <label htmlFor={id} >{type} message:</label>
                { type==="text"   && <TextContent   id={id} data={data} onChangeData={onChangeData} /> }
                { type==="option" && <OptionContent id={id} data={data} onChangeData={onChangeData} /> }
                { type==="image"  && <ImageContent  id={id} data={data} onChangeData={onChangeData} /> }
                { type==="video"  && <VideoContent  id={id} data={data} onChangeData={onChangeData} /> }
                { type==="file"   && <FileContent   id={id} data={data} onChangeData={onChangeData} /> }
            </div>
        </>
    )
}

export default memo(DataContent)
export {NodeTitle, InsertContentBar };
