import { BaseCombo, BaseComboStyleProps, Rect } from '@antv/g6'
export default class CustomCombo extends BaseCombo {
  protected getKeyStyle(attributes: Required<BaseComboStyleProps>) {
    const [width, height] = this.getKeySize(attributes)
    return { ...super.getKeyStyle(attributes), anchor: [0.5, 0.5], width, height }
  }

  protected drawKeyShape(attributes: Required<BaseComboStyleProps>, container: Group) {
    return this.upsert('key', Rect, this.getKeyStyle(attributes), container)
  }
}
