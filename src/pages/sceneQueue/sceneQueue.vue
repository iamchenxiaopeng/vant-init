<template>
  <div class="wbg">
    <div class="content-list wbg normal-padding" style="position: relative;">
      <div class="normal-shadow" style="padding: 20px 10px">
        <div class="title-font mb-10">{{DDdata.name}}</div>
        <div class="normal-font mb-10">
          <van-icon name="phone-o" class="mr-5" />电话：{{DDdata.mobile}}
        </div>
        <div class="normal-font">
          <van-icon name="location-o" class="mr-5" />地址：{{DDdata.address}}
        </div>
      </div>
    </div>
    <div class="g-title normal-padding igcolor" style="margin-bottom: 1px">
      办事人信息
    </div>
    <van-field class="rightcell"
      v-model="inputForm.name"
      required
      label="用户名"
      placeholder="请输入用户名"
    />
    <van-field class="rightcell"
      v-model="inputForm.mobile"
      label="手机号"
      placeholder="请输入手机号"
    />
    <van-field class="rightcell"
      v-model="inputForm.id_card"
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
import { user_orderScene_create_order, manage_stationGet_detail } from '@/api/apis'
export default {
  name: 'index',
  components: {
    
  },
  data () {
    return {
      inputForm: {
        order_type: '2',
        station_id: '',
        id_card: '',
        mobile: '',
        name: ''
      },
      DDdata: {}
    }
  },
  created () {
    this.inputForm.station_id = this.$route.query.id
    console.log(this.$route)
    this.getData(this.$route.query.id)
  },
  
  methods: {
    nowQueue(){
      this.inputForm.station_id = this.$route.query.station_id
      if(!this.inputForm.name){
        this._global.toast('fail','请填写用户名')
        return
      }
      user_orderScene_create_order(this.inputForm).then((res)=>{
        console.log(res)
        if(!res.errCode){
          this.$router.push({
            name: 'appointmentQueueDetail',
            params: {
              id: res.data.data
            }
          })
        }else{
          this._global.toast('error', res.data.message)
        }
      })
      
    },
    getData(id){
      manage_stationGet_detail({
        id: id
      }).then((res)=>{
        this._global.dealHttp(res, ()=>{
          this.DDdata = res.data.data
        })
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
</style>