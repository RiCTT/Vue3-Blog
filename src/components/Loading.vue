<template>
  <div class="loading-wrapper">
    <div class="body">正在加载中..</div>
    <div class="loading">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: [String, Boolean, Number],
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.loading-wrapper {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .body {
    color: #666;
    margin-bottom: 10px;
  }
}

.loading {
  width: 50px;
  height: 15px;
  margin: 0 auto;
  text-align: center;
}
.loading span {
  display: inline-block;
  width: 6px;
  height: 100%;
  margin-right: 2px;
  background: lightgreen;
  animation: load 1.04s ease infinite;
}
.loading span:last-child {
  margin-right: 0px;
}
@keyframes load {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.loading span:nth-child(1) {
  animation-delay: 0.13s;
}
.loading span:nth-child(2) {
  animation-delay: 0.26s;
}
.loading span:nth-child(3) {
  animation-delay: 0.39s;
}
.loading span:nth-child(4) {
  animation-delay: 0.52s;
}
.loading span:nth-child(5) {
  animation-delay: 0.65s;
}
</style>