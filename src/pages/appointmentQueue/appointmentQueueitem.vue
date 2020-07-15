<template>
  <div class="nbg">
    <div style="color: #333;padding: 10px 20px;font-weight: bold">预约信息</div>
    <div class="content-list wbg normal-padding" @click="toDDlist">
      <div class="title-font mb-10 mt-10">{{DDdata.name}}</div>
      <div style="position: relative">
        <div class="normal-font mb-10">
          <van-icon name="phone-o" class="mr-5" />电话：{{DDdata.mobile}}
        </div>
        <div class="normal-font">
          <van-icon name="location-o" class="mr-5" />地址：{{DDdata.address}}
        </div>
        <van-icon class="picfont" name="arrow" />
      </div>
    </div>
    <van-cell @click="showDate=true" class="col-normal-padding mt-10" title="预约日期" is-link :value="currentDate|getDate" />
    <van-popup v-model="showDate"
      position="bottom"
      :style="{ height: '30%' }"
    >
      <van-datetime-picker style="width: 10rem"
        v-model="currentDate"
        :min-date="minDate"
        :max-date="limitDate"
        type="date"
        title="选择年月日"
        @confirm="confirmChoose"
        @cancel="showDate = false"
      />
    </van-popup>
    <div class="tiemchoose flex-container wbg">
      <div v-if="timeList.length == 0" class="igcolor">暂无数据</div>
        <div style="position: relative;margin-bottom: 20px;" :class="['br3', 'timeitem','noshrink',chooseIndex == index ? 'chooseActive' : '']" @click="chooseTime(index, item)" v-for="(item, index) in timeList" :key="index">
            {{item.time}}
            <div class="mybadage">{{item.remainder}}</div>
        </div>
    </div>
    <div class="g-title mt-10" style="color: #333;padding: 10px 20px;font-weight: bold">
      预约人
    </div>
    <van-field class="rightcell"
      v-model="formData.name"
      required
      @focus="hideButton"
      @blur="showButton"
      label="用户名"
      placeholder="请输入用户名"
    />
    <van-field class="rightcell"
      v-model="formData.mobile"
      required
      @focus="hideButton"
      @blur="showButton"
      label="手机号"
      placeholder="请输入手机号"
    />
    <van-field class="rightcell"
      v-model="formData.id_card"
      required
      @focus="hideButton"
      @blur="showButton"
      label="身份证号码"
      placeholder="请输入身份证号码"
    />
    

    <div class="my-button"  v-if="isShowButton" style="margin: 40px auto;display: block;width: 4.5rem" @click="toCommit">提交申请</div>
  </div>
</template>

<script>
import { commonTime_region, user_orderCreate_order, commonLimit_day } from '@/api/apis'
export default {
  name: 'index',
  components: {
    
  },
  data () {
    return {
      isShowButton: true,
      minDate: new Date((new Date().getTime() + 1000*60*60*24)),
      limitDate: new Date(),
      currentDate: new Date((new Date().getTime() + 1000*60*60*24)),
      DDdata: {},
      showDate: false,
      chooseIndex: 0,
      timeList: [],
      formData: {
        name: localStorage.getItem('uname') || '',
        mobile: localStorage.getItem('umobile') || '',
        id_card: localStorage.getItem('uid_card') || '',
        station_id: '',
        order_type: '1',
        appoint_day: '',
        appoint_time_region: '',
        belong_region: ''
      },
    }
  },
  created () {
    commonLimit_day().then((res)=>{
      this.limitDate = new Date(new Date().getTime() + (this._global.onDayMill * parseInt(res.data.data.forward)))
    })
    if(this.$route.params.id){
      this.DDdata = this.$route.params
      this.formData.station_id = this.$route.params.id
      localStorage.setItem('dd_id', this.$route.params.id)
      localStorage.setItem('dd_data', JSON.stringify(this.$route.params))
      this.getTimeList('first')
    }else{
      this.formData.station_id = localStorage.getItem('dd_id')
      this.DDdata = JSON.parse(localStorage.getItem('dd_data')) || {}
      this.getTimeList('first')
    }
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
    chooseTime(index, item){
      if(!item) return
      this.chooseIndex = index
      this.formData.appoint_time_region = item.time
      this.formData.belong_region = item.region
    },
    getTimeList(isfirst){
      this.timeList = []
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: '加载中...'
      });
      commonTime_region({
        day: this._global.normtime(this.currentDate),
        station_id: this.$route.params.id || localStorage.getItem('dd_id')
      }).then((res)=>{
        this.$toast.clear();
        this._global.dealHttp(res,(res)=>{
          this.timeList = res.data.data
        })
        if(isfirst){
          this.chooseTime(0,res.data.data[0]) 
        }
      })
    },
    confirmChoose(e){
      this.getTimeList()
      this.showDate = false
    },
    toDDlist(){
      this.$router.push({
        name: 'appointmentQueue',
      })
    },
    toDetail(id){
      this.$router.push({
        name: 'appointmentQueueDetail',
        params: {id: id}
      })
    },
    toCommit(){
      
      if(this.submitValid()){
        return
      }
      this.formData.appoint_day = this._global.normtime(this.currentDate)
      user_orderCreate_order(this.formData).then((res)=>{
        this._global.dealHttp(res,(res)=>{
          this._global.toast('success', '预约成功')
          setTimeout(() => {
            this.toDetail(res.data.data)
          }, 1000);
        })
      })
    },
    submitValid(){
      let flag = false
      if(!this.formData.name){
        this._global.toast('fail','请输入用户名')
        flag = true
      }
      if(!this.formData.mobile){
        this._global.toast('fail','请输入电话')
        flag = true
      }
      if(!this.formData.id_card){
        this._global.toast('fail','请输入身份证')
        flag = true
      }
      return flag
    },
  },
  destroyed () {
    localStorage.setItem('uname', this.formData.name)
    localStorage.setItem('umobile', this.formData.mobile)
    localStorage.setItem('uid_card', this.formData.id_card)
    console.log('存储成功')
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
.picfont {
  position: absolute;
  right: 0;
  top: .5rem;
  // font-size: 1rem!important;
}
</style>