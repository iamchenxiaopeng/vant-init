<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <van-button type="primary">{{tea}}</van-button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  data(){
    return {
      tea: '22'
    }
  },
  components: {
    HelloWorld
  },
  mounted(){
    this.$toast.success('使用vant成功')
    this.tea = this._global.onDayMill
  }
}
</script>
