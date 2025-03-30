/** 所有 api 接口的响应数据都应该准守该格式 */
interface ApiResponseData<T> {
  data: any
  data: { value: string | number; label: string; disabled?: boolean | undefined }[]
  ErrorCode: number
  Content: T
  Message: string
}
