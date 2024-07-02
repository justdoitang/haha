import { request } from "@/utils/service"
import type * as EnergyParam from "./types/energy-param"

export function addEnergyParam(data: EnergyParam.AddEnergyParamReqData) {
  return request<EnergyParam.AddEnergyParamRespData>({
    url: "EnergyPricePlan/Add",
    method: "post",
    data
  })
}

export function getEnergyParam() {
  return request<EnergyParam.GetEnergyParamRespData>({
    //url: "users/login",
    url: "EnergyPricePlan/Add",
    method: "get"
  })
}

export function uptEnergyParam(data: EnergyParam.UptEnergyParamReqData) {
  return request<EnergyParam.UptEnergyParamRespData>({
    url: "EnergyPricePlan/Update",
    method: "post",
    data
  })
}
