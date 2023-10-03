import {useCallback, useEffect, useRef, useState} from 'react'
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
    const edges = useStore(store=>store.edges)
    const onEdgesChange = useStore(store=>store.onEdgesChange)
    const addEdge = useStore(store=>store.addEdge)
    const nodes = useStore(store=>store.nodes)
    const onNodesChange = useStore(store=>store.onNodesChange)
    const createNode = useStore(store=>store.createNode)
    const createNodeOption = useStore(store=>store.createNodeOption)
    const onNodeDragStop = useStore(store=>store.onNodeDragStop)
    const saveLocal = useStore(store=>store.saveLocal)
    const restoreLocal = useStore(store=>store.restoreLocal)

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

    const onSaveLocal = useCallback(() => saveLocal(rfInstance) , [rfInstance])

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

    const onLoadFromFile = useCallback((e)=>{
        console.log(e)
        const f = e.target.files[0]
        if (f) {
            var r = new FileReader();
            r.onload = (e)=>{
                localStorage.setItem("flow",e.target.result)
                console.log("ok")
            }
            r.readAsText(f);
        }
    },[])

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
                    <SavePanel 
                        edges={edges}
                        nodes={nodes}
                        onSaveLocal={onSaveLocal}
                    />
                    <button onClick={onRestoreLocal}>restore local </button>
                    <input type="file" onChange={ onLoadFromFile } />
                </Panel>
                <Controls />
                <Background />
            </ReactFlow>
        </div>
    )
}

const SavePanel = ( {edges, nodes, onSaveLocal} ) => {
    const [ isSaved, setSaved ]  = useState( true )
    const [ autoSave, setAutoSave ] = useState( false )
    const [ inCloud, setInCloud] = useState( false )

    // local saving
    useEffect(()=>{
        let saveTimeoutId

        // every dependency change will alter saved status
        setSaved(false)
        setInCloud(false)
        
        // set timeout to avoid multiple calls to onSave function
        if( autoSave ) saveTimeoutId = setTimeout( ()=>onSave() ,1000)

        // cleanup useEffect 
        return ()=> saveTimeoutId && clearTimeout(saveTimeoutId)
    },[ edges, nodes, autoSave])


    // cloud saving
    useEffect(()=>{
        // cloudTID: cloud timeout id
        let cloudTID
        if( isSaved )
            cloudTID = setTimeout( ()=>{

                //
                //
                // @todo SAVE ON CLOUD METHOD
                console.log("cloud saving")
                //
                //

                setInCloud(true)
            }, 2000)
        
        return ()=> cloudTID && clearTimeout(cloudTID)
    },[isSaved])
    
    const onSave = useCallback(()=>{
        onSaveLocal()
        setSaved(true)
    },[])

    const toogleAutosave = useCallback(()=> setAutoSave(prevState => !prevState))

    return (
        <>
            <button onClick={toogleAutosave}>{autoSave ? "🔒":" 🔓"}</button>
            <button onClick={onSave} disabled={isSaved || autoSave}>
                {
                    isSaved ?
                        `saved ${ inCloud ? '🔷 cloud': '🔶local'}` :
                        "♦️  save"
                }</button>
        </>
    )
}

export default () => (
    <ReactFlowProvider>
        <Flow />
    </ReactFlowProvider>
)
