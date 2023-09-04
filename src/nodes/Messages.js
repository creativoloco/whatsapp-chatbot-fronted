import { useCallback, memo, useMemo } from 'react'
import DataContent, {NodeTitle,InsertContentBar } from '../components/ContentType'
import {useUpdateNodeInternals} from 'reactflow'

import { useStore } from '../store'

import './messages.css'

const MessagesNodeType = ({ id, data })=>{
    const addContent    = useStore( store => store.addContent )
    const removeContent = useStore( store => store.removeContent )
    const moveContent   = useStore( state => state.moveContent )
    const updateNodeTitle = useStore( store => store.updateNodeTitle )
    const updateNodeContent = useStore( store => store.updateNodeContent )
    const updateNodeInternals = useUpdateNodeInternals()

    const onMove = useCallback( contentId => (value) =>{
        moveContent( id, contentId, value )
        updateNodeInternals(id)
    }, [ id ] )

    const onInsert = useCallback( contentId => type =>{
        addContent( id, type, contentId )
        updateNodeInternals(id)
    }, [id])

    const onRemove = useCallback( contentId => {
        removeContent( id, contentId ) 
        updateNodeInternals(id)
    }, [id])
    
    const onEdit = useCallback( contentId => value => 
        updateNodeContent( id, contentId, value),
        [id]
    )
    const onChangeTitle = useCallback( value => 
        updateNodeTitle( id, value),
        [id]
    )

    return( <>
        <NodeTitle id={id} title={data.title} onChangeTitle={onChangeTitle}/>
        <InsertContentBar onInsert = { onInsert } onRemove = { onRemove } />
        { data.contentsCollection.map( content => 
            <div key={content.id} className="data-content"  >
                <DataContent
                    { ...content }
                    onMove = { onMove }
                    onEdit={onEdit}
                />
                <InsertContentBar
                    id = {content.id}
                    onInsert = { onInsert }
                    onRemove = { onRemove }
                />
            </div>
        )}
    </>)
}
export default memo(MessagesNodeType)
