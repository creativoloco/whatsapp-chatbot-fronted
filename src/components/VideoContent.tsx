import ReactPlayer from "react-player"
import { TextContent } from "./TextContent"
import {useContext} from "react"
import {ContentContext} from "../context/contentContext"

export const VideoContent = ()=>{
    const {data} = useContext(ContentContext)
    return(
        <>
            <TextContent/>
            <ReactPlayer
                width={"100%"}
                height={"100px"}
                light={true}
                url={data}
            />
        </>
    )
}
