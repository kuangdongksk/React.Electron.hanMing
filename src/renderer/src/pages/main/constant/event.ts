import { G6Event, IG6GraphEvent } from '@antv/g6'

export const 图事件列表: {
  eventName: G6Event
  callback: (e: IG6GraphEvent) => void
  once?: boolean
}[] = [
  //#region 通用事件
  // {
  //   事件名称: 'wheel',
  //   回调函数: (e) => {
  //     console.log('鼠标滚轮滚动了', e)
  //   }
  // },
  //#endregion
  //#region 节点事件
  {
    eventName: 'node:click',
    callback: (e) => {
      console.log('节点被点击了', e)
    }
  },
  // {
  //   eventName: 'node:dblclick',
  //   callback: (e) => {
  //     e.preventDefault()
  //     e.stopPropagation()
  //   }
  // },
  //#endregion
  //#region 边事件
  {
    eventName: 'edge:click',
    callback: (e) => {
      console.log('边被点击了', e)
    }
  }
  //#endregion
]
