// 导入封装好的axios库
import ajax from "./ajax";
const url1 = "./api"
// 封装为一个方法=> 获取后端商家列表数据
export let getshoplists = () => ajax(`${url1}/shoplists`, "GET")

// 封装注册方法 => 实现注册
// name 是注册的名字 pass
export let registers = (name, pass) => ajax(`${url1}/registeruser`, { name, pass }, "GET")
// 封装登录方法=>实现登录
export let logins = (name, pass) => ajax(`${url1}/loginuser`, { name, pass }, "POST")
// 封装 获取用户登录或者注册的cookie信息
export let getcookieuserinfo = () => ajax(`${url1}/userinfoss`, "GET")
// 封装退出
export let loginout = () => ajax(`${url1}/vuelogout`, 'GET')
// 封装 根据商家id获取该商家的详情信息  id是商家的id
export let shopone = (id) => ajax(`${url1}/shoplistone`, { id }, "GET")
// 封装 根据商家的id获取商家点餐信息
export let getshops = (id) => ajax(`${url1}/vueshopgoods`, { id }, "GET")
// 封装 根据商家id获取商家下的评价信息
export let getcomments = (id) => ajax(`${url1}/vuecomments`, { id }, "GET")
// 封装 给登录的用户添加收货地址
export let adduseraddress = (name, phone, address, username) => ajax(`${url1}/addaddress`, { name, phone, address, username }, "POST")
// 封装 获取登录用户所有的收货地址
export let getalluseraddress=(username)=>ajax(`${url1}/useraddress`,{username},"GET")
// 封装 生成订单信息
export let insertorder=(order_num,address_id,food_totalprice,username,shoplist_id)=>ajax(`${url1}/addorder`,{order_num,address_id,food_totalprice,username,shoplist_id},"POST")
// 封装获取登录用户的订单信息
export let getuserorders=(username)=>ajax(`${url1}/userorders`,{username},"GET")
// 封装 生成订单的同时生成订单详情
export let insertorderinfo=(foodname,pic,count,orders_id)=>ajax(`${url1}/addordergoods`,{foodname,pic,count,orders_id},"POST")
// 封装 获取登录用户的订单详情信息
export let getorderinfo=(orders_id)=>ajax(`${url1}/orderinfos`,{orders_id},"GET")
// 封装 获取登录用户的详情信息
export let getuserinfo=(name)=>ajax(`${url1}/usermessage`,{name},"GET")
// 封装 添加个人用户详情
export let insertusermessage=(realname,phone,email,hobby,username)=>ajax(`${url1}/insertuserinfo`,{realname,phone,email,hobby,username},"POST")
// 封装 修改个人用户详情
export let updateusermessage=(realname,phone,email,hobby,username)=>ajax(`${url1}/updateuserinfo`,{realname,phone,email,hobby,username},"POST")
// 封装 修改用户头像
export let updateuserpic=(pic,username)=>ajax(`${url1}/updateuserpic`,{pic,username},"POST")
// 封装 搜索页的搜索信息
export let shopgoodssearch=(keyword)=>ajax(`${url1}/shopsearch`,{keyword},"GET")
// 封装 评价页的评价信息
export let insertcomment=(comments_user,content,shoplist_id,userpic)=>ajax(`${url1}/commentsinfo`,{comments_user,content,shoplist_id,userpic},"POST")


