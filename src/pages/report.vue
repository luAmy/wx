<template>
    <div class='report'>
        <div class='sec clear'>问题描述
            <router-link class='fr' :to="'/bughistory'">历史报障进度查询
                <img :src='arrow' alt='' class='arrow'>
            </router-link>
        </div>
        <div class='content'>
            <textarea id='content' placeholder='请描述您的问题' v-model='content' maxlength='140'></textarea>
            <span class='counter'>{{content.length}}/140</span>
        </div>
        <div class='sec'>上传图片（选填）</div>
        <div class='card'>
            <label for='upload'>
                <img :src='uploadImg' alt='' class='uploadimg fl'>
                <div class="fl imgs" v-for='(item, index) in images' :a="index">
                    <img @click.prevent :style="{backgroundImage: 'url(' + item + ')',
                    backgroundSize:'cover',backgroundRepeat: 'no-repeat'}" class='photo-item'/>
                    <i class="delete" @click.prevent="deleteImg(index)" :style="{backgroundImage: 'url(' + require('../img/delete.png') + ')'}"></i>
                </div>
                <canvas class='cans'></canvas>
                <input @change='getFile($event)' type='file' capture='camera' accept='image/*' id='upload' name='upload'
                       v-if='isAndroid'/>
                <input @change='getFile($event)' type='file' :id="'upload'" name='upload' v-else/>
            </label>
        </div>
        <!--<img :src="item" alt="" v-for="item in compressImages">-->
        <div class='btn' :class='{disabled: content.length==0}' @click='confirm'>确定</div>
    </div>
</template>

<script>
    import { Indicator, Toast } from 'mint-ui';
    import axios from 'axios';

    export default {
        data() {
            return {
                arrow: require('../img/arrow-blue-large.png'),
                uploadImg: require('../img/uploadimg.png'),
                content: '',
                photoNames: [],
                images: [],
                compressImages: []
            };
        },
        computed: {
            isiOS() {
                var u = navigator.userAgent;
                var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
                return isiOS;
            },
            isAndroid() {
                var u = navigator.userAgent;
                var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; // android终端
                return isAndroid;
            }
        },
        methods: {
            deleteImg (index) {
                this.images.splice(index, 1);
                this.photoNames.splice(index, 1);
            },
            getFile (event) {
                var docObj = event.currentTarget;

                if (docObj.files && docObj.files[0]) {
                    this.images.push(window.URL.createObjectURL(docObj.files[0]));
                    this.photoNames.push(docObj.files[0].name);
                }
                return true;
            },
            compress() {
                var arr = [];
                for (var i = 0; i < this.images.length; i++) {
                    var thisImg = new Image();
                    thisImg.src = this.images[i];

                    var width = thisImg.width;
                    var height = thisImg.height;
                    var scale = width / height;

                    var width1 = document.documentElement.clientWidth;
                    var height1 = parseInt(width1 / scale);
                    var canvas = document.querySelectorAll('.cans');

                    canvas[0].width = width1;
                    canvas[0].height = height1;
                    var ctx = canvas[0].getContext('2d');
                    ctx.drawImage(thisImg, 0, 0, width, height, 0, 0, width1, height1);

                    var cropStr = canvas[0].toDataURL('image/jpeg', 0.5);
                    // console.log(cropStr.substring(23));
                    arr.push(cropStr.substring(23)); // 去掉格式头
                }
                this.compressImages = arr;
            },
            confirm() {
                var url = this.BZHOST + '/operation/common/Common-mEvent';
//                var url = 'http://10.75.1.214:8080/operation/common/Common-mEvent?u=huangz07&decp=_ce_shi_de';
                var formData = new FormData();
                var att = {};
                var img = {};

                this.compress();
                for (var i = 0; i < this.images.length; i++) {
                    img[this.photoNames[i]] = this.compressImages[i];
                }
                att['att'] = img;

                formData.append('u', this.USERNUM);// this.USERNUM;
                formData.append('decp', this.content);
                formData.append('att', JSON.stringify(img));

                Indicator.open({
                    text: '加载中...',
                    spinnerType: 'snake'
                });
                axios.post(url, formData).then(res => {
                    console.log(url + '>>>>>>', res.data);
                    if (res.status === 200) {
                        Indicator.close();
                        if (res.data) {
                            Toast({
                                message: '提交成功',
                                duration: 2000
                            });
                            setTimeout(() => {
                                this.$router.replace('/bughistory');
                            }, 3000);
                        } else {
                            console.log('错误');
                        }
                    } else {
                        Indicator.close();
                    }
                }).catch((error) => {
                    Indicator.close();
                    console.log(error);
                });
            }
        },
        created() {
        }
    };
</script>

<style lang='less' scoped>
    @import '../css/var.less';

    .report {
        .sec {
            font-size: .28rem;
            color: @text-color1;
            a {
                color: @theme-color;
                img {
                    width: .14rem;
                    margin-top: -.04rem;
                }
            }
        }
        .content {
            position: relative;
            textarea {
                width: 100%;
                height: 2.5rem;
                padding: .28rem;
                box-sizing: border-box;
            }
            .counter {
                position: absolute;
                right: .28rem;
                bottom: .28rem;
                color: @text-color3;
                font-size: @sub-title-fsize;
            }
        }
        .card {
            height: 1.76rem;
            overflow: hidden;
            label {
                .imgs {
                    position: relative;
                    .photo-item {
                        margin-left: 0;
                        margin-right: .2rem;
                        background-position: center;
                    }
                    i {
                        display: inline-block;
                        position: absolute;
                        top: .14rem;
                        right: .04rem;
                        width: .34rem;
                        height: .34rem;
                        background-size: cover;
                    }
                }
                img {
                    width: 1.2rem;
                    height: 1.2rem;
                    margin: .28rem .2rem .28rem .28rem;
                }
                .text {
                    color: #999;
                }
                #upload {
                    visibility: hidden;
                    height: 0;
                }
                .cans {
                    visibility: hidden;
                    height: 0;
                }
            }
        }
    }
</style>
