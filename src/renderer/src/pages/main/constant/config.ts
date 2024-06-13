import G6, { GraphOptions, ModelStyle } from '@antv/g6'
import { ERed, ETeal } from '@renderer/constant/color'
import { TBooleanStateName } from '@renderer/types/graph/state'
//#region 插件
const menu = new G6.Menu({
  getContent(e) {
    const outDiv = document.createElement('div')
    outDiv.style.width = '180px'
    outDiv.innerHTML = `<ul>
        <li>测试01</li>
        <li>测试01</li>
        <li>测试01</li>
        <li>测试01</li>
        <li>测试01</li>
      </ul>`
    return outDiv
  },
  handleMenuClick(target, item) {
    console.log(target, item)
  },
  itemTypes: ['node']
})
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
//#endregion

//#region 样式
//#region 默认样式
//https://g6.antv.antgroup.com/manual/middle/elements/nodes/default-node
const defaultNode: Partial<{
  type: string
  size: number | number[]
  color: string
}> &
  ModelStyle = {
  size: 5,
  style: {
    stroke: ETeal.Brighter,
    strokeOpacity: 0.5,
    lineWidth: 1,
    shadowColor: ETeal.Brightest,
    shadowBlur: 10
  },
  label: 'id',
  labelCfg: {
    position: 'bottom',
    style: {
      fill: ETeal.Brighter,
      fontSize: 6
    }
  }
}
const defaultEdge: Partial<{
  type: string
  size: number | number[]
  color: string
}> &
  ModelStyle = {
  type: 'cubic-vertical',
  size: 1,
  style: {
    lineWidth: 0.5,
    shadowColor: ETeal.Brightest,
    shadowBlur: 10,
    endArrow: {
      path: G6.Arrow.vee(5, 10, 0)
    }
  },
  label: 'id',
  labelCfg: {
    position: 'bottom',
    style: {
      fill: ETeal.Brighter,
      fontSize: 6
    }
  }
}
//#endregion
//#region 状态样式
const nodeStateStyles: { [key in TBooleanStateName]: {} } = {
  active: {
    stroke: 'yellow'
  },
  selected: {
    stroke: ERed.Brighter,
    strokeOpacity: 0.5,
    lineWidth: 1,
    ShadowColor: ERed.Brightest,
    shadowBlur: 3
  }
}
const edgeStateStyles: { [key in TBooleanStateName]: {} } = {
  active: {
    stroke: 'yellow'
  },
  selected: {
    stroke: 'red'
  }
}
const comboStateStyles: { [key in TBooleanStateName]: {} } = {
  active: {
    stroke: 'yellow'
  },
  selected: {
    stroke: 'red'
  }
}
//#endregion

export default {
  container: '',
  fitView: true,
  plugins: [menu, tooltip],
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
        delegate: false
        // enableDebounce: true
      }
    ]
  },
  defaultNode,
  defaultEdge,
  nodeStateStyles,
  edgeStateStyles,
  comboStateStyles
} as GraphOptions
