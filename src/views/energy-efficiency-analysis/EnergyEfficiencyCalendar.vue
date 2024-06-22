<script lang="ts" setup>
import { reactive, ref, watch } from "vue"
import { getTableDataApi } from "@/api/table"
import { type CreateOrUpdateTableRequestData, type GetTableData } from "@/api/table/types/table"
import { type FormInstance, type FormRules, ElMessage, ElMessageBox } from "element-plus"
import { Search, Refresh, CirclePlus, UploadFilled, Delete, Download, RefreshRight } from "@element-plus/icons-vue"
import BaseEchart from "@/components/Echart/BaseEchart.vue"

defineOptions({
  // 命名当前组件
  name: "EnergyEfficiencyCalendar"
})

const loading = ref<boolean>(false)
const calendarValue = ref(new Date())
const searchData = reactive({
  queryDate: ""
})
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
        <el-calendar v-model="calendarValue" style="width: 800px">
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
        </el-calendar></el-card
      >
    </div>
    <div class="right-card">
      <el-card class="contrast-card">
        <div class="calendar-title"><p>能耗对比</p></div>
      </el-card>
      <el-card class="pie-card">
        <div class="calendar-title"><p>分项图</p></div>
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
</style>
