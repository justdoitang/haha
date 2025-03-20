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
          <div class="text-container">
            <div class="blue-line"></div>
            <div class="title-head">节能减排情况</div>
          </div>
          <div class="pie-container">
            <div>
              <div class="data-box blue">
                <div class="pie-value">130365.4</div>
              </div>
              <div class="pie-name">节能量(kWh)</div>
            </div>
            <div>
              <div class="data-box blue">
                <!-- 节费量 <br /> -->
                <div class="pie-value">104292.3</div>
              </div>
              <div class="pie-name">节费量(元)</div>
            </div>
            <div>
              <div class="data-box green">
                <!-- 减碳量 <br /> -->
                <div class="pie-value">120979.1</div>
              </div>
              <div class="pie-name">减碳量(kg)</div>
            </div>

            <div>
              <div class="data-box green">
                <!-- 碳资产 <br /> -->
                <div class="pie-value">6049.0</div>
              </div>
              <div class="pie-name">碳资产增值(元)</div>
            </div>
            <div>
              <div class="data-box green">
                <!-- 等效植树 <br /> -->
                <div class="pie-value">6721</div>
              </div>
              <div class="pie-name">等效植树(棵)</div>
            </div>
          </div>
        </div>

        <!-- 实时数据 -->
        <div class="shishi-panel">
          <div class="text-container">
            <div class="blue-line"></div>
            <div class="title-head">节能减排情况</div>
          </div>
          <div class="chart-container">
            <div class="chart-total-name">
              <div class="chart-total-name-div">系统能耗 <span class="chart-total-name-span">kWh</span></div>
              <div class="chart-total-name-div">制冷量 <span class="chart-total-name-span">kWh</span></div>
            </div>
            <div class="chart-total-val">
              <div class="chart-total-val-div">198653.33</div>
              <div class="chart-total-val-div">2025033.56</div>
            </div>
            <div class="chart-table">
              <base-echart :option="echartsOption" width="1080px" height="300px" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue"
import * as echarts from "echarts"
import { ref } from "vue"
import BaseEchart from "@/components/Echart/BaseEchart.vue"
import { text } from "stream/consumers"

const selectedTime = ref("allYear") // 默认选中“全年”
const echartsOption = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      crossStyle: {
        color: "#fcfbfb"
      }
    }
  },
  // toolbox: {
  //   feature: {
  //     dataView: { show: true, readOnly: false },
  //     magicType: { show: true, type: ["line", "bar"] },
  //     restore: { show: true },
  //     saveAsImage: { show: true }
  //   }
  // },
  legend: {
    data: ["能耗", "制冷量"],
    textStyle: {
      color: "#fcfbfb"
    }
  },
  xAxis: [
    {
      type: "category",
      data: ["一月", "二月", "三月"],
      axisPointer: {
        type: "shadow"
      },
      axisLine: {
        lineStyle: {
          color: "#fcfbfb"
        }
      }
    }
  ],
  yAxis: [
    {
      type: "value",
      name: "电量单位：kWh",
      min: 0,
      max: 60,
      interval: 10,
      axisLabel: {
        formatter: "{value}"
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#fcfbfb"
        }
      }
    }
  ],
  series: [
    {
      name: "能耗",
      type: "bar",
      itemStyle: {
        color: "#22c55e"
      },
      tooltip: {
        valueFormatter: function (value: any) {
          return (value as number) + " %"
        }
      },
      data: [2.6, 5.9, 9.0]
    },

    {
      name: "制冷量",
      type: "bar",
      itemStyle: {
        color: "#3b82f6"
      },
      tooltip: {
        valueFormatter: function (value: any) {
          return (value as number) + " %"
        }
      },
      data: [2.6, 5.9, 9.0]
    }
  ]
}
</script>

<style scoped>
.chart-table {
  margin-top: 30px;
  /* width: 300px; */
  /* height: 200px; */
}
.chart-total-val-div {
  flex-grow: 1;
  width: 50%;
  text-align: center;
  margin-top: 6px;
  font-size: 24px;
  color: #3b82f6;
}
.chart-total-val {
  display: flex;
  height: 40px;
  width: 100%;
  background-color: #515152;
  margin-top: 10px;
}
.chart-total-name {
  display: flex;
  height: 40px;
  width: 100%;
  background-color: #252a30;
}
.chart-total-name-div {
  flex-grow: 1;
  width: 50%;
  text-align: center;
  margin-top: 15px;
}
.chart-total-name-span {
  margin-left: 6px;
  color: #3b82f6;
  font-size: 13px;
  font-weight: bold;
}
.chart-container {
  margin: 30px;
  height: 330px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

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
  grid-template-columns: 460px 1fr;
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
  /* width: 460px; */
  height: 750px;
}
.jieneng-panel {
  background: #2a2a3c;
  padding: 10px;
  border-radius: 10px;
  height: 300px;
}
.shishi-panel {
  background: #2a2a3c;
  padding: 20px;
  border-radius: 10px;
  height: 100%;
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
.pie-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  text-align: center;
  margin-top: 30px;
  margin-left: 90px;
  margin-bottom: 20px;
}
.pie-value {
  margin-top: 50px;
  font-size: 18px;
  color: #fcfbfb;
}
.pie-name {
  width: 130px;
  margin-top: 30px;
  font-size: 16px;
  color: #fcfbfb;
}
.text-container {
  display: flex;
  align-items: center;
  margin-top: 6px;
}
.blue-line {
  width: 4px;
  height: 16px;
  background-color: #1e88e5;
  margin-right: 8px;
}
.title-head {
  color: #fcfbfb;
  font-size: 16px;
  /* font-weight: bold;  */
}
.data-box {
  display: flex;
  justify-content: center;
  width: 130px;
  height: 130px;
  padding: 10px;
  font-weight: bold;
  border-radius: 50%;
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
