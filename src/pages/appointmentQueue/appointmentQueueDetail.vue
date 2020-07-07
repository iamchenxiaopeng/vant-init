<template>
  <div class="nbg">
    <header style="height: 6.1rem;background: #fff">
      <img src="../../assets/images/work/detail_bg.png" class="full">
    </header>
    <div class="top-head normal-padding wbg">
      <div style="text-align: right;font-size: 12px">
        <span class="hujiao" @click="getData">
          <span style="color: #fff;vertical-align: minddle">{{orderData.status_str}}</span>
          <van-icon name="replay" style="color: #fff;vertical-align: minddle;font-size: 10px!important;margin-top: -2px;margin-left: 2px" />
        </span>
      </div>
      <h2 style="text-align: center;color: #F5A50A;font-size: 35px" class="mt-10">{{orderData.number_str}}&nbsp;号</h2>
      <p class="txt-center mt-10">
        <van-icon  style="color: #F5A50A" name="underway-o" class="mr-5 n-color" />
        还有 <span class="fontw" style="color: #F5A50A">{{orderData.wait_count}}</span> 人在您面前等候服务...
      </p>
      <div style="border-top: 1px dashed #D7D7D7;margin: 20px;width: 100%"></div>
      <van-notice-bar class="mynotice" wrapable :scrollable="false">
        请您在休息区耐心等候，注意显示屏呼叫号码信息，过号无效，请重新排号，谢谢合作！
      </van-notice-bar>
    </div>
    <div class="number-detail wbg mt-10" style="padding: .8rem; padding-top: 3.9rem">
      <div class="titlebox title-font mb-20">排号详情</div>
      <p class="mt-5">
        <van-cell class="mycell" title="办事支队：" :value="orderData.station_name" />
      </p>
      <p class="mt-5">
        <van-cell class="mycell" title="电话" :value="orderData.station_mobile" />
      </p>
      <p class="mt-5">
        <van-cell class="mycell" title="地址：" :value="orderData.station_address" />
      </p>
      <p class="mt-5">
        <van-cell class="mycell" title="预约时段：" :value="orderData.appoint_region" />
      </p>
      <p class="mt-5">
        <van-cell class="mycell" title="预约人：" :value="orderData.name" />
      </p>
      <div class="my-button" style="margin: 40px auto;display: block;width: 4.5rem" v-if="orderData.status_str == '等待叫号'" @click="toCancel">取消排队</div>
    </div>
  </div>
</template>

<script>
import { user_orderOrder_detail, user_orderCancel_order } from '@/api/apis'
export default {
  name: 'index',
  components: {
    
  },
  data () {
    return {
      showNotice: true,
      orderData: {}
    }
  },
  created () {
    console.log(this.$route)
    this.getData()
  },
  
  methods: {
    toCancel(){
      this.$dialog.confirm({
        message: '每人每月仅可重新预约5次，你确定要作废重新取号吗？',
      }).then(()=>{
        console.log('确定')
        user_orderCancel_order({
          id: this.$route.params.id
        }).then((res)=>{
          if(!res.data.errCode){
            this._global.toast('success', '取消成功')
            this.getData()
          }else{
            this._global.toast('error', res.data.message)
          }
        })
      }).catch(()=>{
        console.log('取消')
      })
    },
    getData(){
      this.$toast.loading({
        forbidClick: true,
        duration: 0,
        message: '加载中...'
      })
      user_orderOrder_detail({
        id: this.$route.params.id
      }).then((res)=>{
        console.log(res)
        this.$toast.clear()
        if(!res.data.errCode){
          this.orderData = res.data.data
        }else{
          this._global.toast('fail',res.data.message)
        }
      })
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
.top-head {
  width: 8.48rem;
  height: 7.23rem;
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  top: 2.8rem;
  box-shadow:0px 5px 83px 1px rgba(78,133,238,0.22);
  border-radius:40px;
}
.hujiao {
  background:rgba(234,174,45,1);
  box-shadow:0px 5px 27px 0px rgba(234,147,45,0.48);
  border-radius: 29px;
  padding: .1rem .3rem;
  color: #fff;
}
.n-color {
  color: #F5A50A;
}
.mynotice {
  padding-top: 10px;
  padding: 10px;
  color: #AC9B77;
  font-size: 12px;
  background: #FBF5E6;
  border-radius: 6px;
  border: 1px solid #D7C8A9;
}
</style>