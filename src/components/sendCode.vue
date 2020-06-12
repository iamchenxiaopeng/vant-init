<style scoped>
    @import "../assets/css/tncode.css";
</style>
<template>
    <div style="display: inline-block">
<!--        <van-field label="手机号码" :value="from.mobile" :placeholder="explain" @input="handleInput" required>-->
            <van-button id="send" @click="unify" slot="button" size="small" :class="{'blue-small-btn':totalTime==0,'gray-small-btn':totalTime>0}">
                {{content}}
            </van-button>
<!--        </van-field>-->
    </div>
</template>
<script>
    /**
     * 发验证码
     * @mobile ★必须★ 手机号 用v-model绑定传参
     * @url string 接口地址 【默认‘/njwap/login/send’】
     * @behaviorVerify bool 是否使用图形验证 【默认:true】
     * @explain string  input框占位符
     */
    import { Field,Cell,CellGroup,Button } from 'vant';
    import '@/plugins/geetest/gt.js';
    import axios from 'axios';
    export default {
        props:{
            mobile:String,//手机号 用v-model绑定
            url:{//接口地址
                type:String,
                default:'/njreceipt/login/send'
            },
            behaviorVerify:{//是否使用图形验证 —— 布尔类型:true || false
                type:Boolean,
                default:true
            },
            explain:{
                type:String,
                default:'请输入手机号'
            }
        },
        data(){
            return {
                from:{
                    phone:this.mobile
                },
                code:'',
                content: '发送验证码',
                totalTime: 0,
                canClick: true,
                clas:'small-btn',
                verifyUrl:'/common/geetest/get'
            }
        },
        mounted(){
            if(this.$route.query.mobile){
                this.from.phone = this.$route.query.mobile;
            }
            if(this.behaviorVerify === true) {
                //初始化图形验证码
                this.readyGeetest();
            }
        },
        methods:{
            unify(){
                console.log(this.mobile);
                if(this.behaviorVerify === true) return;
                if(this.verifyPhone() === false) return;
                this.send();
            },
            send(){
                if (!this.canClick) return false;
                console.log(this.from);
                this.$toast.loading({mask:true,duration:0, message: '发送信息中...'});
                this.$api.user.send(
                    this.url,
                    this.from
                    ).then(res=>{
                    this.$toast.clear();
                    if(!res.errCode){
                        this.canClick = false;
                        this.totalTime = 60;
                        this.content = this.totalTime + 's后重新发送';
                        let clock = window.setInterval(() => {
                            this.totalTime--;
                            this.content = this.totalTime + 's后重新发送';
                            if (this.totalTime < 0) {
                                window.clearInterval(clock);
                                this.content = '发送验证码';
                                this.totalTime = 0;
                                this.canClick = true;
                                this.clas = 'lose-btn';
                            }
                        },1000);
                    }else{
                        this.$notify(res.message);
                        return false;
                    }
                });
            },
            readyGeetest(){
                //this.$toast.loading({mask:true,duration:0, message: '加载中...'});
                this.verify(initTncode());
                /*
                axios.post(this.verifyUrl).then(res=>{
                    let msg = res.data;
                    if(!msg.errCode){
                        let data = {
                            gt: msg.gt,
                            challenge: msg.challenge,
                            new_captcha: msg.new_captcha,
                            product: "bind",
                            offline: !msg.success // 表示用户后台检测极验服务器是否宕机，一般不需要关注
                        };
                        initGeetest(data,this.verify);
                    }else{
                        this.$toast.clear();
                        this.$notify(msg.message);
                    }
                }).catch(err=>{
                    this.$toast.clear();
                    this.$notify(err.response.status);
                });
                 */
            },
            verify(obj){
                let _this = this;
                this.$toast.clear();
                obj.onReady(function(){
                    console.log('验证码加载完成')
                    let send = document.getElementById('send');
                    send.addEventListener('click',()=>{
                        if (_this.canClick){
                            if(_this.verifyPhone() === false) return;
                            obj.verify();
                        }
                    }, false);
                }).onSuccess(function(){
                    console.log('验证通过')
                    let result = obj.getValidate();
                    _this.from.geetest_challenge = result.geetest_challenge;
                    _this.from.geetest_seccode = result.geetest_seccode;
                    _this.from.geetest_validate = result.geetest_validate;
                    _this.send();
                }).onError(function(){
                    _this.$notify({ type: 'warning', message: '验证码失败'});
                }).onClose(function () {
                    // _this.$notify({ type: 'warning', message: '验证码关闭'});
                });
            },
            verifyPhone(){
                console.log(this.mobile);
                this.from.phone = this.mobile;
                if(!this.from.phone){
                    this.$notify('手机号不能为空');
                    return false;
                }
                if(!(/^1[3456789]\d{9}$/.test(this.from.phone))){
                    this.$notify('手机号格式错误');
                    return false;
                }
            },
            handleInput(value) {
                this.from.phone = value;
                this.$emit('input', value);
            }
        },
        components:{
            [Field.name]: Field,
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
            [Button.name]: Button,
        }
    }
</script>

<style scoped>

</style>