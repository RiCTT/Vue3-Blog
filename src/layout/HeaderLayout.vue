<template>
  <header class="wrapper">
    <div class="inner">
      <ul class="menu">
        <li class="menu-item">
          <input type="text">
          <span>搜索</span>
        </li>
        <li class="menu-item">
          <img class="avatar" src="https://user-gold-cdn.xitu.io/2020/7/29/1739834eca7a5b53?imageView2/1/w/180/h/180/q/85/format/webp/interlace/1" alt="avatar">
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.wrapper {
  box-shadow: 0 1px 2px #f2f2f2;
  // border-bottom: 1px solid #f2f2f2;
}

.inner {
  width: var(--main-width);
  margin: 0 auto;
  overflow: hidden;
}


.menu {
  float: right;
  padding: 8px 0;
  .menu-item {
    display: inline-block;
    vertical-align: middle;
  }
  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
}
</style>
