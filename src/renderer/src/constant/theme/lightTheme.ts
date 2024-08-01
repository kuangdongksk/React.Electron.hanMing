import { theme, ThemeConfig } from 'antd'

export const DefaultLightTheme: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,

  token: {
    colorPrimary: '#ffb4b4',
    colorWarning: '#ffe1a4',
    colorError: '#ff0000',
    colorTextBase: '#000000',
    colorBgBase: '#f8e0e0',
    borderRadius: 5,
    wireframe: false
  },
  components: {
    Layout: {
      headerBg: '#f8e0e0',
      siderBg: '#ffffe2',
      footerBg: '#f8e0e0'
    }
  }
}
