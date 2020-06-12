<template>
  <div class="normal-padding" style="background: #fff">
    <div class="flex-container">
      <div style="flex: 1;text-align: center">
        <span  @click="changeNav(1)" :class="[targetNav == 1 ? 'halfbottom': '','navspan']">排队取号</span>
      </div>
      <div style="flex: 1;text-align: center">
        <span  @click="changeNav(2)" :class="[targetNav == 2 ? 'halfbottom': '','navspan']">排队记录</span>
      </div>
    </div>
    <div class="content-list normal-shadow wbg small-padding br5 mt-10" v-for="item in 8" :key="item">
      <div class="title-font">
        <span class="bigfont" style="color: #4E85EE">01号</span>
        <span class="fr igcolor" style="font-weight: normal">已过号</span>
      </div>
      <div class="aline mb-10"></div>
      <van-cell class="mycell" title="办事支队" value="观音岩支大队" />
      <van-cell class="mycell" title="地址" value="观音岩支大队" />
      <van-cell class="mycell" title="取号时间" value="观音岩支大队" />
      <!-- <div class="normal-font">电话：023-11511</div>
      <div class="normal-font">电话：023-11511</div>
      <div class="normal-font">地址：你好，世界！！</div> -->
    </div>
    
  </div>
</template>

<script>
export default {
  components: {
    
  },
  data () {
    return {
      targetNav: 2,
    }
  },
  created () {
    
  },
  
  methods: {
    changeTab(e){
      console.log(e)
    },
    changeNav(index){
      this.targetNav = index
    }
  }
}
</script>

<style scoped lang="less">
.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}
.block {
    width: 90%;
    height: 80%;
    background: #fff;
    border-radius: 10px;
    text-align: center;
    position: relative;
}
.tiemchoose {
    margin-top: 2px;
    padding: 20px;
    justify-content: space-between!important;
}
.timeitem {
    width: 30%;
    background: #F2F2F2;
    height: 30px;
    margin-bottom: 10px;
    text-align: center;
}
.halfbottom {
  display: inline-block;
  padding-bottom: 5px;
  border-bottom: 2px solid #4E85EE!important;
  color: #4E85EE;
}
.navspan {
  font-size: 15px;
  border-bottom: 2px solid #fff;
}
</style>