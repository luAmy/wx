import Vue from 'vue';
import store from '../vuex';

Vue.prototype.HOST = store.state.host;
Vue.prototype.BZHOST = store.state.bzhost;
Vue.prototype.WEIXINHOST = store.state.weixinhost;
Vue.prototype.BZIMG = store.state.bzImg;
Vue.prototype.HELPHOST = store.state.helphost;
Vue.prototype.TOKENHOST = store.state.tokenhost;
Vue.prototype.USERNUM = store.state.userNum;
Vue.prototype.SESSIONID = store.state.sessionId;

var creditRank = {
    '需改进': 1,
    '一般': 2,
    '良好': 3,
    '优秀': 4
};

var billState = {
    '5': '全部',
    '10': '制单',
    '20': '暂存',
    '25': '已提交未发k2',
    '27': '已废弃',
    '28': '已作废',
    '30': '审核中',
    '40': '审核未通过',
    '43': '已生成付款格式',
    '45': '已生成凭证',
    '46': '已生成K/3凭证',
    '47': '已生成凭证未付款',
    '50': '取消',
    '60': '审核通过',
    '65': '等待付款',
    '66': '付款单已付款',
    '70': '已付款',
    '80': '已关闭',
    '90': '已生成报销单',
    '110': '已挂账',
    '115': '已生成挂账凭证',
    '120': '已生成结算单',
    '125': '付款中',
    '130': '收款中',
    '135': '已收款',
    '140': '已生成收款单',
    '145': '业务审批中',
    '150': '业务审批通过',
    '155': '已确认',
    '160': '已提交',
    '165': '结算中',
    '170': '已结算',
    '175': '已归档',
    '180': '调整中',
    '185': '合同执行完毕',
    '190': '审批拒绝',
    '195': '已反结算',
    '200': '已关联付款单',
    '205': '已打回',
    '210': '已退票',
    '215': '已提交',
    '220': '已审核',
    '225': '归档中',
    '300': '未付款',
    '305': '共享打回'
};
var listArr = {
    '电脑申请单': 'getcomputerApplications',
    '事项申请单': 'getProjectApprovals',
    '借款单': 'getDailyLoanBills',
    '还款单': 'getRepaymentBills',
    '其他费用报销单': 'getBizAccountBills',
    '通讯费报销单': 'getBizAccountBills',
    '车辆费报销单': 'getBizAccountBills',
    '交通费报销单': 'getBizAccountBills',
    '费用申请单': 'getOtherExpenseBills',
    '电脑报销单': 'getComputerAccounts',
    '合同付款单': 'getContractPayments',
    '无合同付款单': 'getNoContractPayments',
    '合同': 'getContractProjects',
    '合同结算': 'getContractSettles',
    '出差申请单': 'getEvectionReqBills',
    '差旅报销单': 'listTravelBillWK'
};

var billIcons = {
    '电脑申请单': require('../img/diannaoshenqing.png'),
    '事项申请单': require('../img/shixiangshenqing.png'),
    '借款单': require('../img/jiekuan.png'),
    '还款单': require('../img/huankuan.png'),
    '费用报销单': require('../img/feiyongbaoxiao.png'),
    '其他费用报销单': require('../img/feiyongbaoxiao.png'),
    '通讯费报销单': require('../img/tongxunfeibaoxiao.png'),
    '车辆费报销单': require('../img/cheliangfeibaoxiao.png'),
    '交通费报销单': require('../img/jiaotongfeibaoxiao.png'),
    '费用申请单': require('../img/feiyongshenqing.png'),
    '电脑报销单': require('../img/diannaobaoxiao.png'),
    '合同付款单': require('../img/hetongfukuan.png'),
    '无合同付款单': require('../img/wuhetongfukuan.png'),
    '合同': require('../img/hetong.png'),
    '合同结算': require('../img/hetongjiesuan.png'),
    '出差申请单': require('../img/chuchaishenqing.png'),
    '差旅报销单': require('../img/chailvbaoxiao.png')
};

var detailArr = {
    '电脑申请单': 'getcomputerApplicationDetails',
    '事项申请单': 'getProjectApprovalDetails',
    '借款单': 'getDailyLoanBillDetails',
    '还款单': 'getRepaymentBillDetails',
    '费用报销单': 'getBizAccountBillDetails',
    '其他费用报销单': 'getBizAccountBillDetails',
    '通讯费报销单': 'getBizAccountBillDetails',
    '车辆费报销单': 'getBizAccountBillDetails',
    '交通费报销单': 'getBizAccountBillDetails',
    '费用申请单': 'getOtherExpenseBillDetails',
    '电脑报销单': 'getComputerAccountDetails',
    '合同付款单': 'getContractPaymentDetails',
    '无合同付款单': 'getNoContractPaymentDetails',
    '合同': 'getContractProjectDetails',
    '战略合同': 'getContractProjectDetails',
    '补充合同': 'getContractProjectDetails',
    '合同调整': 'getContractProjectDetails',
    '合同结算': 'getContractSettleDetails',
    '出差申请单': 'getEveQDetails',
    '差旅报销单': 'findDetail'
};
var payeeType = {
    '10': '未付款',
    '20': '已付款',
    '30': '等待付款',
    '40': '修改账号',
    '50': '已打回',
    '60': '已退票'
};

var loadType = {
    '10': '日常用品采购',
    '20': '市场活动费用',
    '30': '业务活动费用'
};
var billTypes = {
    'CP': '合同付款单',
    'NP': '无合同付款单',
    'FB': '费用报销单',
    'CB201': '差旅报销单'
};

Vue.prototype.CREDITRANK = creditRank;
Vue.prototype.BILLSTATE = billState;

Vue.prototype.BILLICONS = billIcons;
Vue.prototype.DETAILARR = detailArr;
Vue.prototype.LISTARR = listArr;

Vue.prototype.PAYEETYPE = payeeType;
Vue.prototype.LOADTYPE = loadType;
Vue.prototype.BILLTYPES = billTypes;
