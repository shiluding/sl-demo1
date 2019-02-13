<template>
	<el-container class="syh-container" style="background-color: #F1F1F1;">
		<el-header>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>主页</el-breadcrumb-item>
				<el-breadcrumb-item>商品中心</el-breadcrumb-item>
				<el-breadcrumb-item to="/emailProjectTrends">易茂项目申报动态</el-breadcrumb-item>
				<el-breadcrumb-item>新增项目</el-breadcrumb-item>
			</el-breadcrumb>
		</el-header>
		<el-main>
			<div class="assess">
				<h3 class="title">新增项目</h3>
				<el-form :model="formDatas" ref="formDatas" hide-required-asterisk label-width="100px" inline :rules="rules1" size="small">
					<div class="info1">
						<div class="infoBox">
							<div class="lines">
								<el-form-item label="项目分类" prop="categoryId">
									<el-select v-model="formDatas.categoryId" placeholder="" @change="handleCategoryOneChange">
										<el-option
											v-for="item in categoryOne_options"
											:key="item.categoryId"
											:label="item.categoryName"
											:value="item.categoryId">
										</el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="" prop="categorySid">
									<el-select v-model="formDatas.categorySid" placeholder="" @change="handleCategoryTwoChange">
										<el-option
											v-for="item in categoryTwo_options"
											:key="item.categoryId"
											:label="item.categoryName"
											:value="item.categoryId">
										</el-option>
									</el-select>
								</el-form-item>
							</div>
							<div class="line">
								<el-form-item label="合同编号" prop="contractNo">
									<el-input clearable placeholder="请输入合同编号" v-model="formDatas.contractNo"></el-input>
								</el-form-item>
								<el-form-item label="合同附件" prop="contractList">
									<div class="uploadBox">
										<el-upload
											action=""
											:multiple="true"
											accept=".jpg,.jpeg,.JPG,.JPEG,.pdf,.PDF"
											:http-request="Upload"
											:before-remove="uploadBeforeRemove">
											<span class="uploadBtn">上传附件</span>
										</el-upload>
									</div>
								</el-form-item>
							</div>
						</div>
					</div>
				</el-form>
				<el-form :model="HtEmProjectApplicationInfoDto" ref="HtEmProjectApplicationInfoDto" hide-required-asterisk label-width="100px" inline :rules="rules2" size="small">
					<div class="info2">
						<h6>申请信息</h6>
						<div class="infoBox" v-if="istechnology">
							<div class="line">
								<el-form-item label="项目名称" prop="copyrightName" v-if="iscopyrightInput">
									<el-input clearable placeholder="请输入名称" v-model="HtEmProjectApplicationInfoDto.copyrightName"></el-input>
								</el-form-item>
								<el-form-item label="项目名称" prop="copyrightName" v-if="!iscopyrightInput">
									<el-select v-model="HtEmProjectApplicationInfoDto.copyrightName" placeholder="" filterable>
										<el-option
											v-for="item in categoryProject_options"
											:key="item.projectProductId"
											:label="item.projectProductName"
											:value="item.projectProductName">
										</el-option>
									</el-select>
								</el-form-item>
							</div>
							<div class="line">
								<el-form-item label="截止日期" prop="deadlineTime">
									<el-date-picker
										v-model="HtEmProjectApplicationInfoDto.deadlineTime"
										type="date"
										format="yyyy年MM月dd日"
										value-format="yyyy年MM月dd日"
										placeholder="请选择日期">
									</el-date-picker>
								</el-form-item>
								<el-form-item label="归口部门" prop="department">
									<el-input clearable placeholder="请输入归口部门" v-model="HtEmProjectApplicationInfoDto.department"></el-input>
								</el-form-item>
							</div>
							<div class="line">
								<el-form-item label="联系人" prop="contactName">
									<el-input clearable placeholder="请输入联系人" v-model="HtEmProjectApplicationInfoDto.contactName"></el-input>
								</el-form-item>
								<el-form-item label="固定电话" prop="phone">
									<el-input clearable placeholder="请输入固定电话" v-model="HtEmProjectApplicationInfoDto.phone"></el-input>
								</el-form-item>
							</div>
						</div>
						<div class="infoBox" v-if="iscopyright">
							<div class="line">
								<el-form-item label="知识产权名称" prop="copyrightName" v-if="iscopyrightInput">
									<el-input clearable placeholder="请输入名称" v-model="HtEmProjectApplicationInfoDto.copyrightName"></el-input>
								</el-form-item>
								<el-form-item label="知识产权名称" prop="copyrightName" v-if="!iscopyrightInput">
									<el-select v-model="HtEmProjectApplicationInfoDto.copyrightName" placeholder="" filterable>
										<el-option
											v-for="item in categoryProject_options"
											:key="item.projectProductId"
											:label="item.projectProductName"
											:value="item.projectProductName">
										</el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="申请日期" prop="applyTime">
									<el-date-picker
										v-model="HtEmProjectApplicationInfoDto.applyTime"
										type="date"
										format="yyyy年MM月dd日"
										value-format="yyyy年MM月dd日"
										placeholder="请选择申请日期">
									</el-date-picker>
								</el-form-item>
							</div>
						</div>
						<div class="infoBox" v-if="istrademark">
							<div class="line">
								<el-form-item label="知识产权名称" prop="copyrightName" v-if="iscopyrightInput">
									<el-input clearable placeholder="请输入名称" v-model="HtEmProjectApplicationInfoDto.copyrightName"></el-input>
								</el-form-item>
								<el-form-item label="知识产权名称" prop="copyrightName" v-if="!iscopyrightInput">
									<el-select v-model="HtEmProjectApplicationInfoDto.copyrightName" placeholder="" filterable>
										<el-option
											v-for="item in categoryProject_options"
											:key="item.projectProductId"
											:label="item.projectProductName"
											:value="item.projectProductName">
										</el-option>
									</el-select>
								</el-form-item>
							</div>
							<div class="line">
								<el-form-item label="申请日期" prop="applyTime">
									<el-date-picker
										v-model="HtEmProjectApplicationInfoDto.applyTime"
										type="date"
										format="yyyy年MM月dd日"
										value-format="yyyy年MM月dd日"
										placeholder="请选择申请日期">
									</el-date-picker>
								</el-form-item>
								<el-form-item label="类别" prop="brandType">
									<el-input clearable placeholder="请输入类别" v-model="HtEmProjectApplicationInfoDto.brandType"></el-input>
								</el-form-item>
							</div>
						</div>
						<div class="infoBox" v-if="isproject">
							<div class="line">
								<el-form-item label="项目名称" prop="copyrightName" v-if="iscopyrightInput">
									<el-input clearable placeholder="请输入名称" v-model="HtEmProjectApplicationInfoDto.copyrightName"></el-input>
								</el-form-item>
								<el-form-item label="项目名称" prop="copyrightName" v-if="!iscopyrightInput">
									<el-select v-model="HtEmProjectApplicationInfoDto.copyrightName" placeholder="" filterable>
										<el-option
											v-for="item in categoryProject_options"
											:key="item.projectProductId"
											:label="item.projectProductName"
											:value="item.projectProductName">
										</el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="截止日期" prop="deadlineTime">
									<el-date-picker
										v-model="HtEmProjectApplicationInfoDto.deadlineTime"
										type="date"
										format="yyyy年MM月dd日"
										value-format="yyyy年MM月dd日"
										placeholder="请选择日期">
									</el-date-picker>
								</el-form-item>
							</div>
							<div class="line">
								<el-form-item label="归口部门" prop="department">
									<el-input clearable placeholder="请输入归口部门" v-model="HtEmProjectApplicationInfoDto.department"></el-input>
								</el-form-item>
								<el-form-item label="联系人" prop="contactName">
									<el-input clearable placeholder="请输入联系人" v-model="HtEmProjectApplicationInfoDto.contactName"></el-input>
								</el-form-item>
							</div>
							<div class="line">
								<el-form-item label="材料受理地址" prop="checkAddress">
									<el-input clearable placeholder="请输入材料受理地址" v-model="HtEmProjectApplicationInfoDto.checkAddress"></el-input>
								</el-form-item>
								<el-form-item label="固定电话" prop="phone">
									<el-input clearable placeholder="请输入固定电话" v-model="HtEmProjectApplicationInfoDto.phone"></el-input>
								</el-form-item>
							</div>
						</div>
						<div class="infoBox" v-if="ispatent">
							<div class="line">
								<el-form-item label="知识产权名称" prop="copyrightName" v-if="iscopyrightInput">
									<el-input clearable placeholder="请输入名称" v-model="HtEmProjectApplicationInfoDto.copyrightName"></el-input>
								</el-form-item>
								<el-form-item label="知识产权名称" prop="copyrightName" v-if="!iscopyrightInput">
									<el-select v-model="HtEmProjectApplicationInfoDto.copyrightName" placeholder="" filterable>
										<el-option
											v-for="item in categoryProject_options"
											:key="item.projectProductId"
											:label="item.projectProductName"
											:value="item.projectProductName">
										</el-option>
									</el-select>
								</el-form-item>
							</div>
							<div class="line">
								<el-form-item label="发明人" prop="originator">
									<el-input clearable placeholder="请输入发明人" v-model="HtEmProjectApplicationInfoDto.originator"></el-input>
								</el-form-item>
								<el-form-item label="申请日期" prop="applyTime">
									<el-date-picker
										v-model="HtEmProjectApplicationInfoDto.applyTime"
										type="date"
										format="yyyy年MM月dd日"
										value-format="yyyy年MM月dd日"
										placeholder="请选择申请日期">
									</el-date-picker>
								</el-form-item>
							</div>
							<div class="line">
								<el-form-item label="是否设置年费提醒" prop="setYearlyPopup">
									<el-switch
										v-model="HtEmProjectApplicationInfoDto.setYearlyPopup"
										:active-value="1"
										:inactive-value="2"
										@change="handleYearly">
									</el-switch>
								</el-form-item>
								<el-form-item label="年费提醒时间" prop="yearlyPopupTime" v-if="isYearly">
									<el-date-picker
										v-model="HtEmProjectApplicationInfoDto.yearlyPopupTime"
										type="date"
										format="yyyy年MM月dd日"
										value-format="yyyy年MM月dd日"
										placeholder="请选择时间">
									</el-date-picker>
								</el-form-item>
							</div>
						</div>
					</div>
				</el-form>
				<el-form :model="EMProjectApplicationCustomerInfoDto" ref="EMProjectApplicationCustomerInfoDto" hide-required-asterisk label-width="100px" inline :rules="rules3" size="small">
					<div class="info3">
						<h6>客户信息</h6>
						<div class="infoBox">
							<div class="line">
								<el-form-item label="公司名称" prop="customerCompanyName">
									<el-input clearable placeholder="请输入公司名称" v-model="EMProjectApplicationCustomerInfoDto.customerCompanyName"></el-input>
								</el-form-item>
							</div>
							<div class="line">
								<el-form-item label="联系人" prop="customerContacts">
									<el-input clearable placeholder="请输入联系人" v-model="EMProjectApplicationCustomerInfoDto.customerContacts"></el-input>
								</el-form-item>
								<el-form-item label="注册地址" prop="customerRegisteredAddress">
									<el-input clearable placeholder="请输入注册地址" v-model="EMProjectApplicationCustomerInfoDto.customerRegisteredAddress"></el-input>
								</el-form-item>
							</div>
							<div class="line">
								<el-form-item label="Email" prop="customerEmail">
									<el-input clearable placeholder="请输入Email" v-model="EMProjectApplicationCustomerInfoDto.customerEmail"></el-input>
								</el-form-item>
								<el-form-item label="通讯地址" prop="customerPostalAddress">
									<el-input clearable placeholder="请输入通讯地址" v-model="EMProjectApplicationCustomerInfoDto.customerPostalAddress"></el-input>
								</el-form-item>
							</div>
							<div class="line">
								<el-form-item label="移动电话" prop="customerTelephone">
									<el-input clearable placeholder="请输入移动电话" v-model="EMProjectApplicationCustomerInfoDto.customerTelephone"></el-input>
								</el-form-item>
								<el-form-item label="固定电话" prop="customerContactsPhone">
									<el-input clearable placeholder="请输入固定电话" v-model="EMProjectApplicationCustomerInfoDto.customerContactsPhone"></el-input>
								</el-form-item>
							</div>
							<div class="line">
								<el-form-item label="客户类型" prop="customerType">
									<el-select v-model="EMProjectApplicationCustomerInfoDto.customerType" placeholder="" @change="handleCustomerTypeChange">
										<el-option
											v-for="item in customerType_options"
											:key="item.value"
											:label="item.label"
											:value="item.value">
										</el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="社会统一信用代码" prop="uniformCreditCode" v-if="isCreditCode">
									<el-input clearable placeholder="请输入统一信用代码" v-model="EMProjectApplicationCustomerInfoDto.uniformCreditCode"></el-input>
								</el-form-item>
							</div>
						</div>
					</div>
				</el-form>
				<el-form :model="EMProjectApplicationServiceDto" ref="EMProjectApplicationServiceDto" hide-required-asterisk label-width="100px" inline :rules="rules4" size="small">
					<div class="info4">
						<h6>服务方信息</h6>
						<div class="infoBox">
							<div class="line">
								<el-form-item label="项目承担方" prop="bearCompanyName">
									<el-input clearable placeholder="请输入项目承担方" v-model="EMProjectApplicationServiceDto.bearCompanyName"></el-input>
								</el-form-item>
								<el-form-item label="移动电话" prop="bearTelephone">
									<el-input clearable placeholder="请输入移动电话" v-model="EMProjectApplicationServiceDto.bearTelephone"></el-input>
								</el-form-item>
							</div>
							<div class="line">
								<el-form-item label="项目承担方负责人" prop="bearContactsName">
									<el-input clearable placeholder="请输入名字" v-model="EMProjectApplicationServiceDto.bearContactsName"></el-input>
								</el-form-item>
								<el-form-item label="固定电话" prop="bearContactsPhone">
									<el-input clearable placeholder="请输入固定电话" v-model="EMProjectApplicationServiceDto.bearContactsPhone"></el-input>
								</el-form-item>
							</div>
						</div>
					</div>
				</el-form>
				<el-form :model="firstAmountObj" ref="firstAmountObj" hide-required-asterisk label-width="100px" inline :rules="rules5" size="small">
					<div class="info5">
						<h6>收款信息</h6>
						<div class="infoBox">
							<div class="line">
								<el-form-item label="付款方式" prop="type">
									<el-select v-model="firstAmountObj.type" placeholder="请选择付款方式" @change="handlePayChange">
										<el-option
											v-for="item in payStyle_options"
											:key="item.value"
											:label="item.label"
											:value="item.value">
										</el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="尾款百分比" v-if="ispercent">
									<el-input clearable placeholder="请输入尾款百分比" v-model="tailPercentage">
										<template slot="append">%</template>
									</el-input>
								</el-form-item>
							</div>
							<div class="line">
								<el-form-item label="首款(元)" prop="projectAmount">
									<el-input clearable placeholder="请输入首款金额" v-model="firstAmountObj.projectAmount"></el-input>
								</el-form-item>
								<el-form-item label="收款时间" prop="payTime">
									<el-date-picker
										v-model="firstAmountObj.payTime"
										type="date"
										format="yyyy年MM月dd日"
										value-format="yyyy年MM月dd日"
										placeholder="请选择收款时间">
									</el-date-picker>
								</el-form-item>
							</div>
							<div class="line" v-if="istail">
								<el-form-item label="尾款(元)" v-if="istail">
									<el-input clearable placeholder="请输入尾款" v-model="tailAmount"></el-input>
								</el-form-item>
							</div>
							<template v-if="ismultiple">
								<div class="line" v-for="(item, index) in tailAmountList" :key="index">
									<el-form-item label="尾款(元)">
										<el-input clearable placeholder="请输入尾款" v-model="item.tailAmount"></el-input>
										<i class="addTail" v-if="index===tailAmountList.length-1" @click="addTail">+</i>
									</el-form-item>
								</div>
							</template>
						</div>
					</div>
				</el-form>
				<el-form :model="HtEmProjectInvoiceDto" ref="HtEmProjectInvoiceDto" hide-required-asterisk label-width="100px" inline :rules="rules6" size="small">
					<div class="info6">
						<h6>开票信息</h6>
						<div class="infoBox">
							<div class="line">
								<el-form-item label="已开票金额(元)" prop="invoiceAmount">
									<el-input clearable placeholder="请输入金额" v-model="HtEmProjectInvoiceDto.invoiceAmount"></el-input>
								</el-form-item>
								<el-form-item label="开票时间" prop="invoiceTime">
									<el-date-picker
										v-model="HtEmProjectInvoiceDto.invoiceTime"
										type="date"
										format="yyyy年MM月dd日"
										value-format="yyyy年MM月dd日"
										placeholder="请选择时间">
									</el-date-picker>
								</el-form-item>
							</div>
						</div>
					</div>
				</el-form>
				<el-form :model="HtEmProjectCooperateAgencyDto" ref="HtEmProjectCooperateAgencyDto" hide-required-asterisk label-width="100px" inline :rules="rules7" size="small">
					<div class="info7">
						<h6>合作机构</h6>
						<div class="infoBox">
							<div class="line">
								<el-form-item label="机构名称" prop="agencyName">
									<el-input clearable placeholder="请输入机构名称" v-model="HtEmProjectCooperateAgencyDto.agencyName"></el-input>
								</el-form-item>
							</div>
							<div class="line">
								<el-form-item label="联系人" prop="agencyContacts">
									<el-input clearable placeholder="请输入联系人" v-model="HtEmProjectCooperateAgencyDto.agencyContacts"></el-input>
								</el-form-item>
								<el-form-item label="移动电话" prop="mobile">
									<el-input clearable placeholder="请输入移动电话" v-model="HtEmProjectCooperateAgencyDto.mobile"></el-input>
								</el-form-item>
							</div>
							<div class="line">
								<el-form-item label="固定电话" prop="telephone">
									<el-input clearable placeholder="请输入固定电话" v-model="HtEmProjectCooperateAgencyDto.telephone"></el-input>
								</el-form-item>
								<el-form-item label="QQ" prop="qqNumber">
									<el-input clearable placeholder="请输入QQ" v-model="HtEmProjectCooperateAgencyDto.qqNumber"></el-input>
								</el-form-item>
							</div>
						</div>
					</div>
				</el-form>
				<el-form :model="HtEmProjectCanalSideDto" ref="HtEmProjectCanalSideDto" hide-required-asterisk label-width="100px" inline :rules="rules8" size="small">
					<div class="info8">
						<h6>渠道方</h6>
						<div class="infoBox">
							<div class="line">
								<el-form-item label="公司名称" prop="canalName">
									<el-input clearable placeholder="请输入名称" v-model="HtEmProjectCanalSideDto.canalName"></el-input>
								</el-form-item>
							</div>
							<div class="line">
								<el-form-item label="联系人" prop="canalContacts">
									<el-input clearable placeholder="请输入联系人" v-model="HtEmProjectCanalSideDto.canalContacts"></el-input>
								</el-form-item>
								<el-form-item label="移动电话" prop="mobile">
									<el-input clearable placeholder="请输入移动电话" v-model="HtEmProjectCanalSideDto.mobile"></el-input>
								</el-form-item>
							</div>
							<div class="line">
								<el-form-item label="固定电话" prop="telephone">
									<el-input clearable placeholder="请输入固定电话" v-model="HtEmProjectCanalSideDto.telephone"></el-input>
								</el-form-item>
								<el-form-item label="QQ" prop="qqNumber">
									<el-input clearable placeholder="请输入QQ" v-model="HtEmProjectCanalSideDto.qqNumber"></el-input>
								</el-form-item>
							</div>
						</div>
					</div>
				</el-form>
				<div class="info9">
					<div class="infoBox btn_save">
						<el-button @click="save" type="primary" icon="el-icon-check" size="small">保存</el-button>
					</div>
				</div>
			</div>
		</el-main>
	</el-container>
</template>

<script>
import { client, prefixFileName, trim } from '@/common/js/common.js';
export default {
	name: 'addEmailProject',
	data () {
		return {
			formDatas: {},
			HtEmProjectApplicationInfoDto: {}, // 项目基本信息
			EMProjectApplicationCustomerInfoDto: {}, // 客户信息
			EMProjectApplicationServiceDto: {}, // 服务方信息
			HtEmProjectInvoiceDto: {}, // 开票信息
			HtEmProjectCooperateAgencyDto: { // 合作机构
				agencyName: '',
				agencyContacts: '',
				mobile: '',
				telephone: '',
				qqNumber: ''
			},
			HtEmProjectCanalSideDto: { // 渠道方
				canalName: '',
				canalContacts: '',
				mobile: '',
				telephone: '',
				qqNumber: ''
			},
			categoryDatas: [],
			categoryOne_options: [],
			categoryTwo_options: [],
			categoryProject_options: [],
			urlList: [],
			iscopyrightInput: false,
			isCreditCode: false,
			isproject: false, // 项目服务
			iscopyright: false, // 版权服务
			istrademark: false, // 商标服务
			istechnology: false, // 技术服务
			ispatent: false, // 专利服务
			isYearly: false, // 是否显示年费提醒时间
			ispercent: false, // 首款加百分比
			istail: false, // +尾款
			ismultiple: false, // 分多次付清
			// 首款对象
			firstAmountObj: {
				amountType: 1,
				percentage: 0
			},
			tailPercentage: '', // 首款加百分比的百分比
			tailAmount: '', // 首款+尾款的尾款金额
			tailAmountList: [], // 多次付款的尾款金额列表
			payStyle_options: [
				{
					label: '全额付清',
					value: 1
				},
				{
					label: '首款+尾款',
					value: 2
				},
				{
					label: '首款加百分比',
					value: 3
				},
				{
					label: '分多次付清',
					value: 4
				}
			],
			customerType_options: [
				{
					label: '普通用户',
					value: 0
				},
				{
					label: '企业用户',
					value: 1
				}
			],
			rules1: {
				categoryId: [
					{ required: true, message: '请选择项目分类', trigger: 'blur' }
				],
				categorySid: [
					{ required: true, message: '请选择项目二级分类', trigger: 'blur' }
				],
				contractNo: [
					{ required: true, whitespace: true, message: '请输入合同编号', trigger: 'blur' },
					{
						pattern: /^[0-9a-zA-Z]{14,16}$/,
						message: '合同编号填写有误',
						transform (value) {
							if (typeof value === 'string') {
								return trim(value);
							}
							return value;
						},
						trigger: 'blur'
					}
				]
			},
			rules2: {
				copyrightName: [
					{ required: true, whitespace: true, message: '请输入名称', trigger: 'blur' },
					{
						pattern: /^[\u4e00-\u9fa50-9a-zA-Z]{1,100}$/,
						message: '名称为汉字、字母或数字组合且字数不超过100',
						transform (value) {
							if (typeof value === 'string') {
								return trim(value);
							}
							return value;
						},
						trigger: 'blur'
					}
				],
				deadlineTime: [
					{ required: true, message: '请选择截止日期', trigger: 'blur' }
				],
				department: [
					{ required: true, whitespace: true, message: '请输入归口部门', trigger: 'blur' }
				],
				contactName: [
					{ required: true, whitespace: true, message: '请输入联系人', trigger: 'blur' }
				],
				phone: [
					{ required: true, whitespace: true, message: '请输入固定电话', trigger: 'blur' }
				],
				// copyrightTime: [
				// 	{ required: true, message: '请选择版权日期', trigger: 'blur' }
				// ],
				applyTime: [
					{ required: true, message: '请选择申请日期', trigger: 'blur' }
				],
				brandType: [
					{ required: true, whitespace: true, message: '请输入类别', trigger: 'blur' }
				],
				checkAddress: [
					{ required: true, whitespace: true, message: '请输入材料受理地址', trigger: 'blur' }
				],
				originator: [
					{ required: true, whitespace: true, message: '请输入发明人', trigger: 'blur' }
				],
				yearlyPopupTime: [
					{ required: true, message: '请选择时间', trigger: 'blur' }
				]
			},
			rules3: {
				customerCompanyName: [
					{ required: true, whitespace: true, message: '请输入公司名称', trigger: 'blur' },
					{
						pattern: /^[\u4e00-\u9fa50-9a-zA-Z]{1,100}$/,
						message: '名称为汉字、字母或数字组合且字数不超过100',
						transform (value) {
							if (typeof value === 'string') {
								return trim(value);
							}
							return value;
						},
						trigger: 'blur'
					}
				],
				customerContacts: [
					{ required: true, whitespace: true, message: '请输入联系人', trigger: 'blur' }
				],
				customerRegisteredAddress: [
					{ required: true, whitespace: true, message: '请输入注册地址', trigger: 'blur' }
				],
				customerEmail: [
					{ required: true, whitespace: true, message: '请输入Email', trigger: 'blur' }
				],
				customerPostalAddress: [
					{ required: true, whitespace: true, message: '请输入通讯地址', trigger: 'blur' }
				],
				customerTelephone: [
					{ required: true, whitespace: true, message: '请输入移动电话', trigger: 'blur' },
					{
						pattern: /^1[3456789]\d{9}$/,
						message: '手机号格式不正确',
						transform (value) {
							if (typeof value === 'string') {
								return trim(value);
							}
							return value;
						},
						trigger: 'blur'
					}
				],
				customerContactsPhone: [
					{ required: true, whitespace: true, message: '请输入固定电话', trigger: 'blur' }
				],
				customerType: [
					{ required: true, message: '请选择客户类型', trigger: 'blur' }
				],
				uniformCreditCode: [
					{ required: true, whitespace: true, message: '请输入统一信用代码', trigger: 'blur' },
					{
						pattern: /^[0-9A-Z]{18}$/,
						message: '社会统一信用码填写有误',
						transform (value) {
							if (typeof value === 'string') {
								return trim(value);
							}
							return value;
						},
						trigger: 'blur'
					}
				]
			},
			rules4: {
				bearCompanyName: [
					{ required: true, whitespace: true, message: '请输入项目承担方', trigger: 'blur' },
					{
						pattern: /^[\u4e00-\u9fa50-9a-zA-Z]{1,100}$/,
						message: '填写为汉字、字母或数字组合且字数不超过100',
						transform (value) {
							if (typeof value === 'string') {
								return trim(value);
							}
							return value;
						},
						trigger: 'blur'
					}
				],
				bearTelephone: [
					{ required: true, whitespace: true, message: '请输入移动电话', trigger: 'blur' },
					{
						pattern: /^1[3456789]\d{9}$/,
						message: '手机号格式不正确',
						transform (value) {
							if (typeof value === 'string') {
								return trim(value);
							}
							return value;
						},
						trigger: 'blur'
					}
				],
				bearContactsName: [
					{ required: true, whitespace: true, message: '请输入名字', trigger: 'blur' }
				],
				bearContactsPhone: [
					{ required: true, whitespace: true, message: '请输入固定电话', trigger: 'blur' }
				]
			},
			rules5: {
				type: [
					{ required: true, message: '请选择付款方式', trigger: 'blur' }
				],
				projectAmount: [
					{ required: true, whitespace: true, message: '请输入首款金额', trigger: 'blur' },
					{
						pattern: /^[1-9]\d{0,8}$/,
						message: '请输入一个正整数',
						transform (value) {
							if (typeof value === 'string') {
								return trim(value);
							}
							return value;
						},
						trigger: 'blur'
					}
				],
				payTime: [
					{ required: true, message: '请选择收款时间', trigger: 'blur' }
				]
			},
			rules6: {
				invoiceAmount: [
					{ required: true, whitespace: true, message: '请输入金额', trigger: 'blur' },
					{
						pattern: /^[1-9]\d{0,8}$/,
						message: '请输入一个正整数',
						transform (value) {
							if (typeof value === 'string') {
								return trim(value);
							}
							return value;
						},
						trigger: 'blur'
					}
				],
				invoiceTime: [
					{ required: true, message: '请选择时间', trigger: 'blur' }
				]
			},
			rules7: {
				mobile: [
					{
						pattern: /^1[3456789]\d{9}$/,
						message: '手机号格式不正确',
						transform (value) {
							if (typeof value === 'string') {
								return trim(value);
							}
							return value;
						},
						trigger: 'blur'
					}
				]
			},
			rules8: {
				mobile: [
					{
						pattern: /^1[3456789]\d{9}$/,
						message: '手机号格式不正确',
						transform (value) {
							if (typeof value === 'string') {
								return trim(value);
							}
							return value;
						},
						trigger: 'blur'
					}
				]
			}
		};
	},
	watch: {
		// HtEmProjectApplicationInfoDto () {
		// 	console.log(this.HtEmProjectApplicationInfoDto);
		// }
	},
	computed: {},
	created () {
		this.getCategory();
	},
	methods: {
		// 获取分类数据
		getCategory () {
			let _this = this;
			this.base.axios_post(null, '/platformEasymall/api/easymore/emPCCategoryProjectProductInfo', function (res) {
				console.log(res);
				if (res.code === 0) {
					_this.categoryDatas = res.data;
					let datalist = [];
					for (let item of res.data) {
						let itemData = {};
						itemData.categoryId = item.categoryId;
						itemData.categoryName = item.categoryName;
						datalist.push(itemData);
					}
					_this.categoryOne_options = datalist;
				}
			});
		},
		getCategoryTwo (parentId) {
			for (let item of this.categoryDatas) {
				if (item.categoryId === parentId) {
					let datalist = [];
					for (let list of item.nodeList) {
						let itemData = {};
						itemData.categoryId = list.categoryId;
						itemData.categoryName = list.categoryName;
						datalist.push(itemData);
					}
					this.categoryTwo_options = datalist;
					break;
				}
			}
		},
		getCategoryThree (parentId) {
			for (let item of this.categoryDatas) {
				if (item.categoryId === this.formDatas.categoryId) {
					for (let list of item.nodeList) {
						if (list.categoryId === parentId) {
							if (list.categoryProjectProductVoList.length > 0) {
								this.iscopyrightInput = false;
								this.categoryProject_options = list.categoryProjectProductVoList;
							} else {
								this.iscopyrightInput = true;
							}
						}
					}
					break;
				}
			}
		},
		handleCategoryOneChange (id) {
			this.HtEmProjectApplicationInfoDto = {};
			this.iscopyrightInput = false;
			this.isYearly = false;
			switch (id) {
			case '1':
				// 专利服务
				this.ispatent = true;
				this.isproject = false;
				this.iscopyright = false;
				this.istrademark = false;
				this.istechnology = false;
				break;
			case '2':
				// 商标服务
				this.ispatent = false;
				this.isproject = false;
				this.iscopyright = false;
				this.istrademark = true;
				this.istechnology = false;
				break;
			case '3':
				// 版权服务
				this.ispatent = false;
				this.isproject = false;
				this.iscopyright = true;
				this.istrademark = false;
				this.istechnology = false;
				break;
			case '4':
				// 项目服务
				this.ispatent = false;
				this.isproject = true;
				this.iscopyright = false;
				this.istrademark = false;
				this.istechnology = false;
				break;
			case '5':
				// 技术服务
				this.ispatent = false;
				this.isproject = false;
				this.iscopyright = false;
				this.istrademark = false;
				this.istechnology = true;
				break;
			}
			this.formDatas.categorySid = undefined;
			this.categoryTwo_options = [];
			this.categoryProject_options = [];
			this.getCategoryTwo(id);
		},
		handleCategoryTwoChange (id) {
			this.HtEmProjectApplicationInfoDto = {};
			this.iscopyrightInput = false;
			this.categoryProject_options = [];
			this.getCategoryThree(id);
		},
		handleCustomerTypeChange (value) {
			if (value === 1) { // 企业用户
				this.isCreditCode = true;
			} else {
				this.isCreditCode = false;
			}
		},
		handleYearly (value) {
			if (value === 1) { // 开启设置年费提醒
				this.isYearly = true;
			} else {
				this.isYearly = false;
			}
		},
		handlePayChange (value) {
			this.tailPercentage = '';
			this.tailAmount = '';
			this.tailAmountList = [];
			switch (value) {
			case 1:  // 全额付清
				this.ispercent = false;
				this.istail = false;
				this.ismultiple = false;
				break;
			case 2:  // 首款+尾款
				this.ispercent = false;
				this.istail = true;
				this.ismultiple = false;
				break;
			case 3:  // 首款加百分比
				this.ispercent = true;
				this.istail = false;
				this.ismultiple = false;
				break;
			case 4:  // 分多次付清
				this.ispercent = false;
				this.istail = false;
				this.ismultiple = true;
				this.tailAmountList.push({ tailAmount: '' });
				break;
			}
		},
		// 上传合同附件
		Upload (file) {
			// debugger;
			let _this = this;
			if (file.file) {
				let indexS = file.file.name.lastIndexOf('.');
				let name = prefixFileName + file.file.uid + file.file.name.substring(indexS); // 正式打包使用'proFile/'
				client().put(name, file.file).then((result) => {
					console.log(result);
					let obj = {};
					obj.name = result.name;
					obj.url = result.url;
					_this.urlList.push(obj);
					_this.$message('上传成功');
				}).catch((err) => {
					console.log(err);
				});
			}
		},
		uploadBeforeRemove (file, fileList) {
			// debugger;
			let _this = this;
			console.log(file);
			console.log(fileList);
			let fileName = prefixFileName + file.uid;
			client().delete(fileName).then((result) => {
				console.log(result);
				for (let [index, elem] of _this.urlList.entries()) {
					if (elem.name === fileName) {
						_this.urlList.splice(index, 1);
						break;
					}
				}
			}).catch((err) => {
				console.log(err);
				_this.$message('删除失败');
				return false;
			});
		},
		addTail () {
			let currentAmount = this.tailAmountList[this.tailAmountList.length - 1].tailAmount;
			if (currentAmount === undefined || trim(currentAmount) === '') {
				this.$message('请输入尾款');
				return;
			}
			if (!/^[1-9]\d{0,8}$/.test(trim(currentAmount))) {
				this.$message('尾款格式不正确，请输入一个正整数');
				return;
			}
			this.tailAmountList.push({ tailAmount: '' });
		},
		// 数据传入服务器之前，进行转换
		transformDatas (obj) {
			let { ...datas } = obj;
			// 去除字符串数据的首尾空白
			for (let key of Object.keys(datas)) {
				if (typeof datas[key] === 'string') {
					datas[key] = trim(datas[key]);
				}
				if (datas[key] === undefined) {
					datas[key] = '';
				}
			}
			return datas;
		},
		save () {
			let _this = this;
			_this.$refs['formDatas'].validate((valid) => {
				if (valid) {
					_this.$refs['HtEmProjectApplicationInfoDto'].validate((valid) => {
						if (valid) {
							_this.$refs['EMProjectApplicationCustomerInfoDto'].validate((valid) => {
								if (valid) {
									_this.$refs['EMProjectApplicationServiceDto'].validate((valid) => {
										if (valid) {
											_this.$refs['firstAmountObj'].validate((valid) => {
												if (valid) {
													_this.$refs['HtEmProjectInvoiceDto'].validate((valid) => {
														if (valid) {
															_this.$refs['HtEmProjectCooperateAgencyDto'].validate((valid) => {
																if (valid) {
																	_this.$refs['HtEmProjectCanalSideDto'].validate((valid) => {
																		if (valid) {
																			if (_this.urlList.length <= 0) {
																				_this.$message('请上传合同附件');
																				return;
																			}
																			// 合同附件
																			let contractList = [];
																			for (let item of _this.urlList) {
																				contractList.push(item.url);
																			}
																			let { ...allFormDatas } = _this.transformDatas(_this.formDatas);
																			allFormDatas.categoryName = '';
																			allFormDatas.contractList = contractList;
																			allFormDatas.flowId = '';
																			// 项目详细信息
																			let { ...projectApplicationInfo } = _this.HtEmProjectApplicationInfoDto;
																			projectApplicationInfo.authorizationNo = ''; // 授权号传空
																			projectApplicationInfo.authorizationTime = ''; // 授权日期传空
																			projectApplicationInfo.copyrightTime = ''; // 版权日期传空
																			if (projectApplicationInfo.setYearlyPopup !== 1) {
																				projectApplicationInfo.yearlyPopupTime = '';
																			}
																			allFormDatas.projectApplicationInfo = _this.transformDatas(projectApplicationInfo);
																			// 项目客户信息
																			let { ...applicationCustomerInfo } = _this.EMProjectApplicationCustomerInfoDto;
																			if (applicationCustomerInfo.customerType !== 1) {
																				applicationCustomerInfo.uniformCreditCode = '';
																			}
																			allFormDatas.applicationCustomerInfo = _this.transformDatas(applicationCustomerInfo);
																			// 项目服务方信息
																			let { ...applicationService } = _this.EMProjectApplicationServiceDto;
																			allFormDatas.applicationService = _this.transformDatas(applicationService);
																			// 项目发票信息
																			let { ...projectInvoice } = _this.HtEmProjectInvoiceDto;
																			projectInvoice = _this.transformDatas(projectInvoice);
																			projectInvoice.invoiceAmount = Number(projectInvoice.invoiceAmount);
																			allFormDatas.projectInvoice = projectInvoice;
																			// 项目合作公司信息
																			let { ...projectCooperateAgency } = _this.HtEmProjectCooperateAgencyDto;
																			allFormDatas.projectCooperateAgency = _this.transformDatas(projectCooperateAgency);
																			// 项目渠道方信息
																			let { ...projectCanalSide } = _this.HtEmProjectCanalSideDto;
																			allFormDatas.projectCanalSide = _this.transformDatas(projectCanalSide);
																			// 收款信息
																			let { ...firstAmountObj } = _this.firstAmountObj;
																			let HtEmProjectGatheringDto = [];
																			firstAmountObj.projectAmount = Number(trim(firstAmountObj.projectAmount));
																			HtEmProjectGatheringDto.push(firstAmountObj);
																			switch (firstAmountObj.type) {
																			case 1:  // 全额付清
																				break;
																			case 2:  // 首款+尾款
																				if (_this.tailAmount === undefined || trim(_this.tailAmount) === '') {
																					_this.$message('请输入尾款');
																					return;
																				}
																				if (!/^[1-9]\d{0,8}$/.test(trim(_this.tailAmount))) {
																					_this.$message('尾款格式不正确，请输入一个正整数');
																					return;
																				}
																				let tailObj = {};
																				tailObj.amountType = 2;
																				tailObj.percentage = 0;
																				tailObj.payTime = '';
																				tailObj.projectAmount = Number(trim(_this.tailAmount));
																				tailObj.type = firstAmountObj.type;
																				HtEmProjectGatheringDto.push(tailObj);
																				break;
																			case 3:  // 首款加百分比
																				if (_this.tailPercentage === undefined || trim(_this.tailPercentage) === '') {
																					_this.$message('请输入尾款百分比');
																					return;
																				}
																				if (!/^[1-9]\d?$/.test(trim(_this.tailPercentage))) {
																					_this.$message('尾款百分比格式不正确，请输入一个1-99之间的正整数');
																					return;
																				}
																				let percentageObj = {};
																				percentageObj.amountType = 2;
																				percentageObj.percentage = Number(trim(_this.tailPercentage));
																				percentageObj.payTime = '';
																				percentageObj.projectAmount = 0;
																				percentageObj.type = firstAmountObj.type;
																				HtEmProjectGatheringDto.push(percentageObj);
																				break;
																			case 4:  // 分多次付清
																				for (let item of _this.tailAmountList) {
																					if (item.tailAmount === undefined || trim(item.tailAmount) === '') {
																						_this.$message('请输入尾款');
																						return;
																					}
																					if (!/^[1-9]\d{0,8}$/.test(trim(item.tailAmount))) {
																						_this.$message('尾款格式不正确，请输入一个正整数');
																						return;
																					}
																					let obj = {};
																					obj.amountType = 2;
																					obj.percentage = 0;
																					obj.payTime = '';
																					obj.projectAmount = Number(trim(item.tailAmount));
																					obj.type = firstAmountObj.type;
																					HtEmProjectGatheringDto.push(obj);
																				}
																				break;
																			}
																			allFormDatas.projectGatheringList = HtEmProjectGatheringDto;
																			let data = allFormDatas;
																			console.log(data);
																			_this.base.axios_post(data, '/platformEasymall/api/easymore/saveProjectApplicationInfo', function (res) {
																				console.log(res);
																				if (res.code === 0) {
																					_this.$message('新增成功');
																					_this.$router.go(-1);
																				} else {
																					_this.$message(res.message);
																				}
																			});
																		}
																	});
																}
															});
														}
													});
												}
											});
										}
									});
								}
							});
						}
					});
				}
			});
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.assess {
	width: 70%;
	box-sizing: border-box;
	margin: 20px auto 0;
	background-color: #fff;
	box-shadow: 0 0 10px 2px #BEBEBE;
	font-size: 13px;
}
.assess .title {
	padding: 15px 0;
	text-align: center;
	font-size: 16px;
	font-weight: bold;
	margin: 0;
	color: #22BBE1;
}
.assess h6 {
	font-size: 15px;
	color: #F84A4F;
	border-bottom: 1px solid #E1E1E1;
	padding-bottom: 5px;
	margin: 0 10% 0 5%;
}
.assess .infoBox {
	padding: 15px 0;
}
.line {
	padding: 0 10%;
	display: flex;
	justify-content: space-between;
}
.lines {
	padding: 0 10%;
	display: flex;
}
.uploadBox {
	display: inline-block;
	width: 199px;
	height: 32px;
	line-height: 32px;
	border: 1px solid #dcdfe6;
	border-radius: 4px;
	box-sizing: border-box;
}
.uploadImg {
	display: block;
	width: 199px;
	height: 100px;
}
.uploadBtn {
	text-decoration: underline;
	color: #F84A4F;
	margin-left: 17px;
}
.assess .btn_save {
	text-align: right;
	padding-right: 10%;
}
.addTail {
	position: absolute;
	width: 10px;
	padding-left: 10px;
	top: 0;
	right: -20px;
	font-size: 16px;
	color: rgb(77, 77, 77);
	cursor: pointer;
}
</style>
