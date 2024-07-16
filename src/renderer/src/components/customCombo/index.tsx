import { Point } from '@antv/g6'
import { ReactNode } from '@antv/g6-extension-react'

export default class ReactCombo extends ReactNode {
  render() {
    console.log(super.getAttributeNames())
    super.render()
  }

  getComboPosition(attributes: Record<string, unknown>): Point {
    console.log(attributes)
    return [0, 0]
  }
}
