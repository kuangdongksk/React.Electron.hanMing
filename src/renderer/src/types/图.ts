export type 通用事件名称 =
  | 'click' //单击鼠标左键或者按下回车键时触发
  | 'dblclick' //双击鼠标左键时触发，同时会触发两次 click
  | 'mouseenter' //鼠标移入元素范围内触发，该事件不冒泡，即鼠标移到其后代元素上时不会触发
  | 'mousemove' //鼠标在元素内部移动时不断触发，不能通过键盘触发
  | 'mouseout' //鼠标移出目标元素后触发
  | 'mouseover' //鼠标移入目标元素上方，鼠标移到其后代元素上时会触发
  | 'mouseleave' //鼠标移出元素范围时触发，该事件不冒泡，即鼠标移到其后代元素时不会触发
  | 'mousedown' //鼠标按钮被按下（左键或者右键）时触发，不能通过键盘触发
  | 'mouseup' //鼠标按钮被释放弹起时触发，不能通过键盘触发
  | 'contextmenu' //用户右击鼠标时触发并打开上下文菜单，见 Demo
  | 'dragstart' //当拖拽元素开始被拖拽的时候触发的事件，此事件作用在被拖曳元素上
  | 'drag' //当拖拽元素在拖动过程中时触发的事件，此事件作用于被拖拽元素上
  | 'dragend' //当拖拽完成后触发的事件，此事件作用在被拖曳元素上
  | 'dragenter' //当拖曳元素进入目标元素的时候触发的事件，此事件作用在目标元素上
  | 'dragleave' //当拖曳元素离开目标元素的时候触发的事件，此事件作用在目标元素上
  | 'drop' //被拖拽的元素在目标元素上同时鼠标放开触发的事件，此事件作用在目标元素上
  | 'keydown' //按下键盘键触发该事件
  | 'keyup' //释放键盘键触发该事件
  | 'wheel' //鼠标滚轮滚动时触发该事件
  | 'touchstart' //当手指触摸屏幕时候触发，即使已经有一个手指放在屏幕上也会触发
  | 'touchmove' //当手指在屏幕上滑动的时候连续地触发。在这个事件发生期间，调用 preventDefault() 事件可以阻止滚动。
  | 'touchend' //当手指从屏幕上离开的时候触发

export type 节点事件名称 =
  | 'node:click' //节点被点击时触发
  | 'node:dblclick' //节点被双击时触发
  | 'node:mouseenter' //鼠标移入节点范围内时触发
  | 'node:mousemove' //鼠标在节点内部移动时触发
  | 'node:mouseout' //鼠标移出节点后触发
  | 'node:mouseover' //鼠标移入节点上方时触发
  | 'node:mouseleave' //鼠标移出节点范围时触发
  | 'node:mousedown' //鼠标按下节点时触发
  | 'node:mouseup' //鼠标释放节点时触发
  | 'node:contextmenu' //右击节点时触发
  | 'node:dragstart' //拖拽节点开始时触发
  | 'node:drag' //拖拽节点过程中触发
  | 'node:dragend' //拖拽节点结束时触发
  | 'node:dragenter' //拖拽节点进入目标节点时触发
  | 'node:dragleave' //拖拽节点离开目标节点时触发
  | 'node:drop' //拖拽节点在目标节点上放开时触发
  | 'node:keydown' //按下键盘键时触发
  | 'node:keyup' //释放键盘键时触发
  | 'node:wheel' //滚轮滚动时触发
  | 'node:touchstart' //触摸屏幕时触发
  | 'node:touchmove' //触摸屏幕滑动时触发
  | 'node:touchend' //离开屏幕时触发

export type 边事件名称 =
  | 'edge:click' //边被点击时触发
  | 'edge:dblclick' //边被双击时触发
  | 'edge:mouseenter' //鼠标移入边范围内时触发
  | 'edge:mousemove' //鼠标在边内部移动时触发
  | 'edge:mouseout' //鼠标移出边后触发
  | 'edge:mouseover' //鼠标移入边上方时触发
  | 'edge:mouseleave' //鼠标移出边范围时触发
  | 'edge:mousedown' //鼠标按下边时触发
  | 'edge:mouseup' //鼠标释放边时触发
  | 'edge:contextmenu' //右击边时触发
  | 'edge:dragstart' //拖拽边开始时触发
  | 'edge:drag' //拖拽边过程中触发
  | 'edge:dragend' //拖拽边结束时触发
  | 'edge:dragenter' //拖拽边进入目标边时触发
  | 'edge:dragleave' //拖拽边离开目标边时触发
  | 'edge:drop' //拖拽边在目标边上放开时触发
  | 'edge:keydown' //按下键盘键时触发
  | 'edge:keyup' //释放键盘键时触发
  | 'edge:wheel' //滚轮滚动时触发
  | 'edge:touchstart' //触摸屏幕时触发
  | 'edge:touchmove' //触摸屏幕滑动时触发
  | 'edge:touchend' //离开屏幕时触发

export type Canvas事件名称 =
  | 'canvas:click' //画布被点击时触发
  | 'canvas:dblclick' //画布被双击时触发
  | 'canvas:mouseenter' //鼠标移入画布范围内时触发
  | 'canvas:mousemove' //鼠标在画布内部移动时触发
  | 'canvas:mouseout' //鼠标移出画布后触发
  | 'canvas:mouseover' //鼠标移入画布上方时触发
  | 'canvas:mouseleave' //鼠标移出画布范围时触发
  | 'canvas:mousedown' //鼠标按下画布时触发
  | 'canvas:mouseup' //鼠标释放画布时触发
  | 'canvas:contextmenu' //右击画布时触发
  | 'canvas:dragstart' //拖拽画布开始时触发
  | 'canvas:drag' //拖拽画布过程中触发
  | 'canvas:dragend' //拖拽画布结束时触发
  | 'canvas:dragenter' //拖拽画布进入目标画布时触发
  | 'canvas:dragleave' //拖拽画布离开目标画布时触发
  | 'canvas:drop' //拖拽画布在目标画布上放开时触发
  | 'canvas:keydown' //按下键盘键时触发
  | 'canvas:keyup' //释放键盘键时触发
  | 'canvas:wheel' //滚轮滚动时触发
  | 'canvas:touchstart' //触摸屏幕时触发
  | 'canvas:touchmove' //触摸屏幕滑动时触发
  | 'canvas:touchend' //离开屏幕时触发

export type 图事件名称 = 节点事件名称 | 边事件名称 | 通用事件名称 | Canvas事件名称
