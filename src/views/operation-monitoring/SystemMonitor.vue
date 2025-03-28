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
    x: 100, // X坐标
    y: 200, // Y坐标
    width: 40,
    height: 40,
    name: "主电机",
    status: "正常",
    description: "2000W交流电机"
  },
  {
    id: 2,
    x: 300,
    y: 150,
    width: 30,
    height: 30,
    name: "传感器",
    status: "警告",
    description: "温度传感器"
  }
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
.ddd-container {
  display: flex;
  align-content: center;
  justify-content: center;
  background-color: black;
}
.img-bottom-color {
  background-color: #440707;
  display: flex;
  align-content: center;
  justify-content: center;
  width: 1680px;
  height: 840px;
  margin-top: 20px;
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
  border-radius: 50%;
  background: rgba(255, 0, 0, 0.3);
}

.hotspot:hover {
  transform: scale(1.1);
  box-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
}
</style>
