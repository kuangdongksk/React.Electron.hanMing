export default (cfg) => `
    <Group>
      <Rect
        style={{
          radius: [8],
          shadowColor: '#fff',
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
            display: 'flex',
            flexDirection: 'row',
            cursor: 'pointer',
            alignContent: 'center'
          }}
        >
          <Circle
            style={{
              r:5,
              fill: '#00CF10'
            }}
          />
          <Rect style={{ flex: 1 }} />
          <Text style={{fill:'#fff'}}>${cfg.id}</Text>
        </Rect>
      </Rect>
    </Group>
`
