// 导入vue
import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import state  from './state'
import mutations from './mutations'
import getters from './getters'
Vue.use(Vuex)
// 创建stroe
export default new Vuex.Store({
    state,
    actions,
    mutations,
     getters
})