import { GraphOptions } from '@antv/g6'
import { ComboStyle } from '@antv/g6/lib/spec/element/combo'
import { EdgeStyle } from '@antv/g6/lib/spec/element/edge'
import { NodeStyle } from '@antv/g6/lib/spec/element/node'
import NoteMap from '@renderer/components/customNode/index'
import { ERed, ETeal } from '@renderer/constant/color'
import { TBooleanStateName } from '@renderer/types/graph/state'

//#region 样式
//#region 默认样式
//https://g6.antv.antgroup.com/manual/middle/elements/nodes/default-node
const defaultNode: NodeStyle = {
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
    },
    {
      key: 'legend',
      type: 'legend',
      nodeField: (item) => item?.type
    }
    // {
    //   key: 'cameraSetting',
    //   type: 'camera-setting',
    //   aspect: 'auto',
    //   cameraType: 'tracking'
    // }
  ],
  node: {
    type: 'react',
    style: {
      ...defaultNode,
      label: true,
      labelText: (d) => d.data?.label,
      component: (data: any) => <NoteMap data={data} />
    },
    state: nodeStateStyles
  },
  edge: {
    style: { ...defaultEdge },
    state: edgeStateStyles
  },
  combo: {
    type: 'circle'
    // style: { ...defaultCombo, component: (data: any) => <NoteMap data={data} /> },
    // state: comboStateStyles
  },
  zoomRange: [0.25, 4],
  behaviors: [
    'drag-canvas',
    {
      type: 'drag-element'
    },
    {
      key: 'zoom-canvas',
      type: 'zoom-canvas'
    },
    {
      type: 'click-select',
      multiple: true,
      trigger: ['shift']
    }
  ],
  transforms: ['process-parallel-edges']
} as GraphOptions
