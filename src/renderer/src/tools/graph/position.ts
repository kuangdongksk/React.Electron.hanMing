import { I2DCoordinate } from '@renderer/interface/graph'

export function determinesIfThe2DCoordinatesAreEqual(
  p1: I2DCoordinate,
  p2: I2DCoordinate
): boolean {
  return p1.x === p2.x && p1.y === p2.y
}
