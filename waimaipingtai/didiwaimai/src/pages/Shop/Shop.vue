<template>
    <div>
        <ShopHeader :id="$route.params.id" />
        <div class="tab">
            <div class="tab-item">
                <router-link :to="`/shop/goods/${$route.params.id}`" replace>点餐</router-link>
            </div>
            <div class="tab-item">
                <router-link :to="`/shop/ratings/${$route.params.id}`" replace>评价</router-link>
            </div>
        </div>
        <router-view></router-view>
    </div>

</template>

<script>
import ShopHeader from "../../components/ShopHeader/ShopHeader.vue"
export default {
    components: { ShopHeader },
    mounted(){
        // 获取传递的id
        // console.log(this.$route.params.id);
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .tab
    height 40px
    line-height 40px
    background #fff
    bottom-border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      float left
      width: 33.33333%
      text-align center
      font-size 14px
      color rgb(77, 85, 93)
      a
        display block
        position relative
        &.router-link-active
          color #FC5531
          &::after
            content ''
            position absolute
            left 50%
            bottom 1px
            width 35px
            height 2px
            transform translateX(-50%)
            background #FC5531
</style>