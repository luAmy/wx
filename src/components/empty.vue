<template>
    <div class="empty" v-if="flag">
        <img :src="empty" alt="">
        暂无相关记录
        <!--<a class="back" @click="$router.go(-1)">返 回</a>-->
    </div>
</template>

<script>
    export default {
        props: ['flag'],
        data() {
            return {
                empty: require('../img/empty.png')
            };
        }
    };
</script>

<style lang="less" scoped>
    @import "../css/var.less";

    .empty {
        padding-top: .2rem;
        color: @text-color3;
        text-align: center;
        font-size: .24rem;
        img {
            display: block;
            width: 3rem;
            margin: .5rem auto .6rem;
        }
        a {
            display: block;
            width: 2rem;
            height: .9rem;
            line-height: .9rem;
            margin: .4rem auto;
            background-color: @theme-color;
            color: #fff;
        }
    }
</style>
