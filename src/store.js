import { applyNodeChanges, applyEdgeChanges } from 'reactflow'
import { create } from 'zustand'

import {initialNodes,initialEdges, DEFAULT_EDGE, DEFAULT_NODE} from './initialData'

const flowLocalKey = 'flow'
const getNodeId = () => `randomnode${+new Date()}`

export const useStore = create((set, get) => ({
    nodes: initialNodes,
    edges: initialEdges,
    onNodesChange(changes) {
        const nodes = applyNodeChanges( changes, get().nodes)
        set({ nodes })
    },
    onEdgesChange(changes) {
        console.log(changes)
        const edges = applyEdgeChanges( changes, get().edges )
        set({ edges })
    },
    // move x position of special nodes
    onNodeDragStop(e,node){
        const isMain = node.id.startsWith("main") 
        const isFirst = node.id.startsWith("first") 
        const type = isMain ? "main" : (isFirst ? "first" : null)

        if( !type ) return

        const nodes = get().nodes.map( prevNode => {
            prevNode.id.startsWith(type)
                ?  prevNode.position.x = node.position.x
                : prevNode
            return prevNode
        })
        set({ nodes })
    },
    addEdge(data) {
        const id = getNodeId()
        const edge = { ...DEFAULT_EDGE, ...data, id }
        const edges = [ ...get().edges, edge ]
        set({ edges })
    },
    createNode() {
        const nodes = get().nodes
        const position = { x:0, y:0 }
        const selected = nodes.find(n=>n.selected)
        
        if( selected ) {
            position.x = selected.position.x + 300
            position.y = selected.position.y
        }        

        const node = {
            ...DEFAULT_NODE,
            id: getNodeId(),
            data: {
                title:`node ${nodes.length}`,
                contentsCollection:[]
            },
            position
        }
        set({ nodes: [...nodes, node ] })
    },
    saveLocal( rfInstance ){
        if(!rfInstance) return
        const flow = rfInstance.toObject()
        localStorage.setItem( flowLocalKey, JSON.stringify(flow) )
    },
    restoreLocal (){
        const localData = localStorage.getItem(flowLocalKey)
        const flow = JSON.parse( localData )

        if(!flow) return

        const nodes = flow.nodes || []
        const edges = flow.edges || []
        set({ nodes, edges })
        return flow.viewport
    },



    //
    // content related functions
    //
    addContent(parentID, type, contentId){
        const handleID = getNodeId()
        const nodes = get().nodes.map( node =>{
            if( node.id !== parentID) return node
            const prevCC = node.data.contentsCollection

            const index = contentId
                ? prevCC.findIndex( content => (content.id === contentId) )
                : -1

            const content = { type, id: handleID, data: "" }
            const contentsCollection = prevCC.toSpliced( index + 1, 0, content )
            return{ ...node, data: {...node.data, contentsCollection} }
        })
        set({ nodes })
    },
    moveContent(nodeID, contentId, moveTo){
        const nodes = get().nodes.map( node =>{
            if(node.id !== nodeID) return node

            const prevCC = node.data.contentsCollection
            const contentIndex = prevCC.findIndex(
                content => (content.id === contentId)
            )

            // avoid move first and last element in wrong directions
            if( moveTo=="up"   && contentIndex == 0 ||
                moveTo=="down" && contentIndex == prevCC.length-1)
                return node

            const offset = (moveTo == "up") ? 1 : 0;
            const start = contentIndex - offset

            const contentsCollection = prevCC.toSpliced(
                start, 2, prevCC[ start + 1 ], prevCC[ start ])

            return { ...node, data: {...node.data, contentsCollection} }
        })

        set({ nodes })
    },
    removeContent( id, contentId ){
        const nodes = get().nodes.map(node =>{
            if(node.id != id) return node
            const prevCC = node.data.contentsCollection
            const index = contentId
                ? prevCC.findIndex( content => (content.id === contentId) )
                : -1
            const contentsCollection = prevCC.toSpliced( index, 1)
            return { ...node, data: {...node.data, contentsCollection} }
        })
        set({ nodes })
    },
    updateNodeContent(id, contentId, data) {
        const nodes = get().nodes.map( node =>{
            if( node.id !== id ) return node

            const prevCC = node.data.contentsCollection
            const contentsCollection = prevCC.map( prevContent => {
                // content { id:"", type:"", data:""}
                if( prevContent.id !== contentId ) return prevContent
                return { ...prevContent, data }
            })

            return { ...node, data: { ...node.data, contentsCollection } }
        })
        set({ nodes })
    },
    updateNodeTitle(id, title) {
        const nodes = get().nodes.map( node =>
            (node.id === id)
            ?  { ...node, data: { ...node.data, title } }
            : node
        )
        set({ nodes })
    },
}))
