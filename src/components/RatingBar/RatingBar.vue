<template>
  <div class="rating-bar">
    <div class="segments">
      <div class="segment excellent">优秀</div>
      <div class="segment good">良好</div>
      <div class="segment average">一般</div>
      <div class="segment below-average">为略改进</div>
    </div>
    <div class="marker" :style="{ left: markerPosition + '%' }">
      <span>当前能效 ({{ currentRating }})</span>
    </div>
    <div class="labels">
      <div class="label" v-for="label in labels" :key="label.value">
        <div>{{ label.cop }}</div>
        <div>{{ label.kwrt }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"

interface Label {
  cop: number
  kwrt: number
  value: number
}

export default defineComponent({
  name: "RatingBar",
  props: {
    currentRating: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const labels: Label[] = [
      { cop: 7.0, kwrt: 0.5, value: 0 },
      { cop: 5.9, kwrt: 0.6, value: 25 },
      { cop: 5.0, kwrt: 0.7, value: 50 },
      { cop: 4.4, kwrt: 0.8, value: 75 },
      { cop: 3.9, kwrt: 0.9, value: 100 },
      { cop: 3.5, kwrt: 1.0, value: 125 },
      { cop: 3.2, kwrt: 1.1, value: 150 },
      { cop: 2.9, kwrt: 1.2, value: 175 }
    ]

    const markerPosition = computed(() => {
      const closest = labels.reduce((prev, curr) =>
        Math.abs(curr.cop - props.currentRating) < Math.abs(prev.cop - props.currentRating) ? curr : prev
      )
      return closest.value
    })

    return {
      labels,
      markerPosition
    }
  }
})
</script>

<style scoped>
.rating-bar {
  position: relative;
  width: 100%;
  height: 50px;
  margin-bottom: 20px;
}

.segments {
  display: flex;
  height: 20px;
}

.segment {
  flex: 1;
  text-align: center;
  line-height: 20px;
  color: white;
  font-weight: bold;
}

.excellent {
  background-color: #4caf50; /* green */
}

.good {
  background-color: #8bc34a; /* light green */
}

.average {
  background-color: #ffeb3b; /* yellow */
}

.below-average {
  background-color: #f44336; /* red */
}

.marker {
  position: absolute;
  top: 20px;
  height: 30px;
  border-left: 2px solid blue;
  display: flex;
  align-items: center;
}

.marker span {
  position: absolute;
  left: -50%;
  white-space: nowrap;
  background: white;
  padding: 2px 5px;
  border-radius: 3px;
  font-size: 12px;
}

.labels {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.label {
  text-align: center;
}

.label div {
  margin: 2px 0;
}
</style>
