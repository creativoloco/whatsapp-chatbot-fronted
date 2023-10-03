import {memo} from 'react'
import DataContent, {InsertContentBar, NodeTitle} from '../components/ContentType'

import type {NodeDataType} from '../@types/nodeData'


import './messages.css'
import {NodeProvider} from '../context/nodeContext'
import {ContentProvider} from '../context/contentContext'


type props = {
    id: string,
    data: NodeDataType
}

const MessagesNodeType = ({id, data}: props) => {

    return (
            <NodeProvider id={id} data={data} >
                <NodeTitle />
                <InsertContentBar />
                {data.contentsCollection.map(
                    content =>
                        <ContentProvider key={content.id} content={content}>
                            <DataContent />
                            <InsertContentBar />
                        </ContentProvider>
                )}
            </NodeProvider>
    )
}
export default memo(MessagesNodeType)
