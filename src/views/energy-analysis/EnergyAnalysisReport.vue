<script lang="ts" setup>
import { reactive, ref, watch, onMounted } from "vue"
import { getTableDataApi } from "@/api/table"
import { type FormInstance, type FormRules, ElMessage, ElMessageBox } from "element-plus"
import { Search, Refresh, CirclePlus, UploadFilled, Delete, Download, RefreshRight } from "@element-plus/icons-vue"
import {
  GetEnergyAnalysisReportReqData,
  type GetEnergyAnalysisReportLineBaseData,
  type GetEnergyAnalysisReportTableBaseData
} from "@/api/energy-analysis/energy-analysis-report/types/energy-analysis-report"
import BaseEchart from "@/components/Echart/BaseEchart.vue"

defineOptions({
  // 命名当前组件
  name: "EnergyAnalysisReport"
})

const objectOptions = [
  {
    value: "1",
    label: "对象1"
  },
  {
    value: "2",
    label: "对象2"
  },
  {
    value: "3",
    label: "对象3"
  }
]

const energyAnalysisReportLineBaseData = [
  { DataDateTime: "06-06 00:00", TotalUseElectric: "2000", TotalHot: "1500", TotalCool: "900" },
  { DataDateTime: "06-06 01:00", TotalUseElectric: "3000", TotalHot: "900", TotalCool: "1100" },
  { DataDateTime: "06-06 02:00", TotalUseElectric: "1500", TotalHot: "1600", TotalCool: "700" },
  { DataDateTime: "06-06 03:00", TotalUseElectric: "2800", TotalHot: "1400", TotalCool: "3000" }
]
const energyAnalysisReportTableBaseData = [
  {
    Obj: "总用电", //时间
    TotalValue: "2366.85", //总值
    PeakValue: "330.43", //峰值
    PeakValueDate: "03/05 00:00", //峰值出现时间
    ValleyValue: "135.92", //谷值
    ValleyValueDate: "03/05 09:00", //谷值
    AverageValue: "229.05" //平均值
  },
  {
    Obj: "总冷量", //时间
    TotalValue: "13377.93", //总值
    PeakValue: "1548.94", //峰值
    PeakValueDate: "03/05 03:00 ", //峰值出现时间
    ValleyValue: "838.63", //谷值
    ValleyValueDate: "03/05 09:00", //谷值
    AverageValue: "1294.64" //平均值
  },
  {
    Obj: "总热量", //时间
    TotalValue: "12658.66", //总值
    PeakValue: "3232.39", //峰值
    PeakValueDate: "03/05 04:20", //峰值出现时间
    ValleyValue: "507.75", //谷值
    ValleyValueDate: "03/05 04:30", //谷值
    AverageValue: "1225.03" //平均值
  }
]

let echartsOption = {}
const loading = ref<boolean>(false)
const tableData = ref<GetEnergyAnalysisReportTableBaseData[]>([])
const searchData = ref<GetEnergyAnalysisReportReqData>({
  Obj: undefined,
  StartDate: "",
  EndDate: "",
  TimeInterval: undefined
})
const getTableData = async () => {
  loading.value = true
  tableData.value = energyAnalysisReportTableBaseData
  let TotalUseElectric: any[] = []
  let TotalHot: any[] = []
  let TotalCool: any[] = []
  let DateList: string[] = []
  for (const i of energyAnalysisReportLineBaseData) {
    DateList.push(i.DataDateTime)
    TotalUseElectric.push(i.TotalUseElectric)
    TotalHot.push(i.TotalHot)
    TotalCool.push(i.TotalCool)
  }
  echartsOption = {
    tooltip: {
      trigger: "axis"
    },
    legend: {
      data: ["总用电(KWH)", "总冷量(KWH)", "总热量(KWH)"]
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true
    },
    toolbox: {
      show: true,
      feature: {
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ["line", "bar"] },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    xAxis: {
      type: "category",
      show: true,
      boundaryGap: false,
      data: DateList
      //data: ["06-06 00:00", "06-06 01:00", "06-06 02:00", "06-06 03:00"]
    },
    yAxis: {
      name: "能耗",
      type: "value",
      axisLine: {
        show: true
      }
    },
    series: [
      {
        name: "总用电(KWH)",
        type: "line",
        //stack: "Total",
        data: TotalUseElectric
      },
      {
        name: "总冷量(KWH)",
        type: "line",
        //stack: "Total",
        data: TotalHot
      },
      {
        name: "总热量(KWH)",
        type: "line",
        //stack: "Total",
        data: TotalCool
      }
    ]
  }
  loading.value = false
}
onMounted(() => {
  getTableData()
})
</script>

<template>
  <div class="app-container">
    <el-card v-loading="loading" shadow="never">
      <div class="toolbar-wrapper">
        <div>
          <el-select clearable v-model="searchData.Obj" placeholder="对象选择" style="width: 130px; margin-right: 10px">
            <el-option v-for="item in objectOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <el-date-picker
            v-model="searchData.StartDate"
            type="date"
            placeholder="开始时间"
            size="default"
            style="width: 140px; margin-right: 10px"
          />
          <el-date-picker
            v-model="searchData.EndDate"
            type="date"
            placeholder="结束时间"
            size="default"
            style="width: 140px; margin-right: 10px"
          />
          <el-select
            clearable
            v-model="searchData.TimeInterval"
            placeholder="时间间隔"
            style="width: 130px; margin-right: 10px"
          >
            <el-option v-for="item in objectOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <el-button type="primary" :icon="CirclePlus" @click="getTableData">查询数据</el-button>
          <el-button type="primary" :icon="UploadFilled">导出数据</el-button>
        </div>
      </div>
      <div class="echarts-wrapper"><base-echart :option="echartsOption" /></div>
      <div class="table-wrapper">
        <el-table :data="tableData" border stripe>
          <!-- <el-table-column type="selection" width="50" align="center" /> -->
          <el-table-column prop="Obj" label="对象" align="center" />
          <el-table-column prop="TotalValue" label="总值(KWH)" align="center" />
          <el-table-column prop="PeakValue" label="峰值(KWH)" align="center" />
          <el-table-column prop="PeakValueDate" label="出现时间" align="center" />
          <el-table-column prop="ValleyValue" label="谷值(KWH)" align="center" />
          <el-table-column prop="ValleyValueDate" label="出现时间" align="center" />
          <el-table-column prop="AverageValue" label="平均值(KWH)" align="center" />
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.search-wrapper {
  margin-bottom: 20px;
  :deep(.el-card__body) {
    padding-bottom: 2px;
  }
}

.toolbar-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  height: 100%;
}

.table-wrapper {
  margin-bottom: 20px;
}

.pager-wrapper {
  display: flex;
  justify-content: flex-end;
}

:deep(.el-table__header) {
  background-color: #f5f7fa;
}

:deep(.el-table tr) {
  background-color: rgba(0, 0, 0, 0);
}

:deep(.el-table th.el-table__cell) {
  background-color: rgba(0, 0, 0, 0);
}
</style>
