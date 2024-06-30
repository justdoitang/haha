<script lang="ts" setup>
import { reactive, ref, watch } from "vue"
import { getTableDataApi } from "@/api/table"
import { type CreateOrUpdateTableRequestData, type GetTableData } from "@/api/table/types/table"
import { type FormInstance, type FormRules, ElMessage, ElMessageBox } from "element-plus"
import { Search, Refresh, CirclePlus, UploadFilled, Delete, Download, RefreshRight } from "@element-plus/icons-vue"
import BaseEchart from "@/components/Echart/BaseEchart.vue"
import { now } from "lodash-es"

defineOptions({
  // 命名当前组件
  name: "LoadProportion"
})

const echartsOption = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      crossStyle: {
        color: "#999"
      }
    }
  },
  toolbox: {
    feature: {
      dataView: { show: true, readOnly: false },
      magicType: { show: true, type: ["line", "bar"] },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  legend: {
    data: ["负荷比例(%)", "冷站能效(KW/KW)"]
  },
  xAxis: [
    {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      axisPointer: {
        type: "shadow"
      }
    }
  ],
  yAxis: [
    {
      type: "value",
      name: "负荷比例(%)",
      min: 0,
      max: 100,
      interval: 10,
      axisLabel: {
        formatter: "{value}"
      },
      axisLine: {
        show: true
      }
    },
    {
      type: "value",
      name: "冷站能效(KW/KW)",
      min: 0,
      max: 9,
      interval: 0.9,
      axisLabel: {
        formatter: "{value}"
      },
      axisLine: {
        show: true
      }
    }
  ],
  series: [
    {
      name: "负荷比例(%)",
      type: "bar",
      tooltip: {
        valueFormatter: function (value: any) {
          return (value as number) + " %"
        }
      },
      data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
    },
    {
      name: "冷站能效(KW/KW)",
      type: "line",
      yAxisIndex: 1,
      tooltip: {
        valueFormatter: function (value: any) {
          return (value as number) + " KW/KW"
        }
      },
      data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
    }
  ]
}

//#region 查
const loading = ref<boolean>(false)
const searchData = reactive({
  queryDate: now()
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
            type="month"
            v-model="searchData.queryDate"
            placeholder="日期选择"
            size="default"
            style="width: 120px; margin-right: 10px"
          />
          <el-button type="primary" :icon="CirclePlus">查询数据</el-button>
          <el-button type="primary" :icon="UploadFilled">导出数据</el-button>
        </div>
      </div>
      <div class="echarts-wrapper"><base-echart :option="echartsOption" /></div>
      <div style="margin-left: 140px"><span>注:上行为比例区间,中 下行为冷量区间，冷量单位分别为为KWNH RTH</span></div>
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

.pager-wrapper {
  display: flex;
  justify-content: flex-end;
}

.echarts-wrapper {
  height: 100%;
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
