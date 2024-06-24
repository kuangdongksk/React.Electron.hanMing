// import G6 from '@antv/g6'
import { Group, Rect, Text } from '@antv/g6-react-node'

export const List = (cfg) => {
  return (
    <Group>
      <Rect
        style={{
          radius: [8],
          shadowColor: '#ddd',
          shadowBlur: 8,
          shadowOffsetX: 2,
          shadowOffsetY: 2
        }}
        draggable
        keyshape
      >
        <Rect
          style={{
            minWidth: 200,
            shadowColor: 'l(0) 0:#0049FF 1:#0EB7FF',
            radius: [8],
            padding: 12,
            flexDirection: 'row',
            cursor: 'pointer',
            alignContent: 'center'
          }}
        >
          <Circle
            style={{
              fill: '#00CF10'
            }}
          />
          <Rect style={{ flex: 1 }} />
          <Text>{cfg.id}</Text>
        </Rect>
      </Rect>
    </Group>
  )
}

// G6.registerNode('ListNode', createNodeFromReact(List))
