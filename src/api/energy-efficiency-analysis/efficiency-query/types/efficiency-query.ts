//能效对比请求模型
export interface GetEfficiencyContrastReqData {
  Equipment: number | undefined //设备选择
  StartDate: string
  EndDate: string
  TimeInterval: number | undefined
}

//能效对比响应模型
export type GetEfficiencyContrastLineRespData = ApiResponseData<{
  LineData:GetEfficiencyContrastLineBaseData[],
  TableData:GetEfficiencyContrastTableBaseData[]
}>

//能效对比折线图响应基模型
export interface GetEfficiencyContrastLineBaseData {
  DataDateTime: string //时间
  EfficiencyValue: string //总用电
}

//能效对比表格响应基模型
export interface GetEfficiencyContrastTableBaseData {
  Obj: string //对象
  OverallValue: string //整体值
  AverageValue: string //平均值
  OptimalAverageValue: string //10%最优平均值
  WorstAverageValue: string //10%最差平均值
}

