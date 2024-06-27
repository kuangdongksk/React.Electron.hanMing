import {
  EdgeData,
  ExtensionCategory,
  Graph,
  IDragEvent,
  IPointerEvent,
  Node,
  NodeData,
  register
} from '@antv/g6'
import { ReactNode } from '@antv/g6-extension-react'
import { Bool } from '@renderer/constant/base'
import { I2DCoordinate } from '@renderer/interface/graph'
import {
  formToNote,
  noteToNode,
  relationToEdge,
  stringArrayToObj
} from '@renderer/tools/graph/transData'
import { useBoolean, useMount, useSetState, useSize, useUnmount } from 'ahooks'
import { Modal, Spin } from 'antd'
import { useEffect, useRef } from 'react'
import NoteForm from './components/Form'
import 图配置 from './constant/config'
import { onEvent } from './constant/event'
import './index.less'

//#region 注册自定义组件
// G6.registerNode('ListNode', createNodeFromReact(List2))
register(ExtensionCategory.NODE, 'react', ReactNode)
// register(ExtensionCategory.COMBO, ListCombo, ReactNode)
//#endregion

const { create, get, update } = window.api

let graph: Graph
const Main = () => {
  const graphRef = useRef<HTMLDivElement>(null)
  const size = useSize(graphRef)

  const [nodeData, setNodeData] = useSetState<NodeData[]>([])
  const [edgeData, setEdgeData] = useSetState<EdgeData[]>([])

  const [isShowForm, { setTrue: setShowForm, setFalse: setHideForm }] = useBoolean(false)
  const [isLoading, { setTrue: setLoading, setFalse: setLoadEnd }] = useBoolean(false)

  const [canvasDblClickPositionOnCanvas, setCanvasDblClickPositionOnCanvas] =
    useSetState<I2DCoordinate>({
      x: 0,
      y: 0
    })

  //#region 事件
  const handleCanvasDblClick = (e: IPointerEvent) => {
    const position = {
      x: Math.floor(e.canvasX),
      y: Math.floor(e.canvasY)
    }
    setCanvasDblClickPositionOnCanvas(position)

    const node = graph.getNodeData('isShowForm')
    const nodeState = stringArrayToObj<{
      isShowForm: Bool
    }>(node?.states ?? [])

    if (nodeState.isShowForm === Bool.FALSE) {
      setShowForm()
      graph.setElementState('isShowForm', 'isShowForm')
    } else {
      setHideForm()
      graph.setElementState('isShowForm', 'isShowForm')
    }
  }

  //#region node事件
  const handleNodeDragend = (e: IDragEvent) => {
    const item = e.target! as unknown as Node
  }

  //#endregion
  //#endregion

  const bindEvents = () => {
    onEvent.forEach(({ eventName, callback }) => {
      graph.on(eventName, callback)
    })
    graph.on('node:dragend', handleNodeDragend)
    graph.on('canvas:dblclick', handleCanvasDblClick)
  }

  //#region 初始化
  const initGraph = () => {
    if (!graph) {
      graph = new Graph({
        ...图配置,
        container: graphRef.current!
      })

      graph.setData({ nodes: [], edges: [], combos: [] })
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

      // G6.Util.processParallelEdges(edges)
      graph.setData({
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
      graph.setElementState('isShowForm', 'isShowForm')
      setLoadEnd()
    })
  }
  //#endregion

  //#region 提交表单
  const onSubmit = (values) => {
    create.createNote(formToNote(values)).then((_res) => {
      fetchData()
      setHideForm()
      graph.setElementState('isShowForm', 'isShowForm')
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
      graph.setSize(size.width, size.height)
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
