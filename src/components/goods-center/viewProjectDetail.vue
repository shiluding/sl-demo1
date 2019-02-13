<template>
	<el-container class="syh-container">
		<el-header>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>主页</el-breadcrumb-item>
				<el-breadcrumb-item>商品中心</el-breadcrumb-item>
				<el-breadcrumb-item to="/emailProjectTrends">易茂项目申报动态</el-breadcrumb-item>
				<el-breadcrumb-item>查看项目详情</el-breadcrumb-item>
			</el-breadcrumb>
			<router-link to="/emailProjectTrends"><div class="back">返回上一页</div></router-link>
		</el-header>
		<el-main>
			<div class="wrap">
				<div class="dataBox">
					<p class="title">
						<span>项目分类：{{categoryName}}</span>
						<span>合同编号：{{applicationDetailInfo.contractNo}}</span>
						<span class="download">合同附件：<i @click="download">下载</i></span>
					</p>
					<div class="boxs">
						<div class="self" v-if="applyInfo!=''" @click="handleBoxClick(1)">
							<h3>申请信息</h3>
							<div class="info">
								<img src="../../assets/images/projectDetail/shenqingxinxi.png"/>
								<ul>
									<template v-if="categoryId === '5'">
										<!-- 技术服务 -->
										<li class="li" v-on:mouseover="changeActive($event)" v-on:mouseout="removeActive($event)">项目名称：{{applyInfo.copyrightName}}</li>
										<li class="li" v-on:mouseover="changeActive($event)" v-on:mouseout="removeActive($event)">截止日期：{{applyInfo.deadlineTime}}</li>
										<li class="li" v-on:mouseover="changeActive($event)" v-on:mouseout="removeActive($event)">归口部门：{{applyInfo.department}}</li>
										<li class="li" v-on:mouseover="changeActive($event)" v-on:mouseout="removeActive($event)">联系人：{{applyInfo.contactName}}</li>
										<li class="li" v-on:mouseover="changeActive($event)" v-on:mouseout="removeActive($event)">固定电话：{{applyInfo.phone}}</li>
									</template>
									<template v-if="categoryId === '3'">
										<!-- 版权服务 -->
										<li class="li" v-on:mouseover="changeActive($event)" v-on:mouseout="removeActive($event)">知识产权名称：{{applyInfo.copyrightName}}</li>
										<li class="li" v-on:mouseover="changeActive($event)" v-on:mouseout="removeActive($event)">申请日期：{{applyInfo.applyTime}}</li>
									</template>
									<template v-if="categoryId === '2'">
										<!-- 商标服务 -->
										<li class="li" v-on:mouseover="changeActive($event)" v-on:mouseout="removeActive($event)">知识产权名称：{{applyInfo.copyrightName}}</li>
										<li class="li" v-on:mouseover="changeActive($event)" v-on:mouseout="removeActive($event)">申请日期：{{applyInfo.applyTime}}</li>
										<li class="li" v-on:mouseover="changeActive($event)" v-on:mouseout="removeActive($event)">类别：{{applyInfo.brandType}}</li>
									</template>
									<template v-if="categoryId === '4'">
										<!-- 项目服务 -->
										<li class="li" v-on:mouseover="changeActive($event)" v-on:mouseout="removeActive($event)">项目名称：{{applyInfo.copyrightName}}</li>
										<li class="li" v-on:mouseover="changeActive($event)" v-on:mouseout="removeActive($event)">截止日期：{{applyInfo.deadlineTime}}</li>
										<li class="li" v-on:mouseover="changeActive($event)" v-on:mouseout="removeActive($event)">归口部门：{{applyInfo.department}}</li>
										<li class="li" v-on:mouseover="changeActive($event)" v-on:mouseout="removeActive($event)">联系人：{{applyInfo.contactName}}</li>
										<li class="li" v-on:mouseover="changeActive($event)" v-on:mouseout="removeActive($event)">材料受理地址：{{applyInfo.checkAddress}}</li>
										<li class="li" v-on:mouseover="changeActive($event)" v-on:mouseout="removeActive($event)">固定电话：{{applyInfo.phone}}</li>
									</template>
									<template v-if="categoryId === '1'">
										<!-- 专利服务 -->
										<li class="li" v-on:mouseover="changeActive($event)" v-on:mouseout="removeActive($event)">知识产权名称：{{applyInfo.copyrightName}}</li>
										<li class="li" v-on:mouseover="changeActive($event)" v-on:mouseout="removeActive($event)">发明人：{{applyInfo.originator}}</li>
										<li class="li" v-on:mouseover="changeActive($event)" v-on:mouseout="removeActive($event)">申请日期：{{applyInfo.applyTime}}</li>
										<li class="li" v-on:mouseover="changeActive($event)" v-on:mouseout="removeActive($event)" v-if="applyInfo.setYearlyPopup===1">年费提醒时间：{{applyInfo.yearlyPopupTime}}</li>
									</template>
								</ul>
							</div>
						</div>
						<div class="self" v-if="customerInfo!=''" @click="handleBoxClick(2)">
							<h3>客户信息</h3>
							<div class="info">
								<img src="../../assets/images/projectDetail/qudaofang.png"/>
								<ul>
									<li class="li" v-on:mouseover="changeActive($event)" v-on:mouseout="removeActive($event)">公司名称：{{customerInfo.customerCompanyName}}</li>
									<li class="li" v-on:mouseover="changeActive($event)" v-on:mouseout="removeActive($event)">联系人：{{customerInfo.customerContacts}}</li>
									<li class="li" v-on:mouseover="changeActive($event)" v-on:mouseout="removeActive($event)">Email：{{customerInfo.customerEmail}}</li>
									<li class="li" v-on:mouseover="changeActive($event)" v-on:mouseout="removeActive($event)">移动电话：{{customerInfo.customerTelephone}}</li>
									<li class="li" v-on:mouseover="changeActive($event)" v-on:mouseout="removeActive($event)">固定电话：{{customerInfo.customerContactsPhone}}</li>
									<li class="li" v-on:mouseover="changeActive($event)" v-on:mouseout="removeActive($event)">注册地址：{{customerInfo.customerRegisteredAddress}}</li>
									<li class="li" v-on:mouseover="changeActive($event)" v-on:mouseout="removeActive($event)">通讯地址：{{customerInfo.customerPostalAddress}}</li>
									<li class="li" v-on:mouseover="changeActive($event)" v-on:mouseout="removeActive($event)">客户类型：{{customerInfo.customerType===1?'企业用户':'普通用户'}}</li>
									<li class="li" v-on:mouseover="changeActive($event)" v-on:mouseout="removeActive($event)" v-if="customerInfo.customerType===1">社会统一信用代码：{{customerInfo.uniformCreditCode}}</li>
								</ul>
							</div>
						</div>
						<div class="self self3" v-if="serviceInfo!=''" @click="handleBoxClick(3)">
							<h3>服务方信息</h3>
							<div class="info">
								<img src="../../assets/images/projectDetail/fuwufangxinxi.png"/>
								<ul>
									<li class="li" v-on:mouseover="changeActive($event)" v-on:mouseout="removeActive($event)">项目承担方：{{serviceInfo.bearCompanyName}}</li>
									<li class="li" v-on:mouseover="changeActive($event)" v-on:mouseout="removeActive($event)">项目承担方负责人：{{serviceInfo.bearContactsName}}</li>
									<li class="li" v-on:mouseover="changeActive($event)" v-on:mouseout="removeActive($event)">移动电话：{{serviceInfo.bearTelephone}}</li>
									<li class="li" v-on:mouseover="changeActive($event)" v-on:mouseout="removeActive($event)">固定电话：{{serviceInfo.bearContactsPhone}}</li>
								</ul>
							</div>
						</div>
						<div class="self" v-if="gathering!=''" @click="handleBoxClick(4)">
							<h3>收款信息</h3>
							<div class="info">
								<img src="../../assets/images/projectDetail/shoukuanxinxi.png"/>
								<ul>
									<li class="li" v-on:mouseover="changeActive($event)" v-on:mouseout="removeActive($event)">总金额：{{gathering.projectTotalAmount}}元</li>
									<li class="li" v-on:mouseover="changeActive($event)" v-on:mouseout="removeActive($event)">已收金额：{{gathering.projectTotalReceiveAmount}}元</li>
									<li class="li" v-on:mouseover="changeActive($event)" v-on:mouseout="removeActive($event)">收款时间：{{gathering.lastPayTime}}</li>
								</ul>
							</div>
						</div>
						<div class="self" v-if="cooperateAgency!=''" @click="handleBoxClick(5)">
							<h3>合作机构</h3>
							<div class="info">
								<img src="../../assets/images/projectDetail/hezuojigou.png"/>
								<ul>
									<li class="li" v-on:mouseover="changeActive($event)" v-on:mouseout="removeActive($event)">机构名称：{{cooperateAgency.agencyName}}</li>
									<li class="li" v-on:mouseover="changeActive($event)" v-on:mouseout="removeActive($event)">联系人：{{cooperateAgency.agencyContacts}}</li>
									<li class="li" v-on:mouseover="changeActive($event)" v-on:mouseout="removeActive($event)">移动电话：{{cooperateAgency.mobile}}</li>
									<li class="li" v-on:mouseover="changeActive($event)" v-on:mouseout="removeActive($event)">固定电话：{{cooperateAgency.telephone}}</li>
									<li class="li" v-on:mouseover="changeActive($event)" v-on:mouseout="removeActive($event)">QQ：{{cooperateAgency.qqNumber}}</li>
								</ul>
							</div>
						</div>
						<div class="self self3" v-if="cancelSide!=''" @click="handleBoxClick(6)">
							<h3>渠道方</h3>
							<div class="info">
								<img src="../../assets/images/projectDetail/qudaofang.png"/>
								<ul>
									<li class="li" v-on:mouseover="changeActive($event)" v-on:mouseout="removeActive($event)">公司名称：{{cancelSide.canalName}}</li>
									<li class="li" v-on:mouseover="changeActive($event)" v-on:mouseout="removeActive($event)">联系人：{{cancelSide.canalContacts}}</li>
									<li class="li" v-on:mouseover="changeActive($event)" v-on:mouseout="removeActive($event)">移动电话：{{cancelSide.mobile}}</li>
									<li class="li" v-on:mouseover="changeActive($event)" v-on:mouseout="removeActive($event)">固定电话：{{cancelSide.telephone}}</li>
									<li class="li" v-on:mouseover="changeActive($event)" v-on:mouseout="removeActive($event)">QQ：{{cancelSide.qqNumber}}</li>
								</ul>
							</div>
						</div>
						<div class="self" v-if="invoice!=''" @click="handleBoxClick(7)">
							<h3>开票信息</h3>
							<div class="info">
								<img src="../../assets/images/projectDetail/kaipiaoxinxi.png"/>
								<ul>
									<li class="li" v-on:mouseover="changeActive($event)" v-on:mouseout="removeActive($event)">开票金额：{{invoice.openedTotalAmount}}元</li>
									<li class="li" v-on:mouseover="changeActive($event)" v-on:mouseout="removeActive($event)">开票时间：{{invoice.openedTime}}</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="dialog1">
				<el-dialog :visible.sync="visible1" width="50%" top="20vh" center custom-class="dialog" @close="handleDialogClose('formData1')" :close-on-click-modal="false" :close-on-press-escape="false">
					<span slot="title" class="title">申请信息</span>
					<el-form :model="formData1" ref="formData1" hide-required-asterisk label-width="100px" inline :rules="rules1" size="small">
						<!-- 技术服务 -->
						<table v-if="categoryId === '5'">
							<tr>
								<el-form-item label="项目名称" prop="copyrightName" v-if="iscopyrightInput">
									<el-input clearable placeholder="请输入名称" v-model="formData1.copyrightName"></el-input>
								</el-form-item>
								<el-form-item label="项目名称" prop="copyrightName" v-if="!iscopyrightInput">
									<el-select v-model="formData1.copyrightName" placeholder="" filterable>
										<el-option
											v-for="item in categoryProject_options"
											:key="item.projectProductId"
											:label="item.projectProductName"
											:value="item.projectProductName">
										</el-option>
									</el-select>
								</el-form-item>
							</tr>
							<tr>
								<td>
									<el-form-item label="截止日期" prop="deadlineTime">
										<el-date-picker
											v-model="formData1.deadlineTime"
											type="date"
											format="yyyy年MM月dd日"
											value-format="yyyy年MM月dd日"
											placeholder="请选择日期">
										</el-date-picker>
									</el-form-item>
								</td>
								<td>
									<el-form-item label="归口部门" prop="department">
										<el-input clearable placeholder="请输入归口部门" v-model="formData1.department"></el-input>
									</el-form-item>
								</td>
							</tr>
							<tr>
								<td>
									<el-form-item label="联系人" prop="contactName">
										<el-input clearable placeholder="请输入联系人" v-model="formData1.contactName"></el-input>
									</el-form-item>
								</td>
								<td>
									<el-form-item label="固定电话" prop="phone">
										<el-input clearable placeholder="请输入固定电话" v-model="formData1.phone"></el-input>
									</el-form-item>
								</td>
							</tr>
						</table>
						<!-- 版权服务 -->
						<table v-if="categoryId === '3'">
							<tr>
								<td>
									<el-form-item label="知识产权名称" prop="copyrightName" v-if="iscopyrightInput">
										<el-input clearable placeholder="请输入名称" v-model="formData1.copyrightName"></el-input>
									</el-form-item>
									<el-form-item label="知识产权名称" prop="copyrightName" v-if="!iscopyrightInput">
										<el-select v-model="formData1.copyrightName" placeholder="" filterable>
											<el-option
												v-for="item in categoryProject_options"
												:key="item.projectProductId"
												:label="item.projectProductName"
												:value="item.projectProductName">
											</el-option>
										</el-select>
									</el-form-item>
								</td>
								<td>
									<el-form-item label="申请日期" prop="applyTime">
										<el-date-picker
											v-model="formData1.applyTime"
											type="date"
											format="yyyy年MM月dd日"
											value-format="yyyy年MM月dd日"
											placeholder="请选择申请日期">
										</el-date-picker>
									</el-form-item>
								</td>
							</tr>
						</table>
						<!-- 商标服务 -->
						<table v-if="categoryId === '2'">
							<tr>
								<td>
									<el-form-item label="知识产权名称" prop="copyrightName" v-if="iscopyrightInput">
										<el-input clearable placeholder="请输入名称" v-model="formData1.copyrightName"></el-input>
									</el-form-item>
									<el-form-item label="知识产权名称" prop="copyrightName" v-if="!iscopyrightInput">
										<el-select v-model="formData1.copyrightName" placeholder="" filterable>
											<el-option
												v-for="item in categoryProject_options"
												:key="item.projectProductId"
												:label="item.projectProductName"
												:value="item.projectProductName">
											</el-option>
										</el-select>
									</el-form-item>
								</td>
							</tr>
							<tr>
								<td>
									<el-form-item label="申请日期" prop="applyTime">
										<el-date-picker
											v-model="formData1.applyTime"
											type="date"
											format="yyyy年MM月dd日"
											value-format="yyyy年MM月dd日"
											placeholder="请选择申请日期">
										</el-date-picker>
									</el-form-item>
								</td>
								<td>
									<el-form-item label="类别" prop="brandType">
										<el-input clearable placeholder="请输入类别" v-model="formData1.brandType"></el-input>
									</el-form-item>
								</td>
							</tr>
						</table>
						<!-- 项目服务 -->
						<table v-if="categoryId === '4'">
							<tr>
								<td>
									<el-form-item label="项目名称" prop="copyrightName" v-if="iscopyrightInput">
										<el-input clearable placeholder="请输入名称" v-model="formData1.copyrightName"></el-input>
									</el-form-item>
									<el-form-item label="项目名称" prop="copyrightName" v-if="!iscopyrightInput">
										<el-select v-model="formData1.copyrightName" placeholder="" filterable>
											<el-option
												v-for="item in categoryProject_options"
												:key="item.projectProductId"
												:label="item.projectProductName"
												:value="item.projectProductName">
											</el-option>
										</el-select>
									</el-form-item>
								</td>
								<td>
									<el-form-item label="截止日期" prop="deadlineTime">
										<el-date-picker
											v-model="formData1.deadlineTime"
											type="date"
											format="yyyy年MM月dd日"
											value-format="yyyy年MM月dd日"
											placeholder="请选择日期">
										</el-date-picker>
									</el-form-item>
								</td>
							</tr>
							<tr>
								<td>
									<el-form-item label="归口部门" prop="department">
										<el-input clearable placeholder="请输入归口部门" v-model="formData1.department"></el-input>
									</el-form-item>
								</td>
								<td>
									<el-form-item label="联系人" prop="contactName">
										<el-input clearable placeholder="请输入联系人" v-model="formData1.contactName"></el-input>
									</el-form-item>
								</td>
							</tr>
							<tr>
								<td>
									<el-form-item label="材料受理地址" prop="checkAddress">
										<el-input clearable placeholder="请输入材料受理地址" v-model="formData1.checkAddress"></el-input>
									</el-form-item>
								</td>
								<td>
									<el-form-item label="固定电话" prop="phone">
										<el-input clearable placeholder="请输入固定电话" v-model="formData1.phone"></el-input>
									</el-form-item>
								</td>
							</tr>
						</table>
						<!-- 专利服务 -->
						<table v-if="categoryId === '1'">
							<tr>
								<td>
									<el-form-item label="知识产权名称" prop="copyrightName" v-if="iscopyrightInput">
										<el-input clearable placeholder="请输入名称" v-model="formData1.copyrightName"></el-input>
									</el-form-item>
									<el-form-item label="知识产权名称" prop="copyrightName" v-if="!iscopyrightInput">
										<el-select v-model="formData1.copyrightName" placeholder="" filterable>
											<el-option
												v-for="item in categoryProject_options"
												:key="item.projectProductId"
												:label="item.projectProductName"
												:value="item.projectProductName">
											</el-option>
										</el-select>
									</el-form-item>
								</td>
							</tr>
							<tr>
								<td>
									<el-form-item label="发明人" prop="originator">
										<el-input clearable placeholder="请输入发明人" v-model="formData1.originator"></el-input>
									</el-form-item>
								</td>
								<td>
									<el-form-item label="申请日期" prop="applyTime">
										<el-date-picker
											v-model="formData1.applyTime"
											type="date"
											format="yyyy年MM月dd日"
											value-format="yyyy年MM月dd日"
											placeholder="请选择申请日期">
										</el-date-picker>
									</el-form-item>
								</td>
							</tr>
							<tr>
								<td>
									<el-form-item label="是否设置年费提醒" prop="setYearlyPopup">
										<el-switch
											v-model="formData1.setYearlyPopup"
											:active-value="1"
											:inactive-value="2">
										</el-switch>
									</el-form-item>
								</td>
								<td v-if="isSetYearly">
									<el-form-item label="年费提醒时间" prop="yearlyPopupTime">
										<el-date-picker
											v-model="formData1.yearlyPopupTime"
											type="date"
											format="yyyy年MM月dd日"
											value-format="yyyy年MM月dd日"
											placeholder="请选择时间">
										</el-date-picker>
									</el-form-item>
								</td>
							</tr>
						</table>
					</el-form>
					<div slot="footer">
						<el-button @click="resetForm('formData1')" type="primary" plain  icon="el-icon-refresh" size="medium">重置</el-button>
						<el-button @click="saveForm('formData1')" type="primary" icon="el-icon-check" size="medium">保存</el-button>
					</div>
				</el-dialog>
			</div>
			<div class="dialog2">
				<el-dialog :visible.sync="visible2" width="50%" top="20vh" center custom-class="dialog" @close="handleDialogClose('formData2')" :close-on-click-modal="false" :close-on-press-escape="false">
					<span slot="title" class="title">客户信息</span>
					<el-form :model="formData2" ref="formData2" hide-required-asterisk label-width="90px" inline :rules="rules2" size="small">
						<table>
							<tr>
								<td>
									<el-form-item label="公司名称" prop="customerCompanyName">
										<el-input clearable placeholder="请输入公司名称" v-model="formData2.customerCompanyName"></el-input>
									</el-form-item>
								</td>
							</tr>
							<tr>
								<td>
									<el-form-item label="联系人" prop="customerContacts">
										<el-input clearable placeholder="请输入联系人" v-model="formData2.customerContacts"></el-input>
									</el-form-item>
								</td>
								<td>
									<el-form-item label="注册地址" prop="customerRegisteredAddress">
										<el-input clearable placeholder="请输入注册地址" v-model="formData2.customerRegisteredAddress"></el-input>
									</el-form-item>
								</td>
							</tr>
							<tr>
								<td>
									<el-form-item label="Email" prop="customerEmail">
										<el-input clearable placeholder="请输入Email" v-model="formData2.customerEmail"></el-input>
									</el-form-item>
								</td>
								<td>
									<el-form-item label="通讯地址" prop="customerPostalAddress">
										<el-input clearable placeholder="请输入通讯地址" v-model="formData2.customerPostalAddress"></el-input>
									</el-form-item>
								</td>
							</tr>
							<tr>
								<td>
									<el-form-item label="移动电话" prop="customerTelephone">
										<el-input clearable placeholder="请输入移动电话" v-model="formData2.customerTelephone"></el-input>
									</el-form-item>
								</td>
								<td>
									<el-form-item label="固定电话" prop="customerContactsPhone">
										<el-input clearable placeholder="请输入固定电话" v-model="formData2.customerContactsPhone"></el-input>
									</el-form-item>
								</td>
							</tr>
							<tr>
								<td>
									<el-form-item label="客户类型" prop="customerType">
										<el-select v-model="formData2.customerType" placeholder="请选择客户类型" @change="handleCustomerTypeChange">
											<el-option
												v-for="item in customerType_options"
												:key="item.value"
												:label="item.label"
												:value="item.value">
											</el-option>
										</el-select>
									</el-form-item>
								</td>
								<td>
									<el-form-item label="社会统一信用代码" prop="uniformCreditCode" v-if="isCreditCode">
										<el-input clearable placeholder="请输入统一信用代码" v-model="formData2.uniformCreditCode"></el-input>
									</el-form-item>
								</td>
							</tr>
						</table>
					</el-form>
					<div slot="footer">
						<el-button @click="resetForm('formData2')" type="primary" plain  icon="el-icon-refresh" size="medium">重置</el-button>
						<el-button @click="saveForm('formData2')" type="primary" icon="el-icon-check" size="medium">保存</el-button>
					</div>
				</el-dialog>
			</div>
			<div class="dialog3">
				<el-dialog :visible.sync="visible3" width="50%" top="20vh" center custom-class="dialog" @close="handleDialogClose('formData3')" :close-on-click-modal="false" :close-on-press-escape="false">
					<span slot="title" class="title">服务方信息</span>
					<el-form :model="formData3" ref="formData3" hide-required-asterisk label-width="90px" inline :rules="rules3" size="small">
						<table>
							<tr>
								<td>
									<el-form-item label="项目承担方" prop="bearCompanyName">
										<el-input clearable placeholder="请输入服务方公司名称" v-model="formData3.bearCompanyName"></el-input>
									</el-form-item>
								</td>
								<td>
									<el-form-item label="移动电话" prop="bearTelephone">
										<el-input clearable placeholder="请输入移动电话" v-model="formData3.bearTelephone"></el-input>
									</el-form-item>
								</td>
							</tr>
							<tr>
								<td>
									<el-form-item label="负责人" prop="bearContactsName">
										<el-input clearable placeholder="请输入负责人" v-model="formData3.bearContactsName"></el-input>
									</el-form-item>
								</td>
								<td>
									<el-form-item label="固定电话" prop="bearContactsPhone">
										<el-input clearable placeholder="请输入固定电话" v-model="formData3.bearContactsPhone"></el-input>
									</el-form-item>
								</td>
							</tr>
						</table>
					</el-form>
					<div slot="footer">
						<el-button @click="resetForm('formData3')" type="primary" plain  icon="el-icon-refresh" size="medium">重置</el-button>
						<el-button @click="saveForm('formData3')" type="primary" icon="el-icon-check" size="medium">保存</el-button>
					</div>
				</el-dialog>
			</div>
			<div class="dialog4">
				<el-dialog :visible.sync="visible4" width="70%" top="20vh" center custom-class="dialog" @close="refresh" :close-on-click-modal="false" :close-on-press-escape="false">
					<span slot="title" class="title">收款信息</span>
					<el-form :model="formData4" ref="formData4" hide-required-asterisk label-width="0" inline size="small">
						<table>
							<tr>
								<th>款项类型</th>
								<th>订单金额(元)</th>
								<th>已收金额(元)</th>
								<th>收款时间</th>
								<th>百分比</th>
								<th class="btn">操作</th>
							</tr>
							<tr v-for="(v,k) in formData4List" :key="k">
								<td>
									{{v.typeNameText}}
								</td>
								<td>
									<el-form-item label="" prop="projectAmount">
										<span v-if="v.isPercentage">/</span>
										<el-input v-else clearable placeholder="请输入金额" v-model="v.projectAmount"></el-input>
									</el-form-item>
								</td>
								<td>
									<el-form-item label="" prop="receivedAmount">
										<span v-if="v.isPercentage">/</span>
										<el-input v-else clearable placeholder="请输入金额" v-model="v.receivedAmount"></el-input>
									</el-form-item>
								</td>
								<td>
									<el-form-item label="" prop="payTime">
										<el-date-picker
											v-model="v.payTime"
											type="date"
											format="yyyy年MM月dd日"
											value-format="yyyy年MM月dd日"
											placeholder="请选择时间"
											size="small">
										</el-date-picker>
									</el-form-item>
								</td>
								<td>
									<el-form-item label="" prop="percentage">
										<el-input v-if="v.isPercentage" clearable placeholder="请输入百分比" v-model="v.percentage">
											<template slot="append">%</template>
										</el-input>
										<span v-else>/</span>
									</el-form-item>
								</td>
								<td class="save">
									<el-button @click="saveGatheringInfo(v)" type="primary" size="mini">保存</el-button>
								</td>
							</tr>
						</table>
					</el-form>
				</el-dialog>
			</div>
			<div class="dialog5">
				<el-dialog :visible.sync="visible5" width="50%" top="20vh" center custom-class="dialog" @close="handleDialogClose('formData5')" :close-on-click-modal="false" :close-on-press-escape="false">
					<span slot="title" class="title">合作机构</span>
					<el-form :model="formData5" ref="formData5" hide-required-asterisk label-width="90px" inline :rules="rules5" size="small">
						<table>
							<tr>
								<td>
									<el-form-item label="机构名称" prop="agencyName">
										<el-input clearable placeholder="请输入机构名称" v-model="formData5.agencyName"></el-input>
									</el-form-item>
								</td>
							</tr>
							<tr>
								<td>
									<el-form-item label="联系人" prop="agencyContacts">
										<el-input clearable placeholder="请输入联系人" v-model="formData5.agencyContacts"></el-input>
									</el-form-item>
								</td>
								<td>
									<el-form-item label="移动电话" prop="mobile">
										<el-input clearable placeholder="请输入移动电话" v-model="formData5.mobile"></el-input>
									</el-form-item>
								</td>
							</tr>
							<tr>
								<td>
									<el-form-item label="固定电话" prop="telephone">
										<el-input clearable placeholder="请输入固定电话" v-model="formData5.telephone"></el-input>
									</el-form-item>
								</td>
								<td>
									<el-form-item label="QQ" prop="qqNumber">
										<el-input clearable placeholder="请输入QQ" v-model="formData5.qqNumber"></el-input>
									</el-form-item>
								</td>
							</tr>
						</table>
					</el-form>
					<div slot="footer">
						<el-button @click="resetForm('formData5')" type="primary" plain  icon="el-icon-refresh" size="medium">重置</el-button>
						<el-button @click="saveForm('formData5')" type="primary" icon="el-icon-check" size="medium">保存</el-button>
					</div>
				</el-dialog>
			</div>
			<div class="dialog6">
				<el-dialog :visible.sync="visible6" width="50%" top="20vh" center custom-class="dialog" @close="handleDialogClose('formData6')" :close-on-click-modal="false" :close-on-press-escape="false">
					<span slot="title" class="title">渠道方</span>
					<el-form :model="formData6" ref="formData6" hide-required-asterisk label-width="90px" inline :rules="rules6" size="small">
						<table>
							<tr>
								<td>
									<el-form-item label="公司名称" prop="canalName">
										<el-input clearable placeholder="请输入名称" v-model="formData6.canalName"></el-input>
									</el-form-item>
								</td>
							</tr>
							<tr>
								<td>
									<el-form-item label="联系人" prop="canalContacts">
										<el-input clearable placeholder="请输入联系人" v-model="formData6.canalContacts"></el-input>
									</el-form-item>
								</td>
								<td>
									<el-form-item label="移动电话" prop="mobile">
										<el-input clearable placeholder="请输入移动电话" v-model="formData6.mobile"></el-input>
									</el-form-item>
								</td>
							</tr>
							<tr>
								<td>
									<el-form-item label="固定电话" prop="telephone">
										<el-input clearable placeholder="请输入固定电话" v-model="formData6.telephone"></el-input>
									</el-form-item>
								</td>
								<td>
									<el-form-item label="QQ" prop="qqNumber">
										<el-input clearable placeholder="请输入QQ" v-model="formData6.qqNumber"></el-input>
									</el-form-item>
								</td>
							</tr>
						</table>
					</el-form>
					<div slot="footer">
						<el-button @click="resetForm('formData6')" type="primary" plain  icon="el-icon-refresh" size="medium">重置</el-button>
						<el-button @click="saveForm('formData6')" type="primary" icon="el-icon-check" size="medium">保存</el-button>
					</div>
				</el-dialog>
			</div>
			<div class="dialog7">
				<el-dialog :visible.sync="visible7" width="45%" top="20vh" center custom-class="dialog" @close="refresh" :close-on-click-modal="false" :close-on-press-escape="false">
					<span slot="title" class="title">开票信息</span>
					<el-form :model="formData7" ref="formData7" hide-required-asterisk label-width="0" inline size="small">
						<table>
							<tr>
								<th>开票金额(元)</th>
								<th>开票时间</th>
								<th class="btn"></th>
							</tr>
							<tr v-for="(v,k) in formData7List" :key="k">
								<td>
									<el-form-item label="" prop="invoiceAmount">
										<el-input clearable placeholder="请输入金额" v-model="v.invoiceAmount"></el-input>
									</el-form-item>
								</td>
								<td>
									<el-form-item label="" prop="invoiceTime">
										<el-date-picker
											v-model="v.invoiceTime"
											type="date"
											format="yyyy年MM月dd日"
											value-format="yyyy年MM月dd日"
											placeholder="请选择时间"
											size="small">
										</el-date-picker>
									</el-form-item>
								</td>
								<td class="save">
									<el-button @click="saveInvoiceInfo(v)" type="primary" size="mini">保存</el-button>
									<i v-if="k===formData7List.length-1" @click="addInvoice">+</i>
								</td>
							</tr>
						</table>
					</el-form>
				</el-dialog>
			</div>
		</el-main>
	</el-container>
</template>

<script>
// import { client, prefixFileName, trim } from '@/common/js/common.js';
import { trim } from '@/common/js/common.js';
export default {
	name: 'viewProjectDetail',
	props: ['id'],
	data () {
		return {
			categoryId: '',
			categorySid: '',
			categoryName: '',
			iscopyrightInput: false,
			categoryProject_options: [],
			contractList: [],
			cooperateAgency: {}, // 合作方信息
			cancelSide: {}, // 渠道方
			stateHistoryList: {}, // 流程图
			customerInfo: {}, // 客户信息
			serviceInfo: {}, // 服务方信息
			gathering: {}, // 收款信息
			gatheringList: [], // 收款信息列表
			invoice: {}, // 发票信息
			invoiceList: [], // 发票信息列表
			applicationDetailInfo: {}, // 合同信息
			applyInfo: {}, // 项目申报信息
			baseDocType: 0,   // 角色
			projectState: '',    // 项目状态
			// 申请信息
			visible1: false,
			isSetYearly: false,
			formData1: {},
			rules1: {
				applyTime: [
					{ required: true, message: '请选择申请日期', trigger: 'blur' }
				],
				brandType: [
					{ required: true, whitespace: true, message: '请输入类别', trigger: 'blur' }
				],
				checkAddress: [
					{ required: true, whitespace: true, message: '请输入材料受理地址', trigger: 'blur' }
				],
				contactName: [
					{ required: true, whitespace: true, message: '请输入联系人', trigger: 'blur' }
				],
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
				copyrightTime: [
					{ required: true, message: '请选择日期', trigger: 'blur' }
				],
				deadlineTime: [
					{ required: true, message: '请选择日期', trigger: 'blur' }
				],
				department: [
					{ required: true, whitespace: true, message: '请输入归口部门', trigger: 'blur' }
				],
				originator: [
					{ required: true, whitespace: true, message: '请输入发明人', trigger: 'blur' }
				],
				phone: [
					{ required: true, whitespace: true, message: '请输入固定电话', trigger: 'blur' }
				],
				yearlyPopupTime: [
					{ required: true, message: '请选择时间', trigger: 'blur' }
				]
			},
			// 客户信息
			visible2: false,
			formData2: {},
			rules2: {
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
			isCreditCode: false,
			// 服务方信息
			visible3: false,
			formData3: {},
			rules3: {
				bearCompanyName: [
					{ required: true, whitespace: true, message: '请输入公司名称', trigger: 'blur' },
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
					{ required: true, whitespace: true, message: '请输入负责人', trigger: 'blur' }
				],
				bearContactsPhone: [
					{ required: true, whitespace: true, message: '请输入固定电话', trigger: 'blur' }
				]
			},
			// 收款信息
			visible4: false,
			formData4: {},
			formData4List: [],
			// 合作机构
			visible5: false,
			formData5: {},
			rules5: {
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
				],
				qqNumber: [
					{
						pattern: /^[1-9][0-9]{4,14}$/,
						message: 'QQ填写有误',
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
			// 渠道方
			visible6: false,
			formData6: {},
			rules6: {
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
				],
				qqNumber: [
					{
						pattern: /^[1-9][0-9]{4,14}$/,
						message: 'QQ填写有误',
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
			// 开票信息
			visible7: false,
			formData7: {},
			formData7List: []
			// rules7: {
			// 	invoiceAmount: [
			// 		{ required: true, whitespace: true, message: '请输入金额', trigger: 'blur' },
			// 		{
			// 			pattern: /^[0-9]+$/,
			// 			message: '金额不正确',
			// 			transform (value) {
			// 				if (typeof value === 'string') {
			// 					return trim(value);
			// 				}
			// 				return value;
			// 			},
			// 			trigger: 'blur'
			// 		}
			// 	],
			// 	invoiceTime: [
			// 		{ required: true, message: '请选择时间', trigger: 'blur' }
			// 	]
			// }
		};
	},
	created () {
		this.infoDetail();
	},
	methods: {
		changeActive ($event) {
			$event.currentTarget.className = '';
		},
		removeActive ($event) {
			$event.currentTarget.className = 'li';
		},
		download () {
			for (let [key, item] of this.contractList.entries()) {
				let indexS = item.lastIndexOf('.');
				let suffix = item.substring(indexS);
				if (['.JPG', '.JPEG', '.jpg', '.jpeg'].indexOf(suffix) !== -1) {
					this.downloadIMG(key, item, suffix);
				} else if (['.pdf', '.PDF'].indexOf(suffix) !== -1) {
					this.downloadPDF(key, item, suffix);
				}
			}
		},
		downloadIMG (key, item, suffix) {
			let _this = this;
			console.log(item);
			// 下载图片地址和图片名
			let image = new Image();
			// 解决跨域 Canvas 污染问题
			image.setAttribute('crossOrigin', 'anonymous');
			image.onload = function () {
				let canvas = document.createElement('canvas');
				canvas.width = image.width;
				canvas.height = image.height;
				let context = canvas.getContext('2d');
				context.drawImage(image, 0, 0, image.width, image.height);
				let _dataURL = canvas.toDataURL('image/png'); // 得到图片的base64编码数据

				let blob_ = _this.dataURLtoBlob(_dataURL); // 用到Blob是因为图片文件过大时，在一部风浏览器上会下载失败，而Blob就不会
				let name = '合同附件' + (key + 1) + suffix;
				let url = {
					name: name,
					src: blob_
				};

				if (window.navigator.msSaveOrOpenBlob) {   // if browser is IE
					navigator.msSaveBlob(url.src, url.name); // filename文件名包括扩展名，下载路径为浏览器默认路径
				} else {
					let link = document.createElement('a');
					link.setAttribute('href', window.URL.createObjectURL(url.src));
					link.setAttribute('download', url.name);
					document.body.appendChild(link);
					link.click();
				}
			};
			image.src = item;
			// client().get(item, 'local-file').then((result) => {
			// 	console.log(result);
			// }).catch((err) => {
			// 	console.log(err);
			// 	_this.$message('下载失败');
			// });
		},
		downloadPDF (key, item, suffix) {
			let name = '合同附件' + (key + 1) + suffix;
			let link = document.createElement('a');
			link.setAttribute('href', item);
			link.setAttribute('target', '_blank');
			link.setAttribute('download', name);
			document.body.appendChild(link);
			link.click();
		},
		dataURLtoBlob (dataurl) {
			let arr = dataurl.split(',');
			let mime = arr[0].match(/:(.*?);/)[1];
			let bstr = atob(arr[1]);
			let n = bstr.length;
			let u8arr = new Uint8Array(n);
			while (n--) {
				u8arr[n] = bstr.charCodeAt(n);
			}
			return new Blob([u8arr], { type: mime });
		},
		getCopyrightNameList (id1, id2) {
			let _this = this;
			this.base.axios_post(null, '/platformEasymall/api/easymore/emPCCategoryProjectProductInfo', function (res) {
				console.log(res);
				if (res.code === 0) {
					for (let item of res.data) {
						if (item.categoryId === id1) {
							for (let list of item.nodeList) {
								if (list.categoryId === id2) {
									if (list.categoryProjectProductVoList.length > 0) {
										_this.iscopyrightInput = false;
										_this.categoryProject_options = list.categoryProjectProductVoList;
										console.log(_this.categoryProject_options);
									} else {
										_this.iscopyrightInput = true;
									}
								}
							}
							break;
						}
					}
				}
			});
		},
		infoDetail () {
			let data = {
				projectApplicationId: this.id
			};
			let _this = this;
			this.base.axios_post(data, '/platformEasymall/api/easymore/getProjectApplicationInfoDetail', function (res) {
				console.log(res);
				if (res.code === 0) {
					_this.categoryId = res.data.applicationDetailInfo.categoryId;
					_this.categorySid = res.data.applicationDetailInfo.categorySid;
					// 获取知识产权名称列表
					_this.getCopyrightNameList(_this.categoryId, _this.categorySid);
					_this.contractList = res.data.applicationDetailInfo.contractAddress;
					// let contractList = [];
					// for (let item of res.data.applicationDetailInfo.contractAddress) {
					// 	let indexStart = item.indexOf(prefixFileName);
					// 	let name = item.substring(indexStart);
					// 	let indexEnd = name.lastIndexOf('.');
					// 	if (indexEnd !== -1) {
					// 		name = name.substring(0, indexEnd);
					// 	}
					// 	contractList.push(name);
					// }
					// _this.contractList = contractList;
					switch (_this.categoryId) {
					case '1':
						_this.categoryName = '专利服务';
						break;
					case '2':
						_this.categoryName = '商标服务';
						break;
					case '3':
						_this.categoryName = '版权服务';
						break;
					case '4':
						_this.categoryName = '项目服务';
						break;
					case '5':
						_this.categoryName = '技术服务';
						break;
					}
					_this.cooperateAgency = res.data.cooperateAgency; // 合作方信息
					_this.cancelSide = res.data.cancelSide; // 渠道方
					_this.stateHistoryList = res.data.stateHistoryList; // 流程图
					_this.customerInfo = res.data.customerInfo; // 客户信息
					_this.serviceInfo = res.data.serviceInfo; // 服务方信息
					_this.gathering = res.data.gathering; // 收款信息
					_this.gatheringList = res.data.gatheringList; // 收款信息列表
					_this.invoice = res.data.invoice; // 发票信息
					_this.invoiceList = res.data.invoiceList; // 发票信息列表
					_this.applicationDetailInfo = res.data.applicationDetailInfo; // 合同信息
					_this.applyInfo = res.data.applyInfo; // 项目申请信息
					_this.projectState = res.data.projectState;
				} else {
					_this.$message({
						message: res.message,
						type: 'warning'
					});
				}
			});
		},
		handleBoxClick (value) {
			switch (value) {
			case 1:
				this.formData1 = { ...this.applyInfo };
				if (this.formData1.setYearlyPopup === 1) {
					this.isSetYearly = true;
				} else {
					this.isSetYearly = false;
				}
				this.visible1 = true;
				break;
			case 2:
				this.formData2 = { ...this.customerInfo };
				if (this.formData2.customerType === 1) {
					this.isCreditCode = true;
				} else {
					this.isCreditCode = false;
				}
				this.visible2 = true;
				break;
			case 3:
				this.formData3 = { ...this.serviceInfo };
				this.visible3 = true;
				break;
			case 4:
				let glist = [];
				for (let item of this.gatheringList) {
					let itemData = { ...item };
					itemData.percentage = String(itemData.percentage);
					itemData.projectAmount = String(itemData.projectAmount);
					itemData.receivedAmount = String(itemData.receivedAmount);
					if (itemData.typeName === 1) {
						itemData.typeNameText = '首款';
						itemData.isPercentage = false;
					} else {
						if (itemData.percentage === '0') {
							itemData.typeNameText = '尾款';
							itemData.isPercentage = false;
						} else {
							itemData.typeNameText = '尾款百分比';
							itemData.isPercentage = true;
						}
					}
					itemData.projectApplicationId = this.id;
					glist.push(itemData);
				}
				this.formData4List = glist;
				this.visible4 = true;
				break;
			case 5:
				this.formData5 = { ...this.cooperateAgency };
				this.visible5 = true;
				break;
			case 6:
				this.formData6 = { ...this.cancelSide };
				this.visible6 = true;
				break;
			case 7:
				let ilist = [];
				for (let item of this.invoiceList) {
					let itemData = { ...item };
					itemData.invoiceAmount = String(itemData.invoiceAmount);
					itemData.projectApplicationId = this.id;
					ilist.push(itemData);
				}
				this.formData7List = ilist;
				this.visible7 = true;
				break;
			}
		},
		handleDialogClose (formName) {
			this.$refs[formName].clearValidate();
		},
		// 重置表单
		resetForm (formName) {
			this.$refs[formName].resetFields();
		},
		// 数据传入服务器之前，进行转换
		transformDatas (obj) {
			let { ...datas } = obj;
			// 去除字符串数据的首尾空白
			for (let key of Object.keys(datas)) {
				if (typeof datas[key] === 'string') {
					datas[key] = trim(datas[key]);
				}
			}
			return datas;
		},
		// 客户信息
		handleCustomerTypeChange (value) {
			this.formData2.uniformCreditCode = '';
			if (value === 1) { // 企业用户
				this.isCreditCode = true;
			} else {
				this.isCreditCode = false;
			}
		},
		// 开票信息
		addInvoice () {
			this.formData7List.push({
				invoiceAmount: '',
				invoiceTime: '',
				projectApplicationId: this.id,
				projectInvoiceId: ''
			});
		},
		refresh () {
			this.infoDetail();
		},
		// 保存表单
		saveForm (formName) {
			let _this = this;
			this.$refs[formName].validate((valid) => {
				if (valid) {
					if (formName === 'formData1') { // 申请信息
						let formDatas = _this.transformDatas(_this.formData1);
						let data = formDatas;
						data.projectApplicationId = _this.id;
						_this.base.axios_post(data, '/platformEasymall/api/easymore/updateProjectApplicationBasicInformation', function (res) {
							console.log(res);
							if (res.code === 0) {
								_this.$message('更新成功');
								_this.$refs[formName].clearValidate();
								_this.visible1 = false;
								_this.infoDetail();
							} else {
								_this.$message(res.message);
							}
						});
					} else if (formName === 'formData2') { // 客户信息
						let formDatas = _this.transformDatas(_this.formData2);
						let data = formDatas;
						data.projectApplicationId = _this.id;
						_this.base.axios_post(data, '/platformEasymall/api/easymore/updateProjectApplicationCustomerInformation', function (res) {
							console.log(res);
							if (res.code === 0) {
								_this.$message('更新成功');
								_this.$refs[formName].clearValidate();
								_this.visible2 = false;
								_this.infoDetail();
							} else {
								_this.$message(res.message);
							}
						});
					} else if (formName === 'formData3') { // 服务方信息
						let formDatas = _this.transformDatas(_this.formData3);
						let data = formDatas;
						data.projectApplicationId = _this.id;
						_this.base.axios_post(data, '/platformEasymall/api/easymore/updateProjectApplicationServiceInformation', function (res) {
							console.log(res);
							if (res.code === 0) {
								_this.$message('更新成功');
								_this.$refs[formName].clearValidate();
								_this.visible3 = false;
								_this.infoDetail();
							} else {
								_this.$message(res.message);
							}
						});
					} else if (formName === 'formData4') {
						// 收款信息
					} else if (formName === 'formData5') {
						// 合作机构
						let formDatas = _this.transformDatas(_this.formData5);
						let data = formDatas;
						data.projectApplicationId = _this.id;
						_this.base.axios_post(data, '/platformEasymall/api/easymore/updateProjectApplicationCooperateAgencyInformation', function (res) {
							console.log(res);
							if (res.code === 0) {
								_this.$message('更新成功');
								_this.$refs[formName].clearValidate();
								_this.visible5 = false;
								_this.infoDetail();
							} else {
								_this.$message(res.message);
							}
						});
					} else if (formName === 'formData6') {
						// 渠道方
						let formDatas = _this.transformDatas(_this.formData6);
						let data = formDatas;
						data.projectApplicationId = _this.id;
						_this.base.axios_post(data, '/platformEasymall/api/easymore/updateProjectApplicationCanalSideInformation', function (res) {
							console.log(res);
							if (res.code === 0) {
								_this.$message('更新成功');
								_this.$refs[formName].clearValidate();
								_this.visible6 = false;
								_this.infoDetail();
							} else {
								_this.$message(res.message);
							}
						});
					}
				} else {
					console.log('表单校验不通过！');
					return false;
				}
			});
		},
		saveInvoiceInfo (item) {
			// 开票信息
			let _this = this;
			let data = { ...item };
			if (trim(data.invoiceAmount) === '') {
				this.$message('请输入开票金额');
				return;
			}
			if (!/^[1-9]\d{0,8}$/.test(trim(data.invoiceAmount))) {
				this.$message('金额不正确,请输入一个正整数');
				return;
			}
			if (!data.invoiceTime) {
				this.$message('请选择开票时间');
				return;
			}
			data.invoiceAmount = Number(trim(data.invoiceAmount));
			this.base.axios_post(data, '/platformEasymall/api/easymore/updateAndInsertProjectApplicationInvoiceInformation', function (res) {
				console.log(res);
				if (res.code === 0) {
					_this.$message('保存成功');
					item.projectInvoiceId = res.data;
				} else {
					_this.$message(res.message);
				}
			});
		},
		saveGatheringInfo (item) {
			// 收款信息
			let _this = this;
			if (item.isPercentage) {
				if (trim(item.percentage) === '') {
					this.$message('请输入百分比');
					return;
				}
				if (!/^[1-9]\d?$/.test(trim(item.percentage))) {
					this.$message('百分比不正确,请输入1-99的正整数');
					return;
				}
			} else {
				if (trim(item.projectAmount) === '') {
					this.$message('请输入订单金额');
					return;
				}
				if (!/^[1-9]\d{0,8}$/.test(trim(item.projectAmount))) {
					this.$message('订单金额不正确,请输入一个正整数');
					return;
				}
				if (trim(item.receivedAmount) === '') {
					this.$message('请输入已收金额');
					return;
				}
				if (!/^[1-9]\d{0,8}$/.test(trim(item.receivedAmount))) {
					this.$message('已收金额不正确,请输入一个正整数');
					return;
				}
			}
			if (!item.payTime) {
				this.$message('请选择收款时间');
				return;
			}
			let data = {
				projectApplicationId: item.projectApplicationId,
				projectGatheringId: item.projectGatheringId,
				projectAmount: Number(trim(item.projectAmount)),
				receivedAmount: Number(trim(item.receivedAmount)),
				percentage: Number(trim(item.percentage)),
				payTime: item.payTime
			};
			this.base.axios_post(data, '/platformEasymall/api/easymore/updateProjectApplicationGatheringInformation', function (res) {
				console.log(res);
				if (res.code === 0) {
					_this.$message('保存成功');
				} else {
					_this.$message(res.message);
				}
			});
		}
	}
};
</script>

<style scoped>
.back {
	float: right;
	font-size: 14px;
	color: #05baa2;
	margin-top: 10px;
}
.wrap {
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	padding: 0 40px;
}
.dataBox {
	height: 100%;
	overflow: auto;
}
.dataBox p.title {
	font-size: 14px;
    padding-bottom: 10px;
}
.dataBox p.title span {
	padding-right: 40px;
}
.dataBox p.title .download i {
	color: #02B1DE;
    text-decoration: underline;
	cursor: pointer;
}
.dataBox .boxs {
	display: flex;
	flex-flow: row wrap;
}
.dataBox .self {
	width: 32%;
	margin-right: 2%;
	margin-bottom: 2%;
	border: 1px solid #E1E1E1;
	box-sizing: border-box;
	padding:10px 0;
	height: 260px;
	cursor: pointer;
}
.dataBox .self3 {
	margin-right: 0;
}
.dataBox .self h3 {
	margin-left: 6%;
	font-size: 17px;
	font-weight: bold;
	padding-bottom: 10px;
}
.dataBox .self img {
	display: block;
    margin: 0 5%;
    width: 26%;
}
.dataBox .self .info {
	display: flex;
	align-items: flex-start;
}
.dataBox .self ul {
	flex: 1;
}
.dataBox .self ul li {
	width: 100%;
    font-size: 14px;
	margin-bottom: 3px;
}
.dataBox .self ul .li {
	white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.dialog .title {
	color: #04BBA2;
	font-size: 16px;
}
.dialog table {
	width: 100%;
}
.dialog7 table,
.dialog4 table {
	border-collapse: collapse;
}
.dialog7 th,
.dialog7 td,
.dialog4 th,
.dialog4 td {
	border: 1px solid #dcdfe6;
}
.dialog7 th,
.dialog4 th {
	padding: 10px 0;
}
.dialog7 td,
.dialog4 td {
	padding: 15px 0;
	text-align: center;
}
.dialog7 .el-form-item,
.dialog4 .el-form-item {
	margin: 0 !important;
}
.dialog7 .btn,
.dialog4 .btn {
	width: 60px;
}
.dialog7 .save {
	position: relative;
}
.dialog7 .save i {
	position: absolute;
	bottom: 0;
	right: 0;
	width: 15px;
	height: 15px;
	line-height: 15px;
	color: #fff;
	background-color: #04BBA2;
	cursor: pointer;
	border-radius: 2px;
}
/* .project-dialog .el-dialog {
	border-radius: 7px;
}
.project-dialog .el-dialog__header {
	border-radius: 5px 5px 0 0;
	background-color: #4e99e5;
	padding-top: 10px;
}
.project-dialog .el-dialog__header .el-dialog__title {
	color: #fff;
	font-size: 16px;
}
.project-dialog .el-dialog__header .el-dialog__headerbtn {
	top:10px;
	font-size: 18px;
}
.project-dialog .el-dialog__header .el-dialog__headerbtn .el-dialog__close {
	color: #fff;
}
.project-dialog .el-dialog__body {
	padding: 15px;
}
.project-dialog .el-dialog__footer {
	padding: 10px 15px 15px;
}
.project-dialog .rowEdit .dialog-footer {
	text-align: center;
}
.project-dialog .rowEdit .el-form-item {
	margin: 0;
}
.project-dialog .rowEdit .dialog-footer .el-button+.el-button {
	margin-left: 30px;
}
.project-dialog .rowDetails table,
.project-dialog .rowEdit table {
	width: 100%;
}
.project-dialog .el-form-item__content {
	vertical-align: middle;
} */
</style>
