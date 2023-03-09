<template>
    <div>
        <div>
            <div class="shopcart">
                <div class="content">
                    <div class="content-left" @click="toggle">
                        <div class="logo-wrapper">
                            <!-- highlight 购物车可以被激活 -->
                            <div class="logo" :class="{ highlight: totalPrice }">
                                <i class="iconfont icon-shopping_cart" :class="{ highlight: totalPrice }"></i>
                            </div>
                            <div class="num" v-if="totalCount">{{ totalCount }}</div>
                        </div>
                        <div class="price highlight">￥{{ totalPrice }}</div>
                        <div class="desc">另需配送费￥{{ fees }}元</div>
                    </div>
                    <div class="content-right">
                        <!-- not-enough=>点餐的总价格小于配送费 enough=》总价格大于等于配送费 -->
                        <div class="pay" :class="paystyle" @click="pay">
                            {{ paytext }}
                        </div>
                    </div>
                </div>
                <div class="shopcart-list" v-show="showlist">
                    <div class="list-header">
                        <h1 class="title">购物车</h1>
                        <span class="empty" @click="clearcart">清空</span>
                    </div>
                    <div class="list-content">
                        <ul>
                            <li class="food" v-for="(item, index) in foodcart" :key="index">
                                <span class="name">{{ item.foodname }}</span>
                                <div class="price"><span>￥{{ item.price }}</span></div>
                                <div class="cartcontrol-wrapper">
                                    <div class="cartcontrol">
                                        <CartControl :food="item"></CartControl>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="list-mask" v-show="showlist" @click="toggle"></div>
        </div>
    </div>
</template>
<script>
import { MessageBox,Toast } from 'mint-ui'
// 引入CartControl组件
import CartControl from '../CartControl/CartControl'
import { shopone } from '../../api/index'
// 导入mapGetters
import { mapGetters, mapState } from 'vuex'
export default {
    // 声明
    props: ['id'],
    data() {
        return {
            fees: '',
            isshow: false,//false 隐藏  true 显示
        }
    },
    components: {
        CartControl
    },
    // 获取总价格和总数量
    computed: {
        // 获取购物车数据
        ...mapState(['foodcart','userinfo']),
        ...mapGetters(['totalCount', 'totalPrice']),
        showlist() {
            // 条件
            if (this.totalCount === 0) {
                this.isshow = false;
                return false;//隐藏购物车
            } else {
                return this.isshow
            }
        },
        paytext() {
            let fees = this.fees;
            let totalPrice = this.totalPrice
            // 如果总价格小于配送费
            if (totalPrice < fees) {
                return `还差${fees - totalPrice}元起送`;
            } else {
                return '结算'
            }

        },

        //控制结算按钮的样式
        paystyle() {
            let fees = this.fees;
            let totalPrice = this.totalPrice
            // 如果总价格小于配送费
            if (totalPrice < fees) {
                return `not-enough`;
            } else {
                return `enough`
            }


        }
    },

    // 函数
    methods: {
        // 切换购物车的显示和隐藏
        toggle() {
            // 判断条件 只有数量的时候才可以取反
            if (this.totalCount > 0) {
                this.isshow = !this.isshow;
            }
        },
        // 清除购物车数据
        clearcart() {
            MessageBox.confirm('你确定清空吗?').then(action => {
                // console.log("清空购物车数据");
                // 分发动作
                this.$store.dispatch('clearcarts')

            }, (action) => {
                console.log("取消购物车数据")
            });
        },
        // 结算
        pay() {
            let fees = this.fees;
            let totalPrice = this.totalPrice
            // 如果总价格小于配送费
            if (totalPrice < fees) {
            Toast(`还差${fees - totalPrice}元起送`);
            } else {
            // console.log('跳转到结算页')
            let userinfo=this.userinfo
            // 判断用户是否登录
            if(this.userinfo){
              // 跳转到结算页面
              this.$router.push(`/account/${userinfo}/${this.$route.params.id}`)
            }else{
              // 跳转到登录页面
              this.$router.replace("/login")
            }
            }

        }
    },
    async mounted() {
        let id = this.id;
        // 根据商家id获取商家详情信息
        let res = await shopone(id)
        //    console.log(res)
        this.fees = res.fee

    }

}
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/mixins.styl';

.shopcart {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 50;
  width: 100%;
  height: 48px;

  .content {
    display: flex;
    background: #141d27;
    font-size: 0;
    color: rgba(255, 255, 255, 0.4);

    .content-left {
      flex: 1;

      .logo-wrapper {
        display: inline-block;
        vertical-align: top;
        position: relative;
        top: -10px;
        margin: 0 12px;
        padding: 6px;
        width: 56px;
        height: 56px;
        box-sizing: border-box;
        border-radius: 50%;
        background: #141d27;

        .logo {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          text-align: center;
          background: #2b343c;

          &.highlight {
            background: #FC5531;
          }

          .icon-shopping_cart {
            line-height: 44px;
            font-size: 24px;
            color: #80858a;

            &.highlight {
              color: #fff;
            }
          }
        }

        .num {
          position: absolute;
          top: 0;
          right: 0;
          width: 24px;
          height: 16px;
          line-height: 16px;
          text-align: center;
          border-radius: 16px;
          font-size: 9px;
          font-weight: 700;
          color: #ffffff;
          background: rgb(240, 20, 20);
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
        }
      }

      .price {
        display: inline-block;
        vertical-align: top;
        margin-top: 5px;
        line-height: 24px;
        padding-right: 12px;
        box-sizing: border-box;
        font-size: 16px;
        font-weight: 700;
        color: #fff;

        &.highlight {
          color: #fff;
        }
      }

      .desc {
        display: inline-block;
        vertical-align: bottom;
        margin-bottom: 15px;
        margin-left: -45px;
        font-size: 10px;
      }
    }

    .content-right {
      flex: 0 0 105px;
      width: 105px;

      .pay {
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-size: 12px;
        font-weight: 700;
        color: #fff;

        &.not-enough {
          background: #2b333b;
        }

        &.enough {
          background: #FC5531;
          color: #fff;
        }
      }
    }
  }

  .ball-container {
    .ball {
      position: fixed;
      left: 32px;
      bottom: 22px;
      z-index: 200;
      transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);

      .inner {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: $green;
        transition: all 0.4s linear;
      }
    }
  }

  .shopcart-list {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;
    transform: translateY(-100%);

    &.move-enter-active, &.move-leave-active {
      transition: transform 0.3s;
    }

    &.move-enter, &.move-leave-to {
      transform: translateY(0);
    }

    .list-header {
      height: 40px;
      line-height: 40px;
      padding: 0 18px;
      background: #f3f5f7;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);

      .title {
        float: left;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }

      .empty {
        float: right;
        font-size: 12px;
        color: rgb(0, 160, 220);
      }
    }

    .list-content {
      padding: 0 18px;
      max-height: 217px;
      overflow: hidden;
      background: #fff;

      .food {
        position: relative;
        padding: 12px 0;
        box-sizing: border-box;
        bottom-border-1px(rgba(7, 17, 27, 0.1));

        .name {
          line-height: 24px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }

        .price {
          position: absolute;
          right: 90px;
          bottom: 12px;
          line-height: 24px;
          font-size: 14px;
          font-weight: 700;
          color: rgb(240, 20, 20);
        }

        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 6px;
        }
      }
    }
  }
}

.list-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 40;
  backdrop-filter: blur(10px);
  opacity: 1;
  background: rgba(7, 17, 27, 0.6);

  &.fade-enter-active, &.fade-leave-active {
    transition: all 0.5s;
  }

  &.fade-enter, &.fade-leave-to {
    opacity: 0;
    background: rgba(7, 17, 27, 0);
  }
}
</style>