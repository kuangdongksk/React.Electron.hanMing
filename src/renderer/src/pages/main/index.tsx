import G6, { Graph } from '@antv/g6'
import { useEffect, useRef, useState } from 'react'
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
  const 翰冥元素 = useRef(null)

  const [展示表单, 设置展示表单] = useState(false)

  let 图: Graph

  const bindEvents = () => {
    图事件列表.forEach(({ eventName, callback, once }) => {
      图.on(eventName, callback, once)
    })
    // 图.on('canvas:dblclick', () => {
    //   if (展示表单) {
    //     设置展示表单(false)
    //   } else {
    //     设置展示表单(true)
    //   }
    // })
  }

  useEffect(() => {
    if (!图) {
      图 = new G6.Graph({
        ...图配置,
        container: 翰冥元素.current!
      })
    }
    图.data(data)
    图.render()
    bindEvents()
  }, [])

  return (
    <div className="main">
      <div className="图" ref={翰冥元素} onDoubleClick={() => 设置展示表单(!展示表单)}>
        {展示表单 && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          >
            <NoteForm />
          </div>
        )}
      </div>
    </div>
  )
}
export default Main
