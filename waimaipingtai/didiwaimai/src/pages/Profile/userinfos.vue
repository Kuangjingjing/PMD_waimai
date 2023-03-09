<template>
  <div>
    <header>
      <a href="javascript:void(0)" class="back" @click="$router.back()">
        <i class="iconfont icon-arrow_left"></i>
      </a>
      <p>个人详情</p>
    </header>

    <div class="content">
      <div class="detail">
        <img v-if="message.pic" :src="`https://kuangjing.oss-cn-beijing.aliyuncs.com/${message.pic}`" alt="">
        <img v-else :src="imgStr" alt="">
        <ul class="block">
          <li>姓名：{{ message.realname ? message.realname : '暂无姓名请去编辑' }}</li>
          <li>电话：{{ message.realname ? message.phone : '暂无电话请去编辑' }}</li>
          <li>邮箱：{{ message.realname ? message.email : '暂无邮箱请去编辑' }}</li>
          <li>兴趣：{{ message.realname ? message.hobby : '暂无兴趣请去编辑' }}</li>
        </ul>
      </div>
      <div v-if="message.realname != ''">
        <div class="form-group">
          <div class="col-sm-2 col-xs-offset-4">
            <label for="file" class="btn btn-default">更换头像</label>

            <input id="file" type="file" style="display: none" @change="onchangeImgFun" />
          </div>
        </div>
      </div>
      <div class="edit">
        <!-- <mt-button type="primary" style="width:100%">编辑</mt-button> -->
        <!-- <div class="container"> -->
        <mt-button type="primary" style="width:100%" class="btn btn-warning" data-toggle="modal" data-target="#myModal">
          编辑</mt-button>
        <div class="modal fade" id="myModal">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title">编辑个人信息</h4>
              </div>
              <div class="modal-body">
                <form>
                  <div class="form-group">
                    <label>真实名字</label>
                    <!-- form-control  使元素宽度变为100%-->
                    <input type="text" class="form-control" placeholder="请添加真实名字" v-if="!message.realname"
                      v-model="realname" />
                    <input type="text" class="form-control" placeholder="请修改真实名字" v-else v-model="realname1" />

                  </div>
                  <div class="form-group has-success">
                    <label>电话</label>
                    <input type="text" class="form-control" placeholder="请添加电话" v-if="!message.phone" v-model="phone" />
                    <input type="text" class="form-control" placeholder="请修改电话" v-else v-model="phone1" />

                  </div>
                  <div class="form-group">
                    <label>邮箱</label>
                    <!-- form-control  使元素宽度变为100%-->
                    <input type="text" class="form-control" placeholder="请添加邮箱" v-if="!message.email" v-model="email" />
                    <input type="text" class="form-control" placeholder="请修改邮箱" v-else v-model="email1" />

                  </div>
                  <div class="form-group">
                    <label>兴趣</label>
                    <!-- form-control  使元素宽度变为100%-->
                    <input type="text" class="form-control" placeholder="请添加兴趣" v-if="!message.hobby" v-model="hobby" />
                    <input type="text" class="form-control" placeholder="请修改兴趣" v-else v-model="hobby1" />

                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button class="btn btn-warning" @click="messages">编辑</button>
              </div>
            </div>
          </div>
        </div>
        <!-- </div> -->
      </div>

      <div class="login-out">
        <mt-button type="danger" style="width:100%" @click="logout">退出</mt-button>
      </div>
      <footer>

      </footer>
    </div>
  </div>
</template>
<script>
import OSS from "ali-oss";
//配置
const client = new OSS({
  accessKeyId: "LTAI5tPZB5P5BadiyNQxQoy5", // 查看你自己的阿里云KEY
  accessKeySecret: "WMA1UU8nZiwE6KMTtP07sJzckv4Esz", // 查看自己的阿里云KEYSECRET
  bucket: "kuangjing", // 你的 OSS bucket 名称
  region: "oss-cn-beijing", // bucket 所在地址，我的是 华北2 北京
  // cname: true // 开启自定义域名上传
  // endpoint:"file.xxxx.live" // 自己的域名
});
import { getuserinfo, insertusermessage, updateusermessage,updateuserpic } from '../../api/index'
import { MessageBox } from 'mint-ui'
export default {
  data() {
    return {
      message: '',//登录用户的详情信息
      realname: '',//添加的名字
      phone: '',//添加的电话
      email: '',//添加的邮箱
      hobby: '',//添加的兴趣
      realname1: '',//修改的名字
      phone1: '',//修改的电话
      email1: '',//修改的邮箱
      hobby1: '',//修改的兴趣
      imgStr:require("./avatar.jpg"),//上传头像
      errorStr:'',//上传头像显示问题
    }
  },
  methods: {
    logout() {
      MessageBox.confirm('你确定退出吗?').then(action => {
        // console.log("确定");
        //分发动作
        this.$store.dispatch('logoutvue')
        // Toast("退出成功")
        this.$router.replace("/login")

      }, action => {
        console.log("取消")
      });
    },
    // 编辑个人信息
    async messages() {
      // console.log(this.message);return;

      if (this.message.realname === "") {
        // 添加
        let realname = this.realname;
        let phone = this.phone;
        let email = this.email;
        let hobby = this.hobby;
        let username = this.$route.params.name;
        console.log(realname,phone,email,hobby)
        // 添加
        let res = await insertusermessage(realname, phone, email, hobby, username);
         console.log(res)
        // 判断
        if (res.msg = "ok") {
          // 跳转到本页面
          this.$router.go(0);
        }

      } else {
        let realname = this.realname1;
        let phone = this.phone1;
        let email = this.email1;
        let hobby = this.hobby1;
        let username = this.$route.params.name;
        // 修改
        let res = await updateusermessage(realname, phone, email, hobby, username);
       
        // 判断
        if (res.msg = "ok") {
          // 跳转到本页面
          this.$router.go(0);
        }

      }
    },
    // 上传头像
    async onchangeImgFun(e) {
      // 获取上传的文件信息
      var file = e.target.files[0];
      // 上传文件名字
      var fileNames = file.name;
      // console.log(file);
      // console.log(fileNames);
      // 获取图片的大小，做大小限制有用
      let imgSize = file.size;
      // console.log(imgSize);
      var _this = this; // this指向问题，所以在外面先定义
      // 比如上传头像限制5M大小，这里获取的大小单位是b
      if (imgSize <= 5000 * 1024) {
        // 合格
        _this.errorStr = "";
        console.log("大小合适");
        // 开始渲染选择的图片
        // 本地路径方法 1
        // this.imgStr = window.URL.createObjectURL(e.target.files[0]);
        // console.log(window.URL.createObjectURL(e.target.files[0])); // 获取当前文件的信息
        // base64方法 2
        var reader = new FileReader();
        reader.readAsDataURL(file); // 读出 base64
        reader.onloadend = function () {
          // 图片的 base64 格式, 可以直接当成 img 的 src 属性值
          var dataURL = reader.result;
          console.log(dataURL);
          _this.imgStr = dataURL;
          // 下面逻辑处理
        };
        //阿里oss上传头像
        // 上传文件,这里是上传到OSS
        await client.put(fileNames, file).then((res) => {
          if (res.res.statusCode === 200) {
            // options.onSuccess(res);
            console.log("上传成功");
          } else {
            options.onError("上传失败");
          }
        });
        //调用后端接口代码位置
        let res=await updateuserpic(fileNames,this.$route.params.name);
        if(res.msg=="ok"){
          this.$router.go(0)
        }
      } else {
        console.log("大小不合适");
        _this.errorStr = "图片大小超出范围";
      }
    },
  },
  // 挂载完毕的钩子函数
  async mounted() {
    let name = this.$route.params.name;
    let res = await getuserinfo(name)
    if (res.realname != "") {
      // 修改
      this.realname1 = res.realname;
      this.phone1 = res.phone;
      this.email1 = res.email;
      this.hobby1 = res.hobby;
    }
    //  console.log(res);
    this.message = res;
  }
}
</script>
<style scoped>
body {
  margin: 0;
  padding: 0;
  background-color: #eeeeee;
  font-family: 微软雅黑;
}

ul {
  list-style: none;
  margin: 0 0 0 7.5em;
  padding: 0;
}

header {
  width: 100%;
  height: 3em;
  background-color: #FC5531;
  color: white;
}

header p {
  text-align: center;
  line-height: 3em;
}

.content {
  width: 100%;
  background-color: #ffffff;
}

.detail {
  background-color: #ffffff;
  height: auto;
  margin-top: 1em;
  padding: 10px;
  position: relative;
}

.edit {
  background-color: #ffffff;
  height: 2em;
  width: 100%;
  margin-top: 10em;
  clear: both;
}

.login-out {
  background-color: #ffffff;
  height: 2em;
  width: 100%;
  margin-top: 5em;
  margin-bottom: 0.5em;
}

.footer {
  width: 100%;
  height: 2em;
  background-color: rgb(75, 75, 75);
}

img {
  width: 100%;
  height: 100%;
  height: 7em;
  width: 7em;
  border: 1px solid grey;
  position: absolute;
  top: 0.5em;
  left: 0.5em;
}

a {
  text-decoration: none;
  display: inline-block;
  height: 2em;
  text-align: center;
  width: 100%;
  line-height: 2em;
  color: black;
}

.block {
  display: inline-block;
  height: auto;
  word-wrap: break-word;
  width: 50%;
}

.back {
  position: absolute;
  top: 5px;
  left: 0;
  text-align: left;
}

.icon-arrow_left {
  display: block;
  padding: 5px;
  font-size: 20px;
  color: #fff;
}
</style>