// import G6 from '@antv/g6'
import { Group, Rect, Text } from '@antv/g6-react-node'
import { ECyan } from '@renderer/constant/color'

export const List = (cfg) => {
  return (
    <Group>
      <Rect
        style={{
          radius: [2],
          stroke: ECyan.Brightest,
          lineWidth: '1',
          flexDirection: 'row',
          display: 'flex'
        }}
        draggable
        keyshape
      >
        <Text style={{ fill: ECyan.Brightest }}>${cfg.order}</Text>
        <Text style={{ fill: ECyan.Brightest }}>${cfg.id}</Text>
      </Rect>
    </Group>
  )
}

// G6.registerNode('ListNode', createNodeFromReact(List))
