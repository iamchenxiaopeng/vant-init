<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <div class="box" style="width: 10rem;height: 5rem;background: red"></div>
    <div class="box" style="width: 200px;height: 200px;background: red"></div>
    <van-button type="default">默认按钮</van-button>
<van-button type="primary">主要按钮</van-button>
<van-button type="info">信息按钮</van-button>
<van-button type="warning">警告按钮</van-button>
<van-button type="danger">危险按钮</van-button>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import {getPicList} from '../apis/index.js'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  created(){
    getPicList().then((res)=>{
      console.log(res)
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
