// 计算总价格和总数量
export default{
    // 总数量 totalCount
    totalCount(state){
        // foodcart 购物车数据
        // reduce 累计
        // pretotal 起始总数量
        // food 所购单个食品
        // food.count 所购单个食品数量
        // 0=>如果还没有点餐 总数量初始值为0
        return state.foodcart.reduce((pretotal,food)=>pretotal+food.count,0)
    },
    // 总价格
    // totalPrice 总价格属性
    totalPrice(state){
        // foodcart 购物车数据
        // reduce 累计
        // pretotal 起始总价格
        // food 所购单个食品
        // food.count 所购单个食品
        // food.price所购单个食品的单价
        // 0=>如果还没有点餐 总价格初始值为0
return state.foodcart.reduce((pretotal,food)=>pretotal+food.count*food.price,0)
    }
}