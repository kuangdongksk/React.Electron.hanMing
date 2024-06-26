import { ModelConfig } from '@antv/g6'
import { ECyan } from '@renderer/constant/color'

export default (cfg: ModelConfig) => `
    <Group>
      <Rect
        style={{
          radius: [2],
          stroke: ${ECyan.Brightest},
          lineWidth: '1',
          flexDirection: 'row',
          display: 'flex'
        }}
        draggable
        keyshape
      >
        <Text style={{ fill: ${ECyan.Brightest} }}>${cfg.order}</Text>
        <Text style={{ fill: ${ECyan.Brightest} }}>${cfg.id}</Text>
      </Rect>
    </Group>
`
