<template>
    <div class='wrap' id='wrap'>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tar: 0,
                tarY: 0,
                endX: 0,
                dist: 0,
                onTab: false
            };
        },
        props: ['top'],
        computed: {
            wrap() {
                return document.getElementById('wrap');
            },
            tabClick() {
                return this.wrap.querySelectorAll('.tabClick')[0];
            },
            tabLi() {
                return this.tabClick.getElementsByTagName('li');
            },
            tabBox() {
                return this.wrap.querySelectorAll('.tabBox')[0];
            },
            tabList() {
                return this.tabBox.querySelectorAll('.tabList');
            },
            lineBorder() {
                return this.wrap.querySelectorAll('.lineBorder')[0];
            },
            lineDiv() {
                return this.lineBorder.querySelectorAll('.lineDiv')[0];
            },
            len() {
                return this.tabList.length;
            },
            windowWidth() {
                return document.body.clientWidth;
            },
            windowHeight() {
                return document.body.clientHeight;
            },
            stars() {
                return this.wrap.querySelector('.active').start;
            }
        },
        methods: {
            init() {
                var self = this;
                var height = this.windowHeight;
                var rem = document.documentElement.clientWidth / 7.5;
                var top = this.top * rem;

                this.tabBox.style.overflow = 'hidden';
                this.tabBox.style.position = 'relative';
                this.tabBox.style.width = this.windowWidth * this.tabList.length + 'px';

                for (let i = 0; i < this.len; i++) {
                    this.tabList[i].style.width = this.windowWidth + 'px';
                    this.tabList[i].style.height = height - top + 'px';
                    this.tabList[i].style.float = 'left';
                    this.tabList[i].style.float = 'left';
                    this.tabList[i].style.padding = '0';
                    this.tabList[i].style.margin = '0';
                    this.tabList[i].style.verticalAlign = 'top';
                    this.tabList[i].style.display = 'table-cell';
                }

                for (let i = 0; i < this.len; i++) {
                    this.tabLi[i].start = i;
                    this.tabLi[i].onclick = function () {
                        var star = this.start;
                        for (let i = 0; i < self.len; i++) {
                            self.tabLi[i].className = '';
                        }
                        self.tabLi[star].className = 'active';
                        self.lineAnme(self.lineDiv, self.windowWidth / self.len * star);
                        self.translate(self.tabBox, self.windowWidth, star);
                        self.endX = -star * self.windowWidth;
                        self.$emit('onTab', star);
                    };
                }

                this.tabBox.addEventListener('touchstart', this.chstart, false);
                this.tabBox.addEventListener('touchmove', this.chmove, false);
                this.tabBox.addEventListener('touchend', this.chend, false);
            },
            gotoTab(star) {
                var self = this;
                for (let i = 0; i < self.len; i++) {
                    self.tabLi[i].className = '';
                }
                self.tabLi[star].className = 'active';
                self.lineAnme(self.lineDiv, self.windowWidth / self.len * star, 'false');
                self.translate(self.tabBox, self.windowWidth, star, 'false');
                self.endX = -star * self.windowWidth;
                self.$emit('onTab', star);
            },
            chstart(ev) {
//                ev.preventDefault();
                var touch = ev.touches[0];
                this.tar = touch.pageX;
                this.tarY = touch.pageY;
            },
            chmove(ev) {
                var touch = ev.touches[0];
                var distance = touch.pageX - this.tar;
                var distanceY = touch.pageY - this.tarY;
                this.dist = distance;
                if (Math.abs(distanceY) > Math.abs(distance)) {
                    this.onTab = false;
                    return;
                }
                ev.preventDefault();
                this.onTab = true;
                this.touchs(this.tabBox, this.windowWidth, this.tar, distance, this.endX);
                this.lineAnme(this.lineDiv, -this.dist / this.len - this.endX / this.len);
                this.tabBox.style.webkitTransition = 'all 0s ease-in-out';
                this.tabBox.style.transition = 'all 0s ease-in-out';
            },
            chend(ev) {
                var str = this.tabBox.style.transform;
                var strs = JSON.stringify(str.split(',', 1));
                this.endX = Number(strs.substr(14, strs.length - 18));

                if (!this.onTab) {
                    return;
                }
                if (this.endX > 0) {
                    this.back(this.tabBox, this.windowWidth, this.tar, 0, 0, 0.3);
                    this.endX = 0;
                } else if (this.endX < -this.windowWidth * this.tabList.length + this.windowWidth) {
                    this.endX = -this.windowWidth * this.tabList.length + this.windowWidth;
                    this.back(this.tabBox, this.windowWidth, this.tar, 0, this.endX, 0.3);
                } else if (this.dist < -this.windowWidth / this.len) {
                    this.OnTab(this.tabClick.querySelector('.active').start + 1);
                    this.back(this.tabBox, this.windowWidth, this.tar, 0, this.endX, 0.3);
                } else if (this.dist > this.windowWidth / (this.len + 1)) {
                    this.OnTab(this.tabClick.querySelector('.active').start - 1);
                } else {
                    this.OnTab(this.tabClick.querySelector('.active').start);
                }
                this.dist = 0;
                // debugger
                var stars = this.wrap.querySelector('.active').start;
                this.lineAnme(this.lineDiv, stars * this.windowWidth / this.len);
            },
            translate(obj, windowWidth, star, anim) {
                obj.style.webkitTransform = 'translate3d(' + -star * windowWidth + 'px,0,0)';
                obj.style.transform = 'translate3d(' + -star * windowWidth + ',0,0)px';
                if (anim === 'false') {
                    return;
                }
                obj.style.webkitTransition = 'all 0.3s ease-in-out';
                obj.style.transition = 'all 0.3s ease-in-out';
            },
            touchs(obj, windowWidth, tar, distance, endX) {
                obj.style.webkitTransform = 'translate3d(' + (distance + endX) + 'px,0,0)';
                obj.style.transform = 'translate3d(' + (distance + endX) + ',0,0)px';
            },
            lineAnme(obj, stance, anim) {
                obj.style.webkitTransform = 'translate3d(' + stance + 'px,0,0)';
                obj.style.transform = 'translate3d(' + stance + 'px,0,0)';
                if (anim === 'false') {
                    return;
                }
                obj.style.webkitTransition = 'all 0.1s ease-in-out';
                obj.style.transition = 'all 0.1s ease-in-out';
            },
            back(obj, windowWidth, tar, distance, endX, time) {
                obj.style.webkitTransform = 'translate3d(' + (distance + endX) + 'px,0,0)';
                obj.style.transform = 'translate3d(' + (distance + endX) + ',0,0)px';
                obj.style.webkitTransition = 'all ' + time + 's ease-in-out';
                obj.style.transition = 'all ' + time + 's ease-in-out';
            },
            OnTab(star) {
                if (star < 0) {
                    star = 0;
                } else if (star >= this.len) {
                    star = this.len - 1;
                }
                for (let i = 0; i < this.len; i++) {
                    this.tabLi[i].className = '';
                }

                this.tabLi[star].className = 'active';
                this.translate(this.tabBox, this.windowWidth, star);
                this.endX = -star * this.windowWidth;
                this.$emit('onTab', star);
            }
        },
        mounted() {
            var index = this.$route.query.index;
            this.init();
            if (index) {
                this.gotoTab(index);
            }
        }
    };
</script>

<style lang='less' scoped>
    @import "../css/var.less";

    .wrap {
        height: 100%;
        .tabCon {
            height: 100%;
        }
    }
    .tabItem {
        position: absolute;
        z-index: 999;
        width: 100%;
    }
    .tabClick {
        background: #fff;
        overflow: hidden;
        border-bottom: 1px solid #e0e0e0;
    }

    .tabClick li {
        position: relative;
        -webkit-box-flex: 1;
        flex: 1;
        height: .8rem;
        line-height: .8rem;
        font-size: .28rem;
        text-align: center;
    }

    .tabClick li.active {
        color:  @theme-color;
        transition: 0.2s;
    }

    .tabCon {
        overflow: hidden;
        /*overflow-y: scroll;*/
    }

    .tabBox {
        position: relative;
    }

    .tabList {
        word-break: break-all;
        width: 100%;
        float: left;
        /*min-height: 2rem;*/
        color: #D3D3D3;
        background-color: #f3f4f6;
        overflow-y: scroll;
    }

    .lineBorder {
        position: absolute;
        top: .8rem;
        width: 100%;
        height: .04rem;
        overflow: hidden;
    }

    .lineDiv {
        background: @theme-color;
        height: .04rem;
        /*transition: all 0.3s cubic-bezier(0.35, 0, 0.25, 1) 0.09s, all 0.3s cubic-bezier(0.35, 0, 0.25, 1) !important;*/
    }
</style>
