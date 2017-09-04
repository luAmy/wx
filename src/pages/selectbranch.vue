<template>
    <div class="selectbank">
        <search @search="search"></search>
        <div class="block">
            <div class="list" v-for="(item, index) in data" @click="select(item.bankName)">
                {{item.bankName}}
            </div>
        </div>
    </div>
</template>

<script>
    import search from '../components/search.vue';

    export default {
        components: {
            search
        },
        data() {
            return {
                data: []
            };
        },
        methods: {
            getBank() {
                var bankTypeId = this.$route.query.bankTypeId;
                var url = this.HOST + '?method=getleafBank&bankTypeId=' + bankTypeId + '&sessionID=' + this.SESSIONID;

                this.$http.post(url).then(res => {
                    this.data = res.data.t;
                    window.localStorage.setItem('branches', JSON.stringify(this.data));
                });
            },
            select(bankName) {
                window.sessionStorage.setItem('bankName', bankName);
                this.$router.replace('/bxaccount');
                window.history.go(-1);
            },
            search(value) {
                var arr = [];
                var branches = window.localStorage.getItem('branches');
                var data = {};
                if (branches && branches !== 'undefined') {
                    data = JSON.parse(branches);
                } else {
                    data = this.data;
                }
                if (value.length > 0) {
                    for (var i in data) {
                        if (data[i].bankName.indexOf(value) !== -1) {
                            arr.push(data[i]);
                        }
                    }
                    this.data = arr;
                } else {
                    this.data = data;
                }
            }
        },
        created() {
            this.getBank();
        }
    };
</script>

<style lang="less" scoped>
    @import "../css/var.less";
    .block {
        padding-top: 1rem;
    }
</style>
