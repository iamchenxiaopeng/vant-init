<template>
  <div>
    <h1 @click="show=true">这是首页</h1>
    <van-image-preview v-model="show" :images="images" @change="onChange">
      <template v-slot:index>{{ ' ' }}</template>
  </van-image-preview>
  </div>
</template>

<script>
import {getPicList} from '@/apis/index.js'
export default {
  name: 'index',
  components: {
  },
  data () {
    return {
      show: false,
      index: 0,
      images: [
        'https://img.yzcdn.cn/vant/apple-2.jpg',
      ],
    }
  },
  created () {
    getPicList().then((res)=>{
      console.log(res)
    })
  },
  
  methods: {
    onChange(index) {
      this.index = index;
    },
  },
  beforeDestroy () {
    
  }
}
</script>

<style scoped lang="less">
</style>