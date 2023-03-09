<template>
  <section class="order">
    <HeaderTop :title="title"></HeaderTop>
    <section class="order_no_login" v-if="!userinfo">
      <img src="./images/person.png">
      <h3>登录后查看外卖订单</h3>
      <button @click="$router.push('/login')">立即登陆</button>
    </section>
    <div v-else>
      <div style="height:50px"></div>
      <h4 style="text-align:center;">订单信息</h4>
      <p v-show="false">{{ orders }}</p>
      <div class="container">
        <table class="table table-hover " style="text-align: center;border:1px solid #F0AD4E;">
          <tr style="border:1px solid #F0AD4E;background-color: #F0AD4E;">
            <th style="border:1px solid #F0AD4E;text-align: center;">订单号</th>
            <th style="border:1px solid #F0AD4E;text-align: center;">总价格</th>
            <th style="border:1px solid #F0AD4E;text-align: center;">购买人</th>
            <th style="border:1px solid #F0AD4E;text-align: center;">操作</th>
          </tr>

          <tr v-for="(item, index) in userorders" :key="index" style="border:1px solid #F0AD4E;">
            <td style="border:1px solid #F0AD4E;text-align: center;">{{ item.order_num }}</td>
            <td style="border:1px solid #F0AD4E;text-align: center;">{{ item.food_totalprice }}</td>
            <td style="border:1px solid #F0AD4E;text-align: center;">{{ item.username }}</td>
            <td>
              <router-link :to="`/orderinfo/${item.id}`" class="btn btn-warning" type="button" data-toggle="collapse"
                data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">查看详情</router-link>
              <button class="btn btn-success" data-toggle="modal" data-target="#myModal" @click="btn(item.shoplist_id)">
                评价
              </button>
              <div class="modal fade" id="myModal">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                        &times;
                      </button>
                      <h4 class="modal-title">评价页面</h4>
                    </div>
                    <div class="modal-body">
                      <form>
                        <div class="form-group">
                          <label>评价</label>
                          <!-- form-control  使元素宽度变为100%-->
                          <input type="text" class="form-control" placeholder="请输入你的评价"  v-model="content"/>
                        </div>
                      </form>
                    </div>
                    <div class="modal-footer">
                      <button class="btn btn-success" @click="comments(index)">
                        确定
                      </button>
                      <button class="btn btn-danger" @click="clear" >
                        重置
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </td>
            <hr />
          </tr>
        </table>
        <router-view></router-view>
      </div>
    </div>
  </section>
</template>
<script>
import {Toast} from "mint-ui";
import { getuserorders, insertcomment, getuserinfo } from '../../api/index'
import { mapState } from 'vuex'
import HeaderTop from '../../components/HeaderTop/HeaderTop'
export default {
  data() {
    return {
      title: '订单页',
      userorders: '',//登录用户的订单信息
      couser: "", // 用户名
      content: "", //评价内容
      shoplist_id: "", //商家id
      pic: "", //用户头像
    }
  },

  computed: {
    ...mapState(['userinfo']),
    async orders() {
      let username = this.userinfo;
      let res = await getuserorders(username);
      //  console.log(res)
      this.userorders = res;
    }
  },
  components: {
    HeaderTop
  },
  methods: {
    btn(shoplists_id) {
      this.shoplist_id = shoplists_id;
      // console.log(this.shoplist_id);
    },
    async comments(index) {
    
        let couser = this.userinfo;
        let content = this.content;
        // console.log(content)
        let shoplist_id = this.shoplist_id;
        // console.log(shoplist_id);
        let { pic } = await getuserinfo(couser);
        console.log(pic);
        let res = await insertcomment(couser, content, shoplist_id, pic);
        // console.log(res);
        if (res.msg == "ok") {
          // 跳转到本页面
          this.$router.go(0);
      }
    },
    clear() {
      this.content = "";
    },
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"
 .header
            background-color #FC5531
            position fixed
            z-index 100
            left 0
            top 0
            width 100%
            height 45px
            .header_search
              position absolute
              left 15px
              top 50%
              transform translateY(-50%)
              width 10%
              height 50%
              .icon-sousuo
                font-size 25px
                color #fff
            .header_title
              position absolute
              top 50%
              left 50%
              transform translate(-50%, -50%)
              width 50%
              color #fff
              text-align center
              .header_title_text
                font-size 20px
                color #fff
                display block
            .header_login
              font-size 14px
              color #fff
              position absolute
              right 15px
              top 50%
              transform translateY(-50%)
              .header_login_text
                color #fff
.order  //订单
          width 100%
          .order_no_login
            padding-top 140px
            width 60%
            margin 0 auto
            text-align center
            >img
              display block
              width 100%
              height 30%
            >h3
              padding 10px 0
              font-size 17px
              color #6a6a6a
            >button
              display inline-block
              background #FC5531
              font-size 14px
              color #fff
              border 0
              outline none
              border-radius 5px
              padding 10px 20px
</style>