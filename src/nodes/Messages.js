import { useCallback, memo } from 'react'
import DataContent, {NodeTitle,InsertContentBar } from '../components/ContentType'
import {useUpdateNodeInternals} from 'reactflow'

import { useStore } from '../store'

import './messages.css'

const MessagesNodeType = ({ id, data })=>{
    const addContent = useStore( store => store.addContent )
    const removeContent = useStore( store => store.removeContent )
    const moveContent = useStore( state => state.moveContent )
    const updateNodeContent = useStore( store => store.updateNodeContent )
    const updateNodeInternals = useUpdateNodeInternals()

    const moveContentCallback = useCallback( contentId => (value) =>{
        moveContent( id, contentId, value )
        updateNodeInternals(id)
    }, [ id ] )

    const insertContentCallback = useCallback( contentId => type =>{
        addContent( id, type, contentId )
        updateNodeInternals(id)
    }, [id])

    const removeContentCallback = useCallback( contentId => {
        removeContent( id, contentId ) 
        updateNodeInternals(id)
    }, [id])
    
    const editDataCallback = useCallback( contentId => value => 
        updateNodeContent( id, contentId, value),
        [id]
    )

    return( <>
        <NodeTitle id={id} title={data.title}/>
        <InsertContentBar
            insertContentCallback = { insertContentCallback }
            removeContentCallback = { removeContentCallback }
        />
        {
            data.contentsCollection.map( content => 
                <div key={content.id} className="data-content"  >
                    <DataContent
                        id = {content.id}
                        type = {content.type}
                        data = {content.data}
                        moveContentCallback = { moveContentCallback }
                        editDataCallback={editDataCallback}
                    />
                    <InsertContentBar
                        id = {content.id}
                        insertContentCallback = { insertContentCallback }
                        removeContentCallback = { removeContentCallback }
                    />
                </div>
            )}
    </>)
}
export default memo(MessagesNodeType)
