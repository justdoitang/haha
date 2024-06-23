<script lang="ts" setup>
import { reactive, ref, watch } from "vue"
import { type CreateOrUpdateTableRequestData, type GetTableData } from "@/api/table/types/table"
import { type FormInstance, type FormRules, ElMessage, ElMessageBox } from "element-plus"
import { Search, Refresh, CirclePlus, UploadFilled, Delete, Download, RefreshRight } from "@element-plus/icons-vue"
import BaseEchart from "@/components/Echart/BaseEchart.vue"

defineOptions({
  // 命名当前组件
  name: "HotBalanceRate"
})

const echartsOption = {
  tooltip: {
    trigger: "axis"
  },
  legend: {},
  toolbox: {
    feature: {
      dataView: { show: true, readOnly: false },
      magicType: { show: true, type: ["line", "bar"] },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  },
  yAxis: {
    type: "value",
    name: "热不平衡率",
    min: -20,
    max: 20,
    interval: 4,
    axisLabel: {
      formatter: "{value}"
    },
    axisLine: {
      show: true
    }
  },
  series: [
    {
      name: "冷站热不平衡率",
      type: "line",
      data: [1, -2, 2, 5, 3, 2, 0]
    }
  ]
}

//#region 查
const loading = ref<boolean>(false)
const tableData = ref<GetTableData[]>([])
const searchData = reactive({
  startDate: "",
  endDate: ""
})
const getTableData = () => {
  loading.value = true
}
//#endregion
</script>

<template>
  <div class="app-container">
    <el-card v-loading="loading" shadow="never">
      <div class="toolbar-wrapper">
        <div>
          <el-date-picker
            v-model="searchData.startDate"
            type="date"
            placeholder="开始时间"
            size="default"
            style="width: 120px; margin-right: 10px"
          />
          <el-date-picker
            v-model="searchData.endDate"
            type="date"
            placeholder="结束时间"
            size="default"
            style="width: 120px; margin-right: 10px"
          />
          <el-button type="primary" :icon="CirclePlus" @click="dialogVisible = true">查询数据</el-button>
          <el-button type="primary" :icon="UploadFilled">导出数据</el-button>
        </div>
      </div>
      <div class="echarts-wrapper"><base-echart :option="echartsOption" /></div>
      <div class="table-wrapper">
        <el-table :data="tableData" border stripe>
          <el-table-column prop="username" label="采集量" align="center" />
          <el-table-column prop="username" label="达标量" align="center" />
          <el-table-column prop="username" label="不达标量" align="center" />
          <el-table-column prop="username" label="达标率" align="center" />
          <el-table-column prop="username" label="数据校核" align="center" />
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
