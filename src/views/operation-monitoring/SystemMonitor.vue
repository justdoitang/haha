<template>
  <div class="device-container">
    <div class="img-bottom-color">
      <img src="@/assets/system-monitor/white.jpg" alt="设备分布图" class="base-image" />
    </div>
    <div
      v-for="device in devices"
      :key="device.id"
      class="hotspot"
      :style="getHotspotStyle(device)"
      @click="handleDeviceClick(device)"
    />
    <!-- 顶部开关 -->
    <div class="top-switch-container">
      <div class="top-switch-div">设备一键启动: <el-switch /></div>
      <div class="top-switch-div">冷却逼近度开关: <el-switch /></div>
      <div class="top-switch-div">自动加减机开关: <el-switch /></div>
      <div class="top-switch-div">自动加减塔开关: <el-switch /></div>
    </div>
    <!-- 左上数值 -->
    <div class="left-top-container">
      <div class="left-top-div">
        <el-icon color="#fdad00" size="22px"><Sunny /></el-icon> <span class="left-top-div-val">DB: 11.9 ℃</span>
      </div>
      <div class="left-top-div">
        <el-icon color="#fdad00" size="22px"><Opportunity /></el-icon> <span class="left-top-div-val">RH: 67.8 %</span>
      </div>
      <div class="left-top-div">
        <el-icon color="#fdad00" size="22px"><Key /></el-icon> <span class="left-top-div-val">WB: 8.7 ℃</span>
      </div>
      <div style="margin-top: 10px">
        <span style="font-size: 14px">目标值:</span><span style="margin-left: 8px"> 20.0 ℃</span>
      </div>
    </div>
    <div class="right-top-container">右上</div>
    <div class="right-middle-container">右中</div>
    <div class="right-bottom-container">右下</div>

    <el-dialog v-model="dialogVisible" :title="currentDevice?.name" width="30%">
      <div v-if="currentDevice">
        <p>设备ID：{{ currentDevice.id }}</p>
        <p>状态：{{ currentDevice.status }}</p>
        <p>位置：X:{{ currentDevice.x }} Y:{{ currentDevice.y }}</p>
        <p>描述：{{ currentDevice.description }}</p>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"

// 设备数据示例
const devices = ref([
  {
    id: 1,
    x: 600, // X坐标
    y: 650, // Y坐标
    width: 40,
    height: 40,
    name: "主电机",
    status: "正常",
    description: "2000W交流电机"
  }
  // ,
  // {
  //   id: 2,
  //   x: 300,
  //   y: 150,
  //   width: 30,
  //   height: 30,
  //   name: "传感器",
  //   status: "警告",
  //   description: "温度传感器"
  // }
])

const dialogVisible = ref(false)
const currentDevice = ref(null)

// 计算热点区域样式
const getHotspotStyle = (device) => {
  return {
    left: `${device.x}px`,
    top: `${device.y}px`,
    width: `${device.width}px`,
    height: `${device.height}px`
  }
}

// 点击设备处理
const handleDeviceClick = (device) => {
  currentDevice.value = device
  dialogVisible.value = true
}
</script>

<style lang="scss" scoped>
.device-container {
  display: flex;
  align-content: center;
  justify-content: center;
  background-color: black;
}
.img-bottom-color {
  background-color: #273341;
  display: flex;
  align-content: center;
  justify-content: center;
  width: 1680px;
  height: 840px;
  margin: 10px;
}

.base-image {
  display: flex;
  width: 1300px;
  height: 800px;
  user-select: none;
  margin-top: 20px;
}
.hotspot {
  position: absolute;
  cursor: pointer;
  transition: all 0.2s;
  // border-radius: 50%;
  background: rgba(255, 0, 0, 0.3);
}

.hotspot:hover {
  transform: scale(1.1);
  box-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
}
.top-switch-container {
  display: flex;
  position: absolute;
  left: 500px;
  top: 80px;
  width: 800px;
  height: 30px;
  font-size: 16px;
  color: #fbfbfb;
}
.top-switch-div{
  margin-left: 20px;
}
.left-top-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  transition: all 0.2s;
  left: 30px;
  top: 240px;
  width: 250px;
  height: 200px;
  color: #fbfbfb;
}
.left-top-div {
  margin: 12px;
  display: flex;
  align-content: center;
  justify-content: center;
}
.left-top-div-val {
  margin-left: 8px;
  margin-top: 4px;
}
.right-top-container {
  background-image: url("../../assets/system-monitor/lan3.jpg");
  background-size: cover;
  position: absolute;
  cursor: pointer;
  transition: all 0.2s;
  left: 1400px;
  top: 100px;
  width: 260px;
  height: 180px;
}
.right-middle-container{
  background-image: url("../../assets/system-monitor/lan3.jpg");
  background-size: cover;
  position: absolute;
  cursor: pointer;
  transition: all 0.2s;
  left: 1400px;
  top: 340px;
  width: 260px;
  height: 280px;
}
.right-bottom-container{
  background-image: url("../../assets/system-monitor/lan3.jpg");
  background-size: cover;
  position: absolute;
  cursor: pointer;
  transition: all 0.2s;
  left: 1400px;
  top: 700px;
  width: 260px;
  height: 180px;
}
</style>
