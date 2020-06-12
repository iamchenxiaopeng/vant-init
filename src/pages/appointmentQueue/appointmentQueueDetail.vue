<template>
  <div class="nbg">
    <header style="height: 6.1rem;background: #fff">
      <img src="../../assets/images/work/detail_bg.png" class="full">
    </header>
    <div class="top-head normal-padding wbg">
      <div style="text-align: right;font-size: 12px">
        <span class="hujiao">
          <span style="color: #fff;vertical-align: minddle">等待呼叫</span>
          <van-icon name="replay" style="color: #fff;vertical-align: minddle;font-size: 12px;margin-top: -2px;margin-left: 2px" />
        </span>
      </div>
      <h2 style="text-align: center;color: #F5A50A;font-size: 35px" class="mt-10">022&nbsp;号</h2>
      <p class="txt-center mt-10">
        <van-icon  style="color: #F5A50A" name="underway-o" class="mr-5 n-color" />
        还有 <span class="fontw" style="color: #F5A50A">10</span> 人在您面前等候服务...
      </p>
      <div style="border-top: 1px dashed #D7D7D7;margin: 20px;width: 100%"></div>
      <!-- <p class="mt-10 igcolor">
        请您在休息区耐心等候，注意显示屏呼叫号码信息，过号无效，请重新排号，谢谢合作！
      </p> -->
      <van-notice-bar class="mynotice" wrapable :scrollable="false">
        请您在休息区耐心等候，注意显示屏呼叫号码信息，过号无效，请重新排号，谢谢合作！
      </van-notice-bar>
    </div>
    <div class="number-detail wbg mt-10" style="padding: .8rem; padding-top: 3.6rem">
      <div class="titlebox title-font mb-20">排号详情</div>
      <p class="mt-5">
        <van-cell class="mycell" title="办事支队：" value="观音岩支大队" />
      </p>
      <p class="mt-5">
        <van-cell class="mycell" title="电话" value="观音岩支大队" />
      </p>
      <p class="mt-5">
        <van-cell class="mycell" title="地址：" value="观音岩支大队" />
      </p>
      <p class="mt-5">
        <van-cell class="mycell" title="预约时段：" value="观音岩支大队" />
      </p>
      <p class="mt-5">
        <van-cell class="mycell" title="预约人：" value="观音岩支大队" />
      </p>
      <div class="my-button" style="margin: 40px auto;display: block;width: 4.5rem" @click="toCancel">取消排队</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  components: {
    
  },
  data () {
    return {
      showNotice: true
    }
  },
  created () {
    
  },
  
  methods: {
    toCancel(){
      this.$dialog.confirm({
        message: '没人每月仅可重新预约5次，你确定要作废重新取号吗？',
      }).then(()=>{
        console.log('确定')
      }).catch(()=>{
        console.log('取消')
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
  height: 6.93rem;
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