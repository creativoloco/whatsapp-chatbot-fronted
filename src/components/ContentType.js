import { memo, useCallback, useEffect, useState } from 'react'
import { Handle, Position } from 'reactflow'
import ReactPlayer from 'react-player'

import './content-type.css'

const ButtonEditBar = ({type})=>{
    return (
        <button className='edit-content-bar-button' data-type={type} >
            <img className='button-img' src={`edit-bar-${type}-icon.svg`}/>
            <span className='button-text'>{type}</span>
        </button>
    )
}

const InsertContentBar = memo( ({ id, onInsert, onRemove }) => {
    const onClick = useCallback( e => {
        // get button element through event delegation
        const element =  (e.target.nodeName === "BUTTON" )
            ? e.target
            : (e.target.parentElement.nodeName === "BUTTON")
                ? e.target.parentElement
                : null
        
        // could be empty if user just click parent element
        if(!element) return

        // remove or instert actions
        const type = element.dataset.type;
        if( type === "remove" ) onRemove( id )
        else onInsert( id )( type )

    }, [ id ])

    return (
        <div className='edit-content-bar' onClick={onClick} >
            <ButtonEditBar type="text"  />
            <ButtonEditBar type="option"/>
            <ButtonEditBar type="image" />
            <ButtonEditBar type="video" />
            <ButtonEditBar type="file"  />
            { id && <ButtonEditBar type="remove"/> }
        </div>
    )
})

const NodeTitle = memo(({ id, title, onChangeTitle })=>{
    return(
        <div className='node-title'>
            <Handle id={ id } type="target" position={Position.Left} />
            <label htmlFor={id}>
                <TextContent id={id} data={title} onChangeData={onChangeTitle} />
            </label>
        </div>)
})

const VideoContent = ({ id, data, onChangeData })=>{
    return(
        <>
            <TextContent id={id} data={data} onChangeData={onChangeData} />
            <ReactPlayer width={"100%"} height={"100px"} light={true} url={data}/>
        </>
    )
}

const ImageContent = ({id, data, onChangeData})=>{
    return(
        <>
            <TextContent id={id} data={data} onChangeData={onChangeData} />
            <img src={data} />
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
                        autoFocus={editable}
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

const FileContent = ({ id, data, onChangeData })=>{
    return(
        <>
            <TextContent id={id} data={data} onChangeData={onChangeData} />
        </>
    )
}

const OptionContent = ({id, data, onChangeData })=>{
    const handleId = id.replace("content","handle")
    return (
        <>
            <TextContent id={id} data={data} onChangeData={onChangeData} />
            <Handle type="source" id={handleId} position={Position.Right}  />
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

// content: { type:"", id:"", data:"" }
const DataContent =  ({ id, type, data, onMove, onEdit }) => {

    const moveCallback = useCallback( value => onMove(id)(value), [id, onMove])
    const onChangeData = useCallback( value => onEdit(id)(value), [id, onEdit])

    return (
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
export { NodeTitle, InsertContentBar };
