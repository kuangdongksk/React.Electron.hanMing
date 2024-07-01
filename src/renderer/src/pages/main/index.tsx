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
import ListCombo from '@renderer/components/customCombo/ListCombo'
import { Bool } from '@renderer/constant/base'
import { I2DCoordinate } from '@renderer/interface/graph'
import {
  formToNote,
  noteToNode,
  relationToEdge,
  stringArrayToObj
} from '@renderer/tools/graph/transData'
import { promiseWidthTip } from '@renderer/util/function/requeest'
import { useBoolean, useMount, useSetState, useSize, useUnmount } from 'ahooks'
import { Modal, Spin } from 'antd'
import { useEffect, useRef } from 'react'
import NoteForm from './components/Form'
import 图配置 from './constant/config'
import { onEvent } from './constant/event'
import useMainStyles from './index.style'

const { create, get, update } = window.api

let graph: Graph
export default function Main() {
  register(ExtensionCategory.NODE, 'react', ReactNode)
  const { styles } = useMainStyles()

  const graphRef = useRef<HTMLDivElement>(null)
  const size = useSize(graphRef)

  const [isShowForm, { setTrue: setShowForm, setFalse: setHideForm }] = useBoolean(false)
  const [isLoading, { setTrue: setLoading, setFalse: setLoadEnd }] = useBoolean(false)

  const [canvasDblClickPositionOnCanvas, setCanvasDblClickPositionOnCanvas] =
    useSetState<I2DCoordinate>({
      x: 0,
      y: 0
    })

  //#region 事件
  const handleCanvasDblClick = (e: IPointerEvent) => {
    console.log(e)
    const position = {
      x: Math.floor(e.canvas.x),
      y: Math.floor(e.canvas.y)
    }
    setCanvasDblClickPositionOnCanvas(position)

    setShowForm()
  }

  //#region node事件
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

  //#endregion
  //#endregion

  const bindEvents = () => {
    onEvent.forEach(({ eventName, callback }) => {
      graph.on(eventName, callback)
    })
    graph.on(NodeEvent.DRAG_END, handleNodeDragend)
    graph.on(CanvasEvent.DBLCLICK, handleCanvasDblClick)
    // graph.on(CanvasEvent.POINTER_DOWN, (e) => {
    //   console.log(e)
    // })
  }

  //#region 初始化
  const initGraph = () => {
    if (!graph) {
      graph = new Graph({
        ...图配置,
        height: 100,
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
      const nodes = res[0].map(noteToNode)
      const edges = res[1].map(relationToEdge)
      graph.setData({
        nodes,
        edges
      })
      graph.render()
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
        closable={false}
        destroyOnClose
        footer={null}
        mask
        maskClosable
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
      <div className={styles.graph} ref={graphRef} onDoubleClick={() => {}}></div>
    </>
  )
}

