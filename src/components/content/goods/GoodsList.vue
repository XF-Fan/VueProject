<template>
  <div class="goods">
    <goods-list-item v-for="(item,index) in goods" :key="index" :goods-item="item"></goods-list-item>
    <!-- {{goods}}  凸(艹皿艹 )。这东西多出来的json。找了半年-->
    <!-- goods是从父页面home那里传递过来的，这里是测试能否正常接收到，忘了注释掉产生了上面的json显示错误 -->
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
  }

   
</style>