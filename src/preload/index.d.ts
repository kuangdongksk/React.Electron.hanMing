import { ElectronAPI } from '@electron-toolkit/preload'
import { Api } from '../renderer/src/interface/api'
declare global {
  interface Window {
    electron: ElectronAPI
    api: Api
  }
}
