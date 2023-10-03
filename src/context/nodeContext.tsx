
import {createContext, useCallback, useMemo} from 'react'
import type { NodeDataType, NodeContextType} from '../@types/nodeData.d.ts'
import {useStore} from '../store.js'


type props = {
  id: string,
  data: NodeDataType,
  children: any
}

const mockupContext:NodeContextType = {
  id: "",
  data:{ title:"", contentsCollection:[{ id:"", type: "", data:"" }] },
  setTitle: (title:string)=>{title}
}
export const NodeContext = createContext<NodeContextType>( mockupContext )

export const NodeProvider = ({id, data, children}:props)=>{
  const updateNodeTitle = useStore( store => store.updateNodeTitle )
  const setTitle = useCallback( (value:string) => updateNodeTitle( id, value), [id])
  const valueProvider = useMemo(()=>({id,data,setTitle}), [setTitle])
  return (
    <NodeContext.Provider value={valueProvider}>
      <div>
        { children }
      </div>
    </NodeContext.Provider>
  )
}


