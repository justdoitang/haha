//能效查询请求模型
export interface GetEfficiencyQueryReqData {
  Equipment: number | undefined //设备选择
  StartDate: string
  EndDate: string
  TimeInterval: number | undefined
}

//能效查询响应模型
export type GetEfficiencyQueryLineRespData = ApiResponseData<{
  LineData:GetEfficiencyQueryLineBaseData[],
  TableData:GetEfficiencyQueryTableBaseData[]
}>

//能效查询折线图响应基模型
export interface GetEfficiencyQueryLineBaseData {
  DataDateTime: string //时间
  EfficiencyValue: string //总用电
}

//能效查询表格响应基模型
export interface GetEfficiencyQueryTableBaseData {
  Obj: string //对象
  OverallValue: string //整体值
  AverageValue: string //平均值
  OptimalAverageValue: string //10%最优平均值
  WorstAverageValue: string //10%最差平均值
}

