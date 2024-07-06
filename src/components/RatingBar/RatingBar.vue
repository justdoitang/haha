<template>
  <div class="rating-bar" :style="{ width: width + 'px' }">
    <div class="marker" :style="{ left: markerPosition + '%' }">
      <span :style="{ color: markerColor }">{{ currentLabel }} ({{ currentRating }})</span>
      <el-icon :size="30" :style="{ color: markerColor }"><LocationFilled /></el-icon>
    </div>
    <div class="segments">
      <div
        class="segment"
        v-for="(segment, index) in segments"
        :key="index"
        :style="{ backgroundColor: segment.color }"
      >
        <label>{{ segment.text }}</label>
      </div>
    </div>
    <div class="scale">
      <div
        v-for="(line, index) in scaleLines"
        :key="index"
        :class="['scale-line', { 'long-line': line.isLong, 'short-line': !line.isLong }]"
        :style="{ left: line.position + '%' }"
      />
    </div>
    <div class="labels">
      <div class="label" v-for="label in labels" :key="label.value" :style="{ left: label.value + '%' }">
        <div>{{ unit }}{{ label.cop }}</div>
        <div>{{ label.kwrt }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from "vue"
import { ElIcon } from "element-plus"
import { LocationFilled } from "@element-plus/icons-vue"

interface Label {
  cop: number
  kwrt: number
  value: number
}

interface Segment {
  text: string
  color: string
}

interface ScaleLine {
  position: number
  isLong: boolean
}

export default defineComponent({
  name: "RatingBar",
  components: {
    ElIcon,
    LocationFilled
  },
  props: {
    currentRating: {
      type: Number,
      required: true
    },
    currentLabel: {
      type: String,
      default: "当前能效"
    },
    segments: {
      type: Array as PropType<Segment[]>,
      required: true
    },
    labels: {
      type: Array as PropType<Label[]>,
      required: true
    },
    unit: {
      type: String,
      default: ""
    },
    width: {
      type: Number,
      default: 600
    }
  },
  setup(props) {
    const markerPosition = computed(() => {
      const closest = props.labels.reduce((prev, curr) =>
        Math.abs(curr.cop - props.currentRating) < Math.abs(prev.cop - props.currentRating) ? curr : prev
      )
      return closest.value
    })

    const markerColor = computed(() => {
      const closestSegment = props.segments.reduce((prev, curr) => {
        const currDiff = Math.abs(curr.threshold - props.currentRating)
        const prevDiff = Math.abs(prev.threshold - props.currentRating)
        return currDiff < prevDiff ? curr : prev
      })
      return closestSegment.color
    })

    const scaleLines = computed(() => {
      const lines: ScaleLine[] = []
      for (let i = 0; i < props.labels.length - 1; i++) {
        const start = props.labels[i]
        const end = props.labels[i + 1]
        const step = (end.value - start.value) / 4

        for (let j = 0; j < 4; j++) {
          lines.push({
            position: start.value + j * step,
            isLong: j === 0 || j === 4
          })
        }
      }
      return lines
    })

    return {
      markerPosition,
      markerColor,
      scaleLines
    }
  }
})
</script>

<style scoped>
.rating-bar {
  position: relative;
  width: 100%;
  height: 150px;
  margin-bottom: 20px;
}

.segments {
  display: flex;
  height: 40px;
  align-items: center;
  justify-content: center;
}

.segment {
  flex: 4;
  line-height: 40px;
  color: white;
  font-weight: bold;
  text-align: center;
}

.marker {
  position: absolute;
  top: -50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translateX(-50%);
}

.marker span {
  white-space: nowrap;
  background: white;
  padding: 2px 5px;
  border-radius: 3px;
  font-size: 12px;
}

.scale {
  position: relative;
  height: 10px;
  width: 100%;
}

.scale-line {
  position: absolute;
  width: 1px;
  height: 10px;
  background: black;
}

.long-line {
  height: 15px;
}

.short-line {
  height: 10px;
}

.labels {
  position: relative;
  width: 100%;
  margin-top: 10px;
}

.label {
  position: absolute;
  text-align: center;
  transform: translateX(-50%);
}

.label div {
  margin: 2px 0;
}
</style>
