<template>
    <div>
        <div class="step-bar">
            <div class="step active">验证手机号码</div>
            <div class="step">设置新密码</div>
        </div>
        <div class="pad-12">
            <van-cell-group>
                <van-field
                        v-model="phone"
                        center
                        clearable
                        placeholder="请输入手机号码"
                >
<!--                    <van-button slot="button" size="small" type="primary">发送验证码</van-button>-->

                    <van-button slot="button" class="send-button" style="border: none;"><send :mobile="phone" class="send"/></van-button>
                </van-field>

                <van-field v-model="code" placeholder="请输入验证码" />
            </van-cell-group>
            <button class="blue-btn mt-64" @click="next">下一步</button>
        </div>
    </div>
</template>

<script>
    import { Field,Cell,CellGroup,Button } from 'vant';
    import send from '@/components/sendCode';
    export default {
        name: "FindPassword",
        data(){
            return{
                phone:'',
                code:''
            }
        },
        methods:{
            next(){
                if(!this.phone){
                    this.$notify('手机号不能为空');
                    return;
                }
                if(!this.code){
                    this.$notify('短信验证码不能为空');
                    return;
                }
                this.$api.user.verifyPhone({
                    phone:this.phone,
                    code:this.code
                }).then(res=>{
                    if(!res.errCode){
                        this.$router.push('/newPassword');
                    }else{
                        this.$notify(res.message);
                        return;
                    }
                });
            }
        },
        components:{
            send,
            [Field.name]: Field,
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
            [Button.name]: Button,
        }
    }
</script>

<style scoped>
    .step-bar{
        display: flex;
        display: -webkit-flex;
        width: 100%;
        height: 44px;
        line-height: 44px;
        background-color: #fff;
        font-size: 13px;
    }
    .step-bar .step{
        flex: 1;
        -webkit-flex: 1;
        text-align: center;
        background: url("../assets/images/icon/icon-right.png") no-repeat right center/auto 12px;
        color: #878B99;
    }
    .step-bar .step:last-child{
        background: none;
    }
    .step-bar .step.active{
        color: #03081A;
    }
    .van-cell-group{
        border-radius: 5px;
        overflow: hidden;
    }
    .send-button{
        padding: 0;
        height: 31px;
        line-height: 30px;
    }
    .send{

    }

</style>