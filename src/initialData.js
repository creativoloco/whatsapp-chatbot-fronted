import {MarkerType} from 'reactflow'

const DEFAULT_X_POS = -1000;

export const DEFAULT_EDGE = {
    strokeWidth: 2,
    animated: true,
    markerEnd: {
        type: MarkerType.ArrowClosed,
        height: 20,
        width: 20,
    },
}
export const DEFAULT_NODE = {
    type: 'MessagesNodeType',
}

const DEFAULT_MAIN_NODES = {
    type: 'input',
    deletable: false,
    connectable: false,
    sourcePosition: 'right',
}
const DEFAULT_MAIN_EDGES = {
    ...DEFAULT_EDGE,
    deletable: false,
    focusable: false,
}
const FIRST_NODE = {
    ...DEFAULT_NODE,
    deletable: false,
}

export const initialNodes = [
    {
        ...DEFAULT_MAIN_NODES,
        id: 'main-new-chat',
        data: { label: 'new chat' },
        position: { x: DEFAULT_X_POS, y: -2000 }
    }, {
        ...DEFAULT_MAIN_NODES,
        id: 'main-invalid-response',
        data: { label: 'invalid response' },
        position: { x: DEFAULT_X_POS, y: -1000 }
    }, {
        ...DEFAULT_MAIN_NODES,
        id: 'main-call',
        data: { label: 'call (audio or video)', },
        position: { x: DEFAULT_X_POS, y: 0 }
    }, {
        ...FIRST_NODE,
        id: 'first-n0',
        data: { title: 'Greeting', contentsCollection: [ ], },
        position: { x: DEFAULT_X_POS + 300, y: -2000 },
    }, {
        ...FIRST_NODE,
        id: 'first-n1',
        data: { title: 'Wrong answer message', contentsCollection: [ ], },
        position: { x: DEFAULT_X_POS + 300, y: -1000 },
    }, {
        ...FIRST_NODE,
        id: 'first-n2',
        data: { title: 'Out of time', contentsCollection: [ ], },
        position: { x: DEFAULT_X_POS + 300, y: -250 },
    },{
        ...FIRST_NODE,
        id: 'first-n3',
        data: { title: 'chatbot not finished', contentsCollection: [ ], },
        position: { x: DEFAULT_X_POS + 300, y: 250 },
    }
]

export const initialEdges = [
    {
        ...DEFAULT_MAIN_EDGES,
        source: 'main-new-chat', target: 'first-n0',
        id: 'e0',
    },{
        ...DEFAULT_MAIN_EDGES,
        source: 'main-invalid-response', target: 'first-n1',
        id: 'e1',
    },{
        ...DEFAULT_MAIN_EDGES,
        source: 'main-call', target: 'first-n2',
        id: 'e2a',
    },{
        ...DEFAULT_MAIN_EDGES,
        source: 'main-call', target: 'first-n3',
        id: 'e2b',
    }
]
