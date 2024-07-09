import { ECyan } from '@renderer/constant/color'
import { createStyles } from 'antd-style'

const useStyle = createStyles(
  (
    { token, css },
    props: {
      desktop?: boolean
      laptop?: boolean
    }
  ) => {
    const { desktop, laptop } = props

    const ModalWidth = desktop ? '50%' : laptop ? '70%' : '90%'

    return {
      card: css`
        background-color: transparent;
        box-shadow: 1px 1px 1px 1px ${ECyan.Brightest};
        min-width: ${ModalWidth};
      `
    }
  }
)

export default useStyle
