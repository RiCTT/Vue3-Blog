<template>
  <main class="main-wrapper">
    <div class="inner-wrapper">
      <!-- 自定义内容，如果采用左右分栏的布局，请使用TowColumnLayout组件 -->
      <slot />      
    </div>
  </main>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
.main-wrapper {
  padding: 20px 0;
  background-color: #f2f2f2;
}
.inner-wrapper {
  width: var(--main-width);
  margin: 0 auto;
}
</style>