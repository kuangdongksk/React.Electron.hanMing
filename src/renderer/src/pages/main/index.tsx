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
import ReactCombo from '@renderer/components/customCombo'
import { ENodeType } from '@renderer/constant/graph/nodeType'
import { dbClickPositionAtom, newNoteAtom } from '@renderer/stores/canvas'
import { showRightSidebarAtom } from '@renderer/stores/layout'
import { noteToNode, relationToEdge } from '@renderer/tools/graph/transData'
import { promiseWidthTip } from '@renderer/util/function/requeest'
import { useBoolean, useMount, useSize, useUnmount } from 'ahooks'
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
  register<ExtensionCategory.COMBO>(ExtensionCategory.COMBO, 'react', ReactCombo)
  const { styles } = useMainStyles()

  const [_, setShowRightSideBar] = useAtom(showRightSidebarAtom)
  const [_dbClickPosition, setDbClickPosition] = useAtom(dbClickPositionAtom)
  const [newNote, setNewNote] = useAtom(newNoteAtom)

  const graphRef = useRef<HTMLDivElement>(null)
  const size = useSize(graphRef)

  const [isLoading, { setTrue: setLoading, setFalse: setLoadEnd }] = useBoolean(false)

  const handleCanvasDblClick = (e: IPointerEvent) => {
    let { x, y } = e.canvas
    x = Math.floor(x)
    y = Math.floor(y)

    const id = nanoid()
    const position = { x, y }

    setDbClickPosition(position)
    setShowRightSideBar(true)
    if (!newNote?.id) {
      graph.addNodeData([
        {
          id,
          type: ENodeType.Plain,
          x,
          y,
          data: {
            content: '新建节点',
            type: ENodeType.Plain
          }
        }
      ])
      setNewNote({
        id,
        isCombo: 'false',
        noteId: id,
        comboId: 'undefined',
        content: '新建节点',
        style: JSON.stringify({ x, y }),
        attributes: JSON.stringify({ type: ENodeType.Plain })
      })
      graph.render()
    }
  }

  const handleNodeDragend = (e: IElementEvent) => {
    console.log(e)
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
    Promise.all([get.getAllNote(), get.getAllRelation()]).then((res) => {
      const nodes = res[0].map(noteToNode).filter((v) => v.isCombo === false)
      const edges = res[1].map(relationToEdge)
      graph.setData({
        nodes,
        edges,
        combos: res[0].map(noteToNode).filter((v) => v.isCombo === true)
      })
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
    if (newNote?.id) {
      graph.updateNodeData([noteToNode(newNote)])
      graph.draw()
    }
  }, [newNote])

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
