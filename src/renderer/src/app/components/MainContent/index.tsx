import { CloseOutlined } from '@ant-design/icons'
import { showRightSidebarAtom } from '@renderer/stores/layout'
import { useBoolean } from 'ahooks'
import { Layout } from 'antd'
import { useAtom } from 'jotai'
import { Navigate, Outlet } from 'react-router-dom'
import useStyle from './index.style'

const { Sider, Content } = Layout
function MainContent() {
  const { styles } = useStyle()

  const [showRight, setShowRight] = useAtom(showRightSidebarAtom)

  const [collapsedLeft, { toggle: toggleCollapsedLeft }] = useBoolean(true)

  return (
    <Layout className={styles.mainContent}>
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

      <Sider collapsible reverseArrow trigger={null} collapsedWidth="0" collapsed={!showRight}>
        <div className={styles.rightSlideBarCloser}>
          <CloseOutlined
            onClick={() => {
              setShowRight(false)
            }}
          />
        </div>
      </Sider>
    </Layout>
  )
}
export default MainContent
