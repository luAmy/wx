<template>
    <div class="billdetail">
        <div class="detailhead clear">
            <div class="avatar fl" :style="{backgroundImage: 'url('+ icon +')'}">
            </div>
            <div class="text fl">
                <div class="billstatus">
                    单据状态：<span :class="{status: state}">{{state}}</span>
                </div>
                <div class="note ellipsis">
                    说明：{{cause}}
                </div>
                <div class="money" :a="money">
                金额：<span v-if="money">{{money | formatMoney}}</span>
                </div>
            </div>
        </div>
        <slide-tab :top="2.8" ref="slide" @onTab="onTab" v-if="showTab">
            <div class="tabItem">
                <ul class="tabClick box">
                    <li v-for="(item, index) in list" :class="{active:index===0}">
                        {{item}}
                    </li>
                </ul>
                <div class="lineBorder">
                    <div class="lineDiv" :style="{width: 100/list.length + '%'}"><!--滑动条--></div>
                </div>
            </div>
            <div class="tabCon">
                <div class="tabBox">
                    <div class="tabList" v-if="arrProcess.indexOf(name) !== -1">
                        <process :number="billNum"></process>
                    </div>
                    <template title="事项申请单" v-if="name === '事项申请单'">
                        <div class="tabList">
                            <div class="sec">
                                费用明细
                            </div>
                            <div class="block" v-for="(item, index) in data.entrys">
                                <div class="list clear">
                                    <div class="text fl">费用类型</div>
                                    <div class="value fr">{{item.expenseTypeName}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">申请金额</div>
                                    <div class="value fr">{{item.amount | formatMoney}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">扣减预算金额</div>
                                    <div class="value fr">{{item.budgeDo | formatMoney}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">报销公司</div>
                                    <div class="value fr">{{item.companyName}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">报销部门</div>
                                    <div class="value fr">{{item.costCenterName}}</div>
                                </div>
                            </div>
                            <div class="sec">
                                基本信息
                            </div>
                            <div class="list clear">
                                <div class="text fl">申请单号</div>
                                <div class="value fr">{{data.paNumner}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">申请人</div>
                                <div class="value fr">{{data.personName}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">申请日期</div>
                                <div class="value fr">{{data.bizDate}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">事项分类</div>
                                <div class="value fr">{{data.typeName}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">项目分期</div>
                                <div class="value fr">{{data.projectName}}</div>
                            </div>
                        </div>
                        <div class="tabList">
                            <div class="sec">
                                相关合同
                            </div>
                            <a class="list clear" v-for="(item, index) in data.contracts"
                               @click="gotoRelated('合同', item.fnumber, item.fstate, item.fcause, item.famount,
                               item.conFormat)">
                                <div class="highlight fl">{{item.fnumber}}</div>
                                <img :src="arrow" alt="arrow" class="arrow-r fr">
                            </a>
                            <div class="sec">
                                立项变更信息
                            </div>
                            <a class="list clear" v-for="(item, index) in data.changes"
                               @click="gotoRelated('事项申请单', item.changeNumber, item.fstate, item.fcause,
                               item.famount)">
                                <div class="highlight fl">{{item.changeNumber}}</div>
                                <img :src="arrow" alt="arrow" class="arrow-r fr">
                            </a>
                            <div class="sec">
                                相关无合同付款
                            </div>
                            <a class="list clear" v-for="(item, index) in data.noContractPayments"
                               @click="gotoRelated('无合同付款单', item.fnumber, item.fstate, item.fcause,
                               item.famount)">
                                <div class="highlight fl">{{item.fnumber}}</div>
                                <img :src="arrow" alt="arrow" class="arrow-r fr">
                            </a>
                            <div class="sec">
                                预付款信息
                            </div>
                            <a class="list clear" v-for="(item, index) in data.Prepaid"
                               @click="gotoRelated('无合同付款单', item.fnumber, item.fstate, item.fcause,
                               item.famount)">
                                <div class="highlight fl">{{item.fnumber}}</div>
                                <img :src="arrow" alt="arrow" class="arrow-r fr">
                            </a>
                        </div>
                    </template>
                    <template title="电脑申请单" v-if="name === '电脑申请单'">
                        <div class="tabList">
                            <div class="sec">
                                明细信息
                            </div>
                            <div class="list clear">
                                <div class="text fl">报销金额</div>
                                <div class="value fr">{{data.accountAmount | formatMoney}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">购机金额</div>
                                <div class="value fr">{{data.applyAmount | formatMoney}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">电脑品牌</div>
                                <div class="value fr">{{data.brand}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">电脑型号</div>
                                <div class="value fr">{{data.model}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">是否延长购机申请</div>
                                <div class="value fr" v-if="data.isUpgrad!=''">{{data.isUpgrad === '1'?'是':'否'}}</div>
                                <div class="value fr" v-else></div>
                            </div>
                            <div class="sec">
                                基本信息
                            </div>
                            <div class="list clear">
                                <div class="text fl">流水号</div>
                                <div class="value fr">{{data.CAnumber}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">申请人</div>
                                <div class="value fr">{{data.personName}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">申请日期</div>
                                <div class="value fr">{{data.bizdate}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">申请公司</div>
                                <div class="value fr">{{data.companyName}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">申请部门</div>
                                <div class="value fr">{{data.costCenterName}}</div>
                            </div>
                        </div>
                        <div class="tabList">
                            <div class="sec">
                                报销信息
                            </div>
                            <div class="block" v-for="(item, index) in data.entrys" style="margin-bottom: .2rem">
                                <div class="list" style="color:#666">第<span class="highlight">{{item.accountTimes}}</span>次报销</div>
                                <div class="list clear">
                                    <div class="text fl">报销年度</div>
                                    <div class="value fr">{{item.accoutYear}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">报销金额</div>
                                    <div class="value fr">{{item.amount | formatMoney}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">报销开始时间</div>
                                    <div class="value fr">{{item.startDate}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">状态</div>
                                    <div class="value fr" v-if="item.state">{{item.state === '20'? '已报销':'未报销'}}</div>
                                    <div class="value fr" v-else></div>
                                </div>
                                <a class="list clear"
                                   @click="gotoRelated('电脑报销单', item.accountNumber)">
                                    <div class="text fl">报销单编号</div>
                                    <img :src="arrow" alt="arrow" class="arrow-r fr">
                                    <div class="value fr">{{item.accountNumber}}</div>
                                </a>
                            </div>
                        </div>
                    </template>
                    <template title="借款单" v-if="name === '借款单'">
                        <div class="tabList">
                            <div class="sec">
                                借款明细
                            </div>
                            <div class="list clear">
                                <div class="text fl">费用类型</div>
                                <div class="value fr">{{LOADTYPE[data.loanType]}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">申请金额</div>
                                <div class="value fr">{{data.amount | formatMoney}}</div>
                            </div>
                            <div class="sec">
                                基本信息
                            </div>
                            <div class="list clear">
                                <div class="text fl">申请单号</div>
                                <div class="value fr">{{billNum}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">借款人</div>
                                <div class="value fr">{{data.personName}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">借款日期</div>
                                <div class="value fr">{{data.loanDate}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">借款支付公司</div>
                                <div class="value fr">{{data.companyName}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">借款支付部门</div>
                                <div class="value fr">{{data.costName}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">预计还款日期</div>
                                <div class="value fr">{{data.repayDate}}</div>
                            </div>
                        </div>
                        <div class="tabList">
                            <div class="sec">
                                收款人信息
                            </div>
                            <div class="list clear">
                                <div class="text fl">收款人名称</div>
                                <div class="value fr">{{data.payeeName}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">收款人类型</div>
                                <div class="value fr">{{data.payeeType}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">收款人银行</div>
                                <div class="value fr">{{data.payBank}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">收款人账号</div>
                                <div class="value fr">{{data.payAccount}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">收款金额</div>
                                <div class="value fr">{{data.payAmount | formatMoney}}</div>
                                <!--|| formatMoney-->
                            </div>
                            <div class="sec">
                                支付信息
                            </div>
                            <div class="list clear">
                                <div class="text fl">结算方式</div>
                                <div class="value fr">{{data.settleName}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">付款银行</div>
                                <div class="value fr">{{data.accountName}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">付款账户</div>
                                <div class="value fr">{{data.accountNumber}}</div>
                            </div>
                        </div>
                        <div class="tabList">
                            <div class="sec">
                                关联冲账费用
                            </div>
                            <div class="block" v-for="(item, index) in data.rushBills">
                                <div class="list clear">
                                    <div class="text fl">单据类型</div>
                                    <div class="value fr">{{item.billType}}</div>
                                </div>
                                <a class="list clear" :key="index"
                                   @click="gotoRelated(item.billType, item.billNum)">
                                    <div class="text fl">单据编号</div>
                                    <img :src="arrow" alt="arrow" class="arrow-r fr">
                                    <div class="value fr">{{item.billNum}}</div>
                                </a>
                            </div>
                            <div class="sec">
                                关联还款单
                            </div>
                            <a class="list clear" v-for="(item, index) in data.linkBillNumbers"
                                         :key="index"
                               @click="gotoRelated('还款单', item.repaymentNumber)">
                                <div class="highlight fl">{{item.repaymentNumber}}</div>
                                <img :src="arrow" alt="arrow" class="arrow-r fr">
                            </a>
                        </div>
                    </template>
                    <template title="还款单" v-if="name === '还款单'">
                        <div class="tabList">
                            <div class="sec">
                                还款明细
                            </div>
                            <div class="list clear">
                                <div class="text fl">费用类型</div>
                                <div class="value fr">{{data.expenseTypeName}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">还款金额</div>
                                <div class="value fr">{{data.amount | formatMoney}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">确认金额</div>
                                <div class="value fr">{{data.amountApproved | formatMoney}}</div>
                            </div>
                            <div class="sec">
                                基本信息
                            </div>
                            <div class="list clear">
                                <div class="text fl">还款单号</div>
                                <div class="value fr">{{billNum}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">还款人</div>
                                <div class="value fr">{{data.personName}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">还款日期</div>
                                <div class="value fr">{{data.payDate}}</div>
                            </div>
                        </div>
                        <div class="tabList">
                            <div class="sec">
                                收款信息
                            </div>
                            <div class="list clear">
                                <div class="text fl">结算方式</div>
                                <div class="value fr">{{data.settlementTypeName}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">收款公司</div>
                                <div class="value fr">{{data.companyName}}</div>
                            </div>
                            <div class="list clear" v-if="data.settlementTypeName === '网银支付'">
                                <div class="text fl">收款人银行</div>
                                <div class="value fr">{{data.bankName}}</div>
                            </div>
                            <div class="list clear" v-if="data.settlementTypeName === '网银支付'">
                                <div class="text fl">收款人账号</div>
                                <div class="value fr">{{data.bankNum}}</div>
                            </div>
                        </div>
                        <div class="tabList">
                            <div class="sec">
                                关联借款单
                            </div>
                            <a class="list clear"
                               @click="gotoRelated('借款单', data.dailyloanBillNum)">
                                <div class="highlight fl">{{data.dailyloanBillNum}}</div>
                                <img :src="arrow" alt="arrow" class="arrow-r fr">
                            </a>
                        </div>
                    </template>
                    <template title="其他费用报销单" v-if="name === '其他费用报销单' ||
                    name === '通讯费报销单' || name === '车辆费报销单' || name === '交通费报销单'">
                        <div class="tabList">
                            <div class="sec">
                                费用明细
                            </div>
                            <div class="block" v-for="(item, index) in data.entrys">
                                <div class="list clear">
                                    <div class="text fl">业务类别</div>
                                    <div class="value fr">{{item.operationTypeName}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">费用类型</div>
                                    <div class="value fr">{{item.expenseTypeName}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">报销金额</div>
                                    <div class="value fr">{{item.applyAmount | formatMoney}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">核定金额</div>
                                    <div class="value fr">{{item.amountapproved | formatMoney}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">发票金额</div>
                                    <div class="value fr">{{item.billAmount | formatMoney}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">预算（额度）归属公司</div>
                                    <div class="value fr">{{item.companyName}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">预算（额度）归属部门</div>
                                    <div class="value fr">{{item.costCenterName}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">费用说明</div>
                                    <div class="value fr">{{item.cause}}</div>
                                </div>
                            </div>
                            <div class="sec">
                                基本信息
                            </div>
                            <div class="list clear">
                                <div class="text fl">报销单号</div>
                                <div class="value fr">{{data.billNum}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">报销人</div>
                                <div class="value fr">{{data.personName}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">报销日期</div>
                                <div class="value fr">{{data.billDate}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">扫描点</div>
                                <div class="value fr">{{data.postAddressName}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">额度预算归属日期</div>
                                <div class="value fr">{{data.bizReqDate}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">费用支付公司</div>
                                <div class="value fr">{{data.companyName}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">费用支付部门</div>
                                <div class="value fr">{{data.costCenterName}}</div>
                            </div>
                        </div>
                        <div class="tabList">
                            <div class="sec">
                                收款人信息
                            </div>
                            <div class="block" v-for="(item, index) in data.payee">
                                <div class="list clear">
                                    <div class="text fl">收款人名称</div>
                                    <div class="value fr">{{item.payeeName}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">收款人类型</div>
                                    <div class="value fr">{{item.payeeType}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">收款人银行</div>
                                    <div class="value fr">{{item.payeeBank}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">收款人账号</div>
                                    <div class="value fr">{{item.payeeAccount}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">收款金额</div>
                                    <div class="value fr">{{item.payeeAmount | formatMoney}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">收款状态</div>
                                    <div class="value fr">{{PAYEETYPE[item.payeeState]}}</div>
                                </div>
                            </div>
                            <div class="sec">
                                付款方式
                            </div>
                            <div class="list clear">
                                <div class="text fl">结算方式</div>
                                <div class="value fr">{{data.paymentName}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">付款银行</div>
                                <div class="value fr">{{data.bankName}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">付款账户</div>
                                <div class="value fr">{{data.bankNum}}</div>
                            </div>
                        </div>
                        <div class="tabList">
                            <div class="sec">
                                关联申请单
                            </div>
                            <a class="list clear"
                               @click="gotoRelated('费用申请单', data.otherExpenseNum)">
                                <div class="text fl">单据编号</div>
                                <img :src="arrow" alt="arrow" class="arrow-r fr">
                                <div class="value fr">{{data.otherExpenseNum}}</div>
                            </a>
                            <div class="list clear">
                                <div class="text fl">申请金额</div>
                                <div class="value fr">{{data.amount | formatMoney}}</div>
                            </div>
                        </div>
                    </template>
                    <template title="费用申请单" v-if="name === '费用申请单'">
                        <div class="tabList">
                            <div class="sec">
                                费用属性
                            </div>
                            <div class="block" v-for="(item, index) in data.OtherExpenseBillEntry">
                                <div class="list clear">
                                    <div class="text fl">业务类别</div>
                                    <div class="value fr">{{item.operationTypeName}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">费用类型</div>
                                    <div class="value fr">{{item.expenseTypeName}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">预算归属公司</div>
                                    <div class="value fr">{{item.companyName}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">预算归属部门</div>
                                    <div class="value fr">{{item.costCenterName}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">说明</div>
                                    <div class="value fr">{{item.comment}}</div>
                                </div>
                            </div>
                            <div class="sec">
                                基本信息
                            </div>
                            <div class="list clear">
                                <div class="text fl">申请人</div>
                                <div class="value fr">{{data.applierName}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">申请金额</div>
                                <div class="value fr">{{data.amount | formatMoney}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">申请单号</div>
                                <div class="value fr">{{data.amountNumber}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">预算归属日期</div>
                                <div class="value fr">{{data.reqDate}}</div>
                            </div>
                        </div>
                        <div class="tabList">
                            <div class="sec">
                                关联报销单
                            </div>
                            <!--name, num, state, cause, amount, conFormat-->
                            <div class="block" v-for="(item, index) in data.bizAccountBills">
                                <a class="list clear"
                                   @click="gotoRelated('其他费用报销单', item.bizAccountBillNumber, item.bizAccountBillState,
                                   item.bizAccountBillCause, item.baoxiaoAmount)">
                                    <div class="text fl">单据流水</div>
                                    <img :src="arrow" alt="arrow" class="arrow-r fr">
                                    <div class="value fr">{{item.bizAccountBillNumber}}</div>
                                </a>
                                <div class="list clear">
                                    <div class="text fl">报销金额</div>
                                    <div class="value fr">{{item.baoxiaoAmount | formatMoney}}</div>
                                </div>
                            </div>
                            <div class="sec">
                                关联借款单
                            </div>
                            <div class="block" v-for="(item, index) in data.dailyLoanBills">
                                <a class="list clear"
                                   @click="gotoRelated('借款单', item.dailyLoanBillNum, item.dailyLoanBillState,
                                   item.dailyLoanBillCause, item.noPayAmount)">
                                    <div class="text fl">借款单号</div>
                                    <img :src="arrow" alt="arrow" class="arrow-r fr">
                                    <div class="value fr">{{item.dailyLoanBillNum}}</div>
                                </a>
                                <div class="list clear">
                                    <div class="text fl">借款金额</div>
                                    <div class="value fr">{{item.noPayAmount | formatMoney}}</div>
                                </div>
                            </div>
                        </div>
                    </template>
                    <template title="电脑报销单" v-if="name === '电脑报销单'">
                        <div class="tabList">
                            <div class="sec">
                                报销信息
                            </div>
                            <div class="list clear">
                                <div class="text fl">费用类型</div>
                                <div class="value fr">{{data.expenseTypeName}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">本次报销金额</div>
                                <div class="value fr">{{data.theAccountAmount | formatMoney}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">核定报销金额</div>
                                <div class="value fr">{{data.appAccountAmount | formatMoney}}</div>
                            </div>
                            <div class="sec">
                                基本信息
                            </div>
                            <div class="list clear">
                                <div class="text fl">流水号</div>
                                <div class="value fr">{{data.comNumber}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">报销人</div>
                                <div class="value fr">{{data.personName}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">报销日期</div>
                                <div class="value fr">{{data.bizDate}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">关联申请单</div>
                                <div class="value fr">{{data.applicationNumber}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">申请公司</div>
                                <div class="value fr">{{data.companyName}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">报销部门</div>
                                <div class="value fr">{{data.centerName}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">发票金额</div>
                                <div class="value fr">{{data.invoiceAmount | formatMoney}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">核定发票金额</div>
                                <div class="value fr">{{data.appInvoiceAmount | formatMoney}}</div>
                            </div>
                        </div>
                        <div class="tabList">
                            <div class="sec">
                                付款信息
                            </div>
                            <div class="list clear">
                                <div class="text fl">支付公司</div>
                                <div class="value fr">{{data.payCompanyName}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">支付部门</div>
                                <div class="value fr">{{data.payCenterName}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">累计报销</div>
                                <div class="value fr">{{data.totalAmount | formatMoney}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">结算方式</div>
                                <div class="value fr">{{data.settlementTypeName}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">付款银行</div>
                                <div class="value fr">{{data.bankName}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">付款账户</div>
                                <div class="value fr">{{data.bankNum}}</div>
                            </div>
                            <div class="sec">
                                收款信息
                            </div>
                            <div class="list clear">
                                <div class="text fl">收款人</div>
                                <div class="value fr">{{data.personName}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">收款人银行</div>
                                <div class="value fr">{{data.recBank}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">收款人账户</div>
                                <div class="value fr">{{data.recAccount}}</div>
                            </div>
                        </div>
                    </template>
                    <template title="合同付款单" v-if="name === '合同付款单'">
                        <div class="tabList">
                            <div class="sec">
                                费用明细
                            </div>
                            <div class="block" v-for="(item, index) in data.paySplitEntry">
                                <div class="list clear">
                                    <div class="text fl">费用类型</div>
                                    <div class="value fr">{{item.expenseTypeName}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">费用承担公司</div>
                                    <div class="value fr">{{item.FYcompanyName}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">费用承担部门</div>
                                    <div class="value fr">{{item.FYdeptName}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">合同金额（含税）</div>
                                    <div class="value fr">{{item.contractAmount | formatMoney}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">合同可付款金额</div>
                                    <div class="value fr">{{item.noPayAmount | formatMoney}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">不含税金额</div>
                                    <div class="value fr">{{item.noTaxAmount | formatMoney}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">税率</div>
                                    <div class="value fr">{{item.taxRate}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">税额</div>
                                    <div class="value fr">{{item.tax}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">付款金额</div>
                                    <div class="value fr">{{item.payAmount | formatMoney}}</div>
                                </div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">发票总金额</div>
                                <div class="value fr">{{data.invoiceAmount | formatMoney}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">付款总金额</div>
                                <div class="value fr">{{data.totalPayAmount | formatMoney}}</div>
                            </div>
                            <div class="sec">
                                基本信息
                            </div>
                            <div class="list clear">
                                <div class="text fl">流水号</div>
                                <div class="value fr">{{data.number}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">经办人</div>
                                <div class="value fr">{{data.handlerName}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">报销日期</div>
                                <div class="value fr">{{data.date}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">项目分期</div>
                                <div class="value fr">{{data.proPhaseName}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">征收政策</div>
                                <div class="value fr">{{data.collectionpolicy}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">收付类别</div>
                                <div class="value fr">{{data.feeTypeName}}</div>
                            </div>
                            <div class="sec">
                                增值税专用发票信息
                            </div>
                            <div class="block" v-for="(item, index) in data.invoiceEntry">
                                <div class="list clear">
                                    <div class="text fl">开票时间</div>
                                    <div class="value fr">{{item.billTime}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">发票号码</div>
                                    <div class="value fr">{{item.invoiceNumber}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">发票代码</div>
                                    <div class="value fr">{{item.invoiceCode}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">金额（不含税）</div>
                                    <div class="value fr">{{item.amount | formatMoney}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">税率</div>
                                    <div class="value fr">{{data.taxRate}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">税额</div>
                                    <div class="value fr">{{data.tax}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">金额（含税）</div>
                                    <div class="value fr">{{data.taxAmount | formatMoney}}</div>
                                </div>
                            </div>
                        </div>
                        <div class="tabList">
                            <div class="sec">
                                付款信息
                            </div>
                            <div class="list clear">
                                <div class="text fl">是否代付</div>
                                <div class="value fr" v-if="data.isPayThe!=''">{{data.isPayThe?'是':'否'}}</div>
                                <div class="value fr" v-else></div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">付款公司</div>
                                <div class="value fr">{{data.proBookName}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">付款类型</div>
                                <div class="value fr">{{data.payTypeName}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">结算方式</div>
                                <div class="value fr">{{data.payStyleName}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">付款账户名称</div>
                                <div class="value fr">{{data.payAccountName}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">付款账户</div>
                                <div class="value fr">{{data.payAccountNum}}</div>
                            </div>
                            <div class="sec">
                                购物单位信息
                            </div>
                            <div class="list clear">
                                <div class="text fl">购货单位</div>
                                <div class="value fr">{{data.payeeUnitName}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">纳税人识别号</div>
                                <div class="value fr">{{data.payeeTaxRegisterNo}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">电话</div>
                                <div class="value fr">{{data.payeeTel}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">税务开户行名称</div>
                                <div class="value fr">{{data.payeeSupBank}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">开户行账号</div>
                                <div class="value fr">{{data.payeeSupAccount}}</div>
                            </div>
                            <div class="sec">
                                销货单位信息
                            </div>
                            <div class="list clear">
                                <div class="text fl">销货单位</div>
                                <div class="value fr">{{data.salesUnitsName}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">纳税人识别号</div>
                                <div class="value fr">{{data.salesTaxRegisterNo}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">发票类型</div>
                                <div class="value fr">{{data.typeInvoice}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">价格方式</div>
                                <div class="value fr">{{data.priceMethod}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">开票状态</div>
                                <div class="value fr">{{data.billState}}</div>
                            </div>
                            <div class="sec">
                                收款信息
                            </div>
                            <div class="list clear">
                                <div class="text fl">收款单位</div>
                                <div class="value fr">{{data.payeeUnitName}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">收款银行</div>
                                <div class="value fr">{{data.payeeSupBank}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">收款账号</div>
                                <div class="value fr">{{data.payeeSupAccount}}</div>
                            </div>
                        </div>
                        <div class="tabList">
                            <div class="sec">
                                合同信息
                            </div>
                            <div class="list clear">
                                <div class="text fl">本次为合同第<span class="highlight">{{data.payTimes}}</span>次付款</div>
                            </div>
                            <a class="list clear"
                               @click="gotoRelated('合同', data.contractNumber)">
                                <div class="text fl">合同编号</div>
                                <img :src="arrow" alt="arrow" class="arrow-r fr">
                                <div class="value fr">{{data.contractNumber}}</div>
                            </a>
                            <div class="list clear">
                                <div class="text fl">合同名称</div>
                                <div class="value fr">{{data.contractName}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">合同金额</div>
                                <div class="value fr">{{data.ConTotalPri | formatMoney}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">发票累计</div>
                                <div class="value fr">{{data.invoiceAmount | formatMoney}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">付款累计</div>
                                <div class="value fr">{{data.actuallyAmount | formatMoney}}</div>
                            </div>
                            <div class="sec">
                                预付款信息
                            </div>
                            <div class="block" v-for="(item, index) in data.perPays">
                                <a class="list clear"
                                   @click="gotoRelated('无合同付款单', item.perPayNum)">
                                    <div class="text fl">单据流水号</div>
                                    <img :src="arrow" alt="arrow" class="arrow-r fr">
                                    <div class="value fr">{{item.perPayNum}}</div>
                                </a>
                                <div class="list clear">
                                    <div class="text fl">本次冲账金额</div>
                                    <div class="value fr">{{data.punAmount | formatMoney}}</div>
                                </div>
                            </div>
                        </div>
                    </template>
                    <!--主合同-->
                    <template title="合同" v-if="name === '合同' && !conbillname">
                        <div class="tabList">
                            <div class="sec">
                                费用明细
                            </div>
                            <div class="block" v-for="(item, index) in data.entrys">
                                <div class="list clear">
                                    <div class="text fl">费用类型</div>
                                    <div class="value fr">{{item.expenseTypeName}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">费用承担公司</div>
                                    <div class="value fr">{{item.FYcompanyName}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">费用承担部门</div>
                                    <div class="value fr">{{item.FYdeptName}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">不含税金额</div>
                                    <div class="value fr">{{item.noTaxAmount | formatMoney}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">税率</div>
                                    <div class="value fr">{{item.taxRate}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">税额</div>
                                    <div class="value fr">{{item.tax | formatMoney}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">含税本金</div>
                                    <div class="value fr">{{item.taxAmount | formatMoney}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">扣减本年预算</div>
                                    <div class="value fr">{{item.budgetDo | formatMoney}}</div>
                                </div>
                            </div>
                            <div class="sec">
                                基本信息
                            </div>
                            <div class="list clear">
                                <div class="text fl">流水号</div>
                                <div class="value fr">{{data.number}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">日期</div>
                                <div class="value fr">{{data.bizDate}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">经办人</div>
                                <div class="value fr">{{data.creatorName}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">合同类别</div>
                                <div class="value fr">{{data.contractTypeName}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">合同名称</div>
                                <div class="value fr">{{data.conName}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">合同号</div>
                                <div class="value fr">{{data.conNumber}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">项目分期</div>
                                <div class="value fr">{{data.projectFenqiName}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">甲方</div>
                                <div class="value fr">{{data.partOneName}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">乙方</div>
                                <div class="value fr">{{data.secondWayName}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">合同类型</div>
                                <div class="value fr">{{data.conFormat}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">合同份数</div>
                                <div class="value fr">{{data.conCount}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">最新总价（含税）</div>
                                <div class="value fr">{{data.newTotalPri | formatMoney}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">合同总价（含税）</div>
                                <div class="value fr">{{data.conTotalPri | formatMoney}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">押金</div>
                                <div class="value fr">{{data.expandOne | formatMoney}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">保修款</div>
                                <div class="value fr">{{data.warranty}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">保修金额</div>
                                <div class="value fr">{{data.warrAmount | formatMoney}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">价格方式</div>
                                <div class="value fr">{{data.priceMethod}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">发票类型</div>
                                <div class="value fr">{{data.typeInvoice}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">是否老合同</div>
                                <div class="value fr" v-if="data.isOldContract!=''">{{data.isOldContract?'是':'否'}}</div>
                                <div class="value fr" v-else></div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">征收政策</div>
                                <div class="value fr">{{data.collectionPolicy}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">招投标</div>
                                <div class="value fr">{{data.biding}}</div>
                            </div>
                            <div class="sec">
                                相关信息
                            </div>
                            <div class="list clear">
                                <div class="text fl">造价性质</div>
                                <div class="value fr">{{data.costNature}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">合同形式</div>
                                <div class="value fr">{{data.conForm}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">单位选择</div>
                                <div class="value fr">{{data.unitSel}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">期限约定</div>
                                <div class="value fr">{{data.termAgree}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">中标方式</div>
                                <div class="value fr">{{data.winnWays}}</div>
                            </div>
                            <router-link class="list clear" v-for="(item, index) in data.contracts" :key="item.fnumber"
                                         :to="'/billdetail?billNum=' + data.straContract">
                                <div class="text fl">战略合同</div>
                                <img :src="arrow" alt="arrow" class="arrow-r fr">
                                <div class="value fr">{{data.straContract}}</div>
                            </router-link>
                            <div class="list clear">
                                <div class="text fl">付款约定</div>
                                <div class="value fr">{{data.paymentAgre}}</div>
                            </div>
                        </div>
                        <div class="tabList">
                            <div class="sec">
                                付款信息
                            </div>
                            <div class="block" v-for="(item, index) in data.contractPayments">
                                <a class="list clear" @click="gotoRelated('合同付款单', item.contractPaymentNumber)">
                                    <div class="text fl">付款单号</div>
                                    <div class="value fr">{{item.contractPaymentNumber}}</div>
                                </a>
                                <div class="list clear">
                                    <div class="text fl">付款金额</div>
                                    <div class="value fr">{{item.contractPaymentTrueAmount | formatMoney}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">单据状态</div>
                                    <div class="value fr">{{item.contractPaymentState}}</div>
                                </div>
                            </div>
                            <div class="sec">
                                预付款信息
                            </div>
                            <div class="block" v-for="(item, index) in data.noContractPayments">
                                <a class="list clear" @click="gotoRelated('无合同付款单', item.noContractPaymentNumber)">
                                    <div class="text fl">预付款单号</div>
                                    <div class="value fr">{{item.noContractPaymentNumber}}</div>
                                </a>
                                <div class="list clear">
                                    <div class="text fl">预付款金额</div>
                                    <div class="value fr"><{{item.noContractPaymentTrueAmount | formatMoney}}/div>
                                    </div>
                                    <div class="list clear">
                                        <div class="text fl">单据状态</div>
                                        <div class="value fr">{{item.noContractPaymentState}}</div>
                                    </div>
                                </div>
                            </div>

                            <div class="sec">
                                累计付款情况
                            </div>
                            <div class="list clear">
                                <div class="text fl">合同应付总金额</div>
                                <div class="value fr">{{data.payAmount | formatMoney}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">合同冲预付金额</div>
                                <div class="value fr">{{data.prepaidAmount | formatMoney}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">合同实付总金额</div>
                                <div class="value fr">{{data.actuallyAmount | formatMoney}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">合同发票总金额</div>
                                <div class="value fr">{{data.invoiceAmount | formatMoney}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">合同未付金额</div>
                                <div class="value fr">{{data.noPayAmount | formatMoney}}</div>
                            </div>
                        </div>
                        <div class="tabList">
                            <div class="sec">
                                合同变更信息
                            </div>
                            <div class="block" v-for="(item, index) in data.changeMsgs">
                                <div class="list clear">
                                    <div class="text fl">变更类型</div>
                                    <div class="value fr">{{item.changeType}}</div>
                                </div>
                                <a class="list clear"
                                   @click="gotoRelated(item.changeType, item.billNum)">
                                    <div class="text fl">单据编号</div>
                                    <img :src="arrow" alt="arrow" class="arrow-r fr">
                                    <div class="value fr">{{item.billNum}}</div>
                                </a>
                                <div class="list clear">
                                    <div class="text fl">单据状态</div>
                                    <div class="value fr">{{item.state}}</div>
                                </div>
                            </div>
                        </div>
                    </template>
                    <!--补充合同-->
                    <template title="补充合同" v-if="conbillname === '补充合同'">
                        <div class="tabList">
                            <div class="sec">
                                费用明细
                            </div>
                            <div class="block" v-for="(item, index) in data.entrys">
                                <div class="list clear">
                                    <div class="text fl">费用类型</div>
                                    <div class="value fr">{{item.expenseTypeName}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">费用承担公司</div>
                                    <div class="value fr">{{item.FYcompanyName}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">费用承担部门</div>
                                    <div class="value fr">{{item.FYdeptName}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">已付金额</div>
                                    <div class="value fr">{{item.isPayAmount}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">原金额（含税）</div>
                                    <div class="value fr">{{item.taxAmount}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">补充金额（含税）</div>
                                    <div class="value fr">{{item.settleAplitAmountTax}}</div>
                                </div>
                                <!--<div class="list clear">-->
                                    <!--<div class="text fl">最新金额（含税）</div>-->
                                    <!--<div class="value fr">{{item.settleAplitAmountTax}}</div>-->
                                <!--</div>-->
                                <div class="list clear">
                                    <div class="text fl">本年扣减预算</div>
                                    <div class="value fr">{{item.budgetDo}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">补充金额（含税）合计值</div>
                                    <div class="value fr">{{item.newTotalPri}}</div>
                                </div>
                            </div>
                            <div class="sec">
                                基本信息
                            </div>
                            <div class="list clear">
                                <div class="text fl">单据流水号</div>
                                <div class="value fr">{{data.number}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">日期</div>
                                <div class="value fr">{{data.bizDate}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">经办人</div>
                                <div class="value fr">{{data.creatorName}}</div>
                            </div>
                        </div>
                        <div class="tabList">
                            <div class="sec">
                                关联主合同信息
                            </div>
                            <div class="block" v-if="data">
                                <div class="list clear">
                                    <div class="text fl">合同类别</div>
                                    <div class="value fr">{{data.mainContracts.mainContractTypeName}}</div>
                                </div>
                                <a class="list clear"
                                   @click="gotoRelated('合同', data.mainContracts.mainConNumber)">
                                    <div class="text fl">主合同</div>
                                    <img :src="arrow" alt="arrow" class="arrow-r fr">
                                    <div class="value fr">{{data.mainContracts.mainConNumber}}</div>
                                </a>
                                <div class="list clear">
                                    <div class="text fl">项目分期</div>
                                    <div class="value fr">{{data.mainContracts.mainProjectFenqiName}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">甲方</div>
                                    <div class="value fr">{{data.mainContracts.mainPartOneName}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">乙方</div>
                                    <div class="value fr">{{data.mainContracts.mainSecondWayName}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">合同最新金额（含税）</div>
                                    <div class="value fr">{{data.mainContracts.mainNewTotalPri | formatMoney}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">发票类型</div>
                                    <div class="value fr">{{data.mainContracts.mainTypeInvoice}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">价格方式</div>
                                    <div class="value fr">{{data.mainContracts.mainPriceMethod}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">征收政策</div>
                                    <div class="value fr">{{data.mainContracts.mainCollectionPolicy}}</div>
                                </div>
                            </div>
                        </div>
                    </template>
                    <!--合同调整-->
                    <template title="合同调整" v-if="conbillname === '合同调整'">
                        <div class="tabList">
                            <div class="sec">
                                费用明细
                            </div>
                            <div class="block" v-for="(item, index) in data.entrys">
                                <div class="list clear">
                                    <div class="text fl">费用类型</div>
                                    <div class="value fr">{{item.expenseTypeName}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">费用承担公司</div>
                                    <div class="value fr">{{item.FYcompanyName}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">费用承担部门</div>
                                    <div class="value fr">{{item.FYdeptName}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">原金额（含税）</div>
                                    <div class="value fr">{{item.taxAmount}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">税率</div>
                                    <div class="value fr">{{item.taxRate}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">税额</div>
                                    <div class="value fr">{{item.tax}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">最新金额（含税）</div>
                                    <div class="value fr">{{item.settleAplitAmountTax}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">差额</div>
                                    <div class="value fr">{{item.availableBudTax}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">本年扣减预算</div>
                                    <div class="value fr">{{item.budgetDo}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">调整金额合计</div>
                                    <div class="value fr">{{item.splitAmount}}</div>
                                </div>
                            </div>
                        </div>
                        <div class="tabList">
                            <div class="sec">
                                主合同信息
                            </div>
                            <div class="block" v-if="data">
                                <a class="list clear"
                                   @click="gotoRelated('合同', data.mainContracts.mainConNumber)">
                                    <div class="text fl">合同编号</div>
                                    <img :src="arrow" alt="arrow" class="arrow-r fr">
                                    <div class="value fr">{{data.mainContracts.mainConNumber}}</div>
                                </a>
                                <div class="list clear">
                                    <div class="text fl">合同名称</div>
                                    <div class="value fr">{{data.mainContracts.mainConName}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">项目分期</div>
                                    <div class="value fr">{{data.mainContracts.mainProjectFenqiName}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">甲方</div>
                                    <div class="value fr">{{data.mainContracts.mainPartOneName}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">乙方</div>
                                    <div class="value fr">{{data.mainContracts.mainSecondWayName}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">丙方</div>
                                    <div class="value fr">{{data.mainContracts.mainThirdWayName}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">合同最新金额（含税）</div>
                                    <div class="value fr">{{data.mainContracts.mainNewTotalPri}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">发票类型</div>
                                    <div class="value fr">{{data.mainContracts.mainTypeInvoice}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">价格方式</div>
                                    <div class="value fr">{{data.mainContracts.mainPriceMethod}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">征收政策</div>
                                    <div class="value fr">{{data.mainContracts.mainCollectionPolicy}}</div>
                                </div>
                            </div>
                        </div>
                    </template>
                    <!--战略合同-->
                    <template title="战略合同" v-if="conbillname === '战略合同'">
                        <div class="tabList">
                            <div class="sec">
                                费用明细
                            </div>
                            <div class="block" v-for="(item, index) in data.entrys">
                                <div class="list clear">
                                    <div class="text fl">费用类型</div>
                                    <div class="value fr">{{item.expenseTypeName}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">费用承担公司</div>
                                    <div class="value fr">{{item.FYcompanyName}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">费用承担部门</div>
                                    <div class="value fr">{{item.FYdeptName}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">不含税金额</div>
                                    <div class="value fr">{{item.noTaxAmount}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">税率</div>
                                    <div class="value fr">{{item.taxRate}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">税额</div>
                                    <div class="value fr">{{item.tax}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">含税金额</div>
                                    <div class="value fr">{{item.taxAmount}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">本年扣减预算</div>
                                    <div class="value fr">{{item.budgetDo}}</div>
                                </div>
                            </div>
                            <div class="sec">
                                基本信息
                            </div>
                            <div class="list clear">
                                <div class="text fl">合同流水号</div>
                                <div class="value fr">{{data.number}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">日期</div>
                                <div class="value fr">{{data.bizDate}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">经办人</div>
                                <div class="value fr">{{data.creatorName}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">合同类别</div>
                                <div class="value fr">{{data.contractTypeName}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">合同名称</div>
                                <div class="value fr">{{data.conName}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">合同号</div>
                                <div class="value fr">{{data.conNumber}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">项目分期</div>
                                <div class="value fr">{{data.projectFenqiName}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">甲方</div>
                                <div class="value fr">{{data.partOneName}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">乙方</div>
                                <div class="value fr">{{data.secondWayName}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">合同类型</div>
                                <div class="value fr">{{data.conFormat}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">合同份数</div>
                                <div class="value fr">{{data.conCount}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">最新总价（含税）</div>
                                <div class="value fr">{{data.newTotalPri}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">合同总价（含税）</div>
                                <div class="value fr">{{data.conTotalPri}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">押金</div>
                                <div class="value fr">{{data.expandOne}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">是否老合同</div>
                                <div class="value fr" v-if="data.isOldContract!=''">{{data.isOldContract?'是':'否'}}</div>
                                <div class="value fr" v-else></div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">招投标</div>
                                <div class="value fr">{{data.biding}}</div>
                            </div>
                            <div class="sec">
                                相关信息
                            </div>
                            <div class="list clear">
                                <div class="text fl">造价性质</div>
                                <div class="value fr">{{data.costNature}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">合同形式</div>
                                <div class="value fr">{{data.conForm}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">单位选择</div>
                                <div class="value fr">{{data.unitSel}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">期限约定</div>
                                <div class="value fr">{{data.termAgree}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">中标方式</div>
                                <div class="value fr">{{data.winnWays}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">付款约定</div>
                                <div class="value fr">{{data.winnWays}}</div>
                            </div>
                        </div>
                        <div class="tabList">
                            <div class="sec">
                                关联订单信息
                            </div>
                            <a class="list clear" v-if="data"
                               @click="gotoRelated('合同', data.mainContracts.mainConNumber)">
                                <div class="text fl">单据编号</div>
                                <img :src="arrow" alt="arrow" class="arrow-r fr">
                                <div class="value fr">{{data.mainContracts.mainConNumber}}</div>
                            </a>
                        </div>
                    </template>
                    <template title="无合同付款单" v-if="name === '无合同付款单'">
                        <div class="tabList">
                            <div class="sec">
                                费用明细
                            </div>
                            <div class="block" v-for="(item, index) in data.entrys">
                                <div class="list clear">
                                    <div class="text fl">费用类型</div>
                                    <div class="value fr">{{item.expenseTypeName}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">费用承担公司</div>
                                    <div class="value fr">{{item.FYcompanyName}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">费用承担部门</div>
                                    <div class="value fr">{{item.FYdeptName}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">事项申请金额</div>
                                    <div class="value fr">{{item.setAmount | formatMoney}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">应付金额</div>
                                    <div class="value fr">{{item.YFamount | formatMoney}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">税率</div>
                                    <div class="value fr">{{item.taxRate}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">税额</div>
                                    <div class="value fr">{{item.tax | formatMoney}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">价税合计</div>
                                    <div class="value fr">{{item.taxAmount | formatMoney}}</div>
                                </div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">发票总金额</div>
                                <div class="value fr">{{data.billAccount | formatMoney}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">应付金额</div>
                                <div class="value fr">{{data.payAmount | formatMoney}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">其他扣款</div>
                                <div class="value fr">{{data.claimAmount | formatMoney}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">冲预付金额</div>
                                <div class="value fr">{{data.prePaidAmt | formatMoney}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">冲借金额</div>
                                <div class="value fr">{{data.borrowAmount | formatMoney}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">实付金额</div>
                                <div class="value fr">{{data.netPayAmount | formatMoney}}</div>
                            </div>

                            <div class="sec">
                                基本信息
                            </div>
                            <div class="list clear">
                                <div class="text fl">流水号</div>
                                <div class="value fr">{{data.number}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">经办人</div>
                                <div class="value fr">{{data.creatorName}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">填单日期</div>
                                <div class="value fr">{{data.createTime}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">付款类型</div>
                                <div class="value fr">{{data.noContractPaymentTypeName}}</div>
                            </div>
                            <a class="list clear"
                               @click="gotoRelated('事项申请单', data.projectAppNum)">
                                <div class="text fl">关联事项</div>
                                <img :src="arrow" alt="arrow" class="arrow-r fr">
                                <div class="value fr">{{data.projectAppName}}</div>
                            </a>
                            <div class="list clear">
                                <div class="text fl">项目分期</div>
                                <div class="value fr">{{data.projectFenqiName}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">是否老项目</div>
                                <div class="value fr" v-if="data.isNewProject!=''">{{data.isNewProject?'是':'否'}}</div>
                                <div class="value fr" v-else></div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">是否预付</div>
                                <div class="value fr" v-if="data.isPrepaid!=''">{{data.isPrepaid?'是':'否'}}</div>
                                <div class="value fr" v-else></div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">是否代付</div>
                                <div class="value fr" v-if="data.isPayThe!=''">{{data.isPayThe?'是':'否'}}</div>
                                <div class="value fr" v-else></div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">发票类型</div>
                                <div class="value fr">{{data.typeInvoice}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">价格方式</div>
                                <div class="value fr">{{data.priceMethod}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">开票状态</div>
                                <div class="value fr">{{data.billState}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">是否抵扣</div>
                                <div class="value fr" v-if="data.isDeductible!=''">{{data.isDeductible?'是':'否'}}</div>
                                <div class="value fr" v-else></div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">征收政策</div>
                                <div class="value fr">{{data.collectionPolicy}}</div>
                            </div>
                        </div>
                        <div class="tabList">
                            <div class="sec">
                                付款信息
                            </div>
                            <div class="list clear">
                                <div class="text fl">付款公司</div>
                                <div class="value fr">{{data.proBooksName}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">购货单位</div>
                                <div class="value fr">{{data.payeeName}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">纳税人识别号</div>
                                <div class="value fr">{{data.payeeTaxRegisterNo}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">税务开户行</div>
                                <div class="value fr">{{data.payeeSupBank}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">账号</div>
                                <div class="value fr">{{data.accountBankNum}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">地址</div>
                                <div class="value fr">{{data.payeeAddress}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">电话</div>
                                <div class="value fr">{{data.payeeTel}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">结算方式</div>
                                <div class="value fr">{{data.payWayName}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">付款银行</div>
                                <div class="value fr">{{data.accountBankName}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">付款账户</div>
                                <div class="value fr">{{data.accountBankNum}}</div>
                            </div>
                            <div class="sec">
                                收款信息
                            </div>
                            <div class="block" v-for="(item, index) in data.ManyPaymentEntrys">
                                <div class="list clear">
                                    <div class="text fl">收款人</div>
                                    <div class="value fr">{{item.ManyPaymentPayeeName}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">收款人类型</div>
                                    <div class="value fr">{{item.ManyPaymentPayeeType}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">收款人银行</div>
                                    <div class="value fr">{{item.ManyPaymentPayeeBank}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">收款人账号</div>
                                    <div class="value fr">{{item.ManyPaymentPayeeAccount}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">金额</div>
                                    <div class="value fr">{{item.ManyPaymentPayeeAmount | formatMoney}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">付款状态</div>
                                    <div class="value fr">{{item.ManyPaymentPayState}}</div>
                                </div>
                            </div>
                        </div>
                        <div class="tabList">
                            <div class="sec">
                                预付款信息
                            </div>
                            <div class="block" v-for="(item, index) in data.perPays">
                                <a class="list clear"
                                   @click="gotoRelated('无合同付款单', item.perPayNum)">
                                    <div class="text fl">预付单号</div>
                                    <img :src="arrow" alt="arrow" class="arrow-r fr">
                                    <div class="value fr">{{item.perPayNum}}</div>
                                </a>
                                <div class="list clear">
                                    <div class="text fl">冲预付金额</div>
                                    <div class="value fr">{{item.punAmount | formatMoney}}</div>
                                </div>
                            </div>
                        </div>
                    </template>
                    <template title="合同结算" v-if="name === '合同结算'">
                        <div class="tabList">
                            <div class="sec">
                                费用明细
                            </div>
                            <div class="block" v-for="(item, index) in data.entrys">
                                <div class="list clear">
                                    <div class="text fl">费用类型</div>
                                    <div class="value fr">{{item.expenseTypeName}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">费用承担公司</div>
                                    <div class="value fr">{{item.FYcompanyName}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">费用承担部门</div>
                                    <div class="value fr">{{item.FYdeptName}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">原金额（不含税）</div>
                                    <div class="value fr">{{item.splitAmountNoTax | formatMoney}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">原金额（含税）</div>
                                    <div class="value fr">{{item.splitAmount | formatMoney}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">已付金额</div>
                                    <div class="value fr">{{item.isPayAmount | formatMoney}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">结算金额（不含税）</div>
                                    <div class="value fr">{{item.settleAplitAmountNoTax | formatMoney}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">结算金额（含税）</div>
                                    <div class="value fr">{{item.settleAplitAmount | formatMoney}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">税率</div>
                                    <div class="value fr">{{item.taxRate}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">差额（不含税）</div>
                                    <div class="value fr">{{item.availableBud | formatMoney}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">差额（含税）</div>
                                    <div class="value fr">{{item.dif | formatMoney}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">本年扣减预算</div>
                                    <div class="value fr">{{item.budgetDo | formatMoney}}</div>
                                </div>
                                <div class="list clear">
                                    <div class="text fl">结算金额（含税）合计</div>
                                    <div class="value fr">{{item.settleAmount | formatMoney}}</div>
                                </div>
                            </div>

                            <div class="sec">
                                基本信息
                            </div>
                            <div class="list clear">
                                <div class="text fl">单据流水号</div>
                                <div class="value fr">{{data.number}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">日期</div>
                                <div class="value fr">{{data.bizDate}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">经办人</div>
                                <div class="value fr">{{data.creatorName}}</div>
                            </div>
                        </div>
                        <div class="tabList">
                            <div class="sec">
                                主合同信息
                            </div>
                            <div class="list clear">
                                <div class="text fl">合同单号</div>
                                <div class="value fr">{{data.conNumber}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">合同类别</div>
                                <div class="value fr">{{data.contractTypeName}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">合同类型</div>
                                <div class="value fr">{{data.conFormat}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">项目分期</div>
                                <div class="value fr">{{data.projectFenqiName}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">是否老项目</div>
                                <div class="value fr" v-if="data.isOldItem!=''">{{data.isOldItem?'是':'否'}}</div>
                                <div class="value fr" v-else></div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">甲方</div>
                                <div class="value fr">{{data.partOneName}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">乙方</div>
                                <div class="value fr">{{data.secondWayName}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">合同总价（含税）</div>
                                <div class="value fr">{{data.conTotalPri | formatMoney}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">最新总价（含税）</div>
                                <div class="value fr">{{data.newTotalPri | formatMoney}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">保修金额</div>
                                <div class="value fr">{{data.warrAmount | formatMoney}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">押金</div>
                                <div class="value fr">{{data.expandOne | formatMoney}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">价格方式</div>
                                <div class="value fr">{{data.priceMethod}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">征收政策</div>
                                <div class="value fr">{{data.collectionPolicy}}</div>
                            </div>
                            <div class="list clear">
                                <div class="text fl">发票类型</div>
                                <div class="value fr">{{data.typeInvoice}}</div>
                            </div>
                        </div>
                    </template>
                    <template title="差旅报销单" v-if="name === '差旅报销单'">
                        <div class="tabList">
                            <div class="wrap" v-if="data">
                                <div class="sec">
                                    基本信息
                                </div>
                                <div class="block">
                                    <div class="list clear">
                                        <div class="text fl">单号</div>
                                        <div class="value fr">{{$route.query.billNum}}</div>
                                    </div>
                                    <!--<div class="list clear">-->
                                        <!--<div class="text fl">费用归属日期</div>-->
                                        <!--<div class="value fr"></div>-->
                                    <!--</div>-->
                                    <div class="list clear">
                                        <div class="text fl">报销公司</div>
                                        <div class="value fr">{{data.t.tinfo[0].FCOSTCENTERNAME}}</div>
                                    </div>
                                </div>
                                <div class="sec">
                                    行程信息
                                </div>
                                <div class="section" v-for="(item, index) in data.t.tinfo">
                                    <div class="travelcard" :style="{backgroundImage: 'url('+ cardSrc +')'}">
                                        <div class="list-all">
                                            <div class="card">
                                                <div class="left">
                                                    <p class="location">{{item.FFROM}}</p>
                                                    <p class="time">{{item.FSTARTDATE.substring(0, 10)}}</p>
                                                </div>
                                                <div class="right">
                                                    <p class="location">{{item.FTO}}</p>
                                                    <p class="time">{{item.FENDDATE.substring(0, 10)}}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="list clear">
                                        <div class="text fl">报销部门</div>
                                        <div class="value fr">{{item.FCOMPANYNAME}}</div>
                                    </div>
                                    <div class="list clear">
                                        <div class="text fl">出差补贴</div>
                                        <div class="value fr">{{item.FEVENTIONSUBSIDY | formatMoney}}</div>
                                    </div>
                                    <div class="list clear">
                                        <div class="text fl">其他费用</div>
                                        <div class="value fr">{{item.FHOTELEXPENSE | formatMoney}}</div>
                                    </div>
                                    <div class="list clear">
                                        <div class="text fl">住宿费</div>
                                        <div class="value fr">{{item.FHOTELEXPENSE | formatMoney}}</div>
                                    </div>
                                    <div class="list clear">
                                        <div class="text fl">长途飞机-交通</div>
                                        <div class="value fr">{{item.FBUSSESEXPENSE | formatMoney}}</div>
                                    </div>
                                    <div class="list clear">
                                        <div class="text fl">市内交通</div>
                                        <div class="value fr">{{item.FTAXIEXPENSE | formatMoney}}</div>
                                    </div>
                                </div>
                                <div class="sec">
                                    收款信息
                                </div>
                                <div class="block" v-for="(item, index) in data.t.tbank">
                                    <div class="list clear">
                                        <div class="text fl">收款人</div>
                                        <div class="value fr">{{item.FPAYEENAME}}</div>
                                    </div>
                                    <div class="list clear">
                                        <div class="text fl">收款人银行</div>
                                        <div class="value fr">{{item.FPAYEEBANK}}</div>
                                    </div>
                                    <div class="list clear">
                                        <div class="text fl">收款人账户</div>
                                        <div class="value fr">{{item.FPAYEEACCOUNT}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                    <!--<template v-else>-->
                    <!--<div class="tabList">1</div>-->
                    <!--<div class="tabList">2</div>-->
                    <!--</template>-->
                </div>
            </div>
        </slide-tab>
        <div class="bottom" v-if="index === 0 && arrProcess.indexOf(name) !== -1">
            <!--电话号码等下问一下-->
            <a href="tel:400-816-8111" class="call">
                <img class="call" src="../img/call.png">
            </a>
            <router-link :to="'/report'">
                <img class="service" src="../img/service.png">
            </router-link>
        </div>
    </div>
</template>

<script>
    import slideTab from '../components/slideTab.vue';
    import process from '../pages/billProcess.vue';
    import { Indicator } from 'mint-ui'; // Toast
    import axios from 'axios';

    export default {
        components: {
            slideTab,
            process
        },
        data() {
            return {
                arrow: require('../img/arrow-right.png'),
                cardSrc: require('../img/travelcard.png'),
                index: 0,
                avatar: require('../img/avatar.png'),
                type: 'report',
                billNum: '',
                data: '',
                brief: [],
                arrProcess: ['其他费用报销单', '通讯费报销单', '车辆费报销单', '交通费报销单',
                    '差旅报销单', '电脑报销单', '合同付款单', '无合同付款单'],
                isHide: false,
                showTab: true
            };
        },
        computed: {
            query() {
                return this.$route.query;
            },
            conbillname() {
                if (this.query.conbillname) {
                    return this.query.conbillname;
                } else {
                    return window.localStorage.getItem('conbillname');
                }
            },
            name() {
                if (this.query.billname) {
                    return this.query.billname;
                } else {
                    return window.localStorage.getItem('billname');
                }
            },
            cause() {
                if (this.name === '差旅报销单') {
                    return this.brief.FCAUSE;
                } else {
                    return this.data.cause || this.data.remark;
                }
//                if (this.query.cause) {
//                    return this.query.cause;
//                } else {
//                    return window.localStorage.getItem('cause');
//                }
            },
            state() {
                if (this.name === '差旅报销单') {
                    return this.BILLSTATE[this.brief.FSTATE];
                } else {
                    return this.BILLSTATE[this.data.state];
                }
//                if (this.query.state) {
//                    return this.BILLSTATE[this.query.state];
//                } else {
//                    return this.BILLSTATE[window.localStorage.getItem('state')];
//                }
            },
            money() {
                /* eslint-disable no-unused-vars */
                var money = 0;
                if (this.name === '差旅报销单') {
                    return this.brief.FAMOUNT;
                }
                if (!this.data) {
                    return;
                }
                if (this.data.entrys && (this.name === '其他费用报销单' ||
                    this.name === '通讯费报销单' || this.name === '车辆费报销单' || this.name === '交通费报销单')) {
                    return this.data.entrys[0].applyAmount;
                } else if (this.data.entrys) {
                    money = this.data.entrys[0].applyAmount || this.data.entrys[0].amount ||
                        this.data.entrys[0].setAmount || this.data.entrys[0].budgetDo;
                }
                return this.data.amount || this.data.accountAmount || this.data.theAccountAmount ||
                    this.data.totalPayAmount || this.data.conTotalPri || money;
//                if (this.query.amount) {
//                    return this.query.amount;
//                } else {
//                    return window.localStorage.getItem('money');
//                }
            },
            list() {
                var arr = [];

                // 费用详情 收付款详情 关联单据 进度追踪
                if (this.name === '事项申请单') {
                    arr = ['费用详情', '关联单据'];
                    this.type = 'apply';
                } else if (this.name === '电脑申请单') {
                    arr = ['费用详情', '报销信息'];
                    this.type = 'apply';
                } else if (this.name === '借款单' || this.name === '还款单') {
                    arr = ['费用详情', '收付款详情', '关联单据'];
                    this.type = 'apply';
                } else if (this.name === '其他费用报销单' || this.name === '通讯费报销单' ||
                    this.name === '车辆费报销单' || this.name === '交通费报销单' ||
                    this.name === '合同付款单' || this.name === '无合同付款单') {
                    arr = ['进度追踪', '费用详情', '收付款详情', '关联单据'];
                } else if (this.name === '费用申请单') {
                    arr = ['费用详情', '关联单据'];
                } else if (this.name === '电脑报销单') {
                    arr = ['进度追踪', '费用详情', '收付款详情'];
                } else if (this.name === '合同' && !this.conbillname) {
                    arr = ['费用详情', '收付款详情', '相关信息'];
                } else if (this.name === '合同结算' || this.conbillname === '战略合同' ||
                    this.conbillname === '补充合同' || this.conbillname === '合同调整') {
                    arr = ['费用详情', '关联单据'];
                } else if (this.name === '差旅报销单') {
                    arr = ['进度追踪', '费用详情'];
                }
                return arr;
            },
            icon() {
                var src = this.BILLICONS[this.name];
                return src;
            }
        },
        methods: {
            onTab(index) {
//                console.log(index);
                this.index = index;
            },
            loadDetail() {
                var billNum = this.$route.query.billNum;
                var method = this.DETAILARR[this.name];
                var self = this;
                var url;
                this.billNum = billNum;

                if (this.name !== '差旅报销单') {
                    url = this.HOST + '?method=' + method + '&billNum=' + billNum + '&sessionID=' + this.SESSIONID;
                } else {
                    url = this.HOST + '?method=' + method + '&fnumber=' + billNum + '&sessionID=' + this.SESSIONID;
                }
                Indicator.open({
                    text: '加载中...',
                    spinnerType: 'snake'
                });
                axios.post(url).then(res => {
                    this.data = res.data;
                    this.isHide = false;
                    if (this.name === '差旅报销单' && this.brief.length > 0) {
                        Indicator.close();
                        console.log(0);
                    }
                    if (this.name !== '差旅报销单') {
                        Indicator.close();
                    }
                    console.log(this.data);
                });
            },
            getBrief() {
                var url = this.HOST + '?method=listTravelBillWK&unumber=' + this.USERNUM + '&sessionID=' + this.SESSIONID;
                var billNum = this.query.billNum;

                Indicator.open({
                    text: '加载中...',
                    spinnerType: 'snake'
                });
                axios.post(url).then(res => {
                    var list = res.data.t;
                    for (var i = 0; i < list.length; i++) {
                        if (billNum === list[i].FNUMBER) {
                            this.brief = list[i];
                            console.log('list:' + this.brief);
                        }
                    }
                    console.log(list);
                    Indicator.close();
                    console.log(1);
                });
            },
            ifChinese(str) {
                var myReg = /.*[\u4e00-\u9fa5]+.*$/;
                if (myReg.test(str)) {
                    return true;
                } else {
                    return false;
                }
            },
            gotoRelated(name, num, state, cause, amount, conFormat) {
                /* eslint-disable no-unused-vars */
//                var billName = name;
                var conbillname;

                if (conbillname) {
                    switch (conFormat) {
                    case 'strcon':
                        conbillname = '战略合同';
                        break;
                    case 'consplit':
                        conbillname = '合同调整';
                        break;
                    case 'addcon':
                        conbillname = '补充合同';
                        break;
                    }
                } else {
                    conbillname = '';
                }
                if (name === '合同预结算') {
                    name = '合同结算';
                }
                if (!this.ifChinese(name)) {
                    name = this.BILLTYPES[name];
                }

                if (!cause) {
                    cause = '';
                }
                if (!state) {
                    state = '';
                }
                if (!amount) {
                    amount = '';
                }
                console.log(cause, state, amount);
                this.$router.push('/billdetail?billNum=' + num + '&billname=' +
                name + '&state=' + state + '&cause=' + cause + '&amount=' + amount + '&conFormat=' +
                    conbillname);
            },
            isShowList() {
                if (this.isHide) {
                    return;
                }
                var value = document.querySelectorAll('.value.fr');
                var sec = document.querySelectorAll('.sec');

                // remove没有值的字段
                for (let i = 0; i < value.length; i++) {
                    if (!value[i].innerText && value[i].innerText !== '0') {
                        var list = value[i].parentNode;
                        list.parentNode.removeChild(list);
                    }
                }
                // 隐藏没有下属列表的标题
                for (let i = 0; i < sec.length; i++) {
                    if (!sec[i].nextElementSibling) {
                        sec[i].style.display = 'none';
                    } else if (sec[i].nextElementSibling.className === 'sec') {
                        sec[i].style.display = 'none';
                    }
                }
                this.isHide = true;
            }
        },
        created() {
            this.showTab = true;
            this.loadDetail();
            if (this.name === '差旅报销单') {
                this.getBrief();
            }
        },
        updated() {
            this.showTab = true;
            this.isShowList();
        },
        watch: {
            '$route.query'() {
                this.showTab = false;
                this.loadDetail();
            }
        }
    };
</script>

<style lang="less" scoped>
    @import "../css/var.less";

    .billdetail {
        height: 100%;
        overflow: hidden;
        .detailhead {
            position: absolute;
            z-index: 999;
            width: 100%;
            height: 1.8rem;
            padding: .26rem .28rem .32rem;
            background-color: @theme-color;
            color: #fff;
            .text {
                margin-left: .28rem;
                margin-top: .1rem;
                div {
                    line-height: 1;
                }
            }
            .avatar {
                width: 1.1rem;
                height: 1.1rem;
                margin-top: .1rem;
                background-size: .6rem;
                background-repeat: no-repeat;
                background-position: center;
                background-color: #fff;
            }
            .billstatus {
                font-size: .28rem;
                margin-bottom: .1rem;
                .status {
                    display: inline-block;
                    background-color: #fff;
                    color: #51c693;
                    height: .28rem;
                    line-height: .28rem;
                    font-size: .22rem;
                    padding: 0 .075rem;
                    border-radius: .04rem;
                }
            }
            .note {
                font-size: .28rem;
                /*font-size: .32rem;*/
                width: 5.5rem;
                margin-bottom: .1rem;
                /*margin-bottom: .14rem;*/
            }
            .money {
                font-size: .28rem;
                /*font-size: @sub-title-fsize;*/
           }
       }
       a.list {
           display: block !important;
           .value {
               color: @theme-color;
           }
       }
       .arrow-r {
           margin-top: .06rem;
       }
       .bottom {
           position: absolute;
           bottom: 0;
           width: 100%;
           height: .8rem;
           line-height: .8rem;
           background-color: #fff;
           border-top: 1px solid #e0e0e0;
           text-align: right;
           padding-right: .4rem;
           img {
               width: .4rem;
               height: .4rem;
               &.service {
                   margin-left: .4rem;
               }
           }
       }
   }

   .tabItem {
       top: 1.8rem;
   }

   .tabBox {
       margin-top: 2.6rem;
   }
   .travelcard {
       position: relative;
       /*margin-bottom: .2rem;*/
        padding-top: 2.2rem;

        background-color: #fff;
        background-repeat: no-repeat;
        background-size: 7rem 1.92rem;
        background-position: .28rem .28rem;
        border-top: 1px solid #e0e0e0;
        .card {
            padding: .1rem 0;
            text-align: center;
            background-color: #fff;
            color: #fff;
            .left, .right {
                width: 3rem;
                height: 1rem;
                position: absolute;
                top: .82rem;
                .location {
                    font-weight: bold;
                    font-size: .34rem;
                }
                .time {
                    font-size: .2rem;
                    margin-top: .2rem;
                }
            }
            .left {
                left: .5rem;
            }
            .right {
                right: .5rem;
            }
        }
    }
</style>
