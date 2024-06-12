import G6, { EdgeConfig, Graph, IG6GraphEvent, INode, NodeConfig } from '@antv/g6'
import { Bool } from '@renderer/constant/base'
import { IApi } from '@renderer/interface/api'
import { I2DCoordinate } from '@renderer/interface/graph'
import {
  formToNote,
  noteToNode,
  relationToEdge,
  stringArrayToObj
} from '@renderer/tools/graph/transData'
import { useBoolean, useMount, useSetState, useSize } from 'ahooks'
import { Spin } from 'antd'
import { useEffect, useRef } from 'react'
import NoteForm from './components/Form'
import 图配置 from './constant/config'
import { 图事件列表 } from './constant/event'
import './index.less'

const { create, get, update } = window.api as IApi

const data = {
  // 点集
  nodes: [
    {
      id: 'isShowForm',
      x: 0,
      y: 0
    }
  ],
  // 边集
  edges: []
}

let graph: Graph
const Main = () => {
  const graphRef = useRef<HTMLDivElement>(null)
  const size = useSize(graphRef)

  const [nodeData, setNodeData] = useSetState<NodeConfig[]>([])
  const [edgeData, setEdgeData] = useSetState<EdgeConfig[]>([])

  const [isShowForm, { setTrue: setShowForm, setFalse: setHideForm }] = useBoolean(false)
  const [isLoading, { setTrue: setLoading, setFalse: setLoadEnd }] = useBoolean(false)

  const [canvasDblClickPositionOnCanvas, setCanvasDblClickPositionOnCanvas] =
    useSetState<I2DCoordinate>({
      x: 0,
      y: 0
    })

  //#region 事件
  const handleCanvasDblClick = (e: IG6GraphEvent) => {
    const position = {
      x: Math.floor(e.canvasX),
      y: Math.floor(e.canvasY)
    }
    setCanvasDblClickPositionOnCanvas(position)

    const node = graph.findById('isShowForm')
    const nodeState = stringArrayToObj<{
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

  const handleNodeDragend = (e: IG6GraphEvent) => {
    console.log('handleNodeDragend', e)
    const item = e.item! as INode
    if (item.getID()) {
      get.getNoteById(item.getID()).then((res) => {
        console.log('res', res)
        const attributesString = res?.attributes
        const attributes = attributesString ? JSON.parse(attributesString) : {}
        update
          .updateNoteById(item.getID(), {
            attributes: JSON.stringify({
              ...attributes,
              x: Math.floor(item.getModel().x!),
              y: Math.floor(item.getModel().y!)
            })
          })
          .then((res) => {
            console.log('res', res)
          })
      })
    }
  }

  const bindEvents = () => {
    图事件列表.forEach(({ eventName, callback, once }) => {
      graph.on(eventName, callback, once)
    })
    graph.on('node:dragend', handleNodeDragend)
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
    }
  }

  const fetchData = () => {
    setLoading()
    Promise.all([get.getAllNote(), get.getAllRelation()]).then((res) => {
      setNodeData(res[0].map(noteToNode))
      setEdgeData(res[1].map(relationToEdge))

      graph.data({
        nodes: res[0].map(noteToNode),
        edges: res[1].map(relationToEdge)
      })
      graph.render()
      graph.setItemState('isShowForm', 'isShowForm', Bool.FALSE)
      setLoadEnd()
    })
  }

  const onSubmit = (values) => {
    create.createNote(formToNote(values)).then((res) => {
      console.log('res', res)
      fetchData()
      setHideForm()
      graph.setItemState('isShowForm', 'isShowForm', Bool.FALSE)
    })
  }
  //#endregion

  useMount(() => {
    initGraph()
    fetchData()
  })

  useEffect(() => {
    if (size && graph) {
      graph.changeSize(size.width, size.height)
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
          <NoteForm position={canvasDblClickPositionOnCanvas} onSubmit={onSubmit} />
        </div>
      )}
      <Spin spinning={isLoading} />
      <div className="graph" ref={graphRef} onDoubleClick={() => {}}></div>
    </>
  )
}
export default Main
