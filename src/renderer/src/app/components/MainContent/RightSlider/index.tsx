import { CloseOutlined } from '@ant-design/icons'
import ElementForm from '@renderer/components/ElementForm'
import { showRightSidebarAtom } from '@renderer/stores/layout'
import { formToNote } from '@renderer/tools/graph/transData'
import { Layout } from 'antd'
import { useAtom } from 'jotai'
import useRightSliderStyle from './index.style'

const { Sider } = Layout
const { create, get: _get, update: _update } = window.api

function RightSlider() {
  const { styles } = useRightSliderStyle()

  const [showRight, setShowRight] = useAtom(showRightSidebarAtom)

  return (
    <Sider
      collapsible
      reverseArrow
      trigger={null}
      collapsedWidth="0"
      collapsed={!showRight}
      style={{
        width: '100em'
      }}
    >
      <div className={styles.rightSlideBarCloser}>
        <CloseOutlined
          onClick={() => {
            setShowRight(false)
          }}
        />
      </div>
      <ElementForm
        onSubmit={(values) => {
          create.createNote(formToNote(values))
        }}
      />
    </Sider>
  )
}

export default RightSlider
