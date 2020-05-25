<template>
  <div>
    <h1>这是首页</h1>
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
      
    }
  },
  created () {
    getPicList().then((res)=>{
      console.log(res)
    })
  },
  
  methods: {
    
  },
  beforeDestroy () {
    
  }
}
</script>

<style scoped lang="less">
</style>