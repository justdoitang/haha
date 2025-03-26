<template>
  <div class="data-overview-container">
    <div class="top-panel">
      <div class="info-div">
        <div class="text-container">
          <div class="blue-line"></div>
          <div class="title-head">楼宇信息</div>
        </div>
        <div class="data-container">
          <div class="info-img-div"></div>
          <div class="info-data-div">
            <div class="info-data-time">
              <div class="time-logo">
                <el-icon size="28"><Calendar /></el-icon>
              </div>
              <div class="time-panel">
                <div><span>日期</span><span class="time-value-span">2024.03.05</span></div>
                <div class="time-value"><span>时间</span><span class="time-value-span">10:23:34</span></div>
              </div>
            </div>
            <div class="info-data-time">
              <div class="temp-logo">
                <el-icon size="28"><Odometer /></el-icon>
              </div>
              <div class="time-panel">
                <div><span>室外温度</span><span class="time-value-span">11.6 ℃</span></div>
                <div class="time-value"><span>相对湿度</span><span class="time-value-span">22.6 ℃</span></div>
                <div class="time-value"><span>湿球温度</span><span class="time-value-span">33.6 ℃</span></div>
              </div>
            </div>
            <div class="info-data-time">
              <div class="time-logo">
                <el-icon size="28"><Cpu /></el-icon>
              </div>
              <div class="gateway-panel">
                <div><span>网关状态</span><span class="time-value-span">ON</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="energy-consumption-div">
        <div class="text-container">
          <div class="blue-line"></div>
          <div class="title-head">设备能效能耗</div>
        </div>
        <div class="data-container">
          <el-table
            :data="deviceData"
            style="width: 100%"
            :header-cell-style="{ background: '#343d4c', color: '#fff', 'text-align': 'center', border: 'none' }"
            :row-style="{ background: '#2b333e', color: '#fff' }"
          >
            <el-table-column prop="name" label="设备名称" width="200" align="center">
              <template #default="{ row }">
                <span class="device-icon">{{ row.icon }}</span> {{ row.name }}
              </template>
            </el-table-column>
            <el-table-column label="能效值（KW/KW）" align="center">
              <el-table-column prop="actual" label="实际值" align="center">
                <template #default="{ row }">
                  <span :class="getClass(row.actual)">{{ row.actual }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="reference" label="参考值" align="center"></el-table-column>
              <el-table-column prop="reference" label="预警值" align="center"></el-table-column>
            </el-table-column>
            <el-table-column label="功率值（KW）" align="center">
              <el-table-column prop="power" label="设备电耗值" align="center"></el-table-column>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="middler-panel">
      <div class="energy-efficiency-div">
        <div class="text-container">
          <div class="blue-line"></div>
          <div class="title-head">系统整体能效</div>
        </div>
        <div class="data-container">
          <div class="energy-efficiency-left">
            <span style="font-size: 32px; color: #5289e3; margin-bottom: 8px">6.58</span>
            <span class="unit-span">kw/kw</span>
            <span style="font-size: 14px; margin-top: 4px">冷站效率</span>
          </div>
          <div class="energy-efficiency-right">
            <div class="energy-efficiency-child">
              <div><span class="energy-efficiency-value-span">998</span><span class="unit-span">kw</span></div>
              <span class="energy-efficiency-name-span">系统冷量</span>
            </div>
            <div class="energy-efficiency-child">
              <div><span class="energy-efficiency-value-span">729.0</span><span class="unit-span">kw</span></div>
              <span class="energy-efficiency-name-span">系统散热量</span>
            </div>
            <div class="energy-efficiency-child">
              <div><span class="energy-efficiency-value-span">154.4</span><span class="unit-span">kw</span></div>
              <span class="energy-efficiency-name-span">系统电量</span>
            </div>
            <div class="energy-efficiency-child">
              <div><span class="energy-efficiency-value-span">20.00</span><span class="unit-span">%</span></div>
              <span class="energy-efficiency-name-span">热平衡测试</span>
            </div>
          </div>
        </div>
      </div>
      <div class="param-div">
        <div class="text-container">
          <div class="blue-line"></div>
          <div class="title-head">系统运行参数</div>
        </div>
        <div class="data-container">
          <div class="param-data-div">
            <div class="energy-efficiency-child">
              <div><span class="energy-efficiency-value-span">0.9</span><span class="unit-span">℃</span></div>
              <span class="energy-efficiency-name-span">冷冻水温差</span>
            </div>
            <div class="energy-efficiency-child">
              <div><span class="energy-efficiency-value-span">2.6</span><span class="unit-span">℃</span></div>
              <span class="energy-efficiency-name-span">冷却水温差</span>
            </div>
            <div class="energy-efficiency-child">
              <div><span class="energy-efficiency-value-span">8.6</span><span class="unit-span">℃</span></div>
              <span class="energy-efficiency-name-span">冷冻供水温度</span>
            </div>
            <div class="energy-efficiency-child">
              <div><span class="energy-efficiency-value-span">26.8</span><span class="unit-span">℃</span></div>
              <span class="energy-efficiency-name-span">冷却回水温度</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-panel">
      <div class="energy-efficiency-rule-div">
        <div class="text-container">
          <div class="blue-line"></div>
          <div class="title-head">能效标尺</div>
        </div>
      </div>
      <div class="hot-div">
        <div class="text-container">
          <div class="blue-line"></div>
          <div class="title-head">热平衡标尺</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"

import { ref } from "vue"

// 设备数据
const deviceData = ref([
  {
    name: "冷水机组",
    icon: "❄️",
    actual: 12.96,
    efficiency: 6.39,
    reference: 5.86,
    power: 77
  },
  {
    name: "冷冻水泵",
    icon: "🔧",
    actual: 14.8,
    efficiency: 58.61,
    reference: 50.24,
    power: 67.4
  },
  {
    name: "冷却水泵",
    icon: "💧",
    actual: 100.05,
    efficiency: 70.31,
    reference: 50.24,
    power: 10
  },
  {
    name: "冷却塔",
    icon: "🏢",
    actual: 45367.16,
    efficiency: 87.91,
    reference: 70.341,
    power: 0
  }
])

// 判断数值颜色
const getClass = (value: number) => {
  return value > 50 ? "red" : "green"
}
</script>
<style lang="scss" scoped>
:deep(.el-table) {
  --el-table-border-color: transparent;
}
:deep(.el-table__body td) {
  border-bottom: 1px solid #343d4c !important;
}
:deep(.el-table--enable-row-hover .el-table__body tr:hover > td) {
  background-color: unset !important;
}
.param-data-div {
  display: flex;
  width: 100%;
  height: 130px;
  justify-content: center;
}
.energy-efficiency-name-span {
  font-size: 12px;
  color: #fcfbfb;
  margin-top: 4px;
}
.energy-efficiency-value-span {
  font-size: 24px;
  color: #fcfbfb;
}
.unit-span {
  font-size: 14px;
  color: #7f8c8d;
  margin-left: 6px;
}
.energy-efficiency-left {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;
}
.energy-efficiency-right {
  flex: 2;
  display: flex;
  flex-wrap: wrap;
}
.energy-efficiency-child {
  flex: 1 1 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.device-icon {
  margin-right: 8px;
}

.green {
  color: #2ecc71;
  font-weight: bold;
}

.red {
  color: #e74c3c;
  font-weight: bold;
}

.time-value-span {
  margin-left: 16px;
}
.time-value {
  margin-top: 10px;
}
.gateway-panel {
  flex: 2;
  margin-right: 30px;
  margin-top: 16px;
}
.time-panel {
  flex: 2;
  margin-right: 30px;
}
.temp-logo {
  flex: 1;
  margin-top: 24px;
}
.time-logo {
  flex: 1;
  margin-top: 10px;
}
.info-data-time {
  display: flex;
  justify-content: space-between;
  margin: 20px;
  font-size: 16px;
}
.info-data-div {
  flex-grow: 1;
  margin-left: 30px;
}
.info-img-div {
  width: 460px;
  height: 240px;
  background-image: url("../../assets/data-overview/lou.jpg");
  background-size: cover;
}
.hot-div {
  flex: 1;
  background-color: #2b333e;
  margin-left: 5px;
}
.energy-efficiency-rule-div {
  flex: 1;
  background-color: #2b333e;
  margin-right: 5px;
}
.param-div {
  flex: 1;
  background-color: #2b333e;
  margin-left: 5px;
}
.energy-efficiency-div {
  flex: 1;
  background-color: #2b333e;
  margin-right: 5px;
}
.info-div {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: #2b333e;
  margin-right: 5px;
}
.energy-consumption-div {
  flex: 1;
  background-color: #2b333e;
  margin-left: 5px;
}
.top-panel {
  height: 40%;
  display: flex;
  padding: 10px;
}
.middler-panel {
  height: 25%;
  display: flex;
  padding: 10px;
}
.bottom-panel {
  height: 35%;
  padding: 10px;
  display: flex;
  padding: 10px;
}
.text-container {
  display: flex;
  align-items: center;
  margin-top: 12px;
  margin-left: 12px;
}
.blue-line {
  width: 4px;
  height: 16px;
  background-color: #1da694;
  margin-right: 8px;
}
.title-head {
  color: #fcfbfb;
  font-size: 14px;
  font-weight: bold;
}

.data-container {
  display: flex;
  margin: 24px 24px 24px 12px;
}
.data-overview-container {
  background: #1e1e2d;
  color: white;
  // padding: 10px;
  height: 90%; /* 确保铺满整个视口 */
  width: 100%; /* 确保宽度铺满 */
  box-sizing: border-box; /* 避免 padding 影响整体宽度 */
}
</style>
