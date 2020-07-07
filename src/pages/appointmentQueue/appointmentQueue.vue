<template>
  <div class="nbg">
    <van-nav-bar class="mb-5"
      :title="pageTitle"
      right-text="排队记录"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <!-- <van-list style="height: 100%;overflow: hidden"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="loadMore"
    >
      <div class="content-list wbg" @click="toDetail(item)" v-for="(item, index) in DDlist" :key="index">
        <div class="title-font mb-10">{{item.name}}</div>
        <div class="normal-font mb-10">
          <van-icon name="location-o" class="mr-5" />电话：{{item.mobile}}
        </div>
        <div class="normal-font mb-10">
          <van-icon name="phone-o" class="mr-5" />地址：{{item.address}}
        </div>
      </div>
    </van-list> -->
    <van-dialog style="max-height: 80%;overflow: scroll" :showCancelButton="false" :confirmButtonText="'我已知晓'" v-model="showNotice" title="活动规则" show-cancel-button>
        <div style="overflow: scroll;height: 300px;padding: 10px;padding-top: 10px" :lockScroll="false">
            <p class="textleft" style="font-size: 14px;margin-top: 5px">1、办事人员在万州交巡警微信公众号选择办事大队，选择预约日期及时段，预约人信息（姓名、手机号、身份证号）。;</p>
            <p class="textleft" style="font-size: 14px;margin-top: 5px">2、预约取号仅限预约人本人办事使用，他人不能使用。-2020年7月3日;</p>
            <p class="textleft" style="font-size: 14px;margin-top: 5px">3、每人每天同一窗口业务只能预约一个号，但可以取消预约后重新预约，重新预约不能超过5次。</p>
            <p class="textleft" style="font-size: 14px;margin-top: 5px">4、每月5 次爽约将被记入黑名单（平台页面有取消选项，可以提前取消），将暂停一个月预约服务。</p>
            <p class="textleft" style="font-size: 14px;margin-top: 5px">5、预约人需提前预约时段5分钟至预约办理点，等待叫号系统呼叫后进行业务办理，过号无效，再次排队需重新取号。</p>
        </div>
    </van-dialog>
    <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
  <div class="content-list wbg" @click="toDetail(item)" v-for="(item, index) in DDlist" :key="index">
        <div class="title-font mb-10">{{item.name}}</div>
        <div class="normal-font mb-10">
          <van-icon name="location-o" class="mr-5" />电话：{{item.mobile}}
        </div>
        <div class="normal-font mb-10">
          <van-icon name="phone-o" class="mr-5" />地址：{{item.address}}
        </div>
      </div>
</van-list>
    <!-- <van-overlay :show="showNotice">
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
    </van-overlay> -->
  </div>
</template>

<script>
import pageHeader from '@/components/pageHeader'
import { commonAll_police_station } from '@/api/apis'
export default {
  name: 'index',
  components: {
    pageHeader
  },
  data () {
    return {
      pageTitle: '违法处理预约排队系统',
      DDlist: [],
      showNotice: true,
      list: [],
      loading: false,
      finished: false,
      targetPage: 1
    }
  },
  created () {
    this.getData()
  },
  
  methods: {
    getData(){
      commonAll_police_station({type: 'appoint'}).then((res)=>{
        console.log(res)
        this._global.dealHttp(res,(res)=>{
          this.DDlist = res.data.data
        })
      })
    },
    toDetail(params){
      this.$router.push({
        name: 'appointmentQueueitem',
        params: params
      })
    },
    onClickLeft(){

    },
    onClickRight(){
      this.$router.push({
        name: 'queueRecord',
        params: ''
      })
    },
    onLoad() {
      this.targetPage = this.targetPage + 1
      console.log('到底了')
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
  }
}
</script>

<style scoped lang="less">
.content-list {
  padding: 10px 10px 0;
  border-bottom: 1px solid #F2F2F2;
}
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
</style>