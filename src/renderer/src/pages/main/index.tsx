import {
  CanvasEvent,
  ExtensionCategory,
  Graph,
  IElementEvent,
  IPointerEvent,
  NodeEvent,
  register
} from '@antv/g6'
import { ReactNode } from '@antv/g6-extension-react'
import { ENodeType } from '@renderer/constant/graph/nodeType'
import { 获取所有Combo, 获取所有非Combo } from '@renderer/constant/request/note'
import { dbClickPositionAtom } from '@renderer/stores/graph/canvas'
import { newNodeAtom } from '@renderer/stores/graph/node'
import { formTypeAtom, showRightSidebarAtom } from '@renderer/stores/layout'
import { noteToCombo, noteToNode, relationToEdge } from '@renderer/tools/graph/transData'
import { promiseWidthTip } from '@renderer/util/function/requeest'
import { useBoolean, useMount, useSize } from 'ahooks'
import { Spin } from 'antd'
import { useAtom } from 'jotai'
import { nanoid } from 'nanoid'
import { useEffect, useRef } from 'react'
import GraphConfig from './constant/config'
import { onEvent } from './constant/event'
import useMainStyles from './index.style'

const { get, update } = window.api

let graph: Graph
export default function Main() {
  register(ExtensionCategory.NODE, 'react', ReactNode)
  register(ExtensionCategory.EDGE, 'react', ReactNode)
  // register<ExtensionCategory.COMBO>(ExtensionCategory.COMBO, 'react', ReactCombo)
  const { styles } = useMainStyles()

  const [_, setShowRightSideBar] = useAtom(showRightSidebarAtom)
  const [_dbClickPosition, setDbClickPosition] = useAtom(dbClickPositionAtom)
  const [newNode, setNewNode] = useAtom(newNodeAtom)
  const [_formType, setFormType] = useAtom(formTypeAtom)

  const graphRef = useRef<HTMLDivElement>(null)
  const size = useSize(graphRef)

  const [isLoading, { setTrue: setLoading, setFalse: setLoadEnd }] = useBoolean(false)

  const handleCanvasDblClick = (e: IPointerEvent) => {
    let { x, y } = e.canvas
    x = Math.floor(x)
    y = Math.floor(y)

    const id = nanoid()
    const position = { x, y }
    const newNode = {
      id,
      type: ENodeType.Plain,
      x,
      y,
      content: '新建节点'
    }

    setDbClickPosition(position)
    setShowRightSideBar(true)
    if (!newNode) {
      graph.addNodeData([newNode])
      setNewNode(newNode)
      setFormType('node')
      graph.render()
    }
  }

  useEffect(() => {
    if (newNode) {
      graph.updateNodeData([newNode])
      graph.draw()
    }
  }, [newNode])

  const handleNodeDragend = (e: IElementEvent) => {
    const node = e.target
    promiseWidthTip(
      update.updateNoteById(node.id, {
        style: JSON.stringify({ x: node.attributes.x, y: node.attributes.y })
      }),
      {
        onSuccess: (res) => {
          graph.updateNodeData([noteToNode(res)])
        }
      }
    )
  }

  const bindEvents = () => {
    onEvent.forEach(({ eventName, callback }) => {
      graph.on(eventName, callback)
    })
    graph.on(NodeEvent.DRAG_END, handleNodeDragend)
    graph.on(CanvasEvent.DBLCLICK, handleCanvasDblClick)
  }

  const initGraph = () => {
    if (!graph) {
      graph = new Graph({
        ...GraphConfig,
        container: graphRef.current!
      })

      graph.setData({ nodes: [], edges: [], combos: [] })
      graph.draw()
      bindEvents()
    }
  }

  const fetchData = () => {
    setLoading()
    Promise.all([
      get.findManyNoteWhere(获取所有非Combo),
      get.getAllRelation(),
      get.findManyNoteWhere(获取所有Combo)
    ]).then((res) => {
      const nodes = res[0].map(noteToNode)
      const edges = res[1].map(relationToEdge)
      const combos = res[2].map(noteToCombo)

      graph.setData({ nodes, edges, combos })

      graph.draw().then(() => {
        const camera = document.querySelector('#g-canvas-camera')
        camera?.setAttribute('style', 'overflow: visible;')
      })
      setLoadEnd()
    })
  }

  useMount(() => {
    initGraph()
    fetchData()
  })

  useEffect(() => {
    if (size && graph) {
      graph.setSize(size.width, size.height)
    }
  }, [size?.height, size?.width])

  return (
    <>
      <Spin spinning={isLoading} />
      <div className={styles.graph} ref={graphRef} onDoubleClick={() => {}}></div>
    </>
  )
}
