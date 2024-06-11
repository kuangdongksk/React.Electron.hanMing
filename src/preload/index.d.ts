import { ElectronAPI } from '@electron-toolkit/preload'
import { IApi } from '../renderer/src/interface/api'
declare global {
  interface Window {
    electron: ElectronAPI
    api: IApi
  }
}
