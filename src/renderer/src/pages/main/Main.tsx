import G6 from '@antv/g6'
import { useEffect, useRef } from 'react'
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

  let 图

  useEffect(() => {
    if (!图) {
      图 = new G6.Graph({
        container: 翰冥元素.current!, // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
        width: 800, // Number，必须，图的宽度
        height: 500 // Number，必须，图的高度
      })
    }

    图.data(data) // 读取 Step 2 中的数据源到图上
    图.render()
  }, [data])

  return (
    <div>
      这是主页
      <div ref={翰冥元素} />
    </div>
  )
}
export default Main
