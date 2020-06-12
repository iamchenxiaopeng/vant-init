<template>
  <div class="nbg">
    <div class="content-list wbg normal-padding" style="position: relative;" @click="toDetail">
      <p style="border-bottom: 1px solid #aaa;color: #333;padding: 10px 0">预约信息</p>
      <div class="title-font mb-10 mt-10">观音岩大队</div>
      <div class="normal-font mb-10">
        <van-icon name="location-o" class="mr-5" />电话：023-11511
      </div>
      <div class="normal-font">
        <van-icon name="phone-o" class="mr-5" />地址：你好，世界！！
      </div>
      <van-icon style="position: absolute;right: 20px;top: 100px;font-size: .8rem!important;color: #333" name="arrow" />
    </div>
    <van-cell @click="showDate=true" class="col-normal-padding mt-10" title="预约日期" is-link :value="currentDate|getDate" />
    <van-popup v-model="showDate"
      position="bottom"
      :style="{ height: '30%' }"
    >
      <van-datetime-picker style="width: 10rem"
        v-model="currentDate"
        type="date"
        title="选择年月日"
        @confirm="confirmChoose"
        @cancel="showDate = false"
      />
    </van-popup>
    <div class="tiemchoose flex-container wbg">
        <div style="position: relative" :class="['timeitem','noshrink',chooseIndex == index ? 'chooseActive' : '']" @click="chooseTime(index)" v-for="(item, index) in 7" :key="index">
            08:30~09:30
            <div class="mybadage">212</div>
        </div>
        
    </div>
    <van-overlay :show="showNotice">
        <div class="wrapper" @click.stop>
            <div class="block">
                <div class="title-font" style="font-size: 12px;text-align: center;margin: 20px">预约须知</div>
                <p class="tetleft">1、办事人员在万州交巡警微信公众号选择办事大队，选择预约日期及时段，预约人信息（姓名、手机号、身份证号）。</p>
                <p class="tetleft">2、预约取号仅限预约人本人办事使用，他人不能使用。</p>
                <p class="tetleft">3、每人每天同一窗口业务只能预约一个号，但可以取消预约后重新预约，重新预约不能超过5次。</p>
                <p class="tetleft">4、每月5 次爽约将被记入黑名单（平台页面有取消选项，可以提前取消），将暂停一个月预约服务。</p>
                <p class="tetleft">5、预约人需提前预约时段5分钟至预约办理点，等待叫号系统呼叫后进行业务办理，过号无效，再次排队需重新取号。</p>
                <div style="position: absolute;bottom: 3px;width: 100%">
                    <div class="my-button" style="margin: 10px auto" @click="showNotice=false">我已知晓</div>
                </div>
            </div>
        </div>
    </van-overlay>
    <div class="g-title mt-10" style="background: #fff;margin-bottom: 1px;padding: 10px 20px">
      预约人
    </div>
    <!-- <van-cell title="姓名" class="normal-padding">
      <template #right-icon>
        <input type="text" placeholder="请输入">
      </template>
    </van-cell>
    <van-cell title="手机号" class="normal-padding">
      <template #right-icon>
        <input type="text" placeholder="请输入">
      </template>
    </van-cell>
    <van-cell title="身份证号码" class="normal-padding">
      <template #right-icon>
        <input type="text" placeholder="请输入">
      </template>
    </van-cell> -->
    <van-field class="rightcell"
      v-model="inputForm.username"
      required
      label="用户名"
      placeholder="请输入用户名"
    />
    <van-field class="rightcell"
      v-model="inputForm.username"
      label="手机号"
      placeholder="请输入手机号"
    />
    <van-field class="rightcell"
      v-model="inputForm.username"
      label="身份证号码"
      placeholder="请输入身份证号码"
    />
    

    <div class="my-button" style="margin: 40px auto;display: block;width: 4.5rem" @click="toCommit">提交申请</div>
  </div>
</template>

<script>
export default {
  name: 'index',
  components: {
    
  },
  data () {
    return {
      currentDate: (new Date().getTime() + 1000*60*60*24),
      showDate: false,
      showNotice: true,
      chooseIndex: 0,
      inputForm: {

      },
    }
  },
  created () {
    
  },
  
  methods: {
    chooseTime(index){
      this.chooseIndex = index
    },
    confirmChoose(){

    },
    toDetail(){
      this.$router.push({
        name: 'appointmentQueueDetail',
        params: ''
      })
    },
    toCommit(){

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
    padding: 0 20px;
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
    line-height: 30px;
    margin-bottom: 10px;
    text-align: center;
}
.chooseActive {
  background: #4E85EE;
  color: #fff;
}
</style>