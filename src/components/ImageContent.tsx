import {useContext} from "react"
import { TextContent } from "./TextContent"
import {ContentContext} from "../context/contentContext"

export const ImageContent = ()=>{
    const {data} = useContext(ContentContext)
    return(
        <>
            <TextContent/>
            <img src={data} />
        </>
    )
}
