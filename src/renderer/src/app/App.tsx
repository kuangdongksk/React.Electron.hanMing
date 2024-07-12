import { useToggle } from 'ahooks'
import { Layout, Typography } from 'antd'
import { ThemeProvider } from 'antd-style'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { DefaultDarkTheme, DefaultLightTheme } from '../constant/theme'
import './App.less'
import useStyles from './App.style'
import Header from './components/Header'
import MainContent from './components/MainContent'

const { Footer } = Layout
const { Text } = Typography

function App(): JSX.Element {
  const { styles } = useStyles()
  const [versions] = useState(window.electron.process.versions)

  const [appearance, { toggle: toggleAppearance }] = useToggle<'light', 'dark'>('light', 'dark')
  const getTheme = (appearance: 'light' | 'dark') => {
    return appearance === 'light' ? DefaultLightTheme : DefaultDarkTheme
  }

  return (
    <ThemeProvider appearance={appearance} theme={getTheme(appearance)}>
      <Layout className={styles.app}>
        <nav className={styles.appNav}>
          <NavLink to="main">画布</NavLink>
        </nav>

        <Header toggleAppearance={toggleAppearance} />
        <MainContent />
        <Footer className={styles.appFooter}>
          <div>
            <Text>Electron v{versions.electron}</Text>
            &nbsp;&nbsp;
            <Text>Chromium v{versions.chrome}</Text>
            &nbsp;&nbsp;
            <Text>Node v{versions.node}</Text>
          </div>

          <div>右边</div>
        </Footer>
      </Layout>
    </ThemeProvider>
  )
}

export default App
