import Vue from 'vue'
//定义过滤器
//datetime 过滤器的名字 ，
//format 处理数据的规则
Vue.filter('datetime',function(value,format='YYYY-MM-DD HH:mm:ss'){
  //返回过滤后的数据
  //moment 处理库
  //  调用规则
  // 通过moment库把数据value 以format规则做过滤
  return moment(value).format(format)
})