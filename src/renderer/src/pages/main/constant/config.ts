import G6, { GraphOptions, ModelStyle } from '@antv/g6'
import { TBooleanStateName } from '@renderer/types/graph/state'
//#region 插件
const tooltip = new G6.Tooltip({
  offsetX: 10,
  offsetY: 20,
  getContent(e) {
    const outDiv = document.createElement('div')
    outDiv.style.width = '180px'

    outDiv.innerHTML = `
      <ul>
        <li>Label: ${e.item.getModel().label || e.item.getModel().id}</li>
      </ul>`
    return outDiv
  },
  itemTypes: ['node']
})

//#region 样式
//#region 默认样式
//https://g6.antv.antgroup.com/manual/middle/elements/nodes/default-node
const defaultNode: Partial<{
  type: string
  size: number | number[]
  color: string
}> &
  ModelStyle = {
  size: 10,
  style: {
    shadowColor: 'rgba(256,256,256)',
    shadowBlur: 10
  },
  labelCfg: {
    style: {
      fill: 'rgba(0,0,0)',
      fontSize: 6
    }
  }
}
//#endregion
//#region 状态样式
const nodeStateStyles: { [key in TBooleanStateName]: {} } = {
  active: {
    stroke: 'yellow',
    lineWidth: 3
  },
  selected: {
    stroke: 'red',
    lineWidth: 3
  }
}
const edgeStateStyles: { [key in TBooleanStateName]: {} } = {
  active: {
    stroke: 'yellow',
    lineWidth: 3
  },
  selected: {
    stroke: 'red',
    lineWidth: 3
  }
}
const comboStateStyles: { [key in TBooleanStateName]: {} } = {
  active: {
    stroke: 'yellow',
    lineWidth: 3
  },
  selected: {
    stroke: 'red',
    lineWidth: 3
  }
}
//#endregion

export default {
  container: '',
  fitView: true,
  plugins: [tooltip],
  modes: {
    default: [
      //#region 画布事件
      'drag-canvas',
      {
        type: 'scroll-canvas', // 允许滚动画布
        zoomKey: 'ctrl' // 按住 ctrl 缩放画布
      },
      //#endregion
      //#region 组合事件
      {
        type: 'drag-combo',
        enableDelegate: true,
        activeState: 'active',
        shouldUpdate: (e, self) => {
          console.log(self)
          // 不允许 id 为 'combo1' 的 combo 被拖拽
          if (e.item && e.item.getModel().id === 'combo1') return false
          return true
        },
        // shouldEnd【v4.3.8 后支持】
        shouldEnd: (e, newParent, self) => {
          console.log(e, self)
          // 不可以将 combo 释放到 combo1 上
          if (newParent && newParent.getModel().id === 'combo1') return false
          return true
        }
      },
      //#endregion
      //#region 节点事件
      {
        type: 'drag-node',
        delegateStyle: { strokeOpacity: 0.3, fillOpacity: 0.3 },
        delegate: false,
        enableDebounce: true
      }
    ]
  },
  defaultNode,
  nodeStateStyles,
  edgeStateStyles,
  comboStateStyles
} as GraphOptions
