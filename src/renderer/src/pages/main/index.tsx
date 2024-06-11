import G6, { Graph } from '@antv/g6'
import { Bool } from '@renderer/constant/base'
import { I2DCoordinate } from '@renderer/interface/graph'
import { stringArray2Obj } from '@renderer/tools/graph/transData'
import { useBoolean, useMount, useSetState, useSize } from 'ahooks'
import { useEffect, useRef } from 'react'
import NoteForm from './components/Form'
import 图配置 from './constant/config'
import { 图事件列表 } from './constant/event'
import './index.less'

const data = {
  // 点集
  nodes: [
    {
      id: 'node1', // String，该节点存在则必须，节点的唯一标识
      x: 100, // Number，可选，节点位置的 x 值
      y: 200 // Number，可选，节点位置的 y 值
    },
    {
      id: 'node2', // String，该节点存在则必须，节点的唯一标识
      x: 300, // Number，可选，节点位置的 x 值
      y: 200 // Number，可选，节点位置的 y 值
    },
    {
      id: 'isShowForm'
    }
  ],
  // 边集
  edges: [
    {
      source: 'node1', // String，必须，起始点 id
      target: 'node2' // String，必须，目标点 id
    }
  ]
}

const Main = () => {
  const graphRef = useRef<HTMLDivElement>(null)
  const size = useSize(graphRef)

  const [isShowForm, { setTrue: setShowForm, setFalse: setHideForm }] = useBoolean(false)

  const [canvasDblClickPositionOnCanvas, setCanvasDblClickPositionOnCanvas] =
    useSetState<I2DCoordinate>({
      x: 0,
      y: 0
    })

  let graph: Graph

  const handleCanvasDblClick = (e: any) => {
    const node = graph.findById('isShowForm')
    const nodeState = stringArray2Obj<{
      isShowForm: Bool
    }>(node?.getStates())

    if (nodeState.isShowForm === Bool.FALSE) {
      setShowForm()
      graph.setItemState('isShowForm', 'isShowForm', Bool.TRUE)
    } else {
      setHideForm()
      graph.setItemState('isShowForm', 'isShowForm', Bool.FALSE)
    }
  }

  const bindEvents = () => {
    图事件列表.forEach(({ eventName, callback, once }) => {
      graph.on(eventName, callback, once)
    })
    graph.on('canvas:dblclick', handleCanvasDblClick)
  }

  const initGraph = () => {
    if (!graph) {
      graph = new G6.Graph({
        ...图配置,
        container: graphRef.current!
      })

      graph.data(data)
      graph.render()
      bindEvents()
      graph.fitView()
      graph.setItemState('isShowForm', 'isShowForm', Bool.FALSE)
    }
  }

  useMount(() => {
    initGraph()
  })

  useEffect(() => {
    if (graph && size) {
      graph.changeSize(size.width, size.height)
      graph.fitView()
    }
  }, [size?.height, size?.width])

  return (
    <>
      {isShowForm && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            zIndex: 100,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <NoteForm />
        </div>
      )}
      <div className="graph" ref={graphRef} onDoubleClick={() => {}}></div>
    </>
  )
}
export default Main
