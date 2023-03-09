//响应分发动作模块
//导入获取商家数据的方法
import { GETSHOPLIST, SAVENAME, GETCOOKIENAME, LOGOUTVUE, GETSHOP, GETCOMMENT, ADD, DESCRADD, CLEARCARTS} from './mutation-type'
import { getshoplists, getcookieuserinfo, loginout, getshops, getcomments} from '../api/index'
export default {
    //获取商家列表的动作
    async getshoplist({ commit }) {
        //异步获取商家数据
        let res = await getshoplists();
        // console.log(res)
        commit(GETSHOPLIST, { res })
    },
    // 响应动作 savename
    // name 登录和注册的用户名,只是普通的参数，不是集合
    savename({ commit }, name) {
        commit(SAVENAME, { name })
    },
    // 响应动作getcookiename
    async getcookiename({ commit }) {
        let res = await getcookieuserinfo();
        // 获取登录或者注册的名字
        let name = res.msg
        // 提交
        commit(GETCOOKIENAME, { name })
    },
    // 退出
    async logoutvue({ commit }) {
        // 调用接口
        let res = await loginout();
        if (res.msg === 0) {
            commit(LOGOUTVUE)
        }
    },
    // 获取商家下的食品信息 id商家的id
    async getshop({ commit }, id) {
        // 根据id获取商家下的食品信息
        let res = await getshops(id)
        // console.log(res);
        commit(GETSHOP, { res })
    },
    // 获取商家下的评价信息
    async getcomment({ commit }, id) {
        let res = await getcomments(id)
        // console.log(res);
        commit(GETCOMMENT, { res })
    },
    // 食品点餐的加减
    // isadd=> 判断加减的参数，false true
    // food=> 操作的食品
    handlercount({ commit }, { isadd, food }) {
        if (isadd) {
            //   加
            // 提交
            commit(ADD, { food })
        } else {
            // 减
            // 提交
            commit(DESCRADD, { food })
        }

    },
    // 清空购物车
    clearcarts({commit}) {
        // 提交
        commit(CLEARCARTS)
    },
}