<template>
    <div>warning
        <HeaderTop :title="title">
            <nav class="shop-nav" slot="left">
                <a href="javascript:void(0)" class="back" @click="btn">
                    <i class="iconfont icon-arrow_left"></i>
                </a>
            </nav>
        </HeaderTop>
        <div style="height:70px"></div>
        <div class="container">
            <button class="btn btn-warning" data-toggle="modal" data-target="#myModal">添加收货地址</button>
            <div class="modal fade" id="myModal">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 class="modal-title">添加收货地址</h4>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="form-group">
                                    <label>收货人</label>
                                    <!-- form-control  使元素宽度变为100%-->
                                    <input type="text" class="form-control" placeholder="请输入收货人" v-model="name" />
                                </div>
                                <div class="form-group has-success">
                                    <label>收货电话</label>
                                    <input type="text" class="form-control" placeholder="请输入收货电话" v-model="phone" />
                                </div>
                                <div class="form-group">
                                    <label>收货地址</label>
                                    <!-- form-control  使元素宽度变为100%-->
                                    <input type="text" class="form-control" placeholder="请输入收货地址" v-model="address" />
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-success" @click="addaddress">添加</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <h4>收货地址</h4>
        <div>
            <ul>
                <li style="width: 100%; height: 30px" v-for="(item, index) in alladdress" :key="index">
                    <input type="radio" v-model="address_id" :value="item.id" />{{ item.realname }},{{ item.phone }},{{
                            item.address
                    }}
                </li>
            </ul>
        </div>
        <h4>所购食品</h4>
        <div class="list-content" >
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
        <div>
            <a href="javascript:void(0)">总计:{{ totalPrice }}元</a>
            <button type="button" class="btn btn-warning" style="float: right" @click="insertorder">{{ order }}</button>
        </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui'
import CartControl from '../../components/CartControl/CartControl';
import { adduseraddress, getalluseraddress, insertorder, insertorderinfo } from '../../api/index';
import { mapState, mapGetters } from 'vuex'
// 导入 HeaderTop
import HeaderTop from '../../components/HeaderTop/HeaderTop'

export default {
    data() {
        return {
            title: '结算页',
            name: '',//收货人
            phone: '',//收货电话
            address: '',//收货地址
            alladdress: [],//登录用户的全部收货地址
            address_id: '',//选择收货地址id
        }
    },
    components: {
        HeaderTop,
        CartControl
    },
    computed: {
        ...mapState(['foodcart']),
        ...mapGetters(['totalPrice']),
        order() {
            // 如果没有选择收货地址
            if (!this.address_id) {
                return '还没有选择收货地址'
            } else if (this.totalPrice === 0) {
                return '无购买的食品，请选择所购食品'
            }
            else {
                return '提交订单'
            }

        }

    },
    async mounted() {
        // console.log("sss");
        let username = this.$route.params.username;
        // console.log(username);
        // 获取该登录用户所有的收货地址
        let res = await getalluseraddress(username);
        //    console.log(res);
        this.alladdress = res
    },
    // 获取app组件传递的方法
    inject: ['reload', 'a'],
    methods: {
        async addaddress() {
            let name = this.name;
            let phone = this.phone;
            let address = this.address;
            let username = this.$route.params.username;
            // console.log(name, phone, address,username);
            let res = await adduseraddress(name, phone, address, username)
            if (res.mag = "ok") {
                // console.log("添加成功");
                // 跳转到本界面   结算界面
                // this.$router.go(0),
                // 使用模态框的时候，只有页面全部刷新 模态框才会关闭
                this.reload();
                $('#myModal').modal('hide')

            }

        },
        // 提交订单
        async insertorder(e) {
            // console.log(e.target.innerText)
            let res = e.target.innerText
            if (res === "还没有选择收货地址") {
                // 提示
                Toast('还没有选择收货地址')

            } else if (res === '无购买的食品，请选择所购食品') {
                Toast('无购买的食品，请选择所购食品')
            } else {
                let order_num = Math.floor(Math.random() * 10000);
                let address_id = this.address_id;
                let food_totalprice = this.totalPrice;
                let username = this.$route.params.username;
                let shoplist_id=this.$route.params.shoplist_id;
                // console.log(order_num, address_id, food_totalprice, username,shoplist_id);
                // 调用生成订单的接口
                let res = await insertorder(order_num, address_id, food_totalprice, username,shoplist_id)
                   console.log(res);
                // 生成訂單詳情
                if (res.msg === "ok") {
                    // 获取订单的id
                    let ordersid = res.insertid;
                    this.foodcart.forEach(async (item, index) => {
                        let foodname = item.foodname;//食品名字
                        let pic = item.foodpic;//食品图片
                        let count = item.count;//食品数量
                        let orders_id = ordersid;// 订单id
                        let res = await insertorderinfo(foodname, pic, count, orders_id);
                        console.log(res)
                    })

                }
                // 跳转到订单页
                this.$router.push("/order")
                // 清除购物车数据
                this.$store.dispatch('clearcarts')

            }
        },

        btn() {
            this.$router.back();
            // 清除购物车数据  分发动作
            this.$store.dispatch('clearcarts')

        }

    },
};
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl';

.shop-nav {
  background-size: cover;
  background-repeat: no-repeat;
  height: 50px;
  padding: 5px 10px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #FC5531;
  }

  .back {
    position: absolute;
    top: 10px;
    left: 0;

    .icon-arrow_left {
      display: block;
      padding: 5px;
      font-size: 20px;
      color: #fff;
    }
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
</style>