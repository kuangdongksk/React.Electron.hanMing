import { createStyles } from 'antd-style'

const useStyles = createStyles<{}, any>(() => {
  return {
    app: {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    },
    appNav: {
      zIndex: '11',
      width: '50px',
      height: '50px',
      position: 'absolute',
      top: '-25px',
      left: '-25px',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'rgb(255, 255, 255)',
      borderRadius: '0 20em 20em 20em',
      boxShadow: '0 0 10px 5px rgb(255, 255, 255)',
      transition: 'all 1s',
      a: {
        display: 'block',
        visibility: 'hidden',
        fontWeight: 'bold',
        color: '#2c3e50',
        '&:last-child': { borderRadius: '0 0 3em 0' }
      },
      '&:hover': {
        backgroundColor: 'rgb(255, 255, 255)',
        borderRadius: '0 0 3em 0',
        boxShadow: '0 0 10px 5px rgb(255, 255, 255)',
        height: 'max-content',
        width: '5em',
        top: '0',
        left: '0',
        justifyContent: 'center',
        alignItems: 'center',
        a: {
          visibility: 'visible',
          width: '100%',
          flexGrow: '1',
          flexBasis: '0',
          textAlign: 'center',
          lineHeight: '3em',
          '&:hover': { backgroundColor: '#c2cbff' }
        }
      }
    },
    appHeader: {
      height: '24px',
      padding: '0 2em 0 8em',
      flexShirnk: 0,
      flexGrow: 0,
      display: 'flex'
    },
    appHeaderLeft: {
      flex: 1
    },
    appContent: {
      flex: 1
    },
    appFooter: {
      height: '24px',
      padding: '0',
      flexShirnk: 0,
      flexGrow: 0,
      display: 'flex',
      div: {
        '&:first-child': { flex: '1' }
      }
    },

    'router-link-exact-active': {
      backgroundColor: '#c2cbff'
    },
    '*::-webkit-scrollbar': {
      width: '0.2em',
      height: '0.2em'
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(255, 255, 255, 0.432)',
      '&:hover': { backgroundColor: 'rgb(255, 255, 255)', transform: 'scale(1.2)' }
    }
  }
})
export default useStyles
