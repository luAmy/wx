<template>
    <div class="vat">
        <div class="list clear" v-for="(item, index) in data">
            <div class="text fl">{{item.name}}</div>
            <div class="value fr">{{item.value}}</div>
        </div>
        <div class="btns" v-if="showBtns">
            <router-link class="btn see-city" :to="'/seecity?companyNumber=' + userinfo.companyNum">
                查看同城其他项目公司信息
            </router-link>
            <router-link class="btn see-all" :to="'/seeall'">查看集团全部</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                list: {},
                taxPayerType: {
                    '-1': '',
                    '1': '一般纳税人',
                    '2': '小规模纳税人'
                },
                maxAmtList: {
                    '0': '',
                    '11': '一千元',
                    '12': '一万元',
                    '13': '十万元',
                    '14': '一百万元',
                    '15': '一千万元',
                    '16': '一亿元'
                },
                showBtns: true
            };
        },
        computed: {
            data() {
                var obj = [
                    {
                        'name': '公司名称',
                        'value': this.list.companyName
                    },
                    {
                        'name': '开户行名称',
                        'value': this.list.bankName
                    },
                    {
                        'name': '开户行账号',
                        'value': this.list.bankAccount
                    },
                    {
                        'name': '纳税人识别号',
                        'value': this.list.taxRegistryNo
                    },
                    {
                        'name': '纳税人资质',
                        'value': this.taxPayerType[this.list.taxPayerType]
                    },
                    {
                        'name': '增值税专票最高限额',
                        'value': this.maxAmtList[this.list.maxAmt]
                    },
                    {
                        'name': '联系电话',
                        'value': this.list.tel
                    },
                    {
                        'name': '公司地址',
                        'value': this.list.address
                    }
                ];
                return obj;
            },
            userinfo() {
                var userinfo = window.localStorage.getItem('userinfo');
                if (userinfo) {
                    return JSON.parse(userinfo);
                } else {
                    return '';
                }
            }
        },
        created() {
            var companyNum = '';
            if (this.userinfo) {
                companyNum = this.userinfo.companyNum;
            }
            var companyNumber = this.$route.query.companyNumber || companyNum;
            if (this.$route.query.companyNumber) {
                this.showBtns = false;
            }
            var url = this.HOST + '?method=getLegalPersons&companyNumber=' + companyNumber + '&sessionID=' + this.SESSIONID;
            this.$http.post(url).then(res => {
                this.list = res.data;
            });
        }
    };
</script>

<style lang="less" scoped>
    @import "../css/var.less";

    .vat {
        min-height: 100%;
        position: relative;
        .list {
            .value {
                 overflow: visible;
                 white-space: normal;
            }
        }
        .btns {
            /*position: absolute;*/
            margin-top: 0.8rem;
            width: 90%;
            bottom: 0;
            margin-left: 5%;
            .btn {
                position: static;
                display: block;
                width: 100%;
                &.see-city {
                    margin-bottom: 0.14rem;
                }
            }
        }
    }
</style>
