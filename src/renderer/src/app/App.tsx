import { useToggle } from 'ahooks'
import { Layout, Switch } from 'antd'
import { ThemeProvider } from 'antd-style'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import Versions from '../components/Versions'
import { DefaultDarkTheme, DefaultLightTheme } from '../constant/theme'
import './App.less'
import useStyles from './App.style'
import MainContent from './components/MainContent'

const { Header, Footer } = Layout

function App(): JSX.Element {
  const { styles } = useStyles()
  const location = useLocation()

  const [now, setNow] = useState(dayjs().format('YYYY-MM-DD HH:mm:ss'))
  const [appearance, { toggle: toggleAppearance }] = useToggle<'light', 'dark'>('light', 'dark')
  const getTheme = (appearance: 'light' | 'dark') => {
    return appearance === 'light' ? DefaultLightTheme : DefaultDarkTheme
  }

  /* 实时时间 */
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(dayjs().format('YYYY-MM-DD HH:mm:ss'))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <ThemeProvider appearance={appearance} theme={getTheme(appearance)}>
      <Layout className={styles.app}>
        <nav className={styles.appNav}>
          <NavLink to="main">画布</NavLink>
        </nav>

        <Header className={styles.appHeader}>
          <div className={styles.appHeaderLeft}>{location.pathname.split('/')[1]}</div>
          <Switch onClick={toggleAppearance} />
          <div>{now}</div>
        </Header>

        <MainContent />
        <Footer className={styles.appFooter}>
          <div>
            <Versions></Versions>
          </div>
          <div>右边</div>
        </Footer>
      </Layout>
    </ThemeProvider>
  )
}

export default App
