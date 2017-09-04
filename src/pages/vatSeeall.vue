<template>
    <div class="see-all">
        <search @search="search"></search>
        <div class="main" v-show="isSearch">
            <div class="sec" v-if="history.length > 0">常用公司</div>
            <router-link class="list" v-for="(item, index) in history" :to="'/vat?companyNumber=' + item.number"
                         :key="index">
                {{item.name}}
            </router-link>
            <div class="sec">热门城市</div>
            <div class="card city-card clear">
                <div class="item fl" v-for="(city, index) in hotCitys">
                    <router-link class="city"
                                 :to="'seecity?companyNumber=' + city.id[0] + '&companyNumber=' + (city.id[1] || '') +
                              '&companyNumber=' + (city.id[2] || '')">
                        {{city.name}}
                    </router-link>
                </div>
            </div>
            <div class="card all-main">
                <div class="list home"><img :src="home" alt="home" class="home">万科股份有限公司</div>
                <div class="list area" v-for="(area, index) in allArea.t" :style="{'height': '1.02rem'}"
                     @click="showDroplist($event, area.number, index)">
                    <div class="list-main">
                        <i alt="unfold" class="unfold"
                           :style="{backgroundImage: 'url(' + require('../img/unfold.png') + ')',
                        backgroundSize: 'cover'}"></i>{{area.name}}
                    </div>
                    <transition name="drop">
                        <ul class="drop-list">
                            <li class="list" v-for="(areaCity, index2) in childCitys[index]">
                                <a class="city" :to="'seecity?companyNumber=' + areaCity.number"
                                   @click.stop="gotoDetail(index, areaCity.number)">{{areaCity.name}}
                                </a>
                            </li>
                        </ul>
                    </transition>
                </div>
            </div>
        </div>
        <div class="block" v-show="!isSearch">
            <table class="table-head">
                <tr class="thead">
                    <th width="30%">编码</th>
                    <th>名称</th>
                </tr>
            </table>
            <table class="table-body">
                <tr v-for="(item, index) in companySearch" class="table-list" @click="choose(item)">
                    <td width="30%">{{item.number}}</td>
                    <td>{{item.name}}</td>
                </tr>
            </table>
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
                isSearch: true,
                home: require('../img/home.png'),
                unfold: require('../img/unfold.png'),
                fold: require('../img/fold.png'),
                hotCitys: [
                    {
                        'name': '深圳',
                        'id': ['755DC05', '755WL01']
                    },
                    {
                        'name': '北京',
                        'id': ['010DC02', '010WL01', '010GY']
                    },
                    {
                        'name': '上海',
                        'id': ['021DC01', '021WL01', '021ZX01']
                    },
                    {
                        'name': '广州',
                        'id': ['020DC01', '020WL01']
                    },
                    {
                        'name': '武汉',
                        'id': ['027DC10', '027WL01']
                    },
                    {
                        'name': '成都',
                        'id': ['028DC10', '028WL01']
                    },
                    {
                        'name': '杭州',
                        'id': ['571DC61', '571WL01']
                    },
                    {
                        'name': '郑州',
                        'id': ['371DC05']
                    },
                    {
                        'name': '长沙',
                        'id': ['731DC10', '731WL01']
                    },
                    {
                        'name': '沈阳',
                        'id': ['024DC10', '024WL01']
                    },
                    {
                        'name': '合肥',
                        'id': ['551DC01']
                    },
                    {
                        'name': '福州',
                        'id': ['591DC00']
                    },
                    {
                        'name': '太原',
                        'id': ['351DC20']
                    }
                ],
                allArea: [],
                childCitys: [],
                allCompany: [],
                companySearch: []
            };
        },
        computed: {
            history() {
                var arr = window.localStorage.getItem('historyCity');
                if (arr && arr !== 'undefined') {
                    return JSON.parse(arr);
                } else {
                    return [];
                }
            }
        },
        methods: {
            /* eslint-disable no-array-constructor */
            getAll() {
                var url = this.HOST + '?method=getAreaBaseUnits&sessionID=' + this.SESSIONID;
                this.$http.post(url).then(res => {
                    this.allArea = res.data;
                    this.childCitys = new Array(this.allArea.length);
                });
            },
            search(value) {
                var allCompany = window.localStorage.getItem('allCompany');
                if (allCompany && allCompany !== 'undefined') {
                    this.allCompany = JSON.parse(allCompany);
                } else {
                    var url = this.HOST + '?method=getAllCompanys&sessionID=' + this.SESSIONID;
                    this.$http.post(url).then(res => {
                        this.allCompany = res.data;
                        window.localStorage.setItem('allCompany', JSON.stringify(this.allCompany));
                    });
                }

                var data = this.allCompany.t;
                var arr = [];

                if (value.length > 0) {
                    this.isSearch = false;
                    for (var i in data) {
                        if (data[i].number.indexOf(value) !== -1 ||
                            data[i].name.indexOf(value) !== -1) {
                            arr.push(data[i]);
                        }
                    }
                    this.companySearch = arr;
                } else {
                    this.isSearch = true;
                }
            },
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
            gotoDetail(index, num) {
                var isSpecial = document.querySelectorAll('.area')[index].getAttribute('isSpecial');
                if (isSpecial === '1') {
                    this.$router.push('/vat?companyNumber=' + num);
                } else {
                    this.$router.push('/seecity?cityNumber=' + num);
                }
            },
            showDroplist(ev, number, index) {
                var area = document.querySelectorAll('.area')[index];
                var elm = ev.currentTarget;
                var height = elm.style.height;
                var foldBtn = area.querySelectorAll('.unfold')[0];

                if (height === '1.02rem' || !height) {
                    if (this.childCitys[index]) {
                        elm.style.height = 1.02 * (this.childCitys[index].length + 1) + 'rem';
                        foldBtn.style.backgroundImage = 'url(' + require('../img/fold.png') + ')';
                        return;
                    }
                    var url = this.HOST + '?method=getCityBaseUnits&companyNumber=' + number + '&sessionID=' + this.SESSIONID;
                    this.$http.post(url).then(res => {
//                        this.childCitys[index] = res.data.t;
                        this.$set(this.childCitys, index, res.data.t);

                        elm.style.height = 1.02 * (this.childCitys[index].length + 1) + 'rem';
                        elm.setAttribute('isSpecial', res.data.isSpecial);
                        foldBtn.style.backgroundImage = 'url(' + require('../img/fold.png') + ')';
                    });
                } else {
                    elm.style.height = '1.02rem';
                    foldBtn.style.backgroundImage = 'url(' + require('../img/unfold.png') + ')';
                }
            }
        },
        created() {
            this.getAll();
        }
    };
</script>

<style lang="less" scoped src="../css/table.less"></style>
<style lang="less" scoped>
    @import "../css/var.less";

    .see-all {
        a {
            color: @text-color1;
        }
        .main {
            padding-top: 1rem;
        }
        .city-card {
            padding: .28rem .08rem .08rem .28rem;
            margin-bottom: .2rem;
            .item {
                width: 25%;
                margin-bottom: .2rem;
                .city {
                    display: inline-block;
                    width: 1.5rem;
                    height: .5rem;
                    line-height: .5rem;
                    font-size: .24rem;
                    text-align: center;
                    border: 1px solid #e0e0e0;
                    border-radius: .1rem;
                }
            }
        }
        .all-main {
            .list {
                padding: 0;
                display: block;
                line-height: 1rem;
                .home {
                    width: .4rem;
                    margin: -.06rem .2rem 0 .28rem;
                }
                &.area {
                    height: 1.02rem;
                    overflow: hidden;
                    transition: all .2s;
                    border-bottom: none;
                    .fold, .unfold {
                        display: inline-block;
                        width: .28rem;
                        height: .28rem;
                        vertical-align: middle;
                        margin-top: -.04rem;
                        margin-right: .12rem;
                    }
                    .list-main {
                        padding-left: .86rem;
                        border-bottom: 1px solid #e0e0e0;
                    }
                    .drop-list {
                        li {
                            padding-left: 1.26rem;
                        }
                    }
                }
            }
        }
    }
</style>
