import { CloseOutlined } from '@ant-design/icons'
import ElementForm from '@renderer/components/ElementForm'
import { newNoteAtom } from '@renderer/stores/note'
import { showRightSidebarAtom } from '@renderer/stores/layout'
import { promiseWidthTip } from '@renderer/util/function/requeest'
import { Layout, message, Modal } from 'antd'
import { useAtom } from 'jotai'
import useRightSliderStyle from './index.style'

const { Sider } = Layout

const { create } = window.api

function RightSlider() {
  const [showRight, setShowRight] = useAtom(showRightSidebarAtom)
  const [newNote, setNewNote] = useAtom(newNoteAtom)
  const { styles } = useRightSliderStyle({ showRight, width: '320px' })

  const close = () => {
    setNewNote(undefined)
    setShowRight(false)
  }

  const onCloserClick = () => {
    if (!newNote) {
      close()
    } else {
      Modal.confirm({
        title: '是否保存新增的节点？',
        okText: '保存',
        cancelText: '不保存',
        onOk: () => {
          if (!newNote) {
            message.error('未找到新增节点')
            return
          }
          promiseWidthTip(create.createNote(newNote), {
            onSuccess: (res) => {
              message.success('保存成功')
            }
          })
          close()
        },
        onCancel: close
      })
    }
  }

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
        <CloseOutlined onClick={onCloserClick} />
      </div>
      <ElementForm />
    </Sider>
  )
}

export default RightSlider
