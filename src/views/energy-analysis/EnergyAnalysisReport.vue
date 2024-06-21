<script lang="ts" setup>
import { reactive, ref, watch } from "vue"
import { getTableDataApi } from "@/api/table"
import { type CreateOrUpdateTableRequestData, type GetTableData } from "@/api/table/types/table"
import { type FormInstance, type FormRules, ElMessage, ElMessageBox } from "element-plus"
import { Search, Refresh, CirclePlus, UploadFilled, Delete, Download, RefreshRight } from "@element-plus/icons-vue"
import BaseEchart from "@/components/Echart/BaseEchart.vue"

defineOptions({
  // 命名当前组件
  name: "ElementPlus"
})

const loading = ref<boolean>(false)
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
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: "category",
    show: true,
    boundaryGap: false,
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
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
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: "总冷量(KWH)",
      type: "line",
      stack: "Total",
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: "总热量(KWH)",
      type: "line",
      stack: "Total",
      data: [150, 232, 201, 154, 190, 330, 410]
    }
  ]
}

const dialogVisible = ref<boolean>(false)
//#region 查
const tableData = ref<GetTableData[]>([])
const searchFormRef = ref<FormInstance | null>(null)
const searchData = reactive({
  username: "",
  phone: "",
  selectObj: "",
  startDate: "",
  endDate: ""
})
const getTableData = () => {
  loading.value = true
}
const resetSearch = () => {
  searchFormRef.value?.resetFields()
}
//#endregion
</script>

<template>
  <div class="app-container">
    <!-- <el-card v-loading="loading" shadow="never" class="search-wrapper">
      <el-form ref="searchFormRef" :inline="true" :model="searchData">
        <el-form-item prop="username" label="用户名">
          <el-input v-model="searchData.username" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="phone" label="手机号">
          <el-input v-model="searchData.phone" placeholder="请输入" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch">查询</el-button>
          <el-button :icon="Refresh" @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card> -->
    <el-card v-loading="loading" shadow="never">
      <div class="toolbar-wrapper">
        <div>
          <el-select v-model="searchData.selectObj" placeholder="对象选择" style="width: 120px; margin-right: 10px">
            <el-option v-for="item in objectOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
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
          <el-select v-model="searchData.selectObj" placeholder="时间间隔" style="width: 120px; margin-right: 10px">
            <el-option v-for="item in objectOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <el-button type="primary" :icon="CirclePlus" @click="dialogVisible = true">查询数据</el-button>
          <el-button type="primary" :icon="UploadFilled">导出数据</el-button>
        </div>
        <div>
          <el-tooltip content="下载">
            <el-button type="primary" :icon="Download" circle />
          </el-tooltip>
          <el-tooltip content="刷新当前页">
            <el-button type="primary" :icon="RefreshRight" circle @click="getTableData" />
          </el-tooltip>
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
