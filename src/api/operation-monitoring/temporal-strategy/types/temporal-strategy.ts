//新增时间策略请求模型
export interface AddTemporalStrategyReqData extends TemporalStrategyBaseData {}
//更新时间策略请求模型
export interface UptTemporalStrategyReqData extends TemporalStrategyBaseData {}

// 时间策略基模型
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

//获取时间策略响应模型
export type GetTemporalStrategyRespData = ApiResponseData<GetTemporalStrategyRespData>

//新增时间策略响应模型
export type AddTemporalStrategyRespData = ApiResponseData<string>

//更新时间策略响应模型
export type UptTemporalStrategyRespData = ApiResponseData<string>
