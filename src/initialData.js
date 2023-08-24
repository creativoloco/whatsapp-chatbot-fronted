import {MarkerType} from 'reactflow'

export const initialNodes = [
    {
        id: '1',
        type: 'target',
        data: { label: 'Incoming message', },
        position: { x: 100, y: 100 }
    },
    {
        id: '2',
        type: 'MessagesNodeType',
        data: {
            label: 'Node 2',
            contentsCollection: [ ],
        },
        position: { x: 100, y: 200 },
    }
]

export const initialEdges = [
    {
        id: 'e1-2',
        source: '1',
        target: '2',
        markerEnd: {
            type: MarkerType.ArrowClosed,
            height: 20,
            width: 20
        },
        animated: true,
        targetHandle: "2"
    }
]
