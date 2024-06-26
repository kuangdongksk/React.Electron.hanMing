// import G6 from '@antv/g6'
import { Group, Rect, Text } from '@antv/g6-react-node'
import { ECyan } from '@renderer/constant/color'

export const List = (cfg) => {
  return (
    <Group>
      <Rect
        style={{
          radius: [2],
          lineWidth: '1',
          flexDirection: 'row',
          display: 'flex',
          hover: {
            stroke: ECyan.Brightest,
            strokeOpacity: 0.3
          }
        }}
        draggable
        keyshape
      >
        <Text style={{ fill: ECyan.Brightest, fontSize: '6', next: 'inline' }}>${cfg.order}</Text>
        <Text style={{ fill: ECyan.Brightest, fontSize: '6', marginLeft: 6 }}>${cfg.id}</Text>
      </Rect>
    </Group>
  )
}

// G6.registerNode('ListNode', createNodeFromReact(List))
