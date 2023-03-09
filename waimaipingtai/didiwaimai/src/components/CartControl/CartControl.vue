<template>
  <div>
    <div class="cartcontrol">
        <transition name="move">
      <div class="iconfont icon-remove_circle_outline" v-if="food.count" @click="increment(false)"></div>
        </transition>
      <div class="cart-count" v-if="food.count">{{food.count}}</div>
      <div class="iconfont icon-add_circle" @click="increment(true)"></div>
    </div>
  </div>
</template>
<script>
export default {
    //声明
    props:['food'],
    methods:{
        //加减
        increment(isadd){
            //获取当前操作的食品
            let food=this.food;
            // console.log(isadd)
            //通过vuex实现food中count值的加一和减一
            //分发动作
            this.$store.dispatch("handlercount",{isadd,food})
        }
    }
};
</script>
<style lang="stylus" scoped>
@import "../../common/stylus/mixins.styl"
  .cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)

    .icon-remove_circle_outline
      display: inline-block
      padding 6px
      line-height 24px
      font-size 24px
      color #FC5531
      &.move-enter-active, &.move-leave-active
        transition all 2s
      &.move-enter, &.move-leave-to
        opacity 0
        transform translateX(15px) rotate(180deg)
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
    .icon-add_circle
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color #FC5531
</style>