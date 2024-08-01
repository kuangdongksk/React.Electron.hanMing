import { Group, Rect } from '@antv/g6-extension-react'
import { DefaultDarkTheme } from '@renderer/constant/theme/darkTheme'
import { DefaultLightTheme } from '@renderer/constant/theme/lightTheme'
import { themeAppearanceAtom } from '@renderer/stores/theme'
import { useAtom } from 'jotai'
import { useMemo } from 'react'

export interface ICustomNodeRootProps {
  children?: React.ReactNode
  height?: number | 'fit-content' | 'auto'
  width?: number | 'fit-content' | 'auto'
}

function CustomNodeRoot(props: ICustomNodeRootProps) {
  const { children, height = 30, width = 100 } = props

  const [themeMode] = useAtom(themeAppearanceAtom)

  const themeToken = useMemo(() => {
    return themeMode === 'light' ? DefaultLightTheme : DefaultDarkTheme
  }, [themeMode])

  const { token } = themeToken

  return (
    <Group>
      <Rect
        children={children}
        display="flex"
        height={height}
        width={width}
        stroke={token?.colorPrimary}
        radius={token?.borderRadius}
      />
    </Group>
  )
}
export default CustomNodeRoot
