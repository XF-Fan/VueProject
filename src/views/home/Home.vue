<template>
  <div id="home">
     <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
     <home-swiper :banners="banners"></home-swiper>
    <!--
    <recommend-view :recommends="recommends"/> -->
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar';
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'

  import {getHomeMultidata} from "network/home";//使用export default 导出的模块，在其他地方引用导入的时候才不用加{}
  import {Swiper,SwiperItem} from 'components/common/swiper';

  export default {
    name: "Home",
    components: {
      NavBar,
      Swiper,
      SwiperItem,
      HomeSwiper,
      // RecommendView
    },
    data() {
      return {
        banners: [],
        recommends: []
      }
    },
    created() { //生命周期函数，创建完成后 ↓ 发送请求
      // 1.请求多个数据
      getHomeMultidata().then(res => {  //network/homejs导出的函数
        console.log(res);
        // this.result = res; 这行不要 这里的res在函数结束后会回收，所以要在data里面定义变量用来接收存储这个res数据。data里面定义的变量是不会被回收的
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
      })
    } 
  }
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    
  }
</style>
