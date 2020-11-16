<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends" />
    <!-- 这里:recommends传到recommendView页面中了,然后子声明、子使用 -->
    <feature-view></feature-view>
    <!-- 本周流行，这里只是一张png图 -->
    <tab-control
      class="tab-control"
      :titles="['流行', '新款', '精选']" 
    ></tab-control>
    <goods-list :goods="goods['pop'].list"></goods-list> <!-- 默认是展示流行下的商品 -->

    <ul>
      <li>商品1</li>
      <li>商品2</li>
      <li>商品3</li>
      <li>商品4</li>
      <li>商品5</li>
      <li>商品6</li>
      <li>商品7</li>
      <li>商品8</li>
      <li>商品9</li>
      <li>商品10</li>
      <li>商品11</li>
      <li>商品12</li>
      <li>商品13</li>
      <li>商品14</li>
      <li>商品15</li>
      <li>商品16</li>
      <li>商品17</li>
      <li>商品18</li>
      <li>商品19</li>
      <li>商品20</li>
      <li>商品21</li>
      <li>商品22</li>
      <li>商品23</li>
      <li>商品24</li>
      <li>商品25</li>
      <li>商品26</li>
      <li>商品27</li>
      <li>商品28</li>
      <li>商品29</li>
      <li>商品30</li>
      <li>商品31</li>
      <li>商品32</li>
      <li>商品33</li>
      <li>商品34</li>
      <li>商品35</li>
      <li>商品36</li>
      <li>商品37</li>
      <li>商品38</li>
      <li>商品39</li>
      <li>商品40</li>
      <li>商品41</li>
      <li>商品42</li>
      <li>商品43</li>
      <li>商品44</li>
      <li>商品45</li>
      <li>商品46</li>
      <li>商品47</li>
      <li>商品48</li>
      <li>商品49</li>
      <li>商品50</li>
      <li>商品51</li>
      <li>商品52</li>
      <li>商品53</li>
      <li>商品54</li>
      <li>商品55</li>
      <li>商品56</li>
      <li>商品57</li>
      <li>商品58</li>
      <li>商品59</li>
      <li>商品60</li>
      <li>商品61</li>
      <li>商品62</li>
      <li>商品63</li>
      <li>商品64</li>
      <li>商品65</li>
      <li>商品66</li>
      <li>商品67</li>
      <li>商品68</li>
      <li>商品69</li>
      <li>商品70</li>
      <li>商品71</li>
      <li>商品72</li>
      <li>商品73</li>
      <li>商品74</li>
      <li>商品75</li>
      <li>商品76</li>
      <li>商品77</li>
      <li>商品78</li>
      <li>商品79</li>
      <li>商品80</li>
      <li>商品81</li>
      <li>商品82</li>
      <li>商品83</li>
      <li>商品84</li>
      <li>商品85</li>
      <li>商品86</li>
      <li>商品87</li>
      <li>商品88</li>
      <li>商品89</li>
      <li>商品90</li>
      <li>商品91</li>
      <li>商品92</li>
      <li>商品93</li>
      <li>商品94</li>
      <li>商品95</li>
      <li>商品96</li>
      <li>商品97</li>
      <li>商品98</li>
      <li>商品99</li>
      <li>商品100</li>
    </ul>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper"; //首页轮播图
import RecommendView from "./childComps/RecommendView"; //轮播图下面的推荐信息
import FeatureView from "./childComps/FeatureView"; //本周流行，单张png图片

import NavBar from "components/common/navbar/NavBar"; //购物街
import TabControl from "components/content/tabControl/TabControl"; //本周流行下面的3个切换按钮
import GoodsList from "components/content/goods/GoodsList"; //商品显示区域

import { getHomeMultidata, getHomeGoods } from "network/home";
// http://152.136.185.210:8000/api/w6/home/data?type=pop&page=1
export default {
  name: "Home",
  components: {
    HomeSwiper, //首页轮播图
    RecommendView, //轮播图下面的推荐信息
    FeatureView,

    NavBar,
    TabControl,
    GoodsList,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 1, list: [] }, //流行
        new: { page: 1, list: [] }, //新品
        sell: { page: 1, list: [] }, //精选
      },
    };
  },
  created() {
    //数据请求和处理都在这里的话，会很臃肿不清晰，所以这里只做请求，处理数据的部分放到methods里
    this.getHomeMultidata(); //不加this.相当于是在使用import导入过来的函数           这里请求的数据应该是轮播图的

    this.getHomeGoods('pop');//直接在渲染完成时请求三种分类的数据(相当于默认显示的数据)         这里显示的是一个个的商品
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
  },
  methods: {
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
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
  /* 这里sticky属性无法生效，后续解决思路是使用fixed属性，通过判断Scroll属性动态添加删除fixed属性 */
  /* position: -webkit-sticky;
  position: sticky; */
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
