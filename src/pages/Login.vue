<template>
    <div>
        <div><img class="logo-banner" src="../assets/images/logo-banner.png"></div>
        <div class="logo-main">
            <div class="login-cell">
                <i class="icon-user"></i>
                <input v-model="from.mobile" class="input" type="text" placeholder="用户名/手机号码登录">
            </div>
            <div class="login-cell mt-24">
                <i class="icon-lock"></i>
                <input v-model="from.password" class="input" type="password" placeholder="请输入密码">
                <!--<span class="input-right" @click="forget">忘记密码</span>-->
            </div>
            <button class="blue-btn" @click="login">登录</button>
            <div class="mt-15">
                <label class="login-checkbox"><input v-model="login_status" type="checkbox"><i></i><span>保持登录</span></label>
<!--                <label class="login-checkbox fr"><input v-model="save_password" type="checkbox"><i></i><span>记住密码</span></label>-->
            </div>
        </div>
    </div>
</template>

<script>
    import { Field,CellGroup,Row,Col,Checkbox, CheckboxGroup } from 'vant';
    export default {
        data() {
            return {
                from:{
                    mobile:'',//用户名
                    password:'',//密码
                    keeping:1, //是否保持登录：0否，1是
                },
                login_status:false,
                save_password:false,
                storage:'_nj_receipt_wap_'
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            init(){
                let info = this.getInfo();
                if(info){
                    if(info.login_status === true) this.login_status = info.login_status;
                    if(info.save_password === true) {
                        this.from.password = info.password;
                        this.from.mobile = info.name;
                        this.save_password = true;
                    }
                }
            },
            login(){
                this.$toast.loading({mask:true,duration:0, message: '登陆中...'});
                let login_status = 1;
                if(this.login_status === true) login_status = 1;
                this.from.keeping = login_status;
                this.$api.user.login(
                    this.from
                ).then(res=>{
                    this.$toast.clear();
                    if(!res.errCode){
                        this.setInfo({
                            mobile:this.from.mobile,
                            password:this.from.password,
                            login_status:this.login_status,
                            save_password:this.save_password
                        });
                        let path = '/order/list';
                        this.$router.push(path);
                    }else{
                        this.$notify(res.message);
                        return;
                    }
                });
            },
            setInfo(data){
                localStorage.setItem(this.storage, JSON.stringify(data));
            },
            getInfo(){
                return JSON.parse(localStorage.getItem(this.storage));
            },
            forget(){

                this.$router.push('/findPassword');
            },
        },
        components: {
            [Field.name]: Field,
            [CellGroup.name]: CellGroup,
            [Row.name]: Row,
            [Col.name]: Col,
            [Checkbox.name]: Checkbox,
            [CheckboxGroup.name]: CheckboxGroup,
        }
    }
</script>
<style scoped>
    .logo-main{
        margin: 32px 24px;
    }
    .logo-banner{
        width: 100%;
    }
    .login-cell{
        position: relative;
        padding: 10px 0 10px 44px;
        display: flex;
        display: -webkit-flex;
        background-color: #fff;
        padding-right: 10px;
        border-radius: 3px;
    }
    .login-cell .icon-user,.login-cell .icon-lock{
        position: absolute;
        left: 0;
        top: 0;
        display: inline-block;
        width: 44px;
        height: 44px;
        font-size: 14px;
    }
    .login-cell .icon-user{
        background: url("../assets/images/icon/icon-user.png") no-repeat center/16px;
    }
    .login-cell .icon-lock{
        background: url("../assets/images/icon/icon-lock.png") no-repeat center/16px;
    }
    .login-cell .input{
        flex: 1;
        height: 30px;
        line-height: 30px;
        border: none;
        font-size: 14px;
    }
    .input-right{
        line-height: 30px;
        font-size: 12px;
        color: #878B99;
    }
    .error-tips{
        position: absolute;
        left: 44px;
        top: 46px;
        height: 20px;
        line-height: 20px;
        color: #D0021B;
        font-size: 11px;
    }
    .login-checkbox{
        font-size: 12px;
        color: #878B99;
    }
    .login-checkbox i{
        display: inline-block;
        width: 14px;
        height: 14px;
        margin-right: 5px;
        vertical-align: -2px;
        background: url("../assets/images/icon/icon-border.png") no-repeat center/100% 100%;
    }
    .login-checkbox input:checked+i{
        border: none;
        background: url("../assets/images/icon/icon-gou.png") no-repeat center/100% 100%;
    }
    .login-checkbox input:checked+i+span{
        color: #004BAF;
    }
    .login-checkbox input{
        width: 0;
        height: 0;
        opacity: 0;
    }
    .blue-btn{
        margin-top: 44px;
    }
    .footer{
        position: absolute;
        left: 0;
        right: 0;
        bottom: 20px;
        text-align: center;
        font-size: 12px;
        color: #878B99;
    }
</style>