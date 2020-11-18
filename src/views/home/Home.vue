<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="TabControl1" v-show="isTabFixed"
      ></tab-control>
    <scroll class="content" ref="scroll"
      :probe-type="3" @scroll="contentScroll"
      :pull-up-load="true" @pullingUp="loadMore"  
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends" />
      <!-- 这里:recommends传到recommendView页面中了,然后子声明、子使用 -->
      <feature-view></feature-view>
      <!-- 本周流行，这里只是一张png图 -->
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="TabControl2"
      ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
      <!-- 默认是展示流行下的商品 -->
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
// 私人组件导入部分
import HomeSwiper from "./childComps/HomeSwiper"; //首页轮播图
import RecommendView from "./childComps/RecommendView"; //轮播图下面的推荐信息
import FeatureView from "./childComps/FeatureView"; //本周流行，单张png图片
// 共用组件导入部分
import NavBar from "components/common/navbar/NavBar"; //购物街
import TabControl from "components/content/tabControl/TabControl"; //本周流行下面的3个切换按钮
import GoodsList from "components/content/goods/GoodsList"; //商品显示区域
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";
import { getHomeMultidata, getHomeGoods } from "network/home";
import {debounce} from "common/utils";

export default {
  name: "Home",
  components: {
    HomeSwiper, //首页轮播图
    RecommendView, //轮播图下面的推荐信息
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: {
          page: 1,
          list: [],
        },
        new: {
          page: 1,
          list: [],
        },
        sell: {
          page: 1,
          list: [],
        },
      },
      currentType: "pop",
      isShowBackTop: false, //是否显示返回顶部按钮
      tabOffsetTop:0, //tabOffsetTop判断位置高度
      isTabFixed:false,  //是否显示吸顶效果
      saveY:0,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  activated() {
    this.$refs.scroll.scrollTo(0,this.saveY,0); //(x,y,time)
    this.$refs.scroll.refresh(); //刷新，防止莫名其妙的错误
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();
  },
  created() {
    // 1.请求轮播等数据
    this._getHomeMultidata();
    // 2.请求商品数据
    this._getHomeGoods("pop");
    this._getHomeGoods("new");
    this._getHomeGoods("sell");
  },
  destroyed() {
    console.log('销毁');
  },
  mounted() {
    // 1.图片加载完成的事件监听
    const refresh = debounce(this.$refs.scroll.refresh,100);
    //定义常量用来接收debounce里面的回调函数(闭包)
    this.$bus.$on("itemImageLoad", () => {
      refresh()
      // this.$refs.scroll && this.$refs.scroll.refresh(); 
      //加个this.$refs.scroll判断后，在快速点击首页和分类时不会报错了
    });

    // 2.获取tabControl的offsetTop
    // 所有的组件都有一个属性$el:  用于获取组件中的元素
  },
  methods: {
    
    /* 网络请求相关*/
    _getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    _getHomeGoods(type) {
      // 获取页码
      const page = this.goods[type].page;
      getHomeGoods(type, page).then((res) => {
        const newList = res.data.list;
        this.goods[type].list.push(...newList);
        this.goods[type].page += 1;

        this.$refs.scroll.finishPullUp();
      });
    },
    /* 事件监听相关 */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.TabControl1.currentIndex = index;
      this.$refs.TabControl2.currentIndex = index;
    },
    backClick() {
      // console.log('返回顶部');
      this.$refs.scroll.scrollTo(0, 0, 1000);
    },
    contentScroll(position) {
      // 1.判断backtop是否显示
      // this.isShowBackTop = -position.y > 1000
      this.isShowBackTop = Math.abs(position.y) > 1000;
      // Math.abs(取绝对值) 因为默认position.y都是负值

      // 2.决定tabcontrol是否吸顶(position:fixed)
      //  this.isTabFixed  = (- position.y) > this.tabOffsetTop
       this.isTabFixed = position.y <= -this.tabOffsetTop;
    },
    loadMore() {
      // console.log('上拉加载更多');
      this._getHomeGoods(this.currentType);
    },
    swiperImageLoad(){
      this.tabOffsetTop = this.$refs.TabControl2.$el.offsetTop;
      //  console.log(this.$refs.TabControl.$el.offsetTop);
    }
  },
};
</script>

<style scoped>
#home {
  height: 100vh;/* vh：viewport height  视口高度*/
  /* padding-top: 44px; */
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: relative;
  z-index: 9;
}

.tab-control {
    position: relative;
    z-index: 9;
  }
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  height: calc(100% - 49px);
  /* 这里我减49px,是因为.home里面已经padding-top了44px,所以只需要减去底部tabbar的高度49px */
}
</style>
