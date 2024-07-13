//能耗分析请求模型
export interface GetEnergyAnalysisReportReqData {
  Obj: number | undefined
  StartDate: string
  EndDate: string
  TimeInterval: number | undefined
}

//能耗分析响应模型
export type GetEnergyAnalysisReportLineRespData = ApiResponseData<{
  LineData:GetEnergyAnalysisReportLineBaseData[],
  TableData:GetEnergyAnalysisReportTableBaseData[]
}>

//能耗分析折线图响应基模型
export interface GetEnergyAnalysisReportLineBaseData {
  DataDateTime: string //时间
  TotalUseElectric: string //总用电
  TotalHot: string //总热量
  TotalCool: boolean //总冷量
}

//能耗分析表格响应基模型
export interface GetEnergyAnalysisReportTableBaseData {
  Obj: string //对象
  TotalValue: string //总值
  PeakValue: string //峰值
  PeakValueDate: string //峰值出现时间
  ValleyValue: string //谷值
  ValleyValueDate: string //谷值出现时间
  AverageValue: string //平均值
}

