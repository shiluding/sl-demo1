<template>
	<el-container class="syh-container">
		<el-header>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>主页</el-breadcrumb-item>
				<el-breadcrumb-item>用户中心</el-breadcrumb-item>
				<el-breadcrumb-item>易茂用户列表</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="syh-editdata">
				<el-input v-model="searchInput" placeholder="请输入昵称或手机号" clearable size="small"></el-input>
				<el-button class="search" size="small" @click="search">搜索</el-button>
				<el-button class="add" size="small" @click="add">新增</el-button>
			</div>
		</el-header>
		<el-main>
			<div class="syh-table">
				<el-table
					:data="tableData"
					:header-cell-style="{
						'background-color': '#05baa2',
						'color': '#fff'
					}"
					:cell-style="{
						'background-color': '#f5f4f7'
					}"
					max-height="100%"
					style="width: 100%">
					<el-table-column
						type="index"
						width="80"
						fixed
						align="center"
						label="序号">
					</el-table-column>
					<el-table-column
						prop="userName"
						align="center"
						label="登录用户名">
					</el-table-column>
					<el-table-column
						prop="nickname"
						align="center"
						label="昵称">
					</el-table-column>
					<el-table-column
						prop="phoneNo"
						align="center"
						label="手机号">
					</el-table-column>
					<el-table-column
						prop="sexText"
						align="center"
						label="性别">
					</el-table-column>
					<el-table-column
						prop="baseDocTypeText"
						align="center"
						label="身份类型">
					</el-table-column>
					<!-- <el-table-column
						sortable="custom"
						prop="balance"
						align="center"
						label="余额(元)">
					</el-table-column>
					<el-table-column
						sortable="custom"
						prop="score"
						align="center"
						label="积分">
					</el-table-column> -->
					<el-table-column
						align="center"
						header-align="left"
						class-name="usestate"
						width="150"
						label="启用状态">
						<template slot-scope="scope">
							<span :style="{color: scope.row.stateColor}">{{scope.row.enablestateText}}</span>
							<el-button @click="change_enablestate(scope.row.userId, scope.row.enablestate)" :style="{'background-color': scope.row.btn_stateColor}">{{scope.row.btn_enablestateText}}</el-button>
						</template>
					</el-table-column>
					<el-table-column>
						<template slot-scope="scope">
							<el-button @click="edit(scope.row)" style="background-color:#0199F9;">编辑</el-button>
							<el-button @click="showDetails(scope.row.userId)" style="background-color:#0199F9;">查看</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="syh-dialog">
				<el-dialog title="详情" :visible.sync="detailsVisible" width="35%" top="30vh" custom-class="rowDetails" :close-on-click-modal="false" :close-on-press-escape="false">
					<div class="box">
						<div class="left">
							<p><span class="lab">用户名：</span><span class="val">{{detailData.userName}}</span></p>
							<p><span class="lab">昵称：</span><span class="val">{{detailData.nickname}}</span></p>
							<p><span class="lab">性别：</span><span class="val">{{detailData.sexText}}</span></p>
							<p v-if="isCompany"><span class="lab">企业名称：</span><span class="val">{{detailData.enterpriseName}}</span></p>
							<p v-if="isServer"><span class="lab">服务机构名称：</span><span class="val">{{detailData.businessOrganName}}</span></p>
						</div>
						<div class="right">
							<p><span class="lab">启用状态：</span><span class="val">{{detailData.enablestateText}}</span></p>
							<p><span class="lab">身份类型：</span><span class="val">{{detailData.baseDocTypeText}}</span></p>
							<p><span class="lab">手机号：</span><span class="val">{{detailData.phoneNo}}</span></p>
							<p v-if="isCompany"><span class="lab">社会统一信用码：</span><span class="val">{{detailData.uniformCreditCode}}</span></p>
							<p v-if="isServer"><span class="lab">营业执照：</span><img :src="detailData.businessLicenceUrl" alt="图片" width="199px" height="100px"></p>
						</div>
					</div>
					<!-- <table>
						<tr>
							<td>用户名：</td>
							<td>{{detailData.userName}}</td>
							<td>启用状态：</td>
							<td>{{detailData.enablestateText}}</td>
						</tr>
						<tr>
							<td>昵称：</td>
							<td>{{detailData.nickname}}</td>
							<td>身份类型：</td>
							<td>{{detailData.baseDocTypeText}}</td>
						</tr>
						<tr>
							<td>性别：</td>
							<td>{{detailData.sexText}}</td>
							<td>手机号：</td>
							<td>{{detailData.phoneNo}}</td>
						</tr>
						<tr v-if="isCompany">
							<td>企业名称：</td>
							<td>{{detailData.enterpriseName}}</td>
							<td>社会统一信用码：</td>
							<td>{{detailData.uniformCreditCode}}</td>
						</tr>
						<tr v-if="isServer">
							<td>服务机构名称：</td>
							<td>{{detailData.businessOrganName}}</td>
							<td>营业执照：</td>
							<td><img :src="detailData.businessLicenceUrl" alt="图片" width="199px" height="100px"></td>
						</tr>
					</table> -->
				</el-dialog>
			</div>
			<div class="syh-dialog">
				<el-dialog v-if="editVisible" :visible="true" width="50%" top="20vh" custom-class="rowEdit" :before-close="beforeClose" :close-on-click-modal="false" :close-on-press-escape="false">
					<span slot="title" class="el-dialog__title">{{dialogTitle}}</span>
					<el-form :model="editDatasForm" ref="editDatasForm" hide-required-asterisk label-width="100px" inline :rules="rules" size="small">
						<table>
							<tr>
								<td>
									<el-form-item label="登录用户名" prop="userName">
										<el-input clearable placeholder="请输入用户名" v-model="editDatasForm.userName"></el-input>
									</el-form-item>
								</td>
								<td>
									<el-form-item label="登录密码" prop="userPassword">
										<el-input clearable placeholder="请输入密码" v-model="editDatasForm.userPassword"></el-input>
									</el-form-item>
								</td>
							</tr>
							<tr>
								<td>
									<el-form-item label="真实姓名" prop="realName">
										<el-input clearable placeholder="请输入姓名" v-model="editDatasForm.realName"></el-input>
									</el-form-item>
								</td>
								<td>
									<el-form-item label="手机号" prop="phoneNo">
										<el-input clearable placeholder="请输入手机号" v-model="editDatasForm.phoneNo"></el-input>
									</el-form-item>
								</td>
							</tr>
							<tr v-if="isCompany">
								<td>
									<el-form-item label="企业名称" prop="enterpriseName">
										<el-input clearable placeholder="请输入企业名称" v-model="editDatasForm.enterpriseName"></el-input>
									</el-form-item>
								</td>
								<td>
									<el-form-item label="社会统一信用码" prop="uniformCreditCode">
										<el-input clearable placeholder="请输入社会统一信用码" v-model="editDatasForm.uniformCreditCode"></el-input>
									</el-form-item>
								</td>
							</tr>
							<tr v-if="isServer">
								<td>
									<el-form-item label="服务机构名称" prop="businessOrganName">
										<el-input clearable placeholder="请输入服务机构名称" v-model="editDatasForm.businessOrganName"></el-input>
									</el-form-item>
								</td>
								<td>
									<el-form-item label="营业执照" prop="businessLicenceUrl">
										<div class="uploadBox">
											<el-upload
												action=""
												:multiple="false"
												:show-file-list="false"
												accept=".png,.jpg,.jpeg,.gif"
												:http-request="Upload">
												<img v-if="imageUrl" :src="imageUrl" class="uploadImg">
												<span v-if="!imageUrl" class="uploadBtn">点击上传</span>
												<div v-if="!imageUrl" slot="tip" class="uploadTip">只能上传jpg/jpeg/png/gif文件</div>
											</el-upload>
										</div>
									</el-form-item>
								</td>
							</tr>
							<tr>
								<td>
									<el-form-item label="用户类型" prop="baseDocType">
										<el-select v-model="editDatasForm.baseDocType" placeholder="请选择用户类型" @change="handleChange">
											<el-option
												v-for="item in baseDocType_options"
												:key="item.value"
												:label="item.label"
												:value="item.value">
											</el-option>
										</el-select>
									</el-form-item>
								</td>
							</tr>
						</table>
						<!-- <table>
							<tr>
								<td>
									<el-form-item label="用户名" prop="userName">
										<el-input clearable placeholder="请输入用户名" v-model="editDatasForm.userName"></el-input>
									</el-form-item>
								</td>
								<td>
									<el-form-item label="启用状态" prop="enablestate">
										<el-switch
											v-model="editDatasForm.enablestate"
											:active-value="2"
											:inactive-value="3"
										>
										</el-switch>
									</el-form-item>
								</td>
							</tr>
							<tr>
								<td>
									<el-form-item label="昵称" prop="nickname">
										<el-input clearable placeholder="请输入昵称" v-model="editDatasForm.nickname"></el-input>
									</el-form-item>
								</td>
								<td>
									<el-form-item label="身份类型" prop="baseDocType">
										<el-select v-model="editDatasForm.baseDocType" placeholder="请选择身份类型">
											<el-option
												v-for="item in baseDocType_options"
												:key="item.value"
												:label="item.label"
												:value="item.value">
											</el-option>
										</el-select>
									</el-form-item>
								</td>
							</tr>
							<tr>
								<td>
									<el-form-item label="手机号" prop="phoneNo">
										<el-input clearable placeholder="请输入手机号" v-model="editDatasForm.phoneNo"></el-input>
									</el-form-item>
								</td>
								<td>
									<el-form-item label="余额(元)" prop="balance">
										<el-input clearable placeholder="请输入余额" v-model="editDatasForm.balance"></el-input>
									</el-form-item>
								</td>
							</tr>
							<tr>
								<td>
									<el-form-item label="性别" prop="sex">
										<el-radio-group v-model="editDatasForm.sex">
											<el-radio :label="1">男</el-radio>
											<el-radio :label="2">女</el-radio>
											<el-radio :label="0">保密</el-radio>
										</el-radio-group>
									</el-form-item>
								</td>
								<td>
									<el-form-item label="积分" prop="score">
										<el-input clearable placeholder="请输入积分" v-model="editDatasForm.score"></el-input>
									</el-form-item>
								</td>
							</tr>
						</table> -->
					</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button @click="resetForm('editDatasForm')" type="primary" plain  icon="el-icon-refresh" size="medium">重置</el-button>
						<el-button @click="saveForm('editDatasForm')" type="primary" icon="el-icon-check" size="medium">保存</el-button>
					</div>
				</el-dialog>
			</div>
		</el-main>
		<el-footer>
			<div class="syh-pagination">
				<el-pagination
					background
					layout="slot, prev, pager, next"
					:page-count="pagecount"
					:page-size="pagesize"
					:current-page="currentPage"
					@current-change="currentchange"
					prev-text="上一页"
					next-text="下一页">
					<el-button class="firstlast-pager" :class="firstPageClassObj" @click="jumpPage('1')">首页</el-button>
				</el-pagination>
				<el-pagination
					layout="slot"
					:page-count="pagecount"
					:page-size="pagesize"
					:current-page="currentPage">
					<el-button class="firstlast-pager" :class="lastPageClassObj" @click="jumpPage('0')">尾页</el-button>
				</el-pagination>
				<el-pagination
					layout="slot, jumper"
					:page-count="pagecount"
					:page-size="pagesize"
					:current-page="currentPage"
					@current-change="currentchange">
					<span class="pageinfo">当前第<i>{{currentPage}}</i>页/共<i>{{pagecount}}</i>页</span>
				</el-pagination>
			</div>
		</el-footer>
	</el-container>
</template>

<script>
import { client, prefixFileName, trim } from '@/common/js/common.js';
export default {
	name: 'emailUserList',
	data () {
		return {
			// 表格数据
			DataList: [],
			// sortType: 0, // 排序字段
			searchInput: '', // 搜索输入内容
			searchValue: '', // 当前搜索值
			pagecount: 0, // 总页数
			pagesize: 10, // 每页的数据条数
			currentPage: 1, // 当前页码
			isFirstPageActive: false,
			isLastPageActive: true,
			detailsVisible: false, // 详情弹框是否显示
			detailData: {},
			editVisible: false, // 新增或编辑弹框是否显示
			editDatasForm: {},
			dialogTitle: '新增', // 新增或编辑弹框的title设置
			submitState: 1, // 保存类型：新增：1 编辑：0
			imageUrl: '',
			isCompany: false,
			isServer: false,
			rules: {
				userName: [
					{ required: true, whitespace: true, message: '请输入用户名', trigger: 'blur' },
					{
						pattern: /^[0-9a-zA-Z]{6,16}$/,
						message: '登录用户名为6-16位的字母或数字组合',
						transform (value) {
							if (typeof value === 'string') {
								return trim(value);
							}
							return value;
						},
						trigger: 'blur'
					}
				],
				userPassword: [
					{ required: true, whitespace: true, message: '请输入密码', trigger: 'blur' },
					{
						pattern: /^[0-9a-zA-Z]{6,16}$/,
						message: '密码填写有误,要求6-16位的字母或数字组合',
						transform (value) {
							if (typeof value === 'string') {
								return trim(value);
							}
							return value;
						},
						trigger: 'blur'
					}
				],
				realName: [
					{ required: true, whitespace: true, message: '请输入姓名', trigger: 'blur' },
					{
						pattern: /^[\u4e00-\u9fa5]{2,4}$/,
						message: '真实姓名要求2-4个汉字组合',
						transform (value) {
							if (typeof value === 'string') {
								return trim(value);
							}
							return value;
						},
						trigger: 'blur'
					}
				],
				phoneNo: [
					{ required: true, whitespace: true, message: '请输入手机号', trigger: 'blur' },
					{
						pattern: /^1[3456789]\d{9}$/,
						message: '手机号不正确',
						transform (value) {
							if (typeof value === 'string') {
								return trim(value);
							}
							return value;
						},
						trigger: 'blur'
					}
				],
				enterpriseName: [
					{ required: true, whitespace: true, message: '请输入企业名称', trigger: 'blur' },
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
				uniformCreditCode: [
					{ required: true, whitespace: true, message: '请输入社会统一信用码', trigger: 'blur' },
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
				],
				businessOrganName: [
					{ required: true, whitespace: true, message: '请输入服务机构名称', trigger: 'blur' },
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
				baseDocType: [
					{ required: true, message: '请选择用户类型', trigger: 'blur' }
				]
			},
			baseDocType_options: [
				{
					value: 0,
					label: '普通用户'
				},
				{
					value: 1,
					label: '企业用户'
				},
				{
					value: 2,
					label: '服务方'
				}
			]
			// rules: {
			// 	userName: [
			// 		{ required: true, whitespace: true, message: '请输入用户名', trigger: 'blur' }
			// 	],
			// 	enablestate: [
			// 		{ type: 'integer', required: true, message: '请选择启用状态', trigger: 'change' }
			// 	],
			// 	nickname: [
			// 		{ required: true, whitespace: true, message: '请输入昵称', trigger: 'blur' }
			// 	],
			// 	baseDocType: [
			// 		{ type: 'integer', required: true, message: '请选择身份类型', trigger: 'change' }
			// 	],
			// 	phoneNo: [
			// 		{ required: true, whitespace: true, message: '请输入手机号', trigger: 'blur' },
			// 		{
			// 			pattern: /^1[3456789]\d{9}$/,
			// 			message: '手机号不正确',
			// 			transform (value) {
			// 				if (typeof value === 'string') {
			// 					return trim(value);
			// 				}
			// 				return value;
			// 			},
			// 			trigger: 'blur'
			// 		}
			// 	],
			// 	balance: [
			// 		{ required: true, whitespace: true, message: '请输入余额', trigger: 'blur' },
			// 		{
			// 			pattern: /^([0]|([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/,
			// 			message: '余额输入不正确',
			// 			transform (value) {
			// 				if (typeof value === 'string') {
			// 					return trim(value);
			// 				}
			// 				return value;
			// 			},
			// 			trigger: 'blur'
			// 		}
			// 	],
			// 	sex: [
			// 		{ type: 'integer', required: true, message: '请选择性别', trigger: 'change' }
			// 	],
			// 	score: [
			// 		{ required: true, whitespace: true, message: '请输入积分', trigger: 'blur' },
			// 		{
			// 			pattern: /^([0]|[1-9][0-9]*)$/,
			// 			message: '请输入一个正整数',
			// 			transform (value) {
			// 				if (typeof value === 'string') {
			// 					return trim(value);
			// 				}
			// 				return value;
			// 			},
			// 			trigger: 'blur'
			// 		}
			// 	]
			// }
		};
	},
	watch: {
		currentPage: function (currentPage) {
			if (currentPage === 1) {
				this.isFirstPageActive = false;
			} else {
				this.isFirstPageActive = true;
			}
			if (currentPage === this.pagecount) {
				this.isLastPageActive = false;
			} else {
				this.isLastPageActive = true;
			}
			this.getDataList(currentPage);
		}
	},
	mounted () {
		this.getDataList(1);
	},
	computed: {
		tableData () {
			let tableData = [];
			for (let item of this.DataList) {
				let {...itemData} = item;
				switch (itemData.baseDocType) {
				case 0:
					itemData.baseDocTypeText = '普通用户';
					break;
				case 1:
					itemData.baseDocTypeText = '企业用户';
					break;
				case 2:
					itemData.baseDocTypeText = '服务方';
					break;
				};
				switch (itemData.enablestate) {
				case 1:
					itemData.enablestateText = '未启用';
					itemData.stateColor = '#ccc';
					itemData.btn_enablestateText = '启用';
					itemData.btn_stateColor = '#05baa4';
					break;
				case 2:
					itemData.enablestateText = '启用';
					itemData.stateColor = '#05baa4';
					itemData.btn_enablestateText = '停用';
					itemData.btn_stateColor = '#fe3c51';
					break;
				case 3:
					itemData.enablestateText = '停用';
					itemData.stateColor = '#fe3c51';
					itemData.btn_enablestateText = '启用';
					itemData.btn_stateColor = '#05baa4';
					break;
				};
				switch (itemData.sex) {
				case 1:
					itemData.sexText = '男';
					break;
				case 2:
					itemData.sexText = '女';
					break;
				case 0:
					itemData.sexText = '保密';
					break;
				};
				tableData.push(itemData);
			}
			return tableData;
		},
		// 首页按钮class
		firstPageClassObj: function () {
			return {
				active: this.pagecount > 1 ? this.isFirstPageActive : false,
				disabled: this.pagecount > 1 ? !this.isFirstPageActive : true
			};
		},
		// 尾页按钮class
		lastPageClassObj: function () {
			return {
				active: this.pagecount > 1 ? this.isLastPageActive : false,
				disabled: this.pagecount > 1 ? !this.isLastPageActive : true
			};
		}
	},
	methods: {
		// 点击‘首页’或‘尾页’按钮处理事件
		jumpPage (val) {
			switch (val) {
			case '1':
				this.currentPage = 1;
				break;
			case '0':
				this.currentPage = this.pagecount;
				break;
			}
		},
		// 当前页改变处理事件
		currentchange (currentPage) {
			this.currentPage = currentPage;
		},
		// 启用状态改变处理事件
		change_enablestate (id, state) {
			// 1 未启用  2 启用  3 停用
			let _this = this;
			let data = {
				userId: id
			};
			if (state === 2) {
				data.enablestate = 3; // 启用状态转停用
			} else {
				data.enablestate = 2; // 其他状态转启用
			}
			this.base.axios_post(data, '/platformUser/api/easymore/platformAdminUpdateEnableState', function (res) {
				console.log(res);
				if (res.code === 0) {
					_this.$message('更新状态成功！');
					_this.getDataList(_this.currentPage);
				} else {
					_this.$message(res.message);
				}
			});
		},
		// 显示‘详情’弹框
		showDetails (id) {
			let _this = this;
			let data = {
				userId: id
			};
			this.base.axios_post(data, '/platformUser/api/easymore/platformQryUserInfoDetail', function (res) {
				console.log(res);
				if (res.code === 0) {
					let {...list} = res.data;
					// 启用状态:1=未启用，2=已启用，3=已停用
					switch (list.enablestate) {
					case 1:
						list.enablestateText = '未启用';
						break;
					case 2:
						list.enablestateText = '已启用';
						break;
					case 3:
						list.enablestateText = '已停用';
						break;
					};
					switch (list.baseDocType) {
					case 0:
						list.baseDocTypeText = '普通用户';
						break;
					case 1:
						list.baseDocTypeText = '企业用户';
						break;
					case 2:
						list.baseDocTypeText = '服务方';
						break;
					};
					switch (list.sex) {
					case 1:
						list.sexText = '男';
						break;
					case 2:
						list.sexText = '女';
						break;
					case 0:
						list.sexText = '保密';
						break;
					};
					_this.handleShow(list.baseDocType);
					_this.detailData = list;
					_this.detailsVisible = true;
				} else {
					_this.$message(res.message);
				}
			});
		},
		// 点击‘搜索’按钮
		search () {
			this.searchValue = trim(this.searchInput);
			this.getDataList(1);
			this.currentPage = 1;
		},
		// 点击‘新增’按钮，显示‘新增’弹框
		add () {
			this.editDatasForm = {};
			this.isCompany = false;
			this.isServer = false;
			this.imageUrl = '';
			this.dialogTitle = '新增';
			this.submitState = 1;
			this.editVisible = true;
		},
		// 点击‘编辑’按钮，显示‘编辑’弹框
		edit (row) {
			let {...datas} = row;
			this.handleShow(datas.baseDocType);
			this.imageUrl = '';
			if (/^https?:\/\/.*$/.test(datas.businessLicenceUrl)) {
				this.imageUrl = datas.businessLicenceUrl;
			}
			// datas.balance = String(datas.balance);
			// datas.score = String(datas.score);
			this.editDatasForm = datas;
			this.dialogTitle = '编辑';
			this.submitState = 0;
			this.editVisible = true;
		},
		handleChange (value) {
			this.handleShow(value);
		},
		handleShow (value) {
			// 用户类型 0=普通用户，1=企业用户，2=服务方
			switch (value) {
			case 1:
				this.isCompany = true;
				this.isServer = false;
				break;
			case 2:
				this.isCompany = true;
				this.isServer = true;
				break;
			default:
				this.isCompany = false;
				this.isServer = false;
				break;
			};
		},
		// 上传图标
		Upload (file) {
			let _this = this;
			if (file.file) {
				let indexS = file.file.name.lastIndexOf('.');
				let name = prefixFileName + file.file.uid + file.file.name.substring(indexS); // 正式打包使用'proFile/'
				client().put(name, file.file).then((result) => {
					console.log(result.url);
					_this.imageUrl = result.url;
				}).catch((err) => {
					console.log(err);
				});
			}
		},
		beforeClose (done) {
			this.$refs['editDatasForm'].clearValidate();
			this.imageUrl = '';
			this.editVisible = false;
		},
		// 数据传入服务器之前，进行转换
		transformDatas (obj) {
			let {...datas} = obj;
			// 去除字符串数据的首尾空白
			for (let key of Object.keys(datas)) {
				if (typeof datas[key] === 'string') {
					datas[key] = trim(datas[key]);
				}
			}
			// datas.balance = Number(datas.balance);
			// datas.score = Number(datas.score);
			return datas;
		},
		// 保存表单
		saveForm (formName) {
			if (this.editDatasForm.baseDocType === 2 && !this.imageUrl) {
				this.$message('请上传图片');
				return;
			}
			let _this = this;
			this.$refs[formName].validate((valid) => {
				if (valid) {
					let formDatas = _this.transformDatas(_this.editDatasForm);
					let data = {
						baseDocType: formDatas.baseDocType,
						businessLicenceUrl: _this.imageUrl,
						businessOrganName: formDatas.businessOrganName,
						enterpriseName: formDatas.enterpriseName,
						uniformCreditCode: formDatas.uniformCreditCode,
						phoneNo: formDatas.phoneNo,
						realName: formDatas.realName,
						userName: formDatas.userName,
						userPassword: formDatas.userPassword
					};
					if (_this.submitState === 1) {
						// 新增
						console.log('新增');
						_this.base.axios_post(data, '/platformUser/api/easymore/platformEmCustUserAdd', function (res) {
							console.log(res);
							if (res.code === 0) {
								_this.$message('新增成功');
								_this.$refs[formName].clearValidate();
								_this.editVisible = false;
								_this.currentPage = 1;
								_this.getDataList(1);
							} else {
								_this.$message(res.message);
							}
						});
					} else {
						// 编辑
						console.log('编辑');
						data.userId = formDatas.userId;
						_this.base.axios_post(data, '/platformUser/api/easymore/platformEmCustServieUserUpdate', function (res) {
							console.log(res);
							if (res.code === 0) {
								_this.$message('修改成功');
								_this.$refs[formName].clearValidate();
								_this.editVisible = false;
								_this.getDataList(_this.currentPage);
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
		// 重置表单
		resetForm (formName) {
			this.$refs[formName].resetFields();
		},
		// 表格排序
		// sortChange ({column, prop, order}) {
		// 	switch (prop) {
		// 	case 'enablestate':
		// 		if (order === 'ascending') {
		// 			this.sortType = 1;
		// 		} else {
		// 			this.sortType = 2;
		// 		}
		// 		break;
		// 	// case 'balance':
		// 	// 	if (order === 'ascending') {
		// 	// 		this.sortType = 3;
		// 	// 	} else {
		// 	// 		this.sortType = 4;
		// 	// 	}
		// 	// 	break;
		// 	// case 'score':
		// 	// 	if (order === 'ascending') {
		// 	// 		this.sortType = 5;
		// 	// 	} else {
		// 	// 		this.sortType = 6;
		// 	// 	}
		// 	// 	break;
		// 	}
		// 	this.getDataList(this.currentPage);
		// },
		// 获取列表数据
		getDataList (pagno) {
			let _this = this;
			let data = {
				nicknameOrPhoneNo: this.searchValue,
				pageNo: pagno,
				pageSize: this.pagesize,
				sortType: 0,
				userType: 1
			};
			this.base.axios_post(data, '/platformUser/api/easymore/platformQryEmUserList', function (res) {
				console.log(res);
				if (res.code === 0) {
					_this.DataList = res.data.resultList;
					_this.pagecount = res.data.pageTotal;
				} else {
					_this.$message(res.message);
				}
			});
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.syh-dialog .rowDetails .box {
	display: flex;
	justify-content: space-around;
	overflow: hidden;
}
.syh-dialog .rowDetails .box p {
	margin-bottom: 15px;
}
.syh-dialog .rowDetails .box img{
	vertical-align: top;
}
.syh-dialog .rowEdit .uploadBox {
	display: inline-block;
	width: 199px;
	height: 100px;
	border: 1px solid #dcdfe6;
	border-radius: 4px;
	box-sizing: border-box;
}
.syh-dialog .rowEdit .uploadImg {
	display: block;
	width: 199px;
	height: 100px;
}
.syh-dialog .rowEdit .uploadBtn {
	text-decoration: underline;
	color: #409EFF;
	margin-left: 10px;
}
.syh-dialog .rowEdit .uploadTip {
	font-size: 12px;
	line-height: 14px;
	padding: 0 10px;
}
</style>
