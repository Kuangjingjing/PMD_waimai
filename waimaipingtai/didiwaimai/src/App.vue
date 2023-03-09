<template>
  <div>
    <!-- 使用router-view加载对应的路由组件 -->
    <router-view v-if="isRouterAlive"></router-view>
    <FooterGuide v-show="$route.meta.isfootershow" />
  </div>
</template>

<script>
// 引入footerGuide组件
import FooterGuide from './components/FooterGuide/FooterGuide.vue'
export default {
  components: {
    FooterGuide
  },
  data() {
    return {
      isRouterAlive: true,
      a:10
    }
  },
  provide() {
    return {
      // 通过provide实现局部刷新 给非子后代传递的方法
      reload: this.reload,
      a:this.a,
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  },
  mounted() {
    // 分发
    this.$store.dispatch("getcookiename")
  },
}
</script>

<style>
</style>
