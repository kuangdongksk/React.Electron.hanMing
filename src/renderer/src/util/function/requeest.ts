import { message } from 'antd'

export function promiseWidthTip<Res, Err>(
  promise: Promise<Res>,
  success?: {
    successTip?: string
    onSuccess?: (res: Res) => void
  },
  fail?: {
    failTip?: string
    onFail?: (err: Err) => void
  }
) {
  promise
    .then((res: Res) => {
      const { successTip, onSuccess } = success || {}
      onSuccess && onSuccess(res)
      successTip && message.success(successTip)
    })
    .catch((err: Err) => {
      const { failTip, onFail } = fail || {}
      onFail && onFail(err)
      failTip && message.error(failTip)
    })
}
