<template>
  <div>
    <HeaderLayout />
    <MainLayout>
      <router-view></router-view>
    </MainLayout>
  </div>
</template>

<script>
import HeaderLayout from '/@/layout/HeaderLayout.vue'
import MainLayout from '/@/layout/MainLayout.vue'
export default {
  name: 'App',
  components: {
    HeaderLayout,
    MainLayout
  }
}
</script>
