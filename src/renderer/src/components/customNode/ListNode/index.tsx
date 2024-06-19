import { Circle, Group, Rect, Text } from '@antv/g6-react-node'
import { nanoid } from 'nanoid'

export default function ({ cfg }) {
  return (
    <Group id={nanoid()} name="list">
      <Rect
        style={{
          radius: [8],
          fill: '#fff',
          shadowColor: '#ddd',
          shadowBlur: 8,
          shadowOffsetX: 2,
          shadowOffsetY: 2
        }}
        // keyshape
        draggable
      >
        <Rect
          style={{
            minWidth: 200,
            fill: 'l(0) 0:#0049FF 1:#0EB7FF',
            radius: [8, 8, 0, 0],
            padding: 12,
            flexDirection: 'row',
            cursor: 'pointer',
            alignContent: 'center'
          }}
        >
          <Circle
            style={{
              r: 5,
              fill: '#00CF10'
            }}
          />
          <Rect style={{ flex: 1 }} />
          <Text style={{ fill: '#fff', margin: [0, 4] }}>{cfg?.id}</Text>
        </Rect>
      </Rect>
    </Group>
  )
}
