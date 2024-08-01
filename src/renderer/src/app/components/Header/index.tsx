import { Layout, Switch, Typography } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import useHeaderStyle from './index.style'
import { useAtom } from 'jotai'
import { themeAppearanceAtom } from '@renderer/stores/theme'

const { Text } = Typography
export interface IHeaderProps {}

function Header(props: Readonly<IHeaderProps>) {
  const { styles } = useHeaderStyle()
  const [appearance, setAppearance] = useAtom(themeAppearanceAtom)

  const location = useLocation()

  const [now, setNow] = useState(dayjs().format('YYYY-MM-DD HH:mm:ss'))
  /* 实时时间 */
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(dayjs().format('YYYY-MM-DD HH:mm:ss'))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <Layout.Header className={styles.appHeader}>
      <Text className={styles.appHeaderLeft}>{location.pathname.split('/')[1]}</Text>
      <Switch
        onClick={() => {
          setAppearance(appearance === 'light' ? 'dark' : 'light')
        }}
      />
      <Text>{now}</Text>
    </Layout.Header>
  )
}
export default Header
