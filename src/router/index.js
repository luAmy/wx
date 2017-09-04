import Vue from 'vue';
import Router from 'vue-router';
import Home from '../pages/home.vue';

// 信用等级
import mycredit from '../pages/mycredit.vue';
import knowcredit from '../pages/knowcredit.vue';

// 单据查询
import singleList from '../pages/singleList.vue';
import billdetail from '../pages/billDetail.vue';
import travelbilldetail from '../pages/travelBillDetail.vue';
import billall from '../pages/billall.vue';

// 满意度评价
import comment from '../pages/comment.vue';

// 个人额度查询
import mybaoxiao from '../pages/myBaoxiao.vue';
import myquota from '../pages/myQuota.vue';
import quotadetail from '../pages/quotaDetail.vue';
// 报销设置
import bxaccount from '../pages/bxAccount.vue';
import selectbank from '../pages/selectbank.vue';
import selectbranch from '../pages/selectbranch.vue';

// 代报销
import thirdbaoxiao from '../pages/thirdBaoxiao.vue';
import selectbaoxiaoren from '../pages/selectBaoxiaoren.vue';

// 增值税
import vat from '../pages/vat.vue';
import seecity from '../pages/vatSeecity.vue';
import seeall from '../pages/vatSeeall.vue';
// 微账单
import mybill from '../pages/mybill.vue';
import mybilldetail from '../pages/mybilldetail.vue';
import monthbill from '../pages/monthbill.vue';
// 我的发票
import invoices from '../pages/invoices.vue';
import uploadinvoice from '../pages/uploadinvoice.vue';

// 帮助中心
import helpcenter from '../pages/helpcenter.vue';
import helpdetail from '../pages/helpdetail.vue';
import helpvideo from '../pages/helpvideo.vue';
import helphistory from '../pages/helphistory.vue';
// 快速报障
import report from '../pages/report.vue';
import bughistory from '../pages/bughistory.vue';
import bugdetail from '../pages/bugdetail.vue';
import bugback from '../pages/bugback.vue';

Vue.use(Router);

export default new Router({
    base: 'vank', // '/wx/',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            // 我的报销
            path: '/mycredit',
            name: 'mycredit',
            component: mycredit,
            meta: {
                pageTitle: '个人信用'
            }
        },
        {
            // 我的报销
            path: '/knowcredit',
            name: 'knowcredit',
            component: knowcredit,
            meta: {
                pageTitle: '个人信用'
            }
        },
        {
            // 我的报销
            path: '/mybaoxiao',
            name: 'mybaoxiao',
            component: mybaoxiao,
            meta: {
                pageTitle: '我的报销'
            }
        },
        {
            path: '/myquota',
            name: 'myquota',
            component: myquota,
            meta: {
                pageTitle: '个人额度查询'
            }
        },
        {
            path: '/quotadetail',
            name: 'quotadetail',
            component: quotadetail,
            meta: {
                pageTitle: '额度使用明细'
            }
        },
        {
            path: '/bxaccount',
            name: 'bxaccount',
            component: bxaccount,
            meta: {
                pageTitle: '报销账户设置'
            }
        },
        {
            path: '/selectbank',
            name: 'selectbank',
            component: selectbank,
            meta: {
                pageTitle: '选择银行'
            }
        },
        {
            path: '/selectbranch',
            name: 'selectbranch',
            component: selectbranch,
            meta: {
                pageTitle: '选择分行'
            }
        },
        {
            path: '/thirdbaoxiao',
            name: 'thirdbaoxiao',
            component: thirdbaoxiao,
            meta: {
                pageTitle: '代报销设置'
            }
        },
        {
            path: '/selectbaoxiaoren',
            name: 'selectbaoxiaoren',
            component: selectbaoxiaoren,
            meta: {
                pageTitle: '选择代报销人'
            }
        },
        {
            path: '/vat',
            name: 'vat',
            component: vat,
            meta: {
                pageTitle: '增值税开票信息'
            }
        },
        {
            path: '/monthbill',
            name: 'monthbill',
            component: monthbill,
            meta: {
                pageTitle: '查看月账单'
            }
        },
        {
            path: '/seecity',
            name: 'seecity',
            component: seecity,
            meta: {
                pageTitle: '选择查看公司'
            }
        },
        {
            path: '/seeall',
            name: 'seeall',
            component: seeall,
            meta: {
                pageTitle: '查看全部'
            }
        },
        {
            path: '/mybill',
            name: 'mybill',
            component: mybill,
            meta: {
                pageTitle: '已出账单查询'
            }
        },
        {
            path: '/mybilldetail',
            name: 'mybilldetail',
            component: mybilldetail,
            meta: {
                pageTitle: '账单详情'
            }
        },
        {
            path: '/invoices',
            name: 'invoices',
            component: invoices,
            meta: {
                pageTitle: '账单详情'
            }
        },
        {
            path: '/uploadinvoice',
            name: 'uploadinvoice',
            component: uploadinvoice,
            meta: {
                pageTitle: '上传发票'
            }
        },
        {
            // 单个类型单据列表
            path: '/singleList',
            name: 'singleList',
            component: singleList,
            meta: {
                pageTitle: '列表'
            }
        },
        {
            // 单据详情页
            path: '/billdetail',
            name: 'billdetail',
            component: billdetail,
            meta: {
                pageTitle: '详情'
            }
        },
        {
            // 出差申请单
            path: '/travelbilldetail',
            name: 'travelbilldetail',
            component: travelbilldetail,
            meta: {
                pageTitle: '详情'
            }
        },
        {
            // 全部单据
            path: '/billall',
            name: 'billall',
            component: billall,
            meta: {
                pageTitle: '单据查询'
            }
        },
        {
            // 满意度评价
            path: '/comment',
            name: 'comment',
            component: comment,
            meta: {
                pageTitle: '满意度评价'
            }
        },
        {
            // 帮助中心-攻略
            path: '/helpcenter',
            name: 'helpcenter',
            component: helpcenter,
            meta: {
                pageTitle: '攻略集锦'
            }
        },
        {
            // 帮助中心-攻略详情
            path: '/helpdetail',
            name: 'helpdetail',
            component: helpdetail,
            meta: {
                pageTitle: '攻略详情'
            }
        },
        {
            // 帮助中心-视频
            path: '/helpvideo',
            name: 'helpvideo',
            component: helpvideo,
            meta: {
                pageTitle: '视频'
            }
        },
        {
            // 帮助中心-小贴士
            path: '/helphistory',
            name: 'helphistory',
            component: helphistory,
            meta: {
                pageTitle: '小贴士'
            }
        },
        {
            // 快速报障
            path: '/report',
            name: 'report',
            component: report,
            meta: {
                pageTitle: '快速报障'
            }
        },
        {
            // 我的报障首页
            path: '/bughistory',
            name: 'bughistory',
            component: bughistory,
            meta: {
                pageTitle: '历史报障查询'
            }
        },
        {
            // 报障详情
            path: '/bugdetail',
            name: 'bugdetail',
            component: bugdetail,
            meta: {
                pageTitle: '我的报障'
            }
        },
        {
            // 报障打回
            path: '/bugback',
            name: 'bugback',
            component: bugback,
            meta: {
                pageTitle: '事件打回'
            }
        }
    ]
});
