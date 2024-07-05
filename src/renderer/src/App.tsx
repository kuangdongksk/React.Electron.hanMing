import { useBoolean, useToggle } from 'ahooks'
import { Layout, Switch } from 'antd'
import { ThemeProvider } from 'antd-style'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { NavLink, Navigate, Outlet, useLocation } from 'react-router-dom'
import './App.less'
import useStyles from './App.style'
import Versions from './components/Versions'
import { DefaultDarkTheme, DefaultLightTheme } from './constant/theme'

const { Header, Content, Footer, Sider } = Layout

function App(): JSX.Element {
  const { styles } = useStyles()
  const location = useLocation()

  const [now, setNow] = useState(dayjs().format('YYYY-MM-DD HH:mm:ss'))
  const [appearance, { toggle: toggleAppearance }] = useToggle<'light', 'dark'>('light', 'dark')
  const [collapsedLeft, { toggle: toggleCollapsedLeft }] = useBoolean(true)
  const [collapsedRight, { toggle: toggleCollapsedRight }] = useBoolean(true)

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

        <Layout className={styles.appContentLayout}>
          <Sider
            collapsible
            trigger={null}
            collapsedWidth="3em"
            collapsed={collapsedLeft}
            onCollapse={toggleCollapsedLeft}
          ></Sider>

          <Content>
            <Navigate to={'/main'} replace />
            <Outlet />
          </Content>

          <Sider
            collapsible
            reverseArrow
            trigger={null}
            collapsedWidth="3em"
            collapsed={collapsedRight}
            onCollapse={toggleCollapsedRight}
          >
            右边
          </Sider>
        </Layout>
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
