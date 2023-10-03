
export interface NodeContentType {
    id: string,
    type: string,
    data: string
}

export interface NodeDataType {
    title: string,
    contentsCollection: [NodeContentType]
}

export interface NodeContextType {
    id: string,
    data: NodeDataType
    setTitle: (title:string)=>void
}

export interface ContentContextType extends NodeContentType {
    nodeId: string,
    remove: ()=>void,
    insert: (type:string)=>void,
    move: (value: string)=>void,
    edit: (value:string)=>void,
}
