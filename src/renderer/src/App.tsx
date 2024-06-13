import { useToggle } from 'ahooks'
import { Button } from 'antd'
import { ThemeProvider } from 'antd-style'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { NavLink, Navigate, Outlet, useLocation } from 'react-router-dom'
import './App.less'
import useStyles from './App.style'
import { DefaultTheme } from './constant/theme'

function App(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  const { styles, cx } = useStyles()
  const location = useLocation()

  const [now, setNow] = useState(dayjs().format('YYYY-MM-DD HH:mm:ss'))
  const [appearance, { toggle: toggleAppearance }] = useToggle<'light', 'dark'>('light', 'dark')

  const getTheme = (appearance: 'light' | 'dark') => {
    return appearance === 'light' ? undefined : DefaultTheme
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
      <div className="bg-[#4a4a4a] text-[#ffcdcd] flex flex-col h-screen">
        <nav className={styles.nav}>
          <NavLink to="main">画布</NavLink>
        </nav>

        {/* <!-- 头部 --> */}
        <header className="bg-[#525252] flex-1 flex">
          <div className="pl-[8em]">{location.pathname.split('/')[1]}</div>
          <div className="flex-1"></div>
          <span onClick={toggleAppearance}>{appearance}</span>
          <div className="pr-[2em]">{now}</div>
        </header>

        {/* <!-- 主体 --> */}
        <div className="flex overflow-auto flex-[18]">
          {/* <!-- 主体.左边 --> */}
          <div className="bg-[#4b515c] flex">
            {/* <!-- 主体.左边.目录 --> */}
            <div className="overflow-auto">
              <Button className="flex items-center" type="text"></Button>
            </div>

            {/* <!-- 主体.左边.侧栏 --> */}
            <div className="bg-[#4a5362] hidden overflow-auto"></div>
          </div>

          {/* <!-- 主体.中间 --> */}
          <article className="bg-[#4a5362] flex-1 flex flex-col overflow-auto">
            <Navigate to={'/main'} replace />
            <Outlet />
          </article>

          {/* <!-- 主体.右边 --> */}
          <div className="bg-[#4b515c] overflow-auto">右边</div>
        </div>
        {/* <!-- 底部 --> */}
        <footer className="flex-1 flex">
          {/* <!-- 底部.左边 --> */}
          <div className="flex-1">{/* <Versions></Versions> */}</div>

          {/* <!-- 底部.右边 --> */}
          <div className="">右边</div>
        </footer>
      </div>
    </ThemeProvider>
  )
}

export default App
