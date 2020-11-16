<template>
  <div class="goods">
    <goods-list-item v-for="(item,index) in goods" :key="index" :goods-item="item"></goods-list-item>
    {{goods}}
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'
export default {
  name:'GoodsList',
  components:{
    GoodsListItem
  },
  props:{
    goods:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
  .goods{
    display: flex;
    flex-wrap: wrap;
    justify-content:space-evenly;


    /* 这里我先给添加一个样式，保持底部导航栏和视频显示的样式一样，不会被json数据把goods这个div撑宽使的导航栏显示一部分 */
    overflow: hidden;
  }

   
</style>