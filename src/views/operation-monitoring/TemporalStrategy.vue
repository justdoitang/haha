<script lang="ts" setup>
import { reactive, ref, watch } from "vue"
import { CirclePlus } from "@element-plus/icons-vue"
import { type EnergyParamBaseData } from "@/api/energy-param/types/energy-param"
import { cloneDeep } from "lodash-es"

defineOptions({
  // 命名当前组件
  name: "TemporalStrategy"
})
const options = [
  {
    value: "0",
    label: "否"
  },
  {
    value: "1",
    label: "是"
  }
]

let isIndeterminate = false
let checkAll = false
const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
const weeks = ["日", "一", "二", "三", "四", "五", "六"]
const days = Array.from({ length: 31 }, (_, i) => i + 1)
const hours = Array.from({ length: 24 }, (_, i) => i)
const minutes = Array.from({ length: 60 }, (_, i) => i)

const handleCheckAllChange = (val: any) => {
  formData.value.months = val ? months : []
  isIndeterminate = false
}

const handleCheckedMonthsChange = (val: any) => {
  const checkedCount = val.length
  checkAll = checkedCount === formData.value.months.length
  isIndeterminate = checkedCount > 0 && checkedCount < formData.value.months.length
}

const DEFAULT_FORM_DATA: EnergyParamBaseData = {
  Id: undefined,
  Name: "",
  months: [],
  weeks: [],
  days: [],
  hours: [],
  minutes: [],
  frequency: "",
  maxDelay: "",
  expression: ""
}
const formData = ref<EnergyParamBaseData>(cloneDeep(DEFAULT_FORM_DATA))
</script>

<template>
  <div class="app-container">
    <div class="left-card">
      <el-card shadow="never">
        <div class="card-title"><p>时间策略配置</p></div>
      </el-card>
    </div>
    <div class="right-card">
      <el-card class="contrast-card">
        <el-form class="form-style" :model="formData" :label-width="140" label-position="left">
          <div class="form-col">
            <el-col :span="12"
              ><el-form-item label="任务编号：" class="form-item-label">
                <el-input v-model="formData.Name" /> </el-form-item
            ></el-col>
            <el-col :span="12"
              ><el-form-item label="任务名称：" class="form-item-label">
                <el-input v-model="formData.Name" /> </el-form-item
            ></el-col>
          </div>
          <div class="form-col">
            <el-col :span="8"
              ><el-form-item label="任务生效日期：" class="form-item-label">
                <el-date-picker
                  v-model="formData.Name"
                  type="date"
                  placeholder="开始时间"
                  size="default"
                  style="width: 160px; margin-right: 10px" /></el-form-item
            ></el-col>
            <el-col :span="8"
              ><el-form-item label="任务结束日期：" class="form-item-label">
                <el-date-picker
                  v-model="formData.Name"
                  type="date"
                  placeholder="开始时间"
                  size="default"
                  style="width: 160px; margin-right: 10px"
                /> </el-form-item
            ></el-col>
            <el-col :span="8"
              ><el-form-item label="是否启用此方案：" class="form-item-label">
                <el-select v-model="formData.Name" placeholder="请选择" style="width: 240px">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select> </el-form-item
            ></el-col>
          </div>
          <div class="checkbox-group-all">
            <el-form-item label="按月执行：" class="form-item-label">
              <el-checkbox :indeterminate="isIndeterminate" v-model="formData.Name" @change="handleCheckAllChange" />
            </el-form-item>
          </div>
          <div class="checkbox-group">
            <el-checkbox-group v-model="formData.months" @change="handleCheckedMonthsChange">
              <el-checkbox v-for="month in months" :label="month" :key="month">{{ month }}月</el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="checkbox-group-all">
            <el-form-item label="按周执行：" class="form-item-label">
              <el-checkbox :indeterminate="isIndeterminate" v-model="formData.Name" @change="handleCheckAllChange" />
            </el-form-item>
          </div>
          <div class="checkbox-group">
            <el-checkbox-group v-model="formData.weeks" @change="handleCheckedMonthsChange">
              <el-checkbox v-for="week in weeks" :label="week" :key="week">周{{ week }}</el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="checkbox-group-all">
            <el-form-item label="按天执行：" class="form-item-label">
              <el-checkbox :indeterminate="isIndeterminate" v-model="formData.Name" @change="handleCheckAllChange" />
            </el-form-item>
          </div>
          <div class="checkbox-group">
            <el-checkbox-group v-model="formData.days" @change="handleCheckedMonthsChange">
              <el-checkbox v-for="day in days" :label="day" :key="day">{{ day }}号</el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="checkbox-group-all">
            <el-form-item label="按小时执行：" class="form-item-label">
              <el-checkbox :indeterminate="isIndeterminate" v-model="formData.Name" @change="handleCheckAllChange" />
            </el-form-item>
          </div>
          <div class="checkbox-group">
            <el-checkbox-group v-model="formData.hours" @change="handleCheckedMonthsChange">
              <el-checkbox v-for="hour in hours" :label="hour" :key="hour">{{ hour }}</el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="checkbox-group-all">
            <el-form-item label="按分钟执行：" class="form-item-label">
              <el-checkbox :indeterminate="isIndeterminate" v-model="formData.Name" @change="handleCheckAllChange" />
            </el-form-item>
          </div>
          <div class="checkbox-group">
            <el-checkbox-group v-model="formData.minutes" @change="handleCheckedMonthsChange">
              <el-checkbox v-for="minute in minutes" :label="minute" :key="minute">{{ minute }}</el-checkbox>
            </el-checkbox-group>
          </div>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-container {
  display: flex;
}
.card-title {
  border-bottom: 2px solid #f5f5f5;
  p {
    color: #68b5b1;
    font-weight: bold;
  }
}
.left-card {
  flex: 2;
  margin-right: 15px;
}
.right-card {
  flex: 5;
}
.form-col {
  display: flex;
  justify-content: center;
  align-items: center;
}
.form-style {
  .form-item-label {
    font-size: 20px;
    font-weight: bolder;
  }
}
.form-style .el-input {
  --el-input-width: 300px;
}
.checkbox-group {
  border: 3px solid #000;
  align-items: center;
  .el-checkbox-group {
    align-items: center;
    margin-left: 15px;
    margin-top: 3px;
    margin-bottom: 3px;
  }
  .el-checkbox {
    margin-left: 30px;
  }
}
</style>
