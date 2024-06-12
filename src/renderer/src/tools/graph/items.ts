import { IItemBase } from '@antv/g6'
import { TBooleanStateName } from '@renderer/types/graph/state'

export function setBooleanState(item: IItemBase, stateName: TBooleanStateName) {
  item?.hasState(stateName) ? item?.setState(stateName, false) : item?.setState(stateName, true)
}
