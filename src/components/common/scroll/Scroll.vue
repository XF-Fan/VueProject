<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from "better-scroll";
  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0,
      },
      pullUpLoad: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        scroll: null,
      };
    },
    mounted() {
      // 通过class获取容易拿错，拿到名字一样的别的东西，用ref能确切拿到想要的
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
      });
      // 监听滚动的位置
      if (this.probeType === 2 || this.probeType === 3) {
        this.scroll.on("scroll", (position) => {
          // console.log(position);
          this.$emit("scroll", position);
        });
      }
      // 监听上拉事件
      if (this.pullUpLoad) {
        this.scroll.on("pullingUp", () => {
          // console.log('上拉加载更多');
          this.$emit("pullingUp");
        });
      }
    },
    methods: {
      scrollTo(x, y, time = 500) {
        // this.scroll.scrollTo(x,y,time)
        this.scroll && this.scroll.scrollTo(x, y, time);
        //逻辑语句，依次判断是否为true然后顺序执行，有一个不为true则停止执行。这样更严谨，建议这样写
      },
      refresh() {
        this.scroll && this.scroll.refresh();
      },
      finishPullUp() {
        this.scroll.finishPullUp();
      },
      getScrollY(){
        return this.scroll ? this.scroll.y : 0;
      }
    },
  };
</script>

<style scoped>

</style>