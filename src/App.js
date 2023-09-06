import {useCallback, useRef, useState} from 'react'
import ReactFlow, {
    Background, Controls, Panel, ReactFlowProvider,
    useReactFlow
} from 'reactflow'

import 'reactflow/dist/style.css'
import './App.css'
import {useStore} from './store'

import MessagesNodeType from './nodes/Messages'

const nodeTypes = {MessagesNodeType}

const Flow = () => {
    const {
        edges, onEdgesChange, addEdge,
        nodes, onNodesChange, createNode, createNodeOption, onNodeDragStop,
        saveLocal, restoreLocal,
    } = useStore()

    const [rfInstance, setRfInstance] = useState(null)
    const {setViewport, project} = useReactFlow()
    const reactFlowContainer = useRef()
    const onConnectStartParams = useRef()

    const onConnectStart = useCallback((mouseEvent, params) => 
        onConnectStartParams.current = params
        , [onConnectStartParams])

    const isValidConnection = useCallback( edge =>
        !edges.find( e=> e.sourceHandle === edge.sourceHandle )
        , [edges])

    const onConnectEnd = useCallback( mouseEvent => {
        if(
            !mouseEvent.target.classList.contains('react-flow__pane') ||
            onConnectStartParams.current.handleType != "source"
        ) return
        const { top, left } = reactFlowContainer.current.getBoundingClientRect()
        const position = project( {
            x: mouseEvent.clientX - left,
            y: mouseEvent.clientY - top
        }) 
        const edgeDetails = {
            source: onConnectStartParams.current.nodeId,
            sourceHandle: onConnectStartParams.current.handleId,
        }
        createNodeOption( position, edgeDetails )

    }, [ project, createNodeOption, reactFlowContainer, onConnectStartParams] )

    const onSaveLocal = useCallback(() => 
        saveLocal(rfInstance)
        , [rfInstance])

    const onRestoreLocal = useCallback(() => {
        const {x = 0, y = 0, zoom = 1} = restoreLocal()
        setViewport({x, y, zoom})
    }, [rfInstance])

    const onCreateNode = useCallback(() => {
        const { top, left, bottom, right } =
            reactFlowContainer.current.getBoundingClientRect()
        const position ={
            x: left + (right - left)/2,
            y: top + (bottom-top)/2
        }
        createNode(project(position))
    }, [rfInstance])

    return (
        <div ref={reactFlowContainer} style={{width: '100vw', height: '100vh'}}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onNodeDragStop={onNodeDragStop}
                onConnect={addEdge}
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
