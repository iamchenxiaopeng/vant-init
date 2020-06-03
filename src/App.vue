<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <div class="box" style="width: 10rem;height: 5rem;background: red"></div>
    <div class="box" style="width: 200px;height: 200px;background: red"></div>
    <van-button type="default" @click="showToast">默认按钮</van-button>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <i class="iconfont iconqrcode"></i>
    <van-icon name="chat-o" badge="99+" />
    <div></div>
    <van-icon name="chat-o" />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import {getPicList} from '@/apis/index.js'
import {successToast} from '@/utils/toast.js'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  created(){
    
  },
  methods: {
    showToast(){
      successToast('恭喜成功！', 2000, true)
    }
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
body {
  background: 'blue';
}
</style>
