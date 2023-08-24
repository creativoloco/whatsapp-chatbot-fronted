import { applyNodeChanges, applyEdgeChanges } from 'reactflow'
import { create } from 'zustand'

import {initialNodes,initialEdges} from './initialData'

const flowLocalKey = 'flow'
const getNodeId = () => `randomnode${+new Date()}`

export const useStore = create((set, get) => ({
    nodes: initialNodes,
    edges: initialEdges,
    onNodesChange(changes) {
        set({ nodes: applyNodeChanges(changes, get().nodes), })
    },
    onEdgesChange(changes) {
        set({ edges: applyEdgeChanges(changes, get().edges), })
    },
    addEdge(data) {
        const id = getNodeId()
        const edge = { id, ...data }

        set({ edges: [edge, ...get().edges] })
    },
    createNode() {
        const nodes = get().nodes
        const node = {
            id: getNodeId(),
            type:'MessagesNodeType',
            data: {
                label:`node ${nodes.length}`,
                contentsCollection:[]
            },
            position: { x:0, y:0 }
        }
        set({ nodes: [...nodes, node ] })
    },
    saveLocal( rfInstance ){
        if(!rfInstance) return
        const flow = rfInstance.toObject()
        localStorage.setItem(flowLocalKey, JSON.stringify(flow))
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
    addContent(parentID, {type, contentId}){
        const prevNodes = get().nodes
        const handleID = getNodeId()
        const nodes = prevNodes.map(node =>{
            if(node.id === parentID){
                const prevCC = node.data.contentsCollection

                const index = contentId
                    ? prevCC.findIndex( content => (content.id === contentId) )
                    : -1

                const contentsCollection = prevCC.toSpliced( index+1, 0,{
                    type: type,
                    id: handleID,
                    data: ""
                })
                return{
                    ...node,
                    data: {...node.data, contentsCollection},
                }
            }
            return {...node}
        })
        set({ nodes: [ ...nodes ] })
    },
    removeContent( nodeID, contentId ){
        const prevNodes = get().nodes
        const nodes = prevNodes.map(node =>{
            if(node.id === nodeID){
                const prevCC = node.data.contentsCollection
                const index = contentId
                    ? prevCC.findIndex( content => (content.id === contentId) )
                    : -1
                const contentsCollection = prevCC.toSpliced( index, 1)
                return{
                    ...node,
                    data: {...node.data, contentsCollection},
                }
            }
            return {...node}
        })
        set({ nodes: [ ...nodes ] })
    },
    updateNodeContent(id, {contentId,type,data}) {
        set({
            nodes: get().nodes.map(node =>{

                if(node.id === id){
                    const prevCC = node.data.contentsCollection
                    const contentsCollection = prevCC.map( prevContent => {

                        // content { id:"", type:"", data:""}

                        if( prevContent.id === contentId )
                            return { ...prevContent, data }

                        return {...prevContent}
                    })

                    return {
                        ...node,
                        data: { ...node.data, contentsCollection } }
                }

                return {...node}
            })
        })
    },
    updateNodeLabel(id, label) {
        set({
            nodes: get().nodes.map(node =>
                node.id === id
                ? {...node, data: { contentsCollection: [...node.data.contentsCollection], label}}
                :node
            )
        })
    },
    /*addContent(parentID, x = 0, y = 0 ) {
        const prevNodes = get().nodes
        const edges = get().edges
        const nodeID = getNodeId()
        const handleID = getNodeId()
        const newNode = {
                id: nodeID,
                type:'MessagesNodeType',
                data: {
                    label:`node ${prevNodes.length}`,
                    content:[]
                },
                position: { x, y }
            }
        const newEdge = {
                id:getNodeId(),
                source: parentID,
                target: nodeID,
                animated: true,
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    height: 20,
                    width: 20
                },
                sourceHandle: handleID
            }
        const nodes = prevNodes.map(node =>{
                if(node.id === parentID){
                    const content = node.data.content.map(item=>({...item}))
                    content.push({
                        type: "option",
                        id: handleID,
                        content: ""
                    })
                    return{
                        ...node,
                        data: {...node.data, content},
                    }
                }
                return node
            })


        set({
            nodes: [...nodes, newNode],
            edges: [...edges, newEdge]
        })
    },*/
}))
