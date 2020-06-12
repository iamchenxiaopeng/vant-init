<template>
    <div>
        <div class="step-bar">
            <div class="step">验证手机号码</div>
            <div class="step active">设置新密码</div>
        </div>
        <div class="pad-12">
            <van-cell-group>
                <van-field type="password" maxlength="20" v-model="from.password" placeholder="请设置6-20位不为纯数字的登录密码" />
                <van-field type="password" maxlength="20" v-model="from.password_again" placeholder="请再次输入新的登录密码"/>
            </van-cell-group>
            <button @click="finish" class="blue-btn">完成</button>
        </div>
    </div>
</template>

<script>
    import { Field,CellGroup,Button } from 'vant';
    export default {
        name: "FindPassword",
        data(){
            return{
                from:{
                    password:'',//密码
                    password_again:'' //再次确认密码
                }
            }
        },
        methods:{
            finish(){
                if(this.from.password.length<6){
                    this.$notify({ message: '请输入6-20位新的登录密码'});
                    return;
                }

                let _this = this;
                this.$api.user.setPassword(
                    this.from
                ).then(res=>{
                    if(!res.errCode){
                        this.$notify({
                            type: 'success',
                            message: '设置新密码成功',
                            onClose:function () {
                                _this.$router.push('/');
                            }
                        });

                    }else{
                        this.$notify(res.message);
                        return;
                    }
                });
            }
        },
        components:{
            [Field.name]: Field,
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
    .blue-btn{
        margin-top: 64px;
    }
    .van-cell-group{
        border-radius: 5px;
        overflow: hidden;
    }
</style>