<template>
    <div class="baoxiao bill quota">
        <div class="card box" @click="goToDetail(name)">
            <div class="left">
                <img :src="icon" class="icon">
            </div>
            <div class="main box-f1">
                <div class="upper clear">
                    <div class="title fl">部门活动费用</div>
                    <div class="date fr">2017-05-02</div>
                </div>
                <div class="mid">
                    <div class="type">金额：¥400.00</div>
                </div>
                <div class="lower clear">
                    <div class="subtitle fl">占用额度：¥400.00</div>
                    <div class="status default fr">已付款</div>
                </div>
            </div>
        </div>
        <div class="card box" @click="goToDetail(name)">
            <div class="left">
                <img :src="icon" class="icon">
            </div>
            <div class="main box-f1">
                <div class="upper clear">
                    <div class="title fl">部门活动费用</div>
                    <div class="date fr">2017-05-01</div>
                </div>
                <div class="mid">
                    <div class="type">金额：¥400.00</div>
                </div>
                <div class="lower clear">
                    <div class="subtitle fl">占用额度：0</div>
                    <div class="status default fail fr">已废弃</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                name: '车辆费报销单',
                icon: require('../img/cheliangfeibaoxiao.png')
            };
        },
        methods: {
            goToDetail(name) {
                window.localStorage.setItem('billname', name);
                if (name === '出差申请单') {
                    this.$router.push('/travelbilldetail');
                } else {
                    this.$router.push('/billdetail');
                }
            }
        }
    };
</script>

<style lang="less" scoped src="../css/bill.less"></style>
<style lang="less" scoped>
    .quota {
        padding: .28rem;
    }
</style>
