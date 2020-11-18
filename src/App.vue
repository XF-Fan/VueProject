<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    <!-- <router-view></router-view> -->
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from "components/content/mainTabBar/MainTabBar";
export default {
  name: "App",
  components: {
    MainTabBar,
  },
};
// p172 bus 事件总线
// p174 debounce 防抖
</script>

<style>
/* style中每行样式后都要加  ;  */
@import "assets/css/base.css";
</style>
