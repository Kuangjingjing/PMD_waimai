<template>
    <div>
        <form class="search_form" action="#" onsubmit="return false">
            <input type="search" name="text" placeholder=" 请输入评价内容" class="search_input" v-model="comm">
            <input type="submit" class="search_submit" @click="btn">
        </form>
    </div>
</template>
<script>
import { insertcomment } from '../../api/index'
import { mapState } from 'vuex'

export default {
    data(){
        return{
            comm:'',//评价内容
        }
    },
    methods:{
        async btn(){
              let comm=this.content;
            let comments_user=this.$route.params.comments_user;
             let shoplist_id=this.$route.params.id;
             let userpic=this.$route.params.userpic;
             console.log(comments_user,comm,shoplist_id,userpic)
             let res=await insertcomment(comments_user,comm,shoplist_id,userpic)
             console.log(res)
             
        }
    }
    
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../common/stylus/mixins.styl"
 .search_form
            clearFix()
            margin-top 45px
            background-color #fff
            padding 12px 8px
            input
              height 35px
              padding 0 4px
              border-radius 2px
              font-weight bold
              outline none
              &.search_input
                float left
                width 79%
                border 4px solid #f2f2f2
                font-size 14px
                color #333
                background-color #f2f2f2
              &.search_submit
                float right
                width 18%
                border 4px solid #FC5531
                font-size 16px
                color #fff
                background-color #FC5531
</style>