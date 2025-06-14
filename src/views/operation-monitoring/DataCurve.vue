<template>
  <!-- <div class="wapper" :ref="refs.wrpapper" @wheel.prevent="scale($event)">
    <div class="box" :ref="refs.box" @mousedown="dragstart($event)">缩放拖拽

    </div>
  </div> -->
  <div class="img-bottom-color" :ref="refs.wrpapper" @wheel.prevent="scale($event)">
    <img
      src="@/assets/system-monitor/blue.png"
      alt="设备分布图"
      class="base-image"
      :ref="refs.box"
      @mousedown="dragstart($event)"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue"
const refs = {
  box: ref<HTMLElement | null>(null),
  wrapper: ref<HTMLElement | null>(null)
}
const dragData = reactive({
  x: 0, // 拖拽初始化时的x坐标
  y: 0, // 拖拽初始化时的y坐标
  left: 0, // 拖拽结束时的x偏移量
  top: 0 // 拖拽结束时的y偏移量
})
const scaleData = reactive({
  scale: 1,
  scaleNum: 0.1, // 缩放比例
  scaleMax: 100, // 最大缩放比例
  scaleMin: 0 // 最小缩放比例
})
// 拖拽
function dragstart(e: MouseEvent) {
  refs.box.value.style.transition = "none"
  e.preventDefault() // 阻止默认事件
  const box = refs.box.value as HTMLElement
  const wrapper = refs.wrapper.value as HTMLElement
  dragData.x = e.pageX - box.offsetLeft
  dragData.y = e.pageY - box.offsetTop

  // 给 document 添加鼠标移动事件
  document.addEventListener("mousemove", move)
  function move(event: any) {
    // 计算元素的位置
    dragData.left = event.pageX - dragData.x
    dragData.top = event.pageY - dragData.y
    // 边界判断可以在这里添加 ↓

    // 设置元素的位置
    box.style.left = dragData.left + "px"
    box.style.top = dragData.top + "px"
  }
  // 添加鼠标抬起事件，鼠标抬起，将事件移除
  document.addEventListener("mouseup", function () {
    document.removeEventListener("mousemove", move)
  })
  // 鼠标离开父级元素，把事件移除
  document.addEventListener("mouseout", function () {
    document.removeEventListener("mousemove", move)
  })
}
// 缩放
function scale(e: any) {
  // mac 和 win 上的值不一样 只能判断是否大于小于0
  // console.log('e.deltaY', e.deltaY);
  // console.log('e.wheelDeltaY', e.wheelDeltaY);
  // 浏览器兼容 chrome 为e.deltaY  firefox 为e.wheelDeltaY
  // 统一向上滚动为正值，向下滚动为负值
  let dy = -e.deltaY || e.wheelDeltaY
  if (dy < 0) {
    // console.log('缩小');
    scaleData.scale -= scaleData.scaleNum
  } else {
    // console.log('放大');
    scaleData.scale += scaleData.scaleNum
  }
  // 边界判断
  if (scaleData.scale >= scaleData.scaleMax) {
    scaleData.scale = scaleData.scaleMax
    return
  }
  if (scaleData.scale <= scaleData.scaleMin) {
    scaleData.scale = scaleData.scaleMin
    return
  }
  refs.box.value.style.transition = "none"
  refs.box.value.style.transform = `translate(-50%, -50%) scale(${scaleData.scale})`
  return false
}
// 按钮缩放
const rollBtn = (action: "enlarge" | "zoomin") => {
  if (action === "enlarge") {
    scaleData.scale += 0.5
  } else {
    scaleData.scale -= 0.5
  }
  // 边界判断
  if (scaleData.scale >= scaleData.scaleMax) {
    scaleData.scale = scaleData.scaleMax
    return
  }
  if (scaleData.scale <= scaleData.scaleMin) {
    scaleData.scale = scaleData.scaleMin
    return
  }
  refs.box.value.style.transition = `all 0.3s ease-in-out` // 添加动画效果
  refs.box.value.style.transform = `translate(-50%, -50%) scale(${scaleData.scale})`
}
</script>
<style lang="scss" scoped>
.img-bottom-color {
  background-color: #273341;
  display: flex;
  align-content: center;
  justify-content: center;
  overflow: hidden;
  min-width: 1680px;
  height: 825px;
  margin: 10px;

  position: relative;
}

.base-image {
  display: flex;
  width: 1900px;
  height: 820px;
  user-select: none;
  margin-right: 180px;
  margin-top: 30px;
  cursor: move;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.wapper {
  width: 500px;
  height: 500px;
  background: #ccc;
  position: relative;
  overflow: hidden;
  .box {
    width: 100px;
    height: 100px;
    background-color: red;
    cursor: move;
    user-select: none; /* 不可选中,为了拖拽时不让文字高亮 */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
