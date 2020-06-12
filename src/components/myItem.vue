<template>
    <div class="myitem col-normal-padding">
        <div class="leftbox normal-font">
            {{leftDesc}}
        </div>
        <div class="rightbox normal-font" @click="clickItem">
            <slot name="rightcontent"></slot>
            <van-icon class="right-arrow" name="arrow" />
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            rArrow: { // 是否显示右边的按钮
                type: Boolean,
                default: false
            },
            leftDesc: {
                type: String,
                required: true
            }

        },
        data() {
            return {

            }
        },
        mounted() {


        },
        methods: {
            clickItem(){
                
            },
        }
    }
</script>

<style scoped lang="less">
    .myitem {
        text-align: center;
        font-weight: normal;
        height: 38px;
        line-height: 38px;
        border-bottom: 1px solid @normalBorderColor;
        background: #fff;
        position: relative;
    }
    .leftbox{
        float: left;
    }
    .rightbox {
        float: right;
        text-align: right;
        padding-right: 25px;
        color: @ignoreColor!important;
    }
    .right-arrow {
        position: absolute;
        right: 10px;
        top: 5px;
    }
</style>