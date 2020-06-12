<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      transitionName: 'slide-left'
    }
  },
  created(){
    
  },
  methods: {
    
  }
}
</script>

<style lang="less">
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center;*/
    // color: #2c3e50;
    font-size:@normalFontSize;
    font-family:PingFang SC;
    font-weight: normal;
    color:#333333;
}

</style>

<style>

.child-view {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  min-height: 100%;
  transition: all .5s cubic-bezier(.55,0,.1,1);
}
.slide-left-enter, .slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(30px, 0);
  transform: translate(30px, 0);
}
.slide-left-leave-active, .slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-30px, 0);
  transform: translate(-30px, 0);
}
</style>
