<template>
  <div class="wbg">
    <div class="content-list wbg normal-padding" style="position: relative;">
      <div class="normal-shadow" style="padding: 20px 10px">
        <div class="title-font mb-10">观音岩大队</div>
        <div class="normal-font mb-10">
          <van-icon name="phone-o" class="mr-5" />电话：023-11511
        </div>
        <div class="normal-font">
          <van-icon name="location-o" class="mr-5" />地址：你好，世界！！
        </div>
      </div>
    </div>
    <div class="g-title normal-padding igcolor" style="margin-bottom: 1px">
      办事人信息
    </div>
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
    <p class="igcolor normal-padding"><van-icon class="fl" name="info" /><span class="fl ml-10">每个微信号只能排一个号，不能为他人代排</span></p>
    <div style="position: absolute;bottom: 0;width: 100%">
      <div class="my-button" style="margin: 50px auto;display: block;width: 4.5rem" @click="nowQueue">立即排队</div>
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
      inputForm: {}
    }
  },
  created () {
    
  },
  
  methods: {
    nowQueue(){
      this.$router.push({
        name: 'appointmentQueueDetail',
        params: ''
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
</style>