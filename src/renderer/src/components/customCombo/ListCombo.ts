import { IGroup, ModelConfig, ShapeOptions } from '@antv/g6'

export default {
  drawShape: function drawShape(cfg: ModelConfig, group: IGroup) {
    const self = this
    // 获取配置中的 Combo 内边距
    const padding = cfg?.padding || [50, 20, 20, 20]
    // 获取样式配置，style.width 与 style.height 对应 rect Combo 位置说明图中的 width 与 height
    const style = self.getShapeStyle(cfg)
    // 绘制一个矩形作为 keyShape，与 'rect' Combo 的 keyShape 一致
    const rect = group.addShape('rect', {
      attrs: {
        ...style,
        x: -style.height / 2 - padding[0],
        y: -style.width / 2 - padding[3],
        width: style.width,
        height: style.height
      },
      draggable: true,
      name: 'combo-keyShape' // 在 G6 3.3 及之后的版本中，必须指定 name，可以是任意字符串，但需要在同一个自定义元素类型中保持唯一性
    })
    return rect
  }
} as ShapeOptions
