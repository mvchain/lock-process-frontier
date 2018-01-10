<template>
  <transition name="fade" mode="out-in">
    <!-- <router-view :key="key"></router-view> -->
    <router-view></router-view>
  </transition>
</template>

<script>
  export default {
    name: 'myMoney'
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
