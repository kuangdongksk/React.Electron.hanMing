import { Button, ConfigProvider, theme } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { NavLink, Navigate, Outlet, useLocation } from 'react-router-dom'
import './App.less'

function App(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

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
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#ffb4b4',
          colorWarning: '#ffe1a4',
          colorError: '#ff0004',
          colorTextBase: '#ffcbcb',
          colorBgBase: '#2c323c',
          borderRadius: 0,
          wireframe: true
        }
      }}
    >
      <div className="bg-[#4a4a4a] text-[#ffcdcd] flex flex-col h-screen">
        <nav className="nav">
          <NavLink to="main">画布</NavLink>
        </nav>

        {/* <!-- 头部 --> */}
        <header className="bg-[#525252] flex-1 flex">
          <div className="pl-[8em]">{location.pathname.split('/')[1]}</div>
          <div className="flex-1"></div>
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
    </ConfigProvider>
  )
}

export default App
