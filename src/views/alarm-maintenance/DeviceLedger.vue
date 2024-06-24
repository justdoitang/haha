<script lang="ts" setup>
import { reactive, ref, watch } from "vue"
import { getTableDataApi } from "@/api/table"
import { type CreateOrUpdateTableRequestData, type GetTableData } from "@/api/table/types/table"
import { type FormInstance, type FormRules, ElMessage, ElMessageBox } from "element-plus"
import { Edit, Delete, Plus, Download, RefreshRight, View } from "@element-plus/icons-vue"
import { usePagination } from "@/hooks/usePagination"
import { now } from "lodash-es"

defineOptions({
  // 命名当前组件
  name: "DeviceLedger"
})

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
      <div class="toolbar-wrapper">
        <div>
          <el-button type="primary" :icon="Plus">新增</el-button>
          <el-button type="primary" :icon="Edit">编辑</el-button>
          <el-button type="primary" :icon="Delete">删除</el-button>
        </div>
        <div>
          <el-button type="primary" :icon="Download">全部数据导出</el-button>
        </div>
      </div>
      <div class="table-wrapper">
        <el-table :data="tableData" border stripe>
          <el-table-column prop="username" label="选择" align="center" />
          <el-table-column prop="username" label="设备标识" align="center" />
          <el-table-column prop="username" label="设备编号" align="center" />
          <el-table-column prop="username" label="设备名称" align="center" />
          <el-table-column prop="username" label="安装位置" align="center" />
          <el-table-column prop="username" label="所属系统" align="center" />
          <el-table-column prop="username" label="操作" align="center" />
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
