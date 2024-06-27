import { IEvent } from '@antv/g6'

export const onEvent: {
  eventName: string
  callback: (e: IEvent) => void
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
    eventName: 'node:hover',
    callback: (e) => {
      console.log('节点被悬浮了', e)
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
