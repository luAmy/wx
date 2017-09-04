<template>
    <div class="account">
        <div class="lists">
            <div class="list clear">
                <div class="text fl">联系方式</div>
                <input class="value fr" type="text" v-model="cell">
            </div>
            <div class="list clear top">
                <div class="text fl">账号</div>
                <input class="value fr" type="text" v-model="account">
            </div>
            <div class="list clear" @click="$router.push('/selectbank')">
                <div class="text fl">开户行</div>
                <img :src="arrow" alt="arrow" class="arrow-r fr">
                <span class="fr bank">{{decodeURI(bank)}}</span>
            </div>
            <!--<div class="list clear">-->
                <!--<div class="text fl">银行</div>-->
                <!--<img :src="arrow" alt="arrow" class="arrow-r fr">-->
                <!--<picker v-if="data" :data="pickerArr" :type="pickType" :choose="bankName" :pickName="'bankName'"-->
                        <!--:pickIdName="'bankTypeId'" :chooseId="branchId" ref="picker"-->
                        <!--@confirm="confirm">-->
                <!--</picker>-->
            <!--</div>-->
            <!--<div class="list clear">-->
                <!--<div class="text fl">分行</div>-->
                <!--<img :src="arrow" alt="arrow" class="arrow-r fr">-->
                <!--<span class="fr">{{branchName}}</span>-->
            <!--</div>-->
        </div>
        <div class="bottom-note">
            1、开户银行选择至对应的分行即可，输入城市关键字查找 <br>
            2、不支持信用卡账户
        </div>
        <div class="btn" @click="save">保存</div>
    </div>
</template>

<script>
    import { MessageBox, Toast, Indicator } from 'mint-ui';
    import Picker from '../components/picker.vue';

    export default {
        components: {
            MessageBox,
            Toast,
            Indicator,
            Picker
        },
        data() {
            return {
                arrow: require('../img/arrow-right.png'),
                saved: false,
                arr: ['personID', 'bank', 'account', 'cell'],
                data: '',
                personID: '',
                bank: '',
                account: '',
                cell: '',
                branch: '',
                branchId: '',
                pickerArr: '',
                pickType: '',
                banklist: [],
                bankIsChinese: false
            };
        },
        methods: {
            loadData() {
                var bankName = window.sessionStorage.getItem('bankName');
                var url = this.HOST + '?method=getPayAccounts&userNum=' + this.USERNUM + '&sessionID=' + this.SESSIONID;
                this.$http.post(url).then(res => {
                    for (let i in this.arr) {
                        var attr = this.arr[i];
                        this.data = res.data;
                        this[attr] = res.data[attr];
                    }
                    if (bankName) {
                        this.bank = bankName;
                    }
                });
            },
            confirm(type) {

            },
            ifChinese(str) {
                var myReg = /.*[\u4e00-\u9fa5]+.*$/;
                if (myReg.test(str)) {
                    this.bankIsChinese = true;
                } else {
                    this.bankIsChinese = false;
                }
            },
            save() {
                var bank = this.bank;

                // 要不要转码
//                this.ifChinese(bank);
//                if (this.bankIsChinese) {
//                    bank = encodeURI(bank);
//                }

                var url = this.HOST + '?method=updatePayAccounts&personID=' + this.data.personID + '&cell=' + this.cell +
                    '&bank=' + bank + '&account=' + this.account + '&sessionID=' + this.SESSIONID;

                this.$http.post(url).then(res => {
                    Toast({
                        message: '修改成功',
                        position: 'middle',
                        duration: 2000
                    });
                });
                this.saved = true;
            }
        },
        created() {
            this.loadData();
        },
        beforeRouteLeave (to, from, next) {
            if (!this.saved) {
                for (let i in this.arr) {
                    var attr = this.arr[i];
                    if (this[attr] !== this.data[attr] && to.path === '/') {
                        MessageBox({
                            message: '修改未保存，是否确定离开此页?',
                            showCancelButton: true
                        }).then(action => {
                            if (action === 'confirm') {
                                next();
                            }
                        });
                        next(false);
                        return;
                    }
                }
            }
            next();
        }
    };
</script>

<style lang="less" scoped>
    @import "../css/var.less";

    .account {
        .lists {
            padding-top: .2rem;
            .list {
                display: block;
                border-bottom: 1px solid #e0e0e0;
                .text {
                    color: @text-color1;
                }
                &.top {
                    margin-top: .2rem;
                }
                &:first-child, &:last-child {
                    border-bottom: none;
                }
                input {
                    width: 70%;
                    height: 100%;
                    padding: 0;
                    text-align: right;
                }
                .arrow-r {
                    margin-top: .04rem;
                }
                .bank {
                    max-width:80%;
                    text-align: right;
                }
            }
        }
    }
</style>
