<script lang="ts" setup>
import { reactive, ref, watch } from "vue"
import { getTableDataApi } from "@/api/table"
import { type CreateOrUpdateTableRequestData, type GetTableData } from "@/api/table/types/table"
import { type FormInstance, type FormRules, ElMessage, ElMessageBox } from "element-plus"
import { Search, Refresh, CirclePlus, UploadFilled, Delete, Download, RefreshRight } from "@element-plus/icons-vue"
import BaseEchart from "@/components/Echart/BaseEchart.vue"
import { now } from "lodash-es"
import RatingBar from "@/components/RatingBar/RatingBar.vue"

defineOptions({
  // 命名当前组件
  name: "EnergyEfficiencyCalendar"
})

const loading = ref<boolean>(false)
const calendarValue = ref(new Date())
const searchData = reactive({
  queryDate: now()
})

const resDate = reactive([
  {
    date: "2024-06-30",
    content: [{ e: "E:5.65" }, { p: "P:2366.85.65" }, { c: "C:2366.85.65" }, { m: "M:2366.85.65" }]
  },
  {
    date: "2024-06-01",
    content: [{ e: "E:5.65" }, { p: "P:2366.85.65" }, { c: "C:2366.85.65" }, { m: "M:2366.85.65" }]
  },
  {
    date: "2024-06-02",
    content: [{ e: "E:5.65" }, { p: "P:2366.85.65" }, { c: "C:2366.85.65" }, { m: "M:2366.85.65" }]
  },
  {
    date: "2024-06-24",
    content: [{ e: "E:5.65" }, { p: "P:2366.85.65" }, { c: "C:2366.85.65" }, { m: "M:2366.85.65" }]
  },
  {
    date: "2024-06-25",
    content: [{ e: "E:5.65" }, { p: "P:2366.85.65" }, { c: "C:2366.85.65" }, { m: "M:2366.85.65" }]
  },
  {
    date: "2024-06-26",
    content: [{ e: "E:5.65" }, { p: "P:2366.85.65" }, { c: "C:2366.85.65" }, { m: "M:2366.85.65" }]
  },
  {
    date: "2024-06-27",
    content: [{ e: "E:5.65" }, { p: "P:2366.85.65" }, { c: "C:2366.85.65" }, { m: "M:2366.85.65" }]
  },
  {
    date: "2024-06-28",
    content: [{ e: "E:5.65" }, { p: "P:2366.85.65" }, { c: "C:2366.85.65" }, { m: "M:2366.85.65" }]
  }
])

const echartsOption = {
  legend: {
    top: "5%",
    left: "left",
    orient: "vertical"
  },
  toolbox: {
    show: true,
    feature: {
      mark: { show: true }
    }
  },
  series: [
    {
      name: "Nightingale Chart",
      type: "pie",
      radius: ["55%", "70%"],
      data: [
        { value: 1048, name: "冷机电" },
        { value: 735, name: "冷冻泵电" },
        { value: 580, name: "冷却泵电" },
        { value: 484, name: "冷塔电" }
      ]
    }
  ]
}

const dealMyDate = (v: any) => {
  let res: Array<{ e?: string; p?: string; c?: string; m?: string }> = []
  for (let index = 0; index < resDate.length; index++) {
    if (resDate[index].date == v) {
      res = resDate[index].content
      break
    }
  }
  return res
}

const segments = [
  { text: "优秀", color: "#4caf50" }, // green
  { text: "良好", color: "#8bc34a" }, // light green
  { text: "一般", color: "#ffeb3b" }, // yellow
  { text: "为略改进", color: "#f44336" } // red
]
const labels = [
  { cop: 7.0, kwrt: 0.5, value: 0 },
  { cop: 5.9, kwrt: 0.6, value: 25 },
  { cop: 5.0, kwrt: 0.7, value: 50 },
  { cop: 4.4, kwrt: 0.8, value: 75 },
  { cop: 3.9, kwrt: 0.9, value: 100 },
  { cop: 3.5, kwrt: 1.0, value: 125 },
  { cop: 3.2, kwrt: 1.1, value: 150 },
  { cop: 2.9, kwrt: 1.2, value: 175 }
]
</script>

<template>
  <div class="app-container">
    <div class="left-card">
      <el-card v-loading="loading" shadow="never">
        <div class="calendar-title"><p>冷站能效日历</p></div>
        <div class="toolbar-wrapper">
          <el-date-picker
            type="month"
            v-model="searchData.queryDate"
            placeholder="日期选择"
            size="default"
            style="width: 120px; margin-right: 10px"
          />
          <el-button type="primary" :icon="CirclePlus">查询数据</el-button>
        </div>
        <el-calendar v-model="searchData.queryDate" style="width: 800px">
          <template #header="{ date }">
            <div>
              <span>{{ date }}</span>
            </div>
            <div class="letter-des">
              <span>E(运行能效)</span>
              <span>C(运行能效)</span>
              <span>P(日制电量)KWH</span>
              <span>M(冷量单价)</span>
            </div>
          </template>
          <template #date-cell="{ data }">
            <div class="calendar-item">
              <div class="calendar-time">
                {{ data.day.split("-").slice(2).join("") }}
              </div>
              <div>
                <div class="remark-text" v-for="(item, index) in dealMyDate(data.day)" :key="index">
                  <span class="e-span-color">{{ item.e }}</span>
                  <span>{{ item.p }}</span>
                  <span>{{ item.c }}</span>
                  <span>{{ item.m }}</span>
                </div>
              </div>
            </div>
          </template>
        </el-calendar>
      </el-card>
    </div>
    <div class="right-card">
      <el-card class="contrast-card">
        <div class="calendar-title"><p>能耗对比</p></div>
        <RatingBar
          :currentRating="4.0"
          currentLabel="当前能效"
          :segments="segments"
          :labels="labels"
          unit="COP "
          :width="800"
        />
      </el-card>
      <el-card class="pie-card">
        <div class="calendar-title"><p>分项图</p></div>
        <div class="echarts-wrapper"><base-echart :option="echartsOption" :width="'600'" /></div>
      </el-card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-calendar-table thead th) {
  color: #000;
  font-size: 14px;
  background-color: #eeeeee;
}
:deep(.el-calendar__header) {
  border-bottom: var(--el-calendar-header-border-bottom);
  display: flex;
  padding: 12px 20px;
  background-color: #588ebd;
  justify-content: normal;
  height: 40px;
  color: #fff;
  .letter-des {
    display: flex;
    margin-left: 40px;
    font-size: 12px;
    margin-top: 4px;
    span {
      margin-right: 30px;
    }
  }
}
:deep(.el-calendar-day) {
  height: 100px;
}
:deep(.calendar-time) {
  font-size: 14px;
  font-weight: bold;
  text-align: right;
}
.remark-text {
  .e-span-color {
    background-color: #588ebd;
  }
  span {
    font-weight: bold;
    font-size: 12px;
    width: 30px;
  }
}

.calendar-title {
  border-bottom: 2px solid #f5f5f5;
  p {
    color: #68b5b1;
    font-weight: bold;
  }
}
.app-container {
  display: flex;
}
.left-card {
  flex: 2;
  margin-right: 15px;
}
.right-card {
  flex: 3;
  display: flex;
  flex-direction: column;
}

.search-wrapper {
  margin-bottom: 20px;
  :deep(.el-card__body) {
    padding-bottom: 2px;
  }
}

.toolbar-wrapper {
  display: flex;
  margin-top: 10px;
  margin-bottom: 10px;
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
.contrast-card {
  height: 400px;
}
.rating-bar {
  margin-top: 120px;
  width: 80%;
}
.pie-card {
  margin-top: 15px;
}
</style>
