<script lang="ts" setup>
import { onMounted, ref } from "vue"
import { getEnergyParamApi, addEnergyParamApi, uptEnergyParamApi } from "@/api/energy-param"
import { type EnergyParamBaseData } from "@/api/energy-param/types/energy-param"
import { type FormInstance, type FormRules, ElMessage } from "element-plus"
import { cloneDeep } from "lodash-es"

defineOptions({
  // 命名当前组件
  name: "EnergyParam"
})

const btnName = ref<string>("")

const DEFAULT_FORM_DATA: EnergyParamBaseData = {
  Id: undefined,
  Name: "",
  StartDate: "",
  EndDate: "",
  TipTime: "",
  TipPrice: "",
  UpTime: "",
  UpPrice: "",
  AvgTime: "",
  AvgPrice: "",
  DownTime: "",
  DownPrice: ""
}
const formRef = ref<FormInstance | null>(null)
const formData = ref<EnergyParamBaseData>(cloneDeep(DEFAULT_FORM_DATA))
const formRules: FormRules = {
  Name: [{ required: true, trigger: "blur", message: "请输入方案名称" }],
  StartDate: [{ required: true, trigger: "blur", message: "请输入开始时段" }],
  EndDate: [{ required: true, trigger: "blur", message: "请输入结束时段" }],
  TipTime: [{ required: true, trigger: "blur", message: "请输入尖值时段" }],
  TipPrice: [{ required: true, trigger: "blur", message: "请输入尖值电价" }],
  UpTime: [{ required: true, trigger: "blur", message: "请输入峰值时段" }],
  UpPrice: [{ required: true, trigger: "blur", message: "请输入峰值电价" }],
  AvgTime: [{ required: true, trigger: "blur", message: "请输入平值时段" }],
  AvgPrice: [{ required: true, trigger: "blur", message: "请输入平值电价" }],
  DownTime: [{ required: true, trigger: "blur", message: "请输入谷值时段" }],
  DownPrice: [{ required: true, trigger: "blur", message: "请输入谷值电价" }]
}

const getEnergyParamData = () => {
  getEnergyParamApi()
    .then((data) => {
      console.log(data)
      formData.value = data.Content[0]
      btnName.value = formData.value.Id === undefined ? "新增电价内容" : "更新电价内容"
    })
    .catch(() => {
      formRef.value?.clearValidate()
      formData.value = cloneDeep(DEFAULT_FORM_DATA)
    })
}

const handleCreateOrUpdate = () => {
  formRef.value?.validate((valid: boolean, fields) => {
    console.log(valid)
    if (!valid) return console.error("表单校验不通过", fields)
    const api = formData.value.Id === undefined ? addEnergyParamApi : uptEnergyParamApi
    api(formData.value).then(() => {
      ElMessage.success("操作成功")
    })
  })
}

onMounted(() => {
  getEnergyParamData()
})
</script>

<template>
  <div class="app-container">
    <div class="left-card">
      <el-card style="min-width: 1000px">
        <div class="card-title"><p>能源价格设置</p></div>
        <el-form
          ref="formRef"
          :model="formData"
          :rules="formRules"
          class="form-style"
          :label-width="300"
          label-position="left"
        >
          <el-form-item label="方案名称" class="form-item-label" prop="Name">
            <el-input v-model="formData.Name" placeholder="计费方案名称，例如：项目名称_方案名称" />
          </el-form-item>
          <el-form-item label="开始时段" class="form-item-label" prop="StartDate">
            <el-date-picker
              v-model="formData.StartDate"
              value-format="YYYY-MM-DD"
              placeholder="开始时间段"
              size="default"
              style="width: 150px; margin-right: 10px"
            />
          </el-form-item>
          <el-form-item label="结束时段" class="form-item-label" prop="EndDate">
            <el-date-picker
              v-model="formData.EndDate"
              value-format="YYYY-MM-DD"
              placeholder="结束时间段"
              size="default"
              style="width: 150px; margin-right: 10px"
            />
          </el-form-item>
          <el-form-item label="尖值时段" class="form-item-label" prop="TipTime">
            <!-- <el-time-picker
              format="HH:mm"
              v-model="formData.TipTime"
              is-range
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            /> -->
            <el-time-picker format="HH:mm" v-model="formData.TipTime" value-format="HH:mm" />
          </el-form-item>
          <el-form-item label="尖值电价" class="form-item-label" prop="TipPrice">
            <el-input
              v-model="formData.TipPrice"
              placeholder="尖值电价"
              style="width: 100px"
              oninput="value=value.replace(/[^0-9.]/g,'')"
            />
            <label style="margin-left: 10px">元/KWH</label>
          </el-form-item>
          <el-form-item label="峰值时段" class="form-item-label" prop="UpTime">
            <!-- <el-time-picker
              format="HH:mm"
              v-model="formData.UpTime"
              is-range
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            /> -->
            <el-time-picker format="HH:mm" v-model="formData.UpTime" value-format="HH:mm" />
          </el-form-item>
          <el-form-item label="峰值电价" class="form-item-label" prop="UpPrice">
            <el-input
              v-model="formData.UpPrice"
              placeholder="峰值电价"
              style="width: 100px"
              oninput="value=value.replace(/[^0-9.]/g,'')"
            />
            <label style="margin-left: 10px">元/KWH</label>
          </el-form-item>
          <el-form-item label="平值时段" class="form-item-label" prop="AvgTime">
            <!-- <el-time-picker
              format="HH:mm"
              v-model="formData.AvgTime"
              is-range
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            /> -->
            <el-time-picker format="HH:mm" v-model="formData.AvgTime" value-format="HH:mm" />
          </el-form-item>
          <el-form-item label="平值电价" class="form-item-label" prop="AvgPrice">
            <el-input
              v-model="formData.AvgPrice"
              placeholder="平值电价"
              style="width: 100px"
              oninput="value=value.replace(/[^0-9.]/g,'')"
            />
            <label style="margin-left: 10px">元/KWH</label>
          </el-form-item>
          <el-form-item label="谷值时段" class="form-item-label" prop="DownTime">
            <!-- <el-time-picker
              format="HH:mm"
              v-model="formData.DownTime"
              is-range
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            /> -->
            <el-time-picker format="HH:mm" v-model="formData.DownTime" value-format="HH:mm" />
          </el-form-item>
          <el-form-item label="谷值电价" class="form-item-label" prop="DownPrice">
            <el-input
              v-model="formData.DownPrice"
              placeholder="峰值电价"
              style="width: 100px"
              oninput="value=value.replace(/[^0-9.]/g,'')"
            />
            <label style="margin-left: 10px">元/KWH</label>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleCreateOrUpdate"> {{ btnName }} </el-button>
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
              {{ formData.TipPrice }} 元/KWH</el-col
            >
          </el-row>
          <el-row class="right-card-row">
            <el-col :span="12"
              ><div class="grid-content ep-bg-purple" />
              <label>峰值电价</label></el-col
            >
            <el-col :span="12"
              ><div class="grid-content ep-bg-purple-light" />
              {{ formData.UpPrice }} 元/KWH</el-col
            >
          </el-row>
          <el-row class="right-card-row">
            <el-col :span="12"
              ><div class="grid-content ep-bg-purple" />
              <label>平值电价</label></el-col
            >
            <el-col :span="12"
              ><div class="grid-content ep-bg-purple-light" />
              {{ formData.AvgPrice }} 元/KWH</el-col
            >
          </el-row>
          <el-row class="right-card-row">
            <el-col :span="12"
              ><div class="grid-content ep-bg-purple" />
              <label>谷值电价</label></el-col
            >
            <el-col :span="12"
              ><div class="grid-content ep-bg-purple-light" />
              {{ formData.DownPrice }} 元/KWH</el-col
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
