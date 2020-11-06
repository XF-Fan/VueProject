<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends" />
    <feature-view></feature-view>
    <tab-control
      class="tab-control"
      :titles="['流行', '新款', '精选']"
    ></tab-control>
    <goods-list :goods="goods['pop'].list"></goods-list>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from 'components/content/goods/GoodsList'

import { getHomeMultidata, getHomeGoods } from "network/home"; //使用export default 导出的模块，在其他地方引用导入的时候才不用加{}
// http://152.136.185.210:8000/api/w6/home/data?type=pop&page=1
export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,

    NavBar,
    TabControl,
    GoodsList
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': { page: 1, list: [] }, //流行
        'new': { page: 1, list: [] }, //新品
        'sell': { page: 1, list: [] }, //精选
      },
    };
  },
  created() {
    //数据请求和处理都在这里的话，会很臃肿不清晰，所以这里只做请求，处理数据的部分放到methods里
    this.getHomeMultidata(); //不加this.相当于是在使用import导入过来的函数

    this.getHomeGoods('pop');//直接在渲染完成时请求三种分类的数据(相当于默认显示的数据)
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
  },
  methods: {
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        //这里的(res)括号是格式化代码的时候自动加上去的，可以不加
        //network/homejs导出的函数 
        // this.result = res; 这行不要 这里的res在函数结束后会回收，所以要在data里面定义变量用来接收存储这个res数据。data里面定义的变量是不会被回收的
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then((res) => {
        // console.log(res.data.data.list);
        const newList = res.data.data.list
        this.goods[type].list.push(...newList)
      });
    },
  },
};
</script>

<style scoped>
#home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }

  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

</style>
