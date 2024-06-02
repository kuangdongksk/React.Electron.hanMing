import G6 from '@antv/g6'
import { 图事件名称 } from '@renderer/types/图'
import { useEffect, useRef } from 'react'
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

const 图事件列表: { 事件名称: 图事件名称; 回调函数: (事件对象) => void }[] = [
  {
    事件名称: 'node:click',
    回调函数: (事件对象) => {
      console.log('节点被点击了', 事件对象)
    }
  },
  {
    事件名称: 'edge:click',
    回调函数: (事件对象) => {
      console.log('边被点击了', 事件对象)
    }
  }
]
const Main = () => {
  const 翰冥元素 = useRef(null)

  let 图

  useEffect(() => {
    if (!图) {
      图 = new G6.Graph({
        container: 翰冥元素.current!,
        fitView: true
      })
    }

    图.data(data) // 读取 Step 2 中的数据源到图上
    图.render()
  }, [data])

  return (
    <div className="main">
      这是主页
      <div className="图" ref={翰冥元素} />
    </div>
  )
}
export default Main
