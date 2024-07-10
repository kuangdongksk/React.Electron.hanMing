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
import Header from './components/Header'

const { Footer } = Layout

function App(): JSX.Element {
  const { styles } = useStyles()

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
            <Versions></Versions>
          </div>
          <div>右边</div>
        </Footer>
      </Layout>
    </ThemeProvider>
  )
}

export default App
