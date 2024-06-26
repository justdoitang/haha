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
  project_name: "",
  start_dete: "",
  end_date: "",
  top_time: "",
  top_time_price: "",
  peak_time: "",
  peak_time_price: "",
  flat_time: "",
  flat_time_price: "",
  valley_time: "",
  valley_time_price: ""
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
          <el-form-item label="方案名称" class="form-item-label">
            <el-input v-model="form.project_name" placeholder="计费方案名称，例如：项目名称_方案名称" />
          </el-form-item>
          <el-form-item label="开始时段" class="form-item-label">
            <el-date-picker
              type="day"
              v-model="form.start_dete"
              placeholder="开始时间段"
              size="default"
              style="width: 150px; margin-right: 10px"
            />
          </el-form-item>
          <el-form-item label="结束时段" class="form-item-label">
            <el-date-picker
              type="day"
              v-model="form.end_date"
              placeholder="结束时间段"
              size="default"
              style="width: 150px; margin-right: 10px"
            />
          </el-form-item>
          <el-form-item label="尖值时段" class="form-item-label">
            <el-time-picker
              format="HH:mm"
              v-model="form.top_time"
              is-range
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </el-form-item>
          <el-form-item label="尖值电价" class="form-item-label">
            <el-input
              v-model="form.top_time_price"
              placeholder="尖值电价"
              style="width: 100px"
              oninput="value=value.replace(/[^0-9.]/g,'')"
            />
            <label style="margin-left: 10px">元/KWH</label>
          </el-form-item>
          <el-form-item label="峰值时段" class="form-item-label">
            <el-time-picker
              format="HH:mm"
              v-model="form.peak_time"
              is-range
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </el-form-item>
          <el-form-item label="峰值电价" class="form-item-label">
            <el-input
              v-model="form.peak_time_price"
              placeholder="峰值电价"
              style="width: 100px"
              oninput="value=value.replace(/[^0-9.]/g,'')"
            />
            <label style="margin-left: 10px">元/KWH</label>
          </el-form-item>
          <el-form-item label="平值时段" class="form-item-label">
            <el-time-picker
              format="HH:mm"
              v-model="form.flat_time"
              is-range
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </el-form-item>
          <el-form-item label="平值电价" class="form-item-label">
            <el-input
              v-model="form.flat_time_price"
              placeholder="平值电价"
              style="width: 100px"
              oninput="value=value.replace(/[^0-9.]/g,'')"
            />
            <label style="margin-left: 10px">元/KWH</label>
          </el-form-item>
          <el-form-item label="谷值时段" class="form-item-label">
            <el-time-picker
              format="HH:mm"
              v-model="form.valley_time"
              is-range
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </el-form-item>
          <el-form-item label="谷值电价" class="form-item-label">
            <el-input
              v-model="form.valley_time_price"
              placeholder="峰值电价"
              style="width: 100px"
              oninput="value=value.replace(/[^0-9.]/g,'')"
            />
            <label style="margin-left: 10px">元/KWH</label>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"> 新增电价内容 </el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <div class="right-card">
      <el-card class="contrast-card">
        <div class="card-title"><p>能源价格列表</p></div>
        <div class="right-card-content">
          <el-row class="right-card-row">
            <el-col :span="12"
              ><div class="grid-content ep-bg-purple" />
              <label>尖值电价</label></el-col
            >
            <el-col :span="12"
              ><div class="grid-content ep-bg-purple-light" />
              {{ form.top_time_price }} 元/KWH</el-col
            >
          </el-row>
          <el-row class="right-card-row">
            <el-col :span="12"
              ><div class="grid-content ep-bg-purple" />
              <label>峰值电价</label></el-col
            >
            <el-col :span="12"
              ><div class="grid-content ep-bg-purple-light" />
              {{ form.peak_time_price }} 元/KWH</el-col
            >
          </el-row>
          <el-row class="right-card-row">
            <el-col :span="12"
              ><div class="grid-content ep-bg-purple" />
              <label>平值电价</label></el-col
            >
            <el-col :span="12"
              ><div class="grid-content ep-bg-purple-light" />
              {{ form.flat_time_price }} 元/KWH</el-col
            >
          </el-row>
          <el-row class="right-card-row">
            <el-col :span="12"
              ><div class="grid-content ep-bg-purple" />
              <label>谷值电价</label></el-col
            >
            <el-col :span="12"
              ><div class="grid-content ep-bg-purple-light" />
              {{ form.valley_time_price }} 元/KWH</el-col
            >
          </el-row>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.right-card-content {
  margin-top: 30px;
  .right-card-row {
    margin-bottom: 20px;
  }
}
.form-style {
  margin-top: 30px;
  max-width: 900px;
}
.form-item-label {
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
