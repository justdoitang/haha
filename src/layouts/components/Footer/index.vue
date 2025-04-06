<script lang="ts" setup>
const VITE_APP_TITLE = import.meta.env.VITE_APP_TITLE
</script>

<template>
  <footer class="layout-footer">{{ VITE_APP_TITLE }}</footer>
</template>

<style lang="scss" scoped>
.layout-footer {
  width: 100%;
  min-height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  // color: var(--el-text-color-placeholder);
  background-color: var(--footer-bg, #f5f5f5);
  color: var(--footer-text, #000);
}
</style>
