import React, { useState, useCallback } from 'react'
import {shallow} from 'zustand/shallow'
import ReactFlow, {
    Background,
    ReactFlowProvider,
    useReactFlow,
    Panel,
    Controls,
} from 'reactflow'

import 'reactflow/dist/style.css'
import './App.css'
import {useStore} from './store'

import MessagesNodeType from './nodes/Messages'

const selector = (store) => ({
    nodes: store.nodes,
    edges: store.edges,
    onNodesChange: store.onNodesChange,
    onEdgesChange: store.onEdgesChange,
    addEdge: store.addEdge,
    createNode: store.createNode,
    saveLocal: store.saveLocal,
    restoreLocal: store.restoreLocal,
})

const nodeTypes = { MessagesNodeType }

const SaveRestore = () => {
    const store = useStore( selector, shallow )
    const [rfInstance, setRfInstance] = useState(null)
    const {setViewport} = useReactFlow()

    const onSaveLocal = useCallback(()=>{
        store.saveLocal( rfInstance )
    },[rfInstance])
    
    const onRestoreLocal = useCallback(()=>{
        const {x=0,y=0,zoom=1} = store.restoreLocal( )
        setViewport( {x,y,zoom} )
    },[rfInstance])
    
    return (
        <ReactFlow
            nodes={store.nodes}
            edges={store.edges}
            onNodesChange={store.onNodesChange}
            onEdgesChange={store.onEdgesChange}
            onConnect={store.addEdge}
            nodeTypes={nodeTypes}
            onInit={setRfInstance}
            fitView
        >
            <Panel position="top-right">
                <button onClick={ store.createNode }>add node</button>
                <button onClick={ onSaveLocal }>save</button>
                <button onClick={ onRestoreLocal }>restore</button>
            </Panel>
            <Controls/>
            <Background/>
        </ReactFlow>
    )
}

export default () => (
    <ReactFlowProvider>
        <SaveRestore />
    </ReactFlowProvider>
)
