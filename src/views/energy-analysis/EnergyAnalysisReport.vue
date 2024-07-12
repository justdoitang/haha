<script lang="ts" setup>
import { reactive, ref, watch, onMounted } from "vue"
import { getTableDataApi } from "@/api/table"
import { type CreateOrUpdateTableRequestData, type GetTableData } from "@/api/table/types/table"
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
  { DataDateTiem: "06-06 00:00", TotalUseElectric: "2000", TotalHot: "1500", TotalCool: "900" },
  { DataDateTiem: "06-06 01:00", TotalUseElectric: "3000", TotalHot: "900", TotalCool: "1100" },
  { DataDateTiem: "06-06 02:00", TotalUseElectric: "1500", TotalHot: "1600", TotalCool: "700" },
  { DataDateTiem: "06-06 03:00", TotalUseElectric: "2800", TotalHot: "1400", TotalCool: "3000" }
]

let TotalUseElectric: any[] = []
let TotalHot: any[] = []
let TotalCool: any[] = []
let DateList: string[] = []

const loading = ref<boolean>(false)
const tableData = ref<GetTableData[]>([])
const searchData = ref<GetEnergyAnalysisReportReqData>({
  Obj: undefined,
  StartDate: "",
  EndDate: "",
  TimeInterval: undefined
})
const getTableData = async  () => {
  loading.value = true
  for (const i of energyAnalysisReportLineBaseData) {
    DateList.push(i.DataDateTiem)
    // TotalUseElectric.push({
    //   name: "总用电(KWH)",
    //   value: i.TotalUseElectric,
    //   date: i.DataDateTiem
    // })
    // TotalHot.push({
    //   name: "总冷量(KWH)",
    //   value: i.TotalHot,
    //   date: i.DataDateTiem
    // })
    // TotalCool.push({
    //   name: "总热量(KWH)",
    //   value: i.TotalCool,
    //   date: i.DataDateTiem
    // })
    TotalUseElectric.push(i.TotalUseElectric)
    TotalHot.push(i.TotalHot)
    TotalCool.push(i.TotalCool)
  }
  console.log(DateList)
  console.log(TotalUseElectric)
  loading.value = false
}

const echartsOption = {
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
      stack: "Total",
      data: TotalUseElectric
    },
    {
      name: "总冷量(KWH)",
      type: "line",
      stack: "Total",
      data: TotalHot
    },
    {
      name: "总热量(KWH)",
      type: "line",
      stack: "Total",
      data: TotalCool
    }
  ]
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
          <el-table-column prop="username" label="对象" align="center" />
          <el-table-column prop="username" label="总值(KWH)" align="center" />
          <el-table-column prop="username" label="峰值(KWH)" align="center" />
          <el-table-column prop="username" label="出现时间" align="center" />
          <el-table-column prop="username" label="谷值(KWH)" align="center" />
          <el-table-column prop="username" label="出现时间" align="center" />
          <el-table-column prop="username" label="平均值(KWH)" align="center" />
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
