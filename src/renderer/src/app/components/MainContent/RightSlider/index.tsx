import { Layout } from 'antd'
import useRightSliderStyle from './index.style'
import { CloseOutlined } from '@ant-design/icons'
import { showRightSidebarAtom } from '@renderer/stores/layout'
import { useAtom } from 'jotai'
import ElementForm from '@renderer/components/ElementForm'
import { dbClickPositionAtom } from '@renderer/stores/canvas'
import { formToNote } from '@renderer/tools/graph/transData'

const { Sider } = Layout
const { create, get, update } = window.api

function RightSlider() {
  const { styles } = useRightSliderStyle()

  const [showRight, setShowRight] = useAtom(showRightSidebarAtom)
  const [dbClickPosition] = useAtom(dbClickPositionAtom)

  return (
    <Sider collapsible reverseArrow trigger={null} collapsedWidth="0" collapsed={!showRight}>
      <div className={styles.rightSlideBarCloser}>
        <CloseOutlined
          onClick={() => {
            setShowRight(false)
          }}
        />
      </div>
      <div>笔记</div>
      <div>
        <ElementForm
          position={dbClickPosition}
          onSubmit={(values) => {
            create.createNote(formToNote(values))
          }}
        />
      </div>
    </Sider>
  )
}

export default RightSlider
