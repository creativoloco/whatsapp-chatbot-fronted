import {createContext, memo, useCallback, useContext, useMemo} from "react"
import {NodeContext } from './nodeContext'
import type { ContentContextType, NodeContentType } from '../@types/nodeData.d.ts'

import {useStore} from '../store'
import {useUpdateNodeInternals} from "reactflow"

type props = {
  content: NodeContentType,
  children: any
}

const mockupContext:ContentContextType = {
  nodeId: "",
  id:"",
  type: "",
  data:"",
  remove: ()=>{},
  insert: (type:string)=>{type},
  move: (value: string)=>{value},
  edit: (value:string)=>{value},

}

export const ContentContext = createContext<ContentContextType>(mockupContext)

export const ContentProvider = memo(({content,children}: props)=>{

  // store
  const moveContent       = useStore( store=>store.moveContent )
  const addContent        = useStore( store=>store.addContent )
  const removeContent     = useStore( store=>store.removeContent )
  const updateNodeContent = useStore( store=>store.updateNodeContent )

  // update node internals in every event who changes Handlers position
  const updateNodeInternals = useUpdateNodeInternals()
  
  const { id: nodeId } = useContext( NodeContext )

  // 
  // actions
  //
  const edit = useCallback( (value:string) => {
    updateNodeContent( nodeId, content.id, value)
  }, [nodeId, content.id])
  

  //
  // actions that require  node internals updating
  //
  const move = useCallback( (value: string) => {
    moveContent( nodeId, content.id, value)
    updateNodeInternals(nodeId)
  }, [ content.id, nodeId ])

  const insert = useCallback( (type:string) =>{
    addContent( nodeId, type, content.id )
    updateNodeInternals(nodeId)
  }, [content, nodeId])

  const remove = useCallback( () => {
    removeContent( nodeId, content.id ) 
    updateNodeInternals(nodeId)
  }, [nodeId, content.id])


  // memoized value provider
  const valueProvider = useMemo(()=>({
    ...content,
    nodeId,
    move,
    insert,
    remove,
    edit
  }), [content])


  return (
    <ContentContext.Provider value={valueProvider} >
      <div key={content.id} className="data-content" >
        { children }
      </div>
    </ContentContext.Provider>
  )
})


