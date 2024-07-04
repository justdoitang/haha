export interface AddEnergyParamReqData extends EnergyParamBaseData {}
export interface UptEnergyParamReqData extends EnergyParamBaseData {}

export interface EnergyParamBaseData {
  Id: number | undefined
  Name: string
  StartDate: string
  EndDate: string
  TipTime: string
  TipPrice: string
  UpTime: string
  UpPrice: string
  AvgTime: string
  AvgPrice: string
  DownTime: string
  DownPrice: string
}

export type GetEnergyParamRespData = ApiResponseData<GetEnergyParamRespData>

export type AddEnergyParamRespData = ApiResponseData<string>

export type UptEnergyParamRespData = ApiResponseData<string>
