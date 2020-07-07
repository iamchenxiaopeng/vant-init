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
    <div @click="toDetail(item.id)" class="content-list normal-shadow wbg small-padding br5 mt-10" v-for="(item, index) in dataList" :key="index" style="position: relative">
      <div class="title-font">
        <span class="bigfont" style="color: #4E85EE">{{item.number_str}}号</span>
        <span class="fr igcolor" style="font-weight: normal;color: #F5A50A!important" v-if="item.status == 1">{{item.status_str}}</span>
        <span class="fr igcolor" style="font-weight: normal;color: #4E85EE!important" v-if="item.status == 2">{{item.status_str}}</span>
        <span class="fr igcolor" style="font-weight: normal;color: #4E85EE!important" v-if="item.status == 3">{{item.status_str}}</span>
        <span class="fr igcolor" style="font-weight: normal;" v-if="item.status == 5">{{item.status_str}}</span>
        <span class="fr igcolor" style="font-weight: normal;color: #CC3333!important" v-if="item.status == 6">{{item.status_str}}</span>
        <span class="fr igcolor" style="font-weight: normal;" v-if="item.status == 7">{{item.status_str}}</span>
        <img src="../../assets/images/work/finish.png" v-if="item.status == 4" class="finishbox">
      </div>
      <div class="aline mb-10"></div>
      <van-cell class="mycell" title="办事支队" :value="item.station_name" />
      <van-cell class="mycell" title="地址" :value="item.station_address" />
      <van-cell class="mycell" title="取号时间" :value="item.appoint_region" />
    </div>
    
  </div>
</template>

<script>
import { user_orderOrder_list } from '@/api/apis'
export default {
  components: {
    
  },
  data () {
    return {
      targetNav: 2,
      dataCount: 10,
      dataList: [],
    }
  },
  created () {
    this.getData()
  },
  
  methods: {
    changeTab(e){
      console.log(e)
    },
    getData(){
      user_orderOrder_list().then((res)=>{
        console.log(res)
        if (!res.data.errCode){
          this.dataCount = res.data.data.count
          this.dataList = res.data.data.list
        } else {
          this._global.toast('error',res.data.message)
        }
      })
    },
    changeNav(index){
      // this.targetNav = index
      this.$router.push({
        name: 'appointmentQueue'
      })
    },
    toDetail(id){
      this.$router.push({
        name: 'appointmentQueueDetail',
        params: {id}
      })
    },
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
.finishbox {
  width: 2.5rem;
  height: 2.5rem;
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 9;
  opacity: .8;
}
</style>