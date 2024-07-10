import { createStyles } from 'antd-style'

const headerStyle = createStyles(() => {
  return {
    appHeader: {
      height: '24px',
      padding: '0 2em 0 8em',
      flexShirnk: 0,
      flexGrow: 0,
      display: 'flex'
    },
    appHeaderLeft: {
      flex: 1
    }
  }
})
export default headerStyle
