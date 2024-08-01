import { Group, Rect } from '@antv/g6-extension-react'
import { DefaultDarkTheme } from '@renderer/constant/theme/darkTheme'
import { DefaultLightTheme } from '@renderer/constant/theme/lightTheme'
import { themeAppearanceAtom } from '@renderer/stores/theme'
import { useAtom } from 'jotai'
import { useMemo } from 'react'

export interface ICustomNodeRootProps {
  height: number
  width: number
  children?: React.ReactNode
}

function CustomNodeRoot(props: ICustomNodeRootProps) {
  const { height, width, children } = props

  const [themeMode] = useAtom(themeAppearanceAtom)

  const themeToken = useMemo(() => {
    return themeMode === 'light' ? DefaultLightTheme : DefaultDarkTheme
  }, [themeMode])

  const { token } = themeToken

  return (
    <Group>
      <Rect height={height} width={width} stroke={token?.colorPrimary} radius={token?.borderRadius}>
        {children}
      </Rect>
    </Group>
  )
}
export default CustomNodeRoot
