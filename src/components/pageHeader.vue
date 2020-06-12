<template>
    <div>
        <h2 class="page-header">
            <van-icon class="left-arrow" name="arrow-left" />
            <span>{{title}}</span>
            <slot name="headerbutton"></slot>
        </h2>
    </div>
</template>
<script>
    export default {
        props: {
            backButton: { // 是否显示返回按钮
                type: Boolean,
                default: false
            },
            title: {
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

        }
    }
</script>

<style scoped>
    .page-header {
        text-align: center;
        font-weight: normal;
        height: 38px;
        line-height: 38px;
        border-bottom: 2px solid #F2F2F2;
    }
    .left-arrow {
        float: left;
        margin-left: .5rem;
        margin-top: 5px;
    }
</style>