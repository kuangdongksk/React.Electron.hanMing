import { message } from 'antd'

export function promiseAddTip<Res, Err>(
  promise: Promise<Res>,
  onSuccess?: (res: Res) => void,
  onFail?: (err: Err) => void,
  successTip: string = '操作成功',
  failTip = '操作失败'
) {
  promise
    .then((res: Res) => {
      onSuccess && onSuccess(res)
      message.success(successTip)
    })
    .catch((err: Err) => {
      onFail && onFail(err)
      message.error(failTip)
    })
}
