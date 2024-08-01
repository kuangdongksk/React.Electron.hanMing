import { Group, Rect, Text } from '@antv/g6-extension-react'
import { EColor, EPink } from '@renderer/constant/color'
import { useState } from 'react'
export interface ICustomTextProps {
  text?: string
}
function CustomText(props: ICustomTextProps) {
  const { text = '' } = props

  const [shadowColor, setShadowColor] = useState<EPink>()

  const onHover = () => {
    setShadowColor(EPink.Brightest)
  }

  return (
    <Group>
      <Rect
        height={30}
        shadowBlur={10}
        shadowColor={shadowColor}
        shadowOffsetX={0}
        shadowOffsetY={0}
        width="auto"
        onMouseover={onHover}
        onMouseout={() => setShadowColor(undefined)}
      >
        <Text text={text} textBaseline="middle" />
      </Rect>
    </Group>
  )
}

export default CustomText
