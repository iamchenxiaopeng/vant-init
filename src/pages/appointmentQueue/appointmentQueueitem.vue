<template>
  <div class="nbg">
    <div class="content-list wbg normal-padding" style="position: relative;" @click="toDDlist">
      <p style="border-bottom: 1px solid #aaa;color: #333;padding: 10px 0">预约信息</p>
      <div class="title-font mb-10 mt-10">{{DDdata.name}}</div>
      <div class="normal-font mb-10">
        <van-icon name="location-o" class="mr-5" />电话：{{DDdata.mobile}}
      </div>
      <div class="normal-font">
        <van-icon name="phone-o" class="mr-5" />地址：{{DDdata.address}}
      </div>
      <van-icon class="picfont" name="arrow" />
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
      <div v-if="timeList.length == 0" class="igcolor">暂无数据</div>
        <div style="position: relative;margin-bottom: 20px;" :class="['br3', 'timeitem','noshrink',chooseIndex == index ? 'chooseActive' : '']" @click="chooseTime(index, item)" v-for="(item, index) in timeList" :key="index">
            {{item.time}}
            <div class="mybadage">{{item.remainder}}</div>
        </div>
    </div>
    <div class="g-title mt-10" style="background: #fff;margin-bottom: 1px;padding: 10px 20px">
      预约人
    </div>
    <van-field class="rightcell"
      v-model="formData.name"
      required
      label="用户名"
      placeholder="请输入用户名"
    />
    <van-field class="rightcell"
      v-model="formData.mobile"
      label="手机号"
      placeholder="请输入手机号"
    />
    <van-field class="rightcell"
      v-model="formData.id_card"
      label="身份证号码"
      placeholder="请输入身份证号码"
    />
    

    <div class="my-button" style="margin: 40px auto;display: block;width: 4.5rem" @click="toCommit">提交申请</div>
  </div>
</template>

<script>
import { commonTime_region, user_orderCreate_order } from '@/api/apis'
export default {
  name: 'index',
  components: {
    
  },
  data () {
    return {
      currentDate: new Date((new Date().getTime() + 1000*60*60*24)),
      DDdata: {},
      showDate: false,
      chooseIndex: 0,
      timeList: [],
      formData: {
        name: '',
        mobile: '',
        id_card: '',
        station_id: '',
        order_type: '1',
        appoint_day: '',
        appoint_time_region: '',
        belong_region: ''
      },
    }
  },
  created () {
    if(this.$route.params.id){
      this.DDdata = this.$route.params
      this.formData.station_id = this.$route.params.id
      this.getTimeList('first')
    }
  },
  
  methods: {
    chooseTime(index, item){
      console.log(index, item)
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
        station_id: this.$route.params.id
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
      console.log(e,this.currentDate)
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
      return flag
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
  right: 20px;
  top: 100px;
  font-size: 1rem!important;
  color: #999
}
</style>