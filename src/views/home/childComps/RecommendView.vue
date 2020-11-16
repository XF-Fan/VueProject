<template>
  <div class="recommend">
    <div class="recommend-item" v-for="(item,index) in recommends" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <span>{{item.title}}</span>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "RecommendView",
    props: { 
      recommends: { //子页面中：子声明，子使用 行3 v-for循环里面的recommends ;父页面中：父传 
        type: Array,
        required: true
      }
    }
  }
</script>

<style scoped>
  .recommend {
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 14px;

    padding:10px 0 20px;
    border-bottom: 5px solid #eee;
  }

  .recommend-item {
    flex: 1;
  }

  .recommend img {
    width: 80px;
    height: 80px;
    margin-bottom: 10px;
  }

  
</style>