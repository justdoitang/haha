<template>
  <div class="device-container">
    <div class="img-bottom-color">
      <img src="@/assets/system-monitor/blue.png" alt="设备分布图" class="base-image" />
    </div>
    <!-- <div
      v-for="device in devices"
      :key="device.id"
      class="hotspot"
      :style="getHotspotStyle(device)"
      @click="handleDeviceClick(device)"
    /> -->
    <!-- 顶部开关 -->
    <div class="top-switch-container">
      <div class="top-switch-div">一键启动: <el-switch v-model="deviceOneClickStart" /></div>
      <div class="top-switch-div">一键停止: <el-switch v-model="coolingApproximation" /></div>
      <div class="top-switch-div">一键复位: <el-switch v-model="additiveAndReducer" /></div>
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
    <!-- 状态描述 -->
    <div class="left-bottom-container">
      <div class="status-legend">
        <div class="legend-item" v-for="(item, index) in legends" :key="index">
          <span :class="['status-dot', item.color]" />
          <span class="legend-text">{{ item.label }}</span>
        </div>
      </div>
    </div>
    <!-- 运行参数 -->
    <div class="right-top-container">
      <div class="right-data-container">
        <div class="right-data-title">运行参数</div>
        <div class="operating-parameters-content">
          <div class="operating-parameters-content-child">
            <span class="operating-parameters-value">8.5</span>
            <span class="operating-parameters-name">冷却供水温度℃</span>
          </div>
          <div class="operating-parameters-content-child">
            <span class="operating-parameters-value">1.0</span>
            <span class="operating-parameters-name">冷冻水温差℃</span>
          </div>
          <div class="operating-parameters-content-child">
            <span class="operating-parameters-value">28.2</span>
            <span class="operating-parameters-name">冷却回水温度℃</span>
          </div>
          <div class="operating-parameters-content-child">
            <span class="operating-parameters-value">2.6</span>
            <span class="operating-parameters-name">冷却水温差℃</span>
          </div>
        </div>
      </div>
    </div>
    <div class="right-middle-container">
      <div class="right-data-container">
        <div class="right-data-title" style="margin-top: 8px">系统能效</div>
        <div class="operating-parameters-content">
          <div class="operating-parameters-content-child">
            <span class="operating-parameters-value">1080.65</span>
            <span class="operating-parameters-name">制冷量kw</span>
          </div>
          <div class="operating-parameters-content-child">
            <span class="operating-parameters-value">186.11</span>
            <span class="operating-parameters-name">电量kw</span>
          </div>
          <div class="operating-parameters-content-child">
            <span class="operating-parameters-value">886.9</span>
            <span class="operating-parameters-name">散热量kw</span>
          </div>
          <div class="operating-parameters-content-child">
            <span class="operating-parameters-value">13.14</span>
            <span class="operating-parameters-name">热平衡率%</span>
          </div>
        </div>
        <div class="system-efficiency-level">
          <span style="color: #fbfbfb; margin-right: 8px">能效等级</span>
          <span style="color: #f0d804; margin-left: 8px">一级</span>
        </div>
        <div class="system-efficiency-ruler" />
      </div>
    </div>
    <div class="right-bottom-container">
      <div class="right-data-container">
        <div class="right-data-title">分项能效</div>
        <div class="item-efficiency-content">
          <div class="item-efficiency-content-child">
            <div class="item-efficiency-name">主机</div>
            <div class="item-efficiency-value">12.96</div>
            <div class="item-efficiency-progress">
              <el-progress :stroke-width="12" :percentage="100" :show-text="false" />
            </div>
          </div>
          <div class="item-efficiency-content-child">
            <div class="item-efficiency-name">冷冻泵</div>
            <div class="item-efficiency-value">14.00</div>
            <div class="item-efficiency-progress">
              <el-progress :stroke-width="12" :percentage="30" :show-text="false" />
            </div>
          </div>
          <div class="item-efficiency-content-child">
            <div class="item-efficiency-name">冷却泵</div>
            <div class="item-efficiency-value">100.05</div>
            <div class="item-efficiency-progress">
              <el-progress :stroke-width="12" :percentage="80" :show-text="false" />
            </div>
          </div>
          <div class="item-efficiency-content-child">
            <div class="item-efficiency-name">冷却塔</div>
            <div class="item-efficiency-value">0.00</div>
            <div class="item-efficiency-progress">
              <el-progress :stroke-width="12" :percentage="0" :show-text="false" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 设备描述及数据 -->
    <div style="position: absolute; left: 345px; top: 168px; background-color: black; color: #fff">冷却塔-1</div>
    <div style="position: absolute; left: 568px; top: 168px; background-color: black; color: #fff">冷却塔-2</div>
    <!-- 设备状态图 -->
    <div name="冷却塔-1">
      <img
        v-if="isShow == true"
        src="@/assets/system-monitor/T1_red.png"
        style="position: absolute; left: 165px; top: 102px"
        @click="handleDeviceClick(1)"
      />
      <img
        v-if="isShow == false"
        src="@/assets/system-monitor/T1_green.png"
        style="position: absolute; left: 165px; top: 102px"
        @click="handleDeviceClick(1)"
      />
    </div>
    <div name="冷却塔-2">
      <img
        v-if="isShow == false"
        src="@/assets/system-monitor/T2_red.png"
        style="position: absolute; left: 414px; top: 102px"
        @click="handleDeviceClick(1)"
      />
      <img
        v-if="isShow == true"
        src="@/assets/system-monitor/T2_green.png"
        style="position: absolute; left: 414px; top: 102px"
        @click="handleDeviceClick(1)"
      />
    </div>
    <div name="冷却塔-1出水阀V2">
      <img
        v-if="isShow == false"
        src="@/assets/system-monitor/V2_green.png"
        style="position: absolute; left: 214px; top: 336px"
        @click="handleDeviceClick(1)"
      />
      <img
        v-if="isShow == true"
        src="@/assets/system-monitor/V2_red.png"
        style="position: absolute; left: 214px; top: 336px"
        @click="handleDeviceClick(1)"
      />
    </div>
    <div name="主机-1">
      <img
        v-if="isShow == false"
        src="@/assets/system-monitor/C1_red.png"
        style="position: absolute; left: 538px; top: 479px"
        @click="handleDeviceClick(1)"
      /><img
        v-if="isShow == true"
        src="@/assets/system-monitor/C1_green.png"
        style="position: absolute; left: 538px; top: 479px"
        @click="handleDeviceClick(1)"
      />
    </div>
    <div name="冷却泵-1">
      <img
        v-if="isShow == false"
        src="@/assets/system-monitor/P4_red.png"
        style="position: absolute; left: 216px; top: 475px"
      />
      <img
        v-if="isShow == true"
        src="@/assets/system-monitor/P4_green.png"
        style="position: absolute; left: 216px; top: 475px"
      />
    </div>
    <!-- 设备详情弹窗 -->
    <el-dialog v-model="dialogVisible" width="70%">
      <template #header="{ titleId, titleClass }">
        <div class="my-header">
          <h4 :id="titleId" :class="titleClass">主机-1</h4>
          <div style="padding-right: 50px; padding-top: 60px; color: #fff">
            <span style="margin-left: 6px">品牌: 开利</span>
            <span style="margin-left: 6px">功率: 563kW</span>
            <span style="margin-left: 6px">7/12℃</span>
            <span style="margin-left: 6px">31/36℃</span>
          </div>
        </div>
      </template>
      <div class="device-container" v-if="currentDevice">
        <div class="left-param-container">
          <div class="left-param-title">
            <el-icon :size="40" :color="'#3e6cba'"><Operation /></el-icon>
            <h3 style="padding-left: 12px">设备参数</h3>
          </div>
          <div class="left-param-content">
            <div class="left-param-content-child">
              <span class="left-param-content-child-name">1#压缩机吸气温度：</span>
              <span class="left-param-content-child-data">7.5℃</span>
            </div>
            <div class="left-param-content-child">
              <span class="left-param-content-child-name">1#压缩机排气温度：</span>
              <span class="left-param-content-child-data">7.5℃</span>
            </div>
            <div class="left-param-content-child">
              <span class="left-param-content-child-name">1#蒸发器侧压力(吸气压力)：</span>
              <span class="left-param-content-child-bool">110.1KPa</span>
            </div>
            <div class="left-param-content-child">
              <span class="left-param-content-child-name">1#冷凝器侧压力(排气压力)：</span>
              <span class="left-param-content-child-bool">133.3KPa</span>
            </div>
            <div class="left-param-content-child">
              <span class="left-param-content-child-name">1#压缩机负荷：</span>
              <span class="left-param-content-child-bool">233</span>
            </div>
            <div class="left-param-content-child">
              <span class="left-param-content-child-name">1#压缩机电流：</span>
              <span class="left-param-content-child-bool">3A</span>
            </div>
            <div class="left-param-content-child">
              <span class="left-param-content-child-name">1#压缩机转速：</span>
              <span class="left-param-content-child-data">222RPM</span>
            </div>
            <div class="left-param-content-child">
              <span class="left-param-content-child-name">1#压缩机运行时间：</span>
              <span class="left-param-content-child-data">6.88H</span>
            </div>
            <div class="left-param-content-child">
              <span class="left-param-content-child-name">1#压缩机电压：</span>
              <span class="left-param-content-child-data">7.5℃</span>
            </div>
            <div class="left-param-content-child">
              <span class="left-param-content-child-name">1#压缩机功率：</span>
              <span class="left-param-content-child-data">7.5℃</span>
            </div>
          </div>
        </div>
        <div class="middle-param-container">
          <div class="middle-param-img"></div>
          <div class="left-param-title">
            <el-icon :size="40" :color="'#3e6cba'"><Checked /></el-icon>
            <h3 style="padding-left: 12px">设备状态</h3>
          </div>
          <div class="middle-param-content">
            <div class="middle-param-content-child">
              <span class="left-param-content-child-name">运行状态：</span>
              <span class="left-param-content-child-bool">正常</span>
            </div>
            <div class="middle-param-content-child">
              <span class="left-param-content-child-name">停止状态：</span>
              <span class="left-param-content-child-bool">正常</span>
            </div>
            <div class="middle-param-content-child">
              <span class="left-param-content-child-name">远程状态：</span>
              <span class="left-param-content-child-bool">正常</span>
            </div>
            <div class="middle-param-content-child">
              <span class="left-param-content-child-name">停机报警状态：</span>
              <span class="left-param-content-child-bool">正常</span>
            </div>
            <div class="middle-param-content-child">
              <span class="left-param-content-child-name">蒸发器侧进水温度：</span>
              <span class="left-param-content-child-data">6.8℃</span>
            </div>
            <div class="middle-param-content-child">
              <span class="left-param-content-child-name">蒸发器侧出水温度:</span>
              <span class="left-param-content-child-data">7.5℃</span>
            </div>
            <div class="middle-param-content-child">
              <span class="left-param-content-child-name">冷凝器侧进水温度:</span>
              <span class="left-param-content-child-data">7.5℃</span>
            </div>
            <div class="middle-param-content-child">
              <span class="left-param-content-child-name">冷凝器侧出水温度:</span>
              <span class="left-param-content-child-data">7.5℃</span>
            </div>
          </div>
        </div>
        <div class="left-param-container">
          <div class="left-param-title">
            <el-icon :size="40" :color="'#3e6cba'"><Operation /></el-icon>
            <h3 style="padding-left: 12px">设备参数</h3>
          </div>
          <div class="left-param-content">
            <div class="left-param-content-child">
              <span class="left-param-content-child-name">2#压缩机吸气温度：</span>
              <span class="left-param-content-child-data">7.5℃</span>
            </div>
            <div class="left-param-content-child">
              <span class="left-param-content-child-name">2#压缩机排气温度：</span>
              <span class="left-param-content-child-data">7.5℃</span>
            </div>
            <div class="left-param-content-child">
              <span class="left-param-content-child-name">2#蒸发器侧压力(吸气压力)：</span>
              <span class="left-param-content-child-bool">110.1KPa</span>
            </div>
            <div class="left-param-content-child">
              <span class="left-param-content-child-name">2#冷凝器侧压力(排气压力)：</span>
              <span class="left-param-content-child-bool">133.3KPa</span>
            </div>
            <div class="left-param-content-child">
              <span class="left-param-content-child-name">2#压缩机负荷：</span>
              <span class="left-param-content-child-bool">233</span>
            </div>
            <div class="left-param-content-child">
              <span class="left-param-content-child-name">2#压缩机电流：</span>
              <span class="left-param-content-child-bool">3A</span>
            </div>
            <div class="left-param-content-child">
              <span class="left-param-content-child-name">2#压缩机转速：</span>
              <span class="left-param-content-child-data">222RPM</span>
            </div>
            <div class="left-param-content-child">
              <span class="left-param-content-child-name">2#压缩机运行时间：</span>
              <span class="left-param-content-child-data">6.88H</span>
            </div>
            <div class="left-param-content-child">
              <span class="left-param-content-child-name">2#压缩机电压：</span>
              <span class="left-param-content-child-data">7.5℃</span>
            </div>
            <div class="left-param-content-child">
              <span class="left-param-content-child-name">2#压缩机功率：</span>
              <span class="left-param-content-child-data">7.5℃</span>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue"
import yellow24277 from "@/assets/system-monitor/T1_red.png"
import red189239 from "@/assets/system-monitor/red189239.jpg"
import green20789 from "@/assets/system-monitor/green20789.jpg"
import green193226 from "@/assets/system-monitor/green193226.jpg"
import { c } from "node_modules/vite/dist/node/types.d-aGj9QkWt"
import { fa } from "element-plus/es/locales.mjs"

const deviceOneClickStart = ref(true)
const coolingApproximation = ref(false)
const additiveAndReducer = ref(true)
const additiveAndReducerTower = ref(true)
const isShow = ref(true)

interface Legend {
  label: string
  color: string
}

const legends: Legend[] = reactive([
  { label: "设备运行", color: "green" },
  { label: "设备停止", color: "blue" },
  { label: "设备故障", color: "red" }
])

// 设备数据示例
const devices = ref([
  {
    id: 1,
    x: 417, // X坐标
    y: 542, // Y坐标
    width: 170,
    height: 210,
    picturePath: yellow24277,
    name: "主电机",
    status: "正常",
    description: "2000W交流电机"
  }
  // {
  //   id: 2,
  //   x: 397,
  //   y: 148,
  //   width: 189,
  //   height: 239,
  //   picturePath: red189239,
  //   name: "传感器",
  //   status: "警告",
  //   description: "温度传感器"
  // },
  // {
  //   id: 3,
  //   x: 405, // X坐标
  //   y: 660, // Y坐标
  //   width: 207,
  //   height: 89,
  //   picturePath: green20789,
  //   name: "传感器",
  //   status: "警告",
  //   description: "温度传感器"
  // },
  // {
  //   id: 5,
  //   x: 574, // X坐标
  //   y: 150, // Y坐标
  //   width: 193,
  //   height: 226,
  // picturePath: green193226,
  // name: "传感器",
  // status: "警告",
  // description: "温度传感器"
  // }
])

const dialogVisible = ref(false)
const dialogVisible1 = ref(false)
const currentDevice = ref(null)

// 计算热点区域样式
const getHotspotStyle = (device: any) => {
  return {
    left: `${device.x}px`,
    top: `${device.y}px`,
    width: `${device.width}px`,
    height: `${device.height}px`,
    backgroundImage: `url(${device.picturePath})`
  }
}

// 点击设备处理
const handleDeviceClick = (device: any) => {
  currentDevice.value = device
  dialogVisible.value = true
}
</script>

<style lang="scss" scoped>
.middle-param-content-child {
  width: calc(50% - 10px);
  margin-bottom: 10px;
  box-sizing: border-box;
  padding-top: 16px;
  padding-left: 16px;
}
.middle-param-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 550px;
  height: 255px;
  border: 2px solid #6e6f73;
}
.middle-param-img {
  width: 550px;
  height: 325px;
  background-image: url("../../assets/system-monitor/carnier.png");
  background-size: cover; /* 或者使用 '100% 100%' */
  background-position: center; /* 确保图片居中 */
  background-repeat: no-repeat; /* 防止图片重复 */
}
.left-param-content-child-name {
  font-size: 16px;
  font-weight: bold;
  color: #fbfbfb;
  width: 210px;
  text-align: right;
}
.left-param-content-child-bool {
  font-size: 16px;
  font-weight: bold;
  color: #00ff00;
  padding-left: 24px;
  width: 100px;
  text-align: center;
}
.left-param-content-child-data {
  font-size: 16px;
  font-weight: bold;
  color: #5377de;
  padding-left: 24px;
  width: 120px;
  text-align: center;
}
.left-param-content-child {
  padding: 20px 4px 12px 0px;
  display: flex;
}
.left-param-title {
  display: flex;
  color: #fbfbfb;
}
.left-param-content {
  width: 360px;
  height: 560px;
  padding: 8px;
  border: 2px solid #6e6f73;
}
.left-param-container {
  flex: 1;
  padding: 20px 16px 8px 20px;
  display: flex;
  flex-direction: column;
}
.middle-param-container {
  flex: 1;
}
.right-param-container {
  flex: 1;
}
:deep(.el-dialog) {
  padding: 0;
}
:deep(.el-dialog__header) {
  padding-bottom: 0;
  padding-right: 0;
}
.demo {
  display: flex;
  position: absolute;
  left: 200px;
  top: 160px;
  width: 800px;
  height: 30px;
  font-size: 16px;
  color: red;
}
.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 16px;
  background-color: #3e4653;
  border: 2px solid #3e6cba;
  h4 {
    color: #ffff;
    padding-left: 20px;
    font-size: 24px;
  }
}
.dialog-image {
  width: 640px;
  height: 326px;
}
.status-legend {
  display: flex;
  align-items: center;
  gap: 16px; /* 控制图例之间的间距 */
  padding: 10px;
  color: #ffffff;
  font-size: 14px;
}

.legend-item {
  display: flex;
  align-items: center;
}
.status-dot {
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin-right: 12px;
}

.status-dot.green {
  background-color: #00ff00;
}

.status-dot.blue {
  background-color: #fffe4c;
}

.status-dot.red {
  background-color: #ff4040;
}

.layout-footer {
  background-color: black !important;
  color: white !important;
}
.device-container {
  display: flex;
  align-content: center;
  justify-content: center;
  background-color: #48525e;
}
.img-bottom-color {
  background-color: #273341;
  //display: flex;
  align-content: center;
  justify-content: center;
  overflow: hidden;
  min-width: 1680px;
  //height: 825px;
  margin: 10px;
}

.base-image {
  //display: flex;
  // width: 1900px;
  // height: 820px;
  user-select: none;
  // margin-right: 180px;
  // margin-top: 30px;
}
.hotspot {
  position: absolute;
  cursor: pointer;
  transition: all 0.2s;
  background-size: 100% 100%;
}

// .hotspot:hover {
//   transform: scale(1.1);
//   box-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
// }
.top-switch-container {
  display: flex;
  position: absolute;
  left: 500px;
  top: 66px;
  width: 800px;
  height: 30px;
  font-size: 16px;
  color: #fbfbfb;
}
.top-switch-div {
  margin-left: 20px;
}
.left-top-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  left: -30px;
  top: 240px;
  width: 250px;
  height: 200px;
  color: #fbfbfb;
}
.left-bottom-container {
  display: flex;
  position: absolute;
  left: 18px;
  top: 846px;
  width: 800px;
  height: 36px;
}
.left-bottom-status-div {
  background-color: #f0d804;
  width: 150px;
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
  background: url("../../assets/system-monitor/baikuang2.png") center/100% 100%;
  position: absolute;
  cursor: pointer;
  transition: all 0.2s;
  left: 1380px;
  top: 88px;
  width: 300px;
  height: 200px;
}
.right-middle-container {
  background: url("../../assets/system-monitor/baikuang2.png") center/100% 100%;
  position: absolute;
  cursor: pointer;
  transition: all 0.2s;
  left: 1380px;
  top: 310px;
  width: 300px;
  height: 340px;
}
.right-bottom-container {
  background: url("../../assets/system-monitor/baikuang2.png") center/100% 100%;
  position: absolute;
  cursor: pointer;
  transition: all 0.2s;
  left: 1380px;
  top: 670px;
  width: 300px;
  height: 200px;
}
.right-data-container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.right-data-title {
  flex: 1;
  width: 100%;
  height: 30px;
  color: #fbfbfb;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #7d8383;
  letter-spacing: 8px;
}
.operating-parameters-content {
  display: flex;
  flex-wrap: wrap;
  flex: 2;
  margin-bottom: 12px;
}
.operating-parameters-content-child {
  flex: 1 1 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #fbfbfb;
}
.operating-parameters-value {
  font-size: 28px;
  color: #f0d804;
}
.operating-parameters-name {
  font-size: 10px;
}
.system-efficiency-level {
  flex: 0.5;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000000;
  margin-left: 12px;
  margin-right: 22px;
  align-content: center;
  font-size: 14px;
}

.system-efficiency-ruler {
  flex: 2;
}
.item-efficiency-content {
  flex: 2;
  display: flex;
  flex-direction: column;
  margin-left: 24px;
  margin-right: 28px;
}
.item-efficiency-content-child {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fbfbfb;
  margin-top: 6px;
  margin-bottom: 6px;
}
.item-efficiency-progress {
  flex: 2;
  margin-left: 12px;
}
.item-efficiency-name {
  flex: 1;
  font-size: 13px;
  font-weight: bold;
}
.item-efficiency-value {
  flex: 0.5;
  font-size: 12px;
  color: #f0d804;
  font-weight: bold;
}
</style>
