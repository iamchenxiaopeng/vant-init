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
      ref="refname"
      @focus="hideButton"
      @blur="showButton"
      label="用户名"
      placeholder="请输入用户名"
    />
    <van-field class="rightcell"
      v-model="inputForm.mobile"
      required
      ref="refmobile"
      @focus="hideButton"
      @blur="showButton"
      label="手机号"
      placeholder="请输入手机号"
    />
    <van-field class="rightcell"
      v-model="inputForm.id_card"
      required
      ref="refid_card"
      @focus="hideButton"
      @blur="showButton"
      label="身份证号码"
      placeholder="请输入身份证号码"
    />
    <p class="igcolor normal-padding" style="background: #FDFAF2;margin: 0;padding-top: 10px;padding-bottom: 10px"><van-icon class="" name="info" /><span class=" ml-10" style="color: #AC9B77">每个微信号只能排一个号，不能为他人代排</span></p>
    <div style="position: absolute;bottom: 0;width: 100%" v-if="isShowButton">
      <div class="my-button" style="margin: 50px auto;display: block;width: 4.5rem" @click="nowQueue">立即排队</div>
    </div>
  </div>
</template>

<script>
import { user_orderScene_create_order, commonDetail } from '@/api/apis'
export default {
  name: 'index',
  components: {
    
  },
  data () {
    return {
      isShowButton: true,
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
    this.inputForm.station_id = this.$route.query.station_id
    this.getData(this.$route.query.station_id)
  },
  mounted () {
    let that = this
    if (!(/iPhone|mac|iPod|iPad/i.test(navigator.userAgent))) {
          const innerHeight = window.innerHeight;
          window.addEventListener('resize', () => {
            const newInnerHeight = window.innerHeight;
            if (innerHeight > newInnerHeight) {
              // 键盘弹出事件处理
              
            } else {
              // 键盘收起事件处理
              that.isShowButton = true
            }
          });
        } else {
          window.addEventListener('focusin', () => {
            // 键盘弹出事件处理
          });
          window.addEventListener('focusout', () => {
            // 键盘收起事件处理
            that.isShowButton = true
          });
        }
  },
  methods: {
    hideButton(){
      this.isShowButton = false
    },
    showButton(){
      this.isShowButton = true
    },
    nowQueue(){
      this.inputForm.station_id = this.$route.query.station_id
      if(!this.inputForm.name){
        this._global.toast('fail','请填写用户名')
        return
      }
      if(!this.inputForm.mobile){
        this._global.toast('fail','请填写手机号')
        return
      }
      if(!this.inputForm.id_card){
        this._global.toast('fail','请填写身份证号')
        return
      }
      user_orderScene_create_order(this.inputForm).then((res)=>{
        this._global.dealHttp(res, ()=>{
          this.$router.push({
            name: 'appointmentQueueDetail',
            params: {
              id: res.data.data
            }
          })
        })
      })
      
    },
    getData(id){
      commonDetail({
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