<template>
  <div>
    <section class="loginContainer">
      <div class="loginInner">
        <div class="login_header">
          <h2 class="login_logo">滴滴外卖</h2>
          <div class="login_header_title">
            <a href="javascript:;" :class="{ on: loginway }" @click="loginway = true">注册</a>
            <a href="javascript:;" :class="{ on: !loginway }" @click="loginway = false">登录</a>
          </div>
        </div>
        <div class="login_content">
          <!-- 注册的表单 -->
          <form @submit.prevent="register">
            <div :class="{ on: loginway }">
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="请输入用户名" v-model="name" />
              </section>
              <section class="login_verification">
                <input type="password" maxlength="16" placeholder="请输入注册密码" v-model="pass" />
              </section>
              <button class="login_submit">注册</button>
            </div>

          </form>
          <!-- 登录的form表单 -->
          <form @submit.prevent="login">
            <div :class="{ on: !loginway }">
              <section>
                <section class="login_message">
                  <input type="text" maxlength="11" placeholder="请输入登录的用户名" v-model="name1" />
                </section>
                <section class="login_verification">
                  <input type="password" maxlength="16" placeholder="请输入登录的密码" v-if="!showpwd" v-model="pass1" />
                  <input type="text" maxlength="16" placeholder="请输入登录的密码" v-else v-model="pass1" />

                  <!-- off表示没有打开，密码不显示   on表示打开，密码显示 -->
                  <div class="switch_button" :class="showpwd ? 'on' : 'off'" @click="showpwd = !showpwd">
                    <div class="switch_circle" :class="{ right: showpwd }"></div>
                    <span class="switch_text"></span>
                  </div>
                </section>
              </section>
              <button class="login_submit">登录</button>
            </div>

          </form>
          <a href="javascript:;" class="about_us">关于我们</a>
        </div>
        <a href="javascript:" class="go_back" @click="$router.back()"> <i class="iconfont icon-jiantou2"></i>
        </a>
      </div>
      <AlertTip v-show="isalert" :alerttext="alerttext" @closeTipAlert="btn"></AlertTip>
    </section>
  </div>
</template>

<script>
// 导入亲后端交互注册的方法
import { registers, logins } from '../../api/index';
// 导入提示框组件
import AlertTip from '../../components/AlertTip/AlertTip'
export default {
  data() {
    return {
      msg: 'Login',
      loginway: true,//true 代表的是注册 false代表的是登录
      showpwd: false,//true显示 false不显示
      name: '',//注册名字
      pass: '',//密码
      isalert: false,//false,一开始不出现
      alerttext: '',//提示错误
      name1: '',//登录的用户名
      pass1: '',//登录的密码
    }
  },
  components: {
    AlertTip
  },
  methods: {
    // 注册
    async register() {
      // 获取注册的数据
      let name = this.name;
      let pass = this.pass;
      // 注册用户名的正则
      if (!/^\w{6,8}$/.test(name)) {
        console.log('注册的名字必须为6-8位任意数字字母下划线');
        this.isalert = true;
        this.alerttext = '注册的名字必须为6-8位任意数字字母下划线';
        return;

      }
      // 注册密码的正则
      if (!/^\w{8,18}$/.test(pass)) {
        console.log("注册的密码必须是为8-18位任意数字字母下划线");
        this.isalert = true;
        this.alerttext = "注册的密码必须是为8-18位任意数字字母下划线";
        return;

      }
      // console.log(name,pass);
      let res = await registers(name, pass)
      //  console.log(res);
      if (res.msg == "ok") {
        // 注册成功
        // console.log('注册成功');
        // 跳转到个人中心界面
        this.$router.push("/profile")
        // 分发动作
        this.$store.dispatch('savename',name)
      }
    },
    // 登录
    async login() {
      // 获取登录的名字和密码
      let name = this.name1;
      let pass = this.pass1;
      // console.log(name,pass);
      let res=await logins(name, pass);
      // console.log(res);
      // 检测用户名
      if(res.msg=="usernameiserror"){
        this.isalert = true;
        this.alerttext = '用户名有误';
        return;
      }
       if(res.msg=="userpassiserror"){
        this.isalert = true;
        this.alerttext = '密码有误';
        return;
      }
      // ok
      if(res.msg=="ok"){
        this.$router.push('/profile')
        // 分发动作
        this.$store.dispatch('savename',name)
      }
    },
    // 关闭提示框
    btn() {
      this.isalert = false;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"
 .loginContainer
      width 100%
      height 100%
      background #fff
      .loginInner
        padding-top 60px
        width 80%
        margin 0 auto
        .login_header
          .login_logo
            font-size 40px
            font-weight bold
            color #FC5531
            text-align center
          .login_header_title
            padding-top 40px
            text-align center
            >a
              color #333
              font-size 14px
              padding-bottom 4px
              &:first-child
                margin-right 40px
              &.on
                color #FC5531
                font-weight 700
                border-bottom 2px solid #FC5531
        .login_content
          >form
            >div
              display none
              &.on
                display block
              input
                width 100%
                height 100%
                padding-left 10px
                box-sizing border-box
                border 1px solid #ddd
                border-radius 4px
                outline 0
                font 400 14px Arial
                &:focus
                  border 1px solid #FC5531
              .login_message
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .get_verification
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  border 0
                  color #ccc
                  font-size 14px
                  background transparent
              .login_verification
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .switch_button
                  font-size 12px
                  border 1px solid #ddd
                  border-radius 8px
                  transition background-color .3s,border-color .3s
                  padding 0 6px
                  width 30px
                  height 16px
                  line-height 16px
                  color #fff
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  &.off
                    background #fff
                    .switch_text
                      float right
                      color #ddd
                  &.on
                    background #FC5531
                  >.switch_circle
                    //transform translateX(27px)
                    position absolute
                    top -1px
                    left -1px
                    width 16px
                    height 16px
                    border 1px solid #ddd
                    border-radius 50%
                    background #fff
                    box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                    transition transform .3s
                    &.right
                      transform translateX(30px)
                    
              .login_hint
                margin-top 12px
                color #999
                font-size 14px
                line-height 20px
                >a
                  color #FC5531
            .login_submit
              display block
              width 100%
              height 42px
              margin-top 30px
              border-radius 4px
              background #FC5531
              color #fff
              text-align center
              font-size 16px
              line-height 42px
              border 0
          .about_us
            display block
            font-size 12px
            margin-top 20px
            text-align center
            color #999
        .go_back
          position absolute
          top 5px
          left 5px
          width 30px
          height 30px
          >.iconfont
            font-size 20px
            color #999
</style>
