<script lang="ts" setup>
import { reactive, ref, watch } from "vue"
import { getTableDataApi } from "@/api/table"
import { type CreateOrUpdateTableRequestData, type GetTableData } from "@/api/table/types/table"
import { type FormInstance, type FormRules, ElMessage, ElMessageBox, FormProps } from "element-plus"
import { Search, Refresh, CirclePlus, UploadFilled, Delete, Download, RefreshRight } from "@element-plus/icons-vue"
import BaseEchart from "@/components/Echart/BaseEchart.vue"

const labelPosition = ref<FormProps["labelPosition"]>("left")
defineOptions({
  // 命名当前组件
  name: "EnergyParam"
})

const form = reactive({
  name: "",
  region: "",
  date1: "",
  date2: "",
  delivery: false,
  type: [],
  resource: "",
  desc: ""
})

const onSubmit = () => {
  console.log("submit!")
}
</script>

<template>
  <div class="app-container">
    <div class="left-card">
      <el-card style="min-width: 1000px">
        <div class="card-title"><p>能源价格设置</p></div>
        <el-form :model="form" class="form-style" :label-width="300" :label-position="labelPosition">
          <el-form-item label="方案名称">
            <el-input v-model="form.name" placeholder="计费方案名称，例如：项目名称_方案名称" />
          </el-form-item>
          <el-form-item label="开始时段">
            <el-date-picker
              type="day"
              v-model="form.name"
              placeholder="开始时间段"
              size="default"
              style="width: 150px; margin-right: 10px"
            />
          </el-form-item>
          <el-form-item label="结束时段">
            <el-date-picker
              type="day"
              v-model="form.name"
              placeholder="结束时间段"
              size="default"
              style="width: 150px; margin-right: 10px"
            />
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <div class="right-card">
      <el-card class="contrast-card">
        <div class="card-title"><p>能源价格列表</p></div>
      </el-card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.form-style {
  margin-top: 30px;
  max-width: 900px;
}
.el-form-item__label {
  font-weight: bolder;
  font-size: 30px;
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

.card-title {
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
</style>
