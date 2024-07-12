export interface AddTemporalStrategyReqData extends TemporalStrategyBaseData {}
export interface UptTemporalStrategyReqData extends TemporalStrategyBaseData {}

// 时间策略请求参数
export interface TemporalStrategyBaseData {
  Id: number | undefined
  TaskNumber: string
  TaskName: string
  TaskStartDate: string
  TaskEndDate: string
  IsEnable: boolean
  IsMonth: boolean
  Months: number[]
  IsWeek: boolean
  Weeks: string[]
  IsDay: boolean
  Days: number[]
  IsHour: boolean
  Hours: number[]
  IsMinute: boolean
  Minutes: number[]
  Frequency: string
  MaxDelay: string
  Expression: string
}

//获取时间策略
export type GetTemporalStrategyRespData = ApiResponseData<GetTemporalStrategyRespData>

//新增时间策略
export type AddTemporalStrategyRespData = ApiResponseData<string>

//更新时间策略
export type UptTemporalStrategyRespData = ApiResponseData<string>
