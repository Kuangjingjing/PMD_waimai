import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入路由组件
// import Msite from '../pages/Msite/Msite'
// import Search from '../pages/Search/Search'
// import Order from '../pages/Order/Order'
// import Profile from '../pages/Profile/Profile'
// import Login from '../pages/Login/Login'
// import userinfos from '../pages/Profile/userinfos'
// import Shop from '../pages/Shop/Shop'
// import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods'
// import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings'
// import Account from '../pages/Account/Account'
// import Orderinfo from '../pages/Order/Orderinfo'
// 路由懒加载
const Msite = () => import('../pages/MSite/MSite.vue')
const Search = () => import('../pages/Search/Search.vue')
const Order = () => import('../pages/Order/Order.vue')
const Profile = () => import('../pages/Profile/Profile.vue')
const Login = () => import('../pages/Login/Login.vue')
const userinfos = () => import('../pages/Profile/userinfos.vue')
const Shop = () => import('../pages/Shop/Shop.vue')
const ShopGoods = () => import('../pages/Shop/ShopGoods/ShopGoods.vue')
const ShopRatings=()=>import('../pages/Shop/ShopRatings/ShopRatings.vue')
const Account=()=>import('../pages/Account/Account.vue')
const Orderinfo=()=>import('../pages/Order/Orderinfo.vue')
const Ordercomments=()=>import('../pages/Order/Ordercomments.vue')
// 在vue中使用router
Vue.use(VueRouter)
// 把路由组件映射为路由url
const router=new VueRouter({
    routes:[
        {
            path:'/msite',
            component:Msite,
            meta:{
                title:'首页',
                isfootershow:true
            }
        },{
            path:'/search',
            component:Search,
            meta:{
                title:'搜索页',
                isfootershow:true
            }
        },{
            path:'/order',
            component:Order,
            meta:{
                title:'订单页',
                isfootershow:true
            },
            children:[{
                path:'/orderinfo/:orders_id',
                component:Orderinfo,
                meta:{
                    title:'订单详情页',
                    isfootershow:true
                },
               
            },{
                path:'/ordercomments/:orders_id',
                component:Ordercomments,
                meta:{
                    title:'订单评价页',
                    isfootershow:true
                },
               
            }],
           
        },{
            path:'/profile',
            component:Profile,
            meta:{
                title:'个人中心',
                isfootershow:true
            }
        },
        {
            path:'/userinfos/:name',
            component:userinfos,
            meta:{
                title:'个人详情',
                isfootershow:true
            }
        },
        {
            path:'/login',
            component:Login,
            meta:{
                title:'登录注册',
                isfootershow:false

            }
        },
        {
            path:'/shop',
            component:Shop,
            meta:{
                title:'商家页',
                isfootershow:false
            },
            children:[{
                path:'/shop/goods/:id',
                component:ShopGoods,
                meta:{
                    title:'点餐页',
                isfootershow:false
                }
            },{
                path:'/shop/ratings/:id',
                component:ShopRatings,
                meta:{
                    title:'评价页',
                isfootershow:false
                }
            },]
        },
        {
            path:'/account/:username/:shoplist_id',
            component:Account,
            meta:{
                title:'结算页',
            isfootershow:false
            }
        },
        // 默认跳转
        {
            path:'/',
            redirect:'/msite'
        }
    ]
})
// 使用后置全局路由守卫=>路由组件切换完毕后调用
router.afterEach((to,from,next)=>{
    document.title=to.meta.title;
})
export default router;