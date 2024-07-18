import { CanvasEvent, EdgeEvent, IEvent, NodeEvent } from '@antv/g6'

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
    callback: (e) => {}
  },
  {
    eventName: NodeEvent.CLICK,
    callback: (e) => {
      console.log('节点被点击了', e)
    }
  },
  //#endregion
  //#region 边事件
  {
    eventName: EdgeEvent.CLICK,
    callback: (e) => {
      console.log('边被点击了', e)
    }
  }
  //#endregion
]
