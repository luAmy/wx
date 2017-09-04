<template>
    <div>
        <div class="block" v-for="(item, index) in list">
            <div class="sec">
                {{item.secTitle}}
            </div>
            <div class="card-main tx-c clear of-hide">
                <a class="item fl" v-for="(bill, index2) in item.data" @click="goToDetail(bill.name, bill.img)"
                   :class="{border:index2<4 && item.data.length>4}">
                    <div class="img">
                        <img :src="bill.img" class="icon" :class="bill.type" :alt="bill.name">
                    </div>
                    <p class="text">{{bill.name}}</p>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                list: [
                    {
                        secTitle: '申请类单据',
                        data: [
                            {
                                name: '费用申请单',
                                img: require('../img/feiyongshenqing.png')
                            },
                            {
                                name: '电脑申请单',
                                img: require('../img/diannaoshenqing.png')
                            },
                            {
                                name: '出差申请单',
                                img: require('../img/chuchaishenqing.png')
                            },
                            {
                                name: '事项申请单',
                                img: require('../img/shixiangshenqing.png')
                            }
                        ]
                    },
                    {
                        secTitle: '报销类单据',
                        data: [
                            {
                                name: '通讯费报销单',
                                img: require('../img/tongxunfeibaoxiao.png')
                            },
                            {
                                name: '车辆费报销单',
                                img: require('../img/cheliangfeibaoxiao.png')
                            },
                            {
                                name: '交通费报销单',
                                img: require('../img/jiaotongfeibaoxiao.png')
                            },
                            {
                                name: '电脑报销单',
                                img: require('../img/diannaobaoxiao.png')
                            },
                            {
                                name: '差旅报销单',
                                img: require('../img/chailvbaoxiao.png')
                            },
                            {
                                name: '其他费用报销单',
                                img: require('../img/feiyongbaoxiao.png')
                            }
                        ]
                    },
                    {
                        secTitle: '借/还款类单据',
                        data: [
                            {
                                name: '借款单',
                                img: require('../img/jiekuan.png')
                            },
                            {
                                name: '还款单',
                                img: require('../img/huankuan.png')
                            }
                        ]
                    },
                    {
                        secTitle: '合同/无合同付款类单据',
                        data: [
                            {
                                name: '合同付款单',
                                img: require('../img/hetongfukuan.png')
                            },
                            {
                                name: '无合同付款单',
                                img: require('../img/wuhetongfukuan.png')
                            }
                        ]
                    },
                    {
                        secTitle: '合同类单据',
                        data: [
                            {
                                name: '合同',
                                img: require('../img/hetong.png')
                            },
                            {
                                name: '合同结算',
                                img: require('../img/hetongjiesuan.png')
                            }
                        ]
                    }
                ]
            };
        },
        methods: {
            goToDetail(name, src) {
                window.localStorage.setItem('billname', name);
                window.localStorage.setItem('billicon', src);

                this.$router.push('./singleList');
            }
        }
    };
</script>

<style lang="less" scoped>
    .item {
        border-bottom: none;
        &.border {
            border-bottom: 1px solid #e0e0e0;
        }
    }
</style>
