<script lang="ts" setup>
import { reactive, ref, watch } from "vue"
import { getTableDataApi } from "@/api/table"
import { type CreateOrUpdateTableRequestData, type GetTableData } from "@/api/table/types/table"
import { type FormInstance, type FormRules, ElMessage, ElMessageBox } from "element-plus"
import {
  Search,
  Refresh,
  CirclePlus,
  UploadFilled,
  Delete,
  Download,
  RefreshRight,
  View
} from "@element-plus/icons-vue"
import { usePagination } from "@/hooks/usePagination"
import { now } from "lodash-es"

defineOptions({
  // 命名当前组件
  name: "RealTimeAlarm"
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

const loading = ref<boolean>(false)

const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()
const searchData = reactive({
  selectObj: ""
})
const tableData = ref<GetTableData[]>([])
const getTableData = () => {
  loading.value = true
}
//#endregion
</script>

<template>
  <div class="app-container">
    <el-card v-loading="loading" shadow="never">
      <div class="toolbar-title"><span>24小时未处理警报</span></div>
      <div class="toolbar-wrapper">
        <div>
          <el-select v-model="searchData.selectObj" placeholder="报警类型" style="width: 120px; margin-right: 10px">
            <el-option v-for="item in objectOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <el-button type="primary" :icon="CirclePlus">查询数据</el-button>
          <el-button type="primary" :icon="View">标识阅读</el-button>
        </div>
      </div>
      <div class="table-wrapper">
        <el-table :data="tableData" border stripe>
          <!-- <el-table-column type="selection" width="50" align="center" /> -->
          <el-table-column prop="username" label="时间" align="center" />
          <el-table-column prop="username" label="支路" align="center" />
          <el-table-column prop="username" label="楼宇名称" align="center" />
          <el-table-column prop="username" label="报警事件" align="center" />
          <el-table-column prop="username" label="报警类型" align="center" />
          <el-table-column prop="username" label="报警条件" align="center" />
          <el-table-column prop="username" label="此时数据" align="center" />
          <el-table-column prop="username" label="报警等级" align="center" />
          <el-table-column prop="username" label="处理状态" align="center" />
          <el-table-column prop="username" label="查看" align="center" />
          <el-table-column prop="username" label="操作备注" align="center" />
        </el-table>
      </div>
      <div class="pager-wrapper">
        <el-pagination
          background
          :layout="paginationData.layout"
          :page-sizes="paginationData.pageSizes"
          :total="paginationData.total"
          :page-size="paginationData.pageSize"
          :currentPage="paginationData.currentPage"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>

.toolbar-title {
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    font-size: 15px;
    font-weight: bold;
  }
}
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
  margin-top: 30px;
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
