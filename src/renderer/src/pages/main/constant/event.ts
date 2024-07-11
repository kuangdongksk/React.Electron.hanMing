import { CanvasEvent, IEvent, NodeEvent } from '@antv/g6'

export const onEvent: {
  eventName: string
  callback: (e: IEvent) => void
}[] = [
  {
    eventName: CanvasEvent.DRAG_END,
    callback: (e) => {}
  },
  //#region 节点事件
  {
    eventName: NodeEvent.POINTER_OVER,
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
