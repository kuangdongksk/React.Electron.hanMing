import { CloseOutlined } from '@ant-design/icons'
import ElementForm from '@renderer/components/ElementForm'
import { showRightSidebarAtom } from '@renderer/stores/layout'
import { Layout } from 'antd'
import { useAtom } from 'jotai'
import useRightSliderStyle from './index.style'

const { Sider } = Layout

function RightSlider() {
  const [showRight, setShowRight] = useAtom(showRightSidebarAtom)
  const { styles } = useRightSliderStyle({ showRight, width: '320px' })

  return (
    <Sider
      className={styles.rightSlider}
      collapsible
      reverseArrow
      trigger={null}
      collapsedWidth="0"
      collapsed={!showRight}
    >
      <div className={styles.rightSlideBarCloser}>
        <CloseOutlined
          onClick={() => {
            setShowRight(false)
          }}
        />
      </div>
      <ElementForm />
    </Sider>
  )
}

export default RightSlider
