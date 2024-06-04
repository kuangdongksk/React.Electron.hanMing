import { GraphOptions } from '@antv/g6'

export default {
  container: '',
  fitView: true,
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
  comboStateStyles: {
    active: {
      stroke: 'red',
      lineWidth: 3
    }
  }
} as GraphOptions
