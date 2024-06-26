import G6, { EdgeConfig, Graph, IG6GraphEvent, INode, NodeConfig } from '@antv/g6'
// import { createNodeFromReact } from '@antv/g6-react-node'
import { Bool } from '@renderer/constant/base'
import { I2DCoordinate } from '@renderer/interface/graph'
import {
  formToNote,
  noteToNode,
  relationToEdge,
  stringArrayToObj
} from '@renderer/tools/graph/transData'
import { promiseAddTip } from '@renderer/util/function/requeest'
import { useBoolean, useMount, useSetState, useSize, useUnmount } from 'ahooks'
import { Modal, Spin } from 'antd'
import { useEffect, useRef } from 'react'
import NoteForm from './components/Form'
import 图配置 from './constant/config'
import { 图事件列表 } from './constant/event'

import List from '@renderer/components/customNode/ListNode/index'
// import { List as List2 } from '@renderer/components/customNode/ListNode/index.react'
import ListCombo from '@renderer/components/customCombo/ListCombo'
import './index.less'

// G6.registerNode('ListNode', createNodeFromReact(List2))
G6.registerNode('ListNode', List)
G6.registerCombo('listCombo', ListCombo, 'rect')
const { create, get, update } = window.api

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

  //#region node事件
  const handleNodeDragend = (e: IG6GraphEvent) => {
    const item = e.item! as INode
    if (item.getID()) {
      get.getNoteById(item.getID()).then((res) => {
        const attributesString = res?.attributes
        const attributes = attributesString ? JSON.parse(attributesString) : {}
        promiseAddTip(
          update.updateNoteById(item.getID(), {
            attributes: JSON.stringify({
              ...attributes,
              x: Math.floor(item.getModel().x!),
              y: Math.floor(item.getModel().y!)
            })
          })
        )
      })
    }
  }

  const handleNodeContextmenu = (e: IG6GraphEvent) => {
    console.log(e)
  }
  //#endregion
  //#endregion

  const bindEvents = () => {
    图事件列表.forEach(({ eventName, callback, once }) => {
      graph.on(eventName, callback, once)
    })
    graph.on('node:dragend', handleNodeDragend)
    graph.on('canvas:dblclick', handleCanvasDblClick)
    graph.on('node:contextmenu', handleNodeContextmenu)
  }

  //#region 初始化
  const initGraph = () => {
    if (!graph) {
      graph = new G6.Graph({
        ...图配置,
        container: graphRef.current!
      })

      graph.data(data)
      graph.render()
      bindEvents()
    }
  }
  //#endregion

  //#region 拉取数据
  const fetchData = () => {
    setLoading()
    Promise.all([get.getAllNote(), get.getAllRelation()]).then((res) => {
      const nodes = res[0].map(noteToNode).concat([
        {
          id: '这是列表的第一条笔记',
          comboId: 'listCombo1',
          type: 'ListNode',
          order: 1
        }
      ])
      const edges = res[1].map(relationToEdge)
      setNodeData(nodes)
      setEdgeData(edges)

      G6.Util.processParallelEdges(edges)
      graph.data({
        nodes,
        edges,
        combos: [
          {
            type: 'listCombo',
            id: 'listCombo1',
            label: 'listCombo1'
          }
        ]
      })
      graph.render()
      graph.setItemState('isShowForm', 'isShowForm', Bool.FALSE)
      setLoadEnd()
    })
  }
  //#endregion

  //#region 提交表单
  const onSubmit = (values) => {
    create.createNote(formToNote(values)).then((res) => {
      fetchData()
      setHideForm()
      graph.setItemState('isShowForm', 'isShowForm', Bool.FALSE)
    })
  }
  //#endregion
  //#endregion

  useMount(() => {
    initGraph()
    fetchData()
  })

  useUnmount(() => {
    // if (graph) {
    //   graph.destroy()
    //   graph = null as any
    //   if (graphRef.current?.firstChild) {
    //     graphRef.current?.removeChild(graphRef.current?.firstChild)
    //   }
    // }
  })

  useEffect(() => {
    if (size && graph) {
      graph.changeSize(size.width, size.height)
    }
  }, [size?.height, size?.width])

  return (
    <>
      <Modal
        mask
        maskClosable
        closable={false}
        footer={null}
        open={isShowForm}
        onCancel={setHideForm}
        style={{
          backgroundColor: 'transparent'
        }}
        styles={{
          body: {
            backgroundColor: 'transparent'
          },
          mask: {
            backgroundColor: 'transparent'
          }
        }}
      >
        <NoteForm position={canvasDblClickPositionOnCanvas} onSubmit={onSubmit} />
      </Modal>
      <Spin spinning={isLoading} />
      <div className="graph" ref={graphRef} onDoubleClick={() => {}}></div>
    </>
  )
}
export default Main
