import { CloseOutlined } from '@ant-design/icons'
import ElementForm from '@renderer/components/ElementForm'
import { showRightSidebarAtom } from '@renderer/stores/layout'
import { Layout, Modal } from 'antd'
import { useAtom } from 'jotai'
import useRightSliderStyle from './index.style'
import { newNoteAtom } from '@renderer/stores/canvas'
import { promiseWidthTip } from '@renderer/util/function/requeest'

const { Sider } = Layout

function RightSlider() {
  const [showRight, setShowRight] = useAtom(showRightSidebarAtom)
  const [newNote, setNewNote] = useAtom(newNoteAtom)
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
            Modal.confirm({
              okText: '保存',
              onOk: () => {
                // promiseWidthTip()
                setNewNote(undefined)
                setShowRight(false)
              }
            })
          }}
        />
      </div>
      <ElementForm />
    </Sider>
  )
}

export default RightSlider
