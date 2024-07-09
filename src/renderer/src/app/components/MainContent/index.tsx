import { useBoolean } from 'ahooks'
import { Layout } from 'antd'
import { Navigate, Outlet } from 'react-router-dom'
import useStyle from './index.style'
import RightSlider from './RightSlider'

const { Sider, Content } = Layout
function MainContent() {
  const { styles } = useStyle()

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

      <RightSlider />
    </Layout>
  )
}
export default MainContent
