<script lang="ts" setup>
import { ref } from "vue"
import { CirclePlus } from "@element-plus/icons-vue"
import { type TemporalStrategyBaseData } from "@/api/operation-monitoring/temporal-strategy/types/temporal-strategy"
import { cloneDeep } from "lodash-es"

defineOptions({
  // 命名当前组件
  name: "TemporalStrategy"
})
const options = [
  {
    value: false,
    label: "否"
  },
  {
    value: true,
    label: "是"
  }
]

//let isIndeterminate = false
const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
const weeks = ["日", "一", "二", "三", "四", "五", "六"]
const days = Array.from({ length: 31 }, (_, i) => i + 1)
const hours = Array.from({ length: 24 }, (_, i) => i)
const minutes = Array.from({ length: 60 }, (_, i) => i)

const handleSelectMonthChange = (val: any) => {
  formData.value.Months = val ? months : []
}
const handleCheckedMonthsChange = (val: any) => {
  const checkedCount = val.length
  formData.value.IsMonth = checkedCount > 0
}
const handleSelectWeekChange = (val: any) => {
  console.log(val)
  formData.value.Weeks = val ? weeks : []
}
const handleCheckedWeekChange = (val: any) => {
  const checkedCount = val.length
  formData.value.IsWeek = checkedCount > 0
}
const handleSelectDayChange = (val: any) => {
  formData.value.Days = val ? days : []
}
const handleCheckedDayChange = (val: any) => {
  const checkedCount = val.length
  formData.value.IsDay = checkedCount > 0
}
const handleSelectHourChange = (val: any) => {
  formData.value.Hours = val ? hours : []
}
const handleCheckedHourChange = (val: any) => {
  const checkedCount = val.length
  formData.value.IsHour = checkedCount > 0
}
const handleSelectMinuteChange = (val: any) => {
  formData.value.Minutes = val ? minutes : []
}
const handleCheckedMinuteChange = (val: any) => {
  const checkedCount = val.length
  formData.value.IsMinute = checkedCount > 0
}

const DEFAULT_FORM_DATA: TemporalStrategyBaseData = {
  Id: undefined,
  TaskNumber: "",
  TaskName: "",
  TaskStartDate: "",
  TaskEndDate: "",
  IsEnable: false,
  IsMonth: false,
  Months: [],
  IsWeek: false,
  Weeks: [],
  IsDay: false,
  Days: [],
  IsHour: false,
  Hours: [],
  IsMinute: false,
  Minutes: [],
  Frequency: "",
  MaxDelay: "",
  Expression: ""
}
const formData = ref<TemporalStrategyBaseData>(cloneDeep(DEFAULT_FORM_DATA))
</script>

<template>
  <div class="app-container">
    <div class="left-card">
      <el-card shadow="never" style="max-width: 400px">
        <div class="card-title"><p>时间策略配置</p></div>
      </el-card>
    </div>
    <div class="right-card">
      <el-card style="min-width: 1250px">
        <el-form class="form-style" :model="formData" label-width="130px" label-position="left">
          <div class="form-col">
            <el-col :span="12"
              ><el-form-item label="任务编号：" class="form-item-label">
                <el-input v-model="formData.TaskNumber" /> </el-form-item
            ></el-col>
            <el-col :span="12"
              ><el-form-item label="任务名称：" class="form-item-label">
                <el-input v-model="formData.TaskName" /> </el-form-item
            ></el-col>
          </div>
          <div class="form-col">
            <el-col :span="8"
              ><el-form-item label="任务生效日期：" class="form-item-label">
                <el-date-picker
                  v-model="formData.TaskStartDate"
                  type="date"
                  placeholder="开始时间"
                  style="width: 160px; margin-right: 10px" /></el-form-item
            ></el-col>
            <el-col :span="8"
              ><el-form-item label="任务结束日期：" class="form-item-label">
                <el-date-picker
                  v-model="formData.TaskEndDate"
                  type="date"
                  placeholder="开始时间"
                  style="width: 160px; margin-right: 10px"
                /> </el-form-item
            ></el-col>
            <el-col :span="8"
              ><el-form-item label="是否启用此方案：" class="form-item-label">
                <el-select v-model="formData.IsEnable" placeholder="请选择" style="width: 240px">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select> </el-form-item
            ></el-col>
          </div>
          <div>
            <el-form-item label="按月执行：" class="form-item-label el-form-item1">
              <el-checkbox v-model="formData.IsMonth" @change="handleSelectMonthChange" />
            </el-form-item>
          </div>
          <div class="checkbox-group">
            <el-checkbox-group v-model="formData.Months" @change="handleCheckedMonthsChange">
              <el-checkbox v-for="month in months" :value="month" :key="month">{{ month }}月</el-checkbox>
            </el-checkbox-group>
          </div>
          <div>
            <el-form-item label="按周执行：" class="form-item-label el-form-item1">
              <el-checkbox v-model="formData.IsWeek" @change="handleSelectWeekChange" />
            </el-form-item>
          </div>
          <div class="checkbox-group">
            <el-checkbox-group v-model="formData.Weeks" @change="handleCheckedWeekChange">
              <el-checkbox v-for="week in weeks" :value="week" :key="week">周{{ week }}</el-checkbox>
            </el-checkbox-group>
          </div>
          <div>
            <el-form-item label="按天执行：" class="form-item-label el-form-item1">
              <el-checkbox v-model="formData.IsDay" @change="handleSelectDayChange" />
            </el-form-item>
          </div>
          <div class="checkbox-group">
            <el-checkbox-group v-model="formData.Days" @change="handleCheckedDayChange">
              <el-checkbox v-for="day in days" :value="day" :key="day">{{ day }}号</el-checkbox>
            </el-checkbox-group>
          </div>
          <div>
            <el-form-item label="按小时执行：" class="form-item-label el-form-item1">
              <el-checkbox v-model="formData.IsHour" @change="handleSelectHourChange" />
            </el-form-item>
          </div>
          <div class="checkbox-group">
            <el-checkbox-group v-model="formData.Hours" @change="handleCheckedHourChange">
              <el-checkbox v-for="hour in hours" :value="hour" :key="hour">{{ hour }}</el-checkbox>
            </el-checkbox-group>
          </div>
          <div>
            <el-form-item label="按分钟执行：" class="form-item-label el-form-item1">
              <el-checkbox v-model="formData.IsMinute" @change="handleSelectMinuteChange" />
            </el-form-item>
          </div>
          <div class="checkbox-group">
            <el-checkbox-group v-model="formData.Minutes" @change="handleCheckedMinuteChange">
              <el-checkbox v-for="minute in minutes" :value="minute" :key="minute">{{ minute }}</el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="input-group">
            <el-form-item label="频率(分)：" class="form-item-label">
              <el-input v-model="formData.Frequency" />
              <label class="input-group-label">【最小执行频率(分)，0代表数据上传时即时解发】</label>
            </el-form-item>
          </div>
          <div class="input-group">
            <el-form-item label="表达式：" class="form-item-label">
              <el-input v-model="formData.MaxDelay" />
              <label class="input-group-label">【要满足的表达式（如果总是执行,请填入1）】</label>
            </el-form-item>
          </div>
          <div class="input-group">
            <el-form-item label="设定值表达式：" class="form-item-label">
              <el-input v-model="formData.Expression" />
              <label class="input-group-label">【当满足表达式时，设置的被控制动作的值的表达式】</label>
            </el-form-item>
          </div>
        </el-form>
        <div style="text-align: center"><el-button type="primary" :icon="CirclePlus">保存</el-button></div>
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
.el-card {
  height: 828px;
}
.left-card {
  flex: 2;
  margin-right: 15px;
}
.right-card {
  flex: 5;
}
.form-col {
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.form-style {
  .form-item-label {
    font-weight: bolder;
  }
}
.el-form-item {
  display: flex;
  --font-size: 14px;
  margin-bottom: 12px;
}
.form-style .el-input {
  --el-input-width: 300px;
}
.checkbox-group {
  border: 2px solid #000;
  align-items: center;
  .el-checkbox-group {
    align-items: center;
    margin-left: 10px;
    // margin-top: 3px;
    // margin-bottom: 3px;
  }
  .el-checkbox {
    margin-left: 30px;
    width: 35px;
  }
}
.el-form-item1 {
  margin-bottom: 0px;
}
.input-group {
  margin-top: 10px;
  margin-bottom: -5px;
  .el-input {
    width: 160px;
  }
  .input-group-label {
    margin-left: 10px;
    color: red;
  }
  .el-form-item__label {
    width: 100px; /* 你可以根据需要调整宽度 */
    display: inline-block; /* 确保 label 元素是块级元素 */
  }
}
</style>
