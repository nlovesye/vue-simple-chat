<template>
  <div id="app">
    <router-view class="root-view" />
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  created () {
    // console.log('app实例：', this)
  }
}
</script>

<style lang="less" src="@style/common.less"></style>
