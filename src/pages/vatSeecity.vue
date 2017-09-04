<template>
    <div class="see-all">
        <search @search="search"></search>
        <table class="table-head">
            <tr class="thead">
                <th width="30%">编码</th>
                <th>名称</th>
            </tr>
        </table>
        <table class="table-body">
            <tr v-for="(item, index) in data" class="table-list" @click="choose(item)">
                <td width="30%">{{item.number}}</td>
                <td>{{item.name}}</td>
            </tr>
        </table>
        <empty :flag="dataEmpty"></empty>
    </div>
</template>

<script>
    import search from '../components/search.vue';
    import axios from 'axios';
    import empty from '../components/empty.vue';

    export default {
        components: {
            search,
            empty
        },
        data() {
            return {
                data: [],
                citys: [],
                dataEmpty: false
            };
        },
        methods: {
            choose(item) {
                // 转回列表页，带上id
                var arr = window.localStorage.getItem('historyCity') || [];
                var arrItem = {
                    name: item.name,
                    number: item.number
                };

                if (arr && arr !== 'undefined' && typeof arr !== 'object') {
                    arr = JSON.parse(arr);
                }
                arr.push(arrItem);
                if (arr.length > 5) {
                    arr.splice(0, 1);
                }

                window.localStorage.setItem('historyCity', JSON.stringify(arr));
                this.$router.push('/vat?companyNumber=' + item.number);
            },
            getIds(query) {
                var arr = [];
                for (var i = 0; i < query.length; i++) {
                    if (query[i]) {
                        var url = this.HOST + '?method=getProjectBaseUnits&companyNumber=' + query[i] + '&sessionID=' + this.SESSIONID;
                        arr.push(axios.get(url));
                        console.log(query[i]);
                    }
                }
                return arr;
            },
            search(value) {
                var arr = [];
                var data = {};
                var citys = window.sessionStorage.getItem('citys');

                if (citys && citys !== 'undefined') {
                    data = JSON.parse(citys);
                } else {
                    data = this.data;
                }
                if (value.length > 0) {
                    for (var i in data) {
                        if (data[i].number.indexOf(value) !== -1 ||
                            data[i].name.indexOf(value) !== -1) {
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
            var self = this;
            var cityNumber = this.$route.query.cityNumber;
            var companyNumber = this.$route.query.companyNumber;

            if (companyNumber && typeof companyNumber !== 'string') {
                axios.all(this.getIds(companyNumber))
                    .then(axios.spread(function (data1, data2, data3) {
                        var arr1 = data1.data.t;
                        var arr2 = [];
                        var arr3 = [];

                        if (data2) {
                            arr2 = data2.data.t;
                        }
                        if (data3) {
                            arr3 = data3.data.t;
                        }
                        var arr = arr1.concat(arr2, arr3);
                        self.data = arr;
                        window.sessionStorage.setItem('citys', JSON.stringify(self.data));

                        if (!this.data) {
                            this.dataEmpty = true;
                        }
                        console.log(arr);
//                        self.list = quickSort(self.list, 'billDate', 'FBILLDATE', false);
                    }));
                return;
            }
            var url = '';
            if (cityNumber) {
                url = this.HOST + '?method=getProjectBaseUnits&cityNumber=' + cityNumber + '&sessionID=' + this.SESSIONID;
            } else {
                url = this.HOST + '?method=getProjectBaseUnits&companyNumber=' + companyNumber + '&sessionID=' + this.SESSIONID;
            }

            this.$http.post(url).then(res => {
                this.data = res.data.t;
                window.sessionStorage.setItem('citys', JSON.stringify(this.data));
                if (!this.data) {
                    this.dataEmpty = true;
                }
            });
        }
    };
</script>

<style lang="less" scoped src="../css/table.less"></style>
