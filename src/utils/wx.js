import wx from 'weixin-js-sdk';

// success：接口调用成功时执行的回调函数。
// fail：接口调用失败时执行的回调函数。
// complete：接口调用完成时执行的回调函数，无论成功或失败都会执行。
// cancel：用户点击取消时的回调函数，仅部分有用户取消操作的api才会用到。
// trigger: 监听Menu中的按钮点击时触发的方法，该方法仅支持Menu中的相关接口。
// 以上几个函数都带有一个参数，类型为对象，其中除了每个接口本身返回的数据之外，还有一个通用属性errMsg，其值格式如下：
//
// 调用成功时："xxx:ok" ，其中xxx为调用的接口名
// 用户取消时："xxx:cancel"，其中xxx为调用的接口名
// 调用失败时：其值为具体错误信息

export default {
    share(score) {
        wx.ready(function() {
            // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
            // 分享到朋友圈
            var path = window.location.href;

            wx.onMenuShareTimeline({
                title: '我的信用分' + score + '分，来比一比！', // 分享标题
                link: path, // 分享链接，该链接域名必须与当前企业的可信域名一致
                imgUrl: '', // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
            // 分享给朋友
            wx.onMenuShareAppMessage({
                title: '我的信用分' + score + '分，来比一比！', // 分享标题
                desc: '', // 分享描述
                link: path, // 分享链接，该链接域名必须与当前企业的可信域名一致
                imgUrl: '', // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
            // 分享到QQ?
            wx.onMenuShareQQ({
                title: '我的信用分' + score + '分，来比一比！', // 分享标题
                desc: '', // 分享描述
                link: path, // 分享链接
                imgUrl: '', // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
        });
        wx.error(function(res) {
            console.log('share error:' + JSON.stringify(res));
            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        });
    },
    preview(current, urls) {
        wx.ready(function() {
            wx.previewImage({
                current: current, // 当前显示图片的http链接
                urls: urls // 需要预览的图片http链接列表
            });
        });
        wx.error(function(res) {
            console.log('preview error:' + JSON.stringify(res));
            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        });
    }
};
