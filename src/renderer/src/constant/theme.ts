import { theme, ThemeConfig } from 'antd'

export const DefaultDarkTheme: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: '#ffb4b4',
    colorWarning: '#ffe1a4',
    colorError: '#ff0004',
    colorTextBase: '#ffcbcb',
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
