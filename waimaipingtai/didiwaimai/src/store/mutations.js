import { GETSHOPLIST, SAVENAME, GETCOOKIENAME, LOGOUTVUE, GETSHOP, GETCOMMENT, ADD, DESCRADD,CLEARCARTS } from './mutation-type'
import Vue from 'vue'
export default {
    [GETSHOPLIST](state, { res }) {
        // console.log(res);
        state.shoplists = res;
    },
    // 给状态数据赋值 userinfo
    [SAVENAME](state, { name }) {
        state.userinfo = name
    },
    // 重新给state中userinfo赋值
    [GETCOOKIENAME](state, { name }) {
        state.userinfo = name;

    },
    // 退出
    [LOGOUTVUE](state) {
        // console.log("退出ok");
        state.userinfo = ''
    },
    // 获取商家下的食品
    [GETSHOP](state, { res }) {
        state.getfoods = res
    },
    [GETCOMMENT](state, { res }) {
        state.getcomments = res;
    },
    // 加
    [ADD](state, { food }) {
        // console.log('ja')
        // 给food中增加属性count，赋值为1
        // food.count=1;=》不可取,增加的属性不是响应式的
        if (!food.count) {
            // vue get=>给vue中对象数据增加响应式属性、
            Vue.set(food, 'count', 1)
            //把所给食品加入购物车
            state.foodcart.push(food)
        } else {
            food.count++;
        }

    },
    // 减
    [DESCRADD](state, { food }) {
        if (food.count) {
            // 使food中的值减一
            food.count--;
            if (food.count === 0) {
                // 把所购的食品在购物车中移除
                state.foodcart.splice(state.foodcart.indexOf(food), 1)
            }
        }

    },
    // 清空购物车
    [CLEARCARTS](state){
        // 把当前点餐界面 所购的食品数量初始化为0
        state.foodcart.forEach((food)=>food.count=0)
        // 把购物车数据清空
        state.foodcart=[]

    }
}