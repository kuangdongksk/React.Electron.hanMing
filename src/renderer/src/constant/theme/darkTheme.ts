import { theme, ThemeConfig } from 'antd'

export const DefaultDarkTheme: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: '#ffb4b4',
    colorWarning: '#ffe1a4',
    colorError: '#ff0004',
    colorTextBase: '#ffd1cb',
    colorBgBase: '#2c323c',
    borderRadius: 5,
    wireframe: true
  },
  components: {
    Layout: {
      headerBg: '#525252',
      siderBg: '#4b515c',
      footerBg: '#525252'
    }
  }
}
