import {useCallback, useRef, useState} from 'react'
import ReactFlow, {
    Background, Controls, Panel, ReactFlowProvider,
    useReactFlow
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
    onNodeDragStop: store.onNodeDragStop,
    addEdge: store.addEdge,
    createNode: store.createNode,
    createNodeOption: store.createNodeOption,
    saveLocal: store.saveLocal,
    restoreLocal: store.restoreLocal,
})

const nodeTypes = {MessagesNodeType}

const Flow = () => {

    const store = useStore(selector)
    const [rfInstance, setRfInstance] = useState(null)
    const {setViewport, project} = useReactFlow()
    const reactFlowContainer = useRef()
    const onConnectStartParams = useRef()

    const onConnectStart = useCallback((mouseEvent, params) => {
        onConnectStartParams.current = params
    }, [])

    const isValidConnection = useCallback( edge =>{
        return !store.edges.find( e=> e.sourceHandle === edge.sourceHandle )
    }, [store.edges])

    const onConnectEnd = useCallback( mouseEvent => {
        if( !mouseEvent.target.classList.contains('react-flow__pane') ) return
        if( onConnectStartParams.current.handleType != "source") return
        const { top, left } = reactFlowContainer.current.getBoundingClientRect()
        const position = project( {
            x: mouseEvent.clientX - left,
            y: mouseEvent.clientY - top
        }) 
        const edgeDetails = {
            source: onConnectStartParams.current.nodeId,
            sourceHandle: onConnectStartParams.current.handleId,
        }
        store.createNodeOption( position, edgeDetails )

    }, [ project, store.createNodeOption, reactFlowContainer, onConnectStartParams] )

    const onSaveLocal = useCallback(() => {
        store.saveLocal(rfInstance)
    }, [rfInstance])

    const onRestoreLocal = useCallback(() => {
        const {x = 0, y = 0, zoom = 1} = store.restoreLocal()
        setViewport({x, y, zoom})
    }, [rfInstance])

    const onCreateNode = useCallback(() => {
        const { top, left, bottom, right } =
            reactFlowContainer.current.getBoundingClientRect()
        const position ={
            x: left + (right - left)/2,
            y: top + (bottom-top)/2
        }
        const vp = rfInstance.getViewport()
        store.createNode(project(position))
    }, [rfInstance])

    return (
        <div ref={reactFlowContainer} style={{width: '100vw', height: '100vh'}}>
            <ReactFlow
                nodes={store.nodes}
                edges={store.edges}
                onNodesChange={store.onNodesChange}
                onEdgesChange={store.onEdgesChange}
                onNodeDragStop={store.onNodeDragStop}
                onConnect={store.addEdge}
                onConnectStart = { onConnectStart }
                onConnectEnd = { onConnectEnd }
                isValidConnection={isValidConnection}
                nodeTypes={nodeTypes}
                onInit={setRfInstance}
                fitView
            >
                <Panel position="top-right">
                    <button onClick={onCreateNode}>add node </button>
                    <button onClick={onSaveLocal}>save local </button>
                    <button onClick={onRestoreLocal}>restore local </button>
                </Panel>
                <Controls />
                <Background />
            </ReactFlow>
        </div>
    )
}

export default () => (
    <ReactFlowProvider>
        <Flow />
    </ReactFlowProvider>
)
