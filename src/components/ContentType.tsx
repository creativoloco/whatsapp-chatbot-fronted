import { Component, FunctionComponent, memo, useCallback, useContext } from 'react'

import './content-type.css'

import { MoveContentBar } from './MoveContentBar'
import { TextContent } from './TextContent'
import { OptionContent } from './OptionContent'
import { ImageContent } from './ImageContent'
import { VideoContent } from './VideoContent'
import { FileContent } from './FileContent'
import { InsertContentBar } from './InstertContentBar'
import { NodeTitle } from './NodeTitle'
import {ContentContext} from '../context/contentContext'


type props ={
    id: string,
    type: string,
    data: string,
    onMove: (id:string)=> (value:string) => void,
    onEdit: (id:string)=> (value:string) => void
}


const ContentWrapper = ({children}:any)=>{
    const {id, type } = useContext(ContentContext)
    return(
        <>
            <MoveContentBar/>
            <div className='data-info'>
                <label htmlFor={id} >{type} message:</label>
                {children}
            </div>
        </>
    )
}

const DataContent = () => {
    const { type } = useContext(ContentContext)
    switch( type ){
        case "text":   return <ContentWrapper><TextContent/>  </ContentWrapper>
        case "option": return <ContentWrapper><OptionContent/></ContentWrapper>
        case "image":  return <ContentWrapper><ImageContent/> </ContentWrapper>
        case "video":  return <ContentWrapper><VideoContent/> </ContentWrapper>
        case "file":   return <ContentWrapper><FileContent/>  </ContentWrapper>
        default:       return null

    }
}

export default memo(DataContent)
export { NodeTitle, InsertContentBar };
