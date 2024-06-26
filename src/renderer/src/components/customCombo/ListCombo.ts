import { IGroup, ModelConfig } from '@antv/g6'
import { ECyan } from '@renderer/constant/color'

export default {
  jsx: (cfg: ModelConfig, group: IGroup) => `
    <Group>
      <Rect
        style={{
          radius: [2],
          fill: '#ffffff00',
          stroke: ${ECyan.Brightest},
          lineWidth: '1',
          flexDirection: 'row',
          display: 'flex'
        }}
        draggable
        keyshape
      />
    </Group>
  `
}
