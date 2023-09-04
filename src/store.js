import { applyNodeChanges, applyEdgeChanges } from 'reactflow'
import { create } from 'zustand'

import {initialNodes,initialEdges, DEFAULT_EDGE, DEFAULT_NODE} from './initialData'

const flowLocalKey = 'flow'
const getId = (type) => `${type}${+new Date()}`

export const useStore = create((set, get) => ({
    nodes: initialNodes,
    edges: initialEdges,
    onNodesChange(changes) {
        const nodes = applyNodeChanges( changes, get().nodes)
        set({ nodes })
    },
    onEdgesChange(changes) {
        const edges = applyEdgeChanges( changes, get().edges )
        set({ edges })
    },
    // move x position of all special nodes
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
        const id = getId("edge")
        const edge = { ...DEFAULT_EDGE, ...data, id }
        const edges = [ ...get().edges, edge ]
        set({ edges })
    },
    createNode( position ){
        const nodes = get().nodes
        const selectedNode = nodes.find( n => n.selected )
        const node = {
            ...DEFAULT_NODE,
            id: getId("node"),
            data: { title:"", contentsCollection:[] },
        }
        if( selectedNode ){
            node.position = {
                x: selectedNode.position.x + 300,
                y: selectedNode.position.y
            }
        } else if( position ) {
            node.position = position
        }else{
            node.position = { x: 0, y: 0 }
        }
        set({ nodes: [...nodes, node ] })
    },
    createNodeOption( position, edgeDetails ) {
        const { nodes, edges } = get()
        const node = {
            ...DEFAULT_NODE,
            id: getId("node"),
            data: { title:"", contentsCollection:[] },
            position
        }
        const edge = {
            ...DEFAULT_EDGE,
            ...edgeDetails,
            id: getId("edge"),
            target: node.id,
            targetHandle: node.id
        }
        // check if some edge already has the same source handle
        const isHandlerAvaible = !edges.find(
            ed => ed.sourceHandle === edge.sourceHandle
        )
        if( isHandlerAvaible )
            set({ nodes: [...nodes, node ], edges: [...edges, edge] })
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
        const id = getId("content")
        const nodes = get().nodes.map( node =>{
            if( node.id !== parentID) return node
            const prevCC = node.data.contentsCollection

            const index = contentId
                ? prevCC.findIndex( content => (content.id === contentId) )
                : -1

            const content = { type, id, data: "" }
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
        const handleId = contentId.replace("content","handle")
        const edges = get().edges.filter(edg => edg.sourceHandle != handleId )
        set({ nodes, edges })
    },
    updateNodeContent(id, contentId, data) {
        const nodes = get().nodes.map( node =>{
            // update content data
            if( node.id != id ) return node
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
