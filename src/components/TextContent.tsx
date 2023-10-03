import { useState, useEffect, useContext } from 'react'
import {ContentContext} from '../context/contentContext'

type props = {
    customText?:string,
    customHandler?: (text:string)=>void
}

export const TextContent = ({customText,customHandler}:props)=>{
    const {id,data,edit} = useContext(ContentContext)
    const [editable, setEditable] = useState<boolean>( false )
    const [text, setText ] = useState<string>( customText || data )

    const onChange:React.ChangeEventHandler<HTMLTextAreaElement> =
        (e) => setText( e.target.value )

    // save data state to store after 2 sec
    useEffect( ()=>{
        if (!editable) return;
        const timeoutID = setTimeout(
            () => customHandler ?  customHandler(text) : edit(text) ,
            2000
        )
        return ()=> clearTimeout(timeoutID)
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
