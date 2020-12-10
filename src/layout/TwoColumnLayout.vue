<template>
  <div class="column-wrapper">
    <div class="left-wrapper">
      <slot name="left" />
    </div>
    <div class="right-wrapper">
      <slot name="right" />
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.column-wrapper {
  width: 100%;
  padding: 6px;
  margin: 0 auto;
  overflow: hidden;
}
.left-wrapper {
  width: calc(var(--main-width) - 260px);
  float: left;
  min-height: 300px;
  background-color: #fff;
  border-radius: var(--common-radius);
}
.right-wrapper {
  float: right;
  width: 240px;
  min-height: 100px;
  background-color: skyblue;
  border-radius: var(--common-radius);
}
</style>