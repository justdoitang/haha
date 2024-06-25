<script lang="ts" setup>
import { reactive, ref } from "vue"
import { CirclePlus, UploadFilled } from "@element-plus/icons-vue"
import { now } from "lodash-es"

defineOptions({
  // 命名当前组件
  name: "ColdStationLog"
})

const loading = ref<boolean>(false)

const searchData = reactive({
  queryDate: now()
})

const dataEntries = [
  {
    time: "00:00",
    systemCold: 1469.17,
    systemConsumption: 265.9,
    mainConsumption: 131.27,
    frozenPumpConsumption: 103.52,
    coolingPumpConsumption: 17.66,
    coolingTowerConsumption: 13.45,
    systemEfficiency: 5.53,
    mainEfficiency: 11.19,
    frozenPumpEfficiency: 14.19,
    coolingPumpEfficiency: 83.19,
    coolingTowerEfficiency: 109.24,
    coolingInTemperature: 8.88,
    coolingOutTemperature: 27.34
  },
  {
    time: "01:00",
    systemCold: 1460.13,
    systemConsumption: 268.39,
    mainConsumption: 133.84,
    frozenPumpConsumption: 102.74,
    coolingPumpConsumption: 15.28,
    coolingTowerConsumption: 16.53,
    systemEfficiency: 5.45,
    mainEfficiency: 10.91,
    frozenPumpEfficiency: 14.21,
    coolingPumpEfficiency: 95.58,
    coolingTowerEfficiency: 88.33,
    coolingInTemperature: 8.79,
    coolingOutTemperature: 27.28
  }
]
</script>

<template>
  <div class="app-container">
    <el-card v-loading="loading" shadow="never">
      <div class="toolbar-wrapper">
        <div>
          <el-date-picker
            type="day"
            v-model="searchData.queryDate"
            placeholder="日期选择"
            size="default"
            style="width: 150px; margin-right: 10px"
          />
          <el-button type="primary" :icon="CirclePlus">查询数据</el-button>
          <el-button type="primary" :icon="UploadFilled">导出数据</el-button>
        </div>
      </div>
      <div class="table-wrapper">
        <table class="header-table">
          <tr>
            <th class="titel-th titel-th-color">报告名称</th>
            <td colspan="32">冷站运行日志</td>
          </tr>
          <tr>
            <th class="titel-th titel-th-color">数据时间</th>
            <td colspan="32">2024年03月05日</td>
          </tr>
          <tr>
            <th class="titel-th titel-th-color">导出时间</th>
            <td colspan="32">2024-03-05 10:44</td>
          </tr>
          <tr>
            <th class="titel-th-color" />
            <td colspan="16" class="titel-th-color">冷站参数</td>
            <td colspan="16" class="titel-th-color">分项电耗</td>
          </tr>
          <tr>
            <th class="titel-th titel-th-color" rowspan="2">对象</th>
            <td colspan="4" class="obj-td-color">冷站输入电量</td>
            <td colspan="4" class="obj-td-color">冷站输出冷量</td>
            <td colspan="4" class="obj-td-color">系统散热量</td>
            <td colspan="4" class="obj-td-color">系统效率</td>
            <td colspan="4" class="obj-td-color">主机电量</td>
            <td colspan="4" class="obj-td-color">冷冻泵电量</td>
            <td colspan="4" class="obj-td-color">冷却泵电量</td>
            <td colspan="4" class="obj-td-color">冷却塔电量</td>
          </tr>
          <tr>
            <td colspan="4" class="obj-td-color">KWH</td>
            <td colspan="4" class="obj-td-color">KWH</td>
            <td colspan="4" class="obj-td-color">KWH</td>
            <td colspan="4" class="obj-td-color">KW/KW</td>
            <td colspan="4" class="obj-td-color">KWH</td>
            <td colspan="4" class="obj-td-color">KWH</td>
            <td colspan="4" class="obj-td-color">KWH</td>
            <td colspan="4" class="obj-td-color">KWH</td>
          </tr>
          <tr>
            <th class="titel-th titel-th-color">日数据</th>
            <td colspan="4">2366.85</td>
            <td colspan="4">13377.93</td>
            <td colspan="4">12658.66</td>
            <td colspan="4">5.65</td>
            <td colspan="4">1159.81</td>
            <td colspan="4">954.65</td>
            <td colspan="4">152.89</td>
            <td colspan="4">99.98</td>
          </tr>
          <tr>
            <th class="titel-th-color" />
            <td colspan="4" class="titel-th-color">逐时总能耗</td>
            <td colspan="8" class="titel-th-color">逐时分项能耗</td>
            <td colspan="10" class="titel-th-color">逐时分项效率</td>
            <td colspan="8" class="titel-th-color">逐时水温</td>
          </tr>
          <tr>
            <th class="titel-th titel-th-color" rowspan="2">时间</th>
            <td colspan="2" class="obj-td-color">系统冷量</td>
            <td colspan="2" class="obj-td-color">系统电量</td>
            <td colspan="2" class="obj-td-color">主机电量</td>
            <td colspan="2" class="obj-td-color">冷冻泵电量</td>
            <td colspan="2" class="obj-td-color">冷却泵电量</td>
            <td colspan="2" class="obj-td-color">冷却塔电量</td>
            <td colspan="2" class="obj-td-color">系统效率</td>
            <td colspan="2" class="obj-td-color">主机效率</td>
            <td colspan="2" class="obj-td-color">冷冻泵输送系数</td>
            <td colspan="2" class="obj-td-color">冷却泵输送系数</td>
            <td colspan="2" class="obj-td-color">冷却塔输送系数</td>
            <td colspan="2" class="obj-td-color">冷冻进水温度</td>
            <td colspan="2" class="obj-td-color">冷冻出水温度</td>
            <td colspan="2" class="obj-td-color">冷却进水温度</td>
            <td colspan="2" class="obj-td-color">冷却出水温度</td>
          </tr>
          <tr>
            <td colspan="2" class="time-td-color">KNH</td>
            <td colspan="2" class="time-td-color">KWH</td>
            <td colspan="2" class="time-td-color">KWH</td>
            <td colspan="2" class="time-td-color">KWH</td>
            <td colspan="2" class="time-td-color">KWH</td>
            <td colspan="2" class="time-td-color">KWH</td>
            <td colspan="2" class="time-td-color">KW/KW</td>
            <td colspan="2" class="time-td-color">KW/KW</td>
            <td colspan="2" class="time-td-color">KW/KW</td>
            <td colspan="2" class="time-td-color">KW/KW</td>
            <td colspan="2" class="time-td-color">℃</td>
            <td colspan="2" class="time-td-color">℃</td>
            <td colspan="2" class="time-td-color">℃</td>
            <td colspan="2" class="time-td-color">℃</td>
            <td colspan="2" class="time-td-color">℃</td>
          </tr>
          <tr v-for="entry in dataEntries" :key="entry.time">
            <th class="titel-th">{{ entry.time }}</th>
            <td colspan="2">{{ entry.systemCold }}</td>
            <td colspan="2">{{ entry.systemConsumption }}</td>
            <td colspan="2">{{ entry.mainConsumption }}</td>
            <td colspan="2">{{ entry.frozenPumpConsumption }}</td>
            <td colspan="2">{{ entry.coolingPumpConsumption }}</td>
            <td colspan="2">{{ entry.coolingTowerConsumption }}</td>
            <td colspan="2">{{ entry.systemEfficiency }}</td>
            <td colspan="2">{{ entry.mainEfficiency }}</td>
            <td colspan="2">{{ entry.frozenPumpEfficiency }}</td>
            <td colspan="2">{{ entry.coolingPumpEfficiency }}</td>
            <td colspan="2">{{ entry.coolingTowerEfficiency }}</td>
            <td colspan="2">{{ entry.coolingInTemperature }}</td>
            <td colspan="2">{{ entry.coolingOutTemperature }}</td>
            <td colspan="2">{{ entry.coolingOutTemperature }}</td>
            <td colspan="2">{{ entry.coolingTowerEfficiency }}</td>
          </tr>
        </table>
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.toolbar-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  height: 100%;
}

.table-wrapper {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
}
body {
  font-family: Arial, sans-serif;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  border: 1px solid #000;
}
th,
td {
  text-align: center;
  padding: 8px;
  border: 1px solid #000;
  height: 35px;
  font-size: 12px;
  font-weight: bolder;
}
th {
  background-color: #f2f2f2;
}

.titel-th {
  width: 120px;
}
.titel-th-color {
  background-color: #e2e9f3;
}
.obj-td-color {
  background-color: #ededed;
}
.time-td-color {
  background-color: #ededed;
  width: 120px;
}
</style>
