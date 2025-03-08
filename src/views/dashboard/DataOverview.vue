<!-- <template>
  <div class="app-container">
    <div class="outdiv">
      <div class="backgroundd">
      <div class="test1"></div>
    </div>
  </div>
    </div>

</template>

<style lang="scss" scoped>
.outdiv {
  width: 100vw;  // 视口宽度
  height: 100vh; // 视口高度
  overflow: auto; // 允许滚动条缩放
}
.backgroundd {
  background-image: url("../../assets/mainlayer/quan.png");
  width: 1824px;
  height: 819px;
  background-size: cover;
  //transform: scale(calc(100vw / 1824)); // 基于视口宽度等比缩放
  transform-origin: 0 0;
}

.test1 {
  width: 216px; /* 或者具体宽度 */
  height: 84px; /* 初始高度为0 */
  background-image: url("../../assets/mainlayer/blue.jpg");
  background-size: cover;
  background-position: center;
  //height: 120px;
  //width: 100%;
  //background-color: red;
  //background-image: url("../../assets/mainlayer/blue.jpg");
  //background-size: cover;
  //overflow: hidden;
  position: absolute;
  top: calc(58% * var(--scale-ratio)); // 关联缩放比例变量
  left: calc(43% * var(--scale-ratio));
  transform: translate(-50%, -50%);
}

.search-wrapper {
  margin-bottom: 20px;
  :deep(.el-card__body) {
    padding-bottom: 2px;
  }
}

.toolbar-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  height: 100%;
}

.table-wrapper {
  margin-bottom: 20px;
}

.pager-wrapper {
  display: flex;
  justify-content: flex-end;
}

:deep(.el-table__header) {
  background-color: #f5f7fa;
}

:deep(.el-table tr) {
  background-color: rgba(0, 0, 0, 0);
}

:deep(.el-table th.el-table__cell) {
  background-color: rgba(0, 0, 0, 0);
}
</style> -->

<template>
  <div class="app-container">
    <div class="outdiv" ref="scrollContainer">
      <div class="backgroundd" ref="background">
        <el-button type="primary" :icon="CirclePlus" @click="getTableData">更新状态</el-button>
        <div :style="{ backgroundImage: `url(${backgroundImage})` }" class="test1" ref="test1"></div>
      </div>
    </div>
  </div>
</template>

<script>

import yunxingImg  from '@/assets/mainlayer/yunxing.jpg';
import tingzhiImg  from '@/assets/mainlayer/tingzhi.jpg';

export default {


  data() {
    return {
      backgroundImage: yunxingImg,
      isRunning: true // 新增状态标识
    }
  },
  computed:{
    backgroundImage() { // 改用计算属性
      return this.isRunning ? yunxingImg : tingzhiImg;
    }
  },
  mounted() {
    // 获取需要操作的DOM元素
    const container = this.$refs.scrollContainer
    const bg = this.$refs.background
    const test = this.$refs.test1

    // 初始化缩放基准值
    let baseScale = 1

    // 滚动事件监听
    container.addEventListener("scroll", () => {
      // 计算滚动比例 (示例使用垂直滚动)
      const scrollProgress = container.scrollTop / (container.scrollHeight - container.clientHeight)

      // 动态计算缩放值（范围：0.8 ~ 2倍）
      const scale = 0.8 + scrollProgress * 1.2

      // 应用缩放效果
      bg.style.transform = `scale(${scale}) translate(-50%, -50%)`
      test.style.transform = `translate(-50%, -43%) scale(${1 / scale})`
    })
  },
  methods: {
    getTableData() {
      this.isRunning = !this.isRunning; // 切换状态
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.outdiv {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: auto; // 启用滚动容器

  // 创建滚动空间
  &::after {
    content: "";
    display: block;
    height: 200vh; // 2倍视口高度的滚动区域
  }
}

.backgroundd {
  background-image: url("../../assets/mainlayer/quan.png");
  width: 1824px;
  height: 819px;
  background-size: cover;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: transform 0.2s ease-out; // 添加平滑过渡
}

.test1 {
  width: 216px;
  height: 84px;
  //background-image: url("../../assets/mainlayer/yunxing.jpg");
  background-size: cover;
  position: absolute;
  top: 57%;
  left: 43%;
  transform: translate(-50%, -46%);
  transition: transform 0.2s ease-out; // 同步过渡效果

  // 优化缩放基点
  transform-origin: center center;
}
</style>
