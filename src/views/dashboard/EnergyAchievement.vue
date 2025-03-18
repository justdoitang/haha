<template>
  <div class="energy-achievement-container">
    <!-- 标题 -->
    <h2 class="title">2024 制冷系统节能成果</h2>

    <div class="grid-container">
      <!-- 左侧数据 -->
      <div class="left-panel">
        <div class="icon">🏠</div>
        <div class="info">
          <div class="label-t"><span class="lable-span-t">改造前能效</span></div>
          <div class="label-v"><span class="lable-span-v">4</span></div>
        </div>
        <div class="info">
          <div class="label-t"><span class="lable-span-t">改造后能效</span></div>
          <div class="label-v"><span class="lable-span-v">6.68</span></div>
        </div>
        <div class="info">
          <div class="label-t"><span class="lable-span-t">节能率</span></div>
          <div class="label-v"><span class="lable-span-j">33.77%</span></div>
        </div>
        <div class="time-period-selector">
          <!-- 左侧时段文本 -->
          <span class="label-time">时段</span>

          <!-- 右侧下拉框 -->
          <el-select v-model="selectedTime" class="select-dropdown" size="small" popper-class="custom-dropdown">
            <el-option class="select-lable" label="全年" value="allYear"></el-option>
          </el-select>
        </div>
      </div>

      <!-- 右侧内容（上下结构） -->
      <div class="right-content">
        <!-- 节能数据 -->
        <div class="jieneng-panel">
          <div class="grid-5">
            <div class="data-box blue">
              节能量 <br />
              <span>130365.4 kWh</span>
            </div>
            <div class="data-box blue">
              节费量 <br />
              <span>104292.3 元</span>
            </div>
            <div class="data-box green">
              减碳量 <br />
              <span>120979.1 kg</span>
            </div>
            <div class="data-box green">
              碳资产 <br />
              <span>6049.0 元</span>
            </div>
            <div class="data-box green">
              等效植树 <br />
              <span>6721 棵</span>
            </div>
          </div>
        </div>

        <!-- 实时数据 -->
        <div class="shishi-panel">
          <h3 class="subtitle">实时数据</h3>
          <p>系统能耗: <span class="highlight blue">198653.2 kWh</span></p>
          <p>制冷量: <span class="highlight blue">1316074.8 kWh</span></p>
          <div id="chart"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue"
import * as echarts from "echarts"
import { ref } from "vue"

const selectedTime = ref("allYear") // 默认选中“全年”

onMounted(() => {
  let chart = echarts.init(document.getElementById("chart"))
  chart.setOption({
    xAxis: { type: "category", data: ["1月", "2月", "3月"] },
    yAxis: { type: "value" },
    series: [
      { name: "能耗", type: "bar", data: [200000, 60360.5, 198653.2], color: "blue" },
      { name: "制冷量", type: "bar", data: [600000, 426631.5, 1316074.8], color: "green" }
    ]
  })
})
</script>

<style scoped>
/* 页面基础布局 */
.time-period-selector {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px; /* 整个组件宽度 */
  /* background-color: #252a30; 深色背景 */
  padding: 10px 20px; /* 让组件有一定内边距 */
  border-radius: 4px;
  margin-top: 80px;
}

.label-time {
  width: 130px; /* 左侧固定宽度 */
  color: #ffffff;
  text-align: center;
  padding: 6px 0;
  background: #000000;
  border-radius: 4px 0 0 4px;
}

.select-dropdown {
  width: 130px; /* 右侧固定宽度 */
  /* background: #3a3f45; */
  text-align: center;
  /* background-color: rgb(114, 106, 106) !important; */
  border-radius: 0 4px 4px 0;
}
::v-deep(.custom-select) .el-input__inner {
  background-color: grey !important;
  color: white !important;
}
:deep(.el-input__inner) {
  text-align: center;
  background: #3a3f45 !important; /* 让输入框背景变成灰色 */
  color: white !important; /* 文字颜色白色 */
  border: none !important; /* 隐藏边框 */
}

/* 让下拉菜单的选项背景也是灰色 */
:deep(.el-select-dropdown__item) {
  background: #3a3f45 !important;
  color: white !important;
}

.info {
  margin: 15px;
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.label-t {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  width: 350px;
  background-color: #333030fd;
}
.lable-span-t {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #e7e4e4;
}
.label-v {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
  height: 40px;
}
.lable-span-v {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  color: #195cc2;
}
.lable-span-j {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  color: #fdf147;
}

.energy-achievement-container {
  background: #1e1e2d;
  color: white;
  padding: 20px;
  height: 90%; /* 确保铺满整个视口 */
  width: 100%; /* 确保宽度铺满 */
  box-sizing: border-box; /* 避免 padding 影响整体宽度 */
}

.title {
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
}

/* 网格布局 */
.grid-container {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
  height: 750px;
}

/* 右侧内容（上下结构） */
.right-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 750px;
}

.left-panel {
  background: #2a2a3c;
  padding: 20px;
  border-radius: 10px;
  width: 460px;
  height: 750px;
}
.jieneng-panel {
  background: #2a2a3c;
  padding: 20px;
  border-radius: 10px;
  height: 200px;
}
.shishi-panel {
  background: #2a2a3c;
  padding: 20px;
  border-radius: 10px;
  height: 550px;
}

/* 左侧图标 */
.icon {
  width: 160px;
  height: 160px;
  background: #3b82f6;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 6rem;
  margin: 0 auto 10px;
}

/* 数字高亮 */
.highlight {
  font-size: 1.2rem;
  font-weight: bold;
}

.blue {
  color: #3b82f6;
}

.yellow {
  color: #facc15;
}

/* 节能数据块 */
.grid-5 {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  text-align: center;
}

.data-box {
  padding: 10px;
  border-radius: 8px;
  font-weight: bold;
}

.blue {
  background: #3b82f6;
}

.green {
  background: #22c55e;
}

/* 实时数据图表 */
#chart {
  width: 100%;
  height: 200px;
  margin-top: 10px;
}
</style>
