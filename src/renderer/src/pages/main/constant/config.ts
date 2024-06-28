import { GraphOptions } from '@antv/g6'
import { ComboStyle } from '@antv/g6/lib/spec/element/combo'
import { EdgeStyle } from '@antv/g6/lib/spec/element/edge'
import { NodeStyle } from '@antv/g6/lib/spec/element/node'
import { ERed, ETeal } from '@renderer/constant/color'
import { TBooleanStateName } from '@renderer/types/graph/state'

//#region 样式
//#region 默认样式
//https://g6.antv.antgroup.com/manual/middle/elements/nodes/default-node
const defaultNode: Partial<{
  type: string
  size: number | number[]
  color: string
}> &
  NodeStyle = {
  size: 5,
  style: {
    stroke: ETeal.Brighter,
    strokeOpacity: 0.5,
    lineWidth: 1,
    shadowColor: ETeal.Brightest,
    shadowBlur: 10
  },
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
  EdgeStyle = {
  type: 'cubic-vertical',
  size: 1,
  style: {
    lineWidth: 0.5,
    shadowColor: ETeal.Brightest,
    shadowBlur: 10,
    endArrow: true,
    endArrowType: 'vee'
  },
  labelCfg: {
    position: 'bottom',
    style: {
      fill: ETeal.Brighter,
      fontSize: 6
    }
  }
}
const defaultCombo: Partial<{
  type: string
  size: number | number[]
  color: string
}> &
  ComboStyle = {
  style: {
    stroke: ETeal.Brighter,
    strokeOpacity: 0.5,
    lineWidth: 1,
    shadowColor: ETeal.Brightest,
    shadowBlur: 10,
    fill: ETeal.Brightest,
    fillOpacity: 0.1
  },
  labelCfg: {
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
  autoResize: true,
  autoFit: 'view',
  plugins: [
    {
      key: 'menu',
      type: 'Contextmenu',
      /* 返回菜单的内容，支持 Promise 类型的返回值，也可以使用 getItems 进行快捷配置 */
      getContent: () => {}
    },
    {
      key: 'tooltip',
      type: 'tooltip'
    }
  ],
  node: {
    style: defaultNode,
    state: nodeStateStyles
  },
  edge: {
    style: defaultEdge,
    state: edgeStateStyles
  },
  combo: {
    style: defaultCombo,
    state: comboStateStyles
  },
  zoomRange: [0.5, 2],
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
  }
} as GraphOptions
