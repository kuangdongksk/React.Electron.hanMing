import { createStyles } from 'antd-style'

const useRightSliderStyle = createStyles(({}, props: { showRight: boolean; width?: string }) => {
  let { showRight, width = '0px' } = props
  let padding = '12px'
  if (!showRight) {
    width = '0px'
    padding = '0px'
  }

  return {
    rightSlider: {
      flex: `0 0 ${width} !important`,
      maxWidth: `${width} !important`,
      width: `${width} !important`,
      padding,
      paddingTop: '0px'
    },
    rightSlideBarCloser: {
      textAlign: 'right'
    }
  }
})
export default useRightSliderStyle
