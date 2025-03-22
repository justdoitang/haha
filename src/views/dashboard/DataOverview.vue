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
              <div class="time-logo">时间log</div>
              <div>时间</div>
            </div>
            <div class="info-data-temp">温度</div>
            <div class="info-data-gateway">网关状态</div>
          </div>
        </div>
      </div>
      <div class="energy-consumption-div">
        <div class="text-container">
          <div class="blue-line"></div>
          <div class="title-head">设备能效能耗</div>
        </div>
      </div>
    </div>
    <div class="middler-panel">
      <div class="energy-efficiency-div">
        <div class="text-container">
          <div class="blue-line"></div>
          <div class="title-head">系统整体能效</div>
        </div>
      </div>
      <div class="param-div">
        <div class="text-container">
          <div class="blue-line"></div>
          <div class="title-head">系统运行参数</div>
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
<script lang="ts" setup></script>
<style lang="scss" scoped>
.info-data-time{
  display: flex;
  justify-content: space-between;
  margin: 20px;
}
.info-data-div {
  background-color: #1da694;
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
