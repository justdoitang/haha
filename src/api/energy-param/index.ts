import { request } from "@/utils/service"
import type * as EnergyParam from "./types/energy-param"

export function getEnergyParamApi() {
  return request<EnergyParam.GetEnergyParamRespData>({
    url: "EnergyPricePlan/Query",
    method: "get"
  })
}

export function addEnergyParamApi(data: EnergyParam.AddEnergyParamReqData) {
  return request<EnergyParam.AddEnergyParamRespData>({
    url: "EnergyPricePlan/Add",
    method: "post",
    data
  })
}
export function uptEnergyParamApi(data: EnergyParam.UptEnergyParamReqData) {
  return request<EnergyParam.UptEnergyParamRespData>({
    url: "EnergyPricePlan/Update",
    method: "post",
    data
  })
}
