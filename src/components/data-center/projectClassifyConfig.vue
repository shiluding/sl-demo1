<template>
	<el-container class="syh-container projectClassifyConfig">
		<el-header>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>主页</el-breadcrumb-item>
				<el-breadcrumb-item>数据中心</el-breadcrumb-item>
				<el-breadcrumb-item>服务项目分类配置</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="syh-editdata">
				<!-- <el-input v-model="searchInput" placeholder="请输入昵称或手机号" clearable size="small"></el-input>
				<el-button class="search" size="small" @click="search">搜索</el-button> -->
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
						align="center"
						label="序号">
					</el-table-column>
					<el-table-column type="expand" width="30">
						<template slot-scope="props">
							<el-table
								:show-header="false"
								:data="props.row.categoryTreeVOList"
								:cell-style="{
									'background-color': '#f5f4f7'
								}"
								max-height="300"
								style="width: 100%">
								<el-table-column width="80">
								</el-table-column>
								<el-table-column width="30">
								</el-table-column>
								<el-table-column
									prop="categoryName"
									min-width="200"
									align="left"
									label="分类名称">
								</el-table-column>
								<el-table-column
									prop="categoryTypeText"
									min-width="100"
									align="center"
									label="类目级别">
								</el-table-column>
								<el-table-column
									prop="emServiceText"
									min-width="80"
									align="center"
									label="是否为服务项目">
								</el-table-column>
								<!-- <el-table-column
									prop="typesEnterpriseText"
									min-width="100"
									align="center"
									label="服务对象">
								</el-table-column> -->
								<el-table-column
									prop="categorySort"
									min-width="100"
									align="center"
									label="类目排序">
								</el-table-column>
								<el-table-column
									min-width="120">
									<template slot-scope="scope">
										<el-button @click="edit(scope.row)" style="background-color:#0199F9;">编辑</el-button>
										<el-button @click="showDetails(scope.row)" style="background-color:#0199F9;">查看</el-button>
									</template>
								</el-table-column>
							</el-table>
						</template>
					</el-table-column>
					<el-table-column
						prop="categoryName"
						min-width="200"
						align="left"
						label="分类名称">
					</el-table-column>
					<el-table-column
						prop="categoryTypeText"
						min-width="100"
						align="center"
						label="类目级别">
					</el-table-column>
					<el-table-column
						prop="emServiceText"
						min-width="80"
						align="center"
						label="是否为服务项目">
					</el-table-column>
					<!-- <el-table-column
						prop="typesEnterpriseText"
						min-width="100"
						align="center"
						label="服务对象">
					</el-table-column> -->
					<el-table-column
						prop="categorySort"
						min-width="100"
						align="center"
						label="类目排序">
					</el-table-column>
					<el-table-column
						min-width="120">
						<template slot-scope="scope">
							<el-button @click="edit(scope.row)" style="background-color:#0199F9;">编辑</el-button>
							<el-button @click="showDetails(scope.row)" style="background-color:#0199F9;">查看</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="syh-dialog">
				<el-dialog title="详情" :visible.sync="detailsVisible" width="37%" top="30vh" custom-class="rowDetails" :close-on-click-modal="false" :close-on-press-escape="false">
					<div class="box">
						<div class="left">
							<p><span class="lab">分类名称：</span><span class="val">{{detailData.categoryName}}</span></p>
							<p><span class="lab">类目级别：</span><span class="val">{{detailData.categoryTypeText}}</span></p>
							<p><span class="lab">是否为服务项目：</span><span class="val">{{detailData.emServiceText}}</span></p>
						</div>
						<div class="right">
							<p><span class="lab">所属组织名称：</span><span class="val">{{detailData.pkOrgName}}</span></p>
							<p><span class="lab">所属上级类目：</span><span class="val">{{detailData.parentName}}</span></p>
							<p><span class="lab">类目排序：</span><span class="val">{{detailData.categorySort}}</span></p>
						</div>
					</div>
					<!-- <table>
						<tr>
							<td>分类名称：</td>
							<td>{{detailData.categoryName}}</td>
							<td>所属组织名称：</td>
							<td>{{detailData.pkOrgName}}</td>
						</tr>
						<tr>
							<td>类目级别：</td>
							<td>{{detailData.categoryTypeText}}</td>
							<td>所属上级类目：</td>
							<td>{{detailData.parentName}}</td>
						</tr>
						<tr>
							<td>是否为服务项目：</td>
							<td>{{detailData.emServiceText}}</td>
							<td>类目排序：</td>
							<td>{{detailData.categorySort}}</td>
						</tr>
					</table> -->
				</el-dialog>
			</div>
			<div class="syh-dialog">
				<el-dialog v-if="editVisible" :visible="true" width="50%" top="20vh" custom-class="rowEdit" :before-close="beforeClose" :close-on-click-modal="false" :close-on-press-escape="false">
					<span slot="title" class="el-dialog__title">{{dialogTitle}}</span>
					<el-form :model="editDatasForm" ref="editDatasForm" hide-required-asterisk label-width="110px" inline :rules="rules" size="small">
						<table>
							<tr>
								<td>
									<el-form-item label="分类名称" prop="categoryName">
										<el-input clearable placeholder="请输入分类名称" v-model="editDatasForm.categoryName"></el-input>
									</el-form-item>
								</td>
								<td>
									<el-form-item label="所属组织名称" prop="pkOrg">
										<el-select v-model="editDatasForm.pkOrg" placeholder="请选择所属组织" filterable>
											<el-option
												v-for="item in pkOrgName_options"
												:key="item.code"
												:label="item.name"
												:value="item.code"
												:disabled="item.disabled">
											</el-option>
										</el-select>
									</el-form-item>
								</td>
							</tr>
							<tr>
								<td>
									<el-form-item label="类目级别" prop="categoryType">
										<el-select v-model="editDatasForm.categoryType" placeholder="请选择类目级别" @change="handleCategoryTypeChange">
											<el-option
												v-for="item in categoryType_options"
												:key="item.value"
												:label="item.label"
												:value="item.value">
											</el-option>
										</el-select>
									</el-form-item>
								</td>
								<td v-if="isParent">
									<el-form-item label="所属上级类目" prop="parentId">
										<el-select v-model="editDatasForm.parentId" placeholder="请选择所属上级类目" filterable>
											<el-option
												v-for="item in parentId_options"
												:key="item.categoryId"
												:label="item.categoryName"
												:value="item.categoryId">
											</el-option>
										</el-select>
									</el-form-item>
								</td>
							</tr>
							<tr>
								<td>
									<el-form-item label="是否为服务项目" prop="emService">
										<el-switch
											v-model="editDatasForm.emService"
											active-value="Y"
											inactive-value="N"
											@change="handleEmServiceChange">
										</el-switch>
									</el-form-item>
								</td>
								<td>
									<el-form-item label="类目排序" prop="categorySort">
										<el-input clearable placeholder="请输入类目排序" v-model="editDatasForm.categorySort"></el-input>
									</el-form-item>
								</td>
							</tr>
							<!-- <tr>
								<td>
									<el-form-item label="服务对象" prop="typesEnterprise">
										<el-select v-model="editDatasForm.typesEnterprise" placeholder="请选择服务对象" :disabled="isDisabled_typesEnterprise">
											<el-option
												v-for="item in typesEnterprise_options"
												:key="item.value"
												:label="item.label"
												:value="item.value">
											</el-option>
										</el-select>
									</el-form-item>
								</td>
							</tr> -->
						</table>
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
					:current-page="currentPage"
					>
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
import { trim } from '@/common/js/common.js';
export default {
	name: 'organization',
	data () {
		return {
			// 表格数据
			DataList: [],
			// sortType: 1, // 排序字段
			// searchInput: '', // 搜索输入内容
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
			rules: {
				categoryName: [
					{ required: true, whitespace: true, message: '请输入分类名称', trigger: 'blur' }
				],
				pkOrg: [
					{ required: true, message: '请选择所属组织', trigger: 'blur' }
				],
				categoryType: [
					{ required: true, message: '请选择类目级别', trigger: 'blur' }
				],
				parentId: [
					{ required: true, message: '请选择所属上级类目', trigger: 'blur' }
				],
				// typesEnterprise: [
				// 	{ required: true, message: '请选择服务对象', trigger: 'blur' }
				// ],
				categorySort: [
					{ required: true, whitespace: true, message: '请输入类目排序', trigger: 'blur' },
					{
						pattern: /^([0]|[1-9][0-9]*)$/,
						message: '请输入一个正整数',
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
			// 所属组织名称
			pkOrgName_options: [],
			// 类目级别
			categoryType_options: [
				{
					value: 0,
					label: '一级分类'
				},
				{
					value: 1,
					label: '二级分类'
				}
			],
			// 是否显示所属上级类目
			isParent: false,
			// 是否禁用服务对象
			// isDisabled_typesEnterprise: true,
			// 所属上级类目
			parentId_options: []
			// 服务对象
			// typesEnterprise_options: [
			// 	{
			// 		value: 1,
			// 		label: '初创期企业'
			// 	},
			// 	{
			// 		value: 2,
			// 		label: '成长期企业'
			// 	},
			// 	{
			// 		value: 3,
			// 		label: '发展期企业'
			// 	}
			// ]
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
			let tableData = this.handleData(this.DataList);
			for (let item of tableData) {
				item.categoryTreeVOList = this.handleData(item.categoryTreeVOList, item.categoryName);
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
		handleData (list, parentName) {
			console.log(parentName);
			let data = [];
			for (let item of list) {
				let {...itemData} = item;
				switch (itemData.categoryType) {
				case 0:
					itemData.categoryTypeText = '一级分类';
					break;
				case 1:
					itemData.categoryTypeText = '二级分类';
					break;
				};
				switch (itemData.emService) {
				case 'N':
					itemData.emServiceText = '否';
					break;
				case 'Y':
					itemData.emServiceText = '是';
					break;
				};
				// switch (itemData.typesEnterprise) {
				// case 1:
				// 	itemData.typesEnterpriseText = '初创期企业';
				// 	break;
				// case 2:
				// 	itemData.typesEnterpriseText = '成长期企业';
				// 	break;
				// case 3:
				// 	itemData.typesEnterpriseText = '发展期企业';
				// 	break;
				// };
				if (parentName) {
					itemData.parentName = parentName;
				}
				data.push(itemData);
			}
			return data;
		},
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
		change_enablestate (userId, state) {
			// 1 未启用  2 启用  3 停用
			let _this = this;
			let data = {
				userId: userId
			};
			if (state === 2) {
				data.enablestate = 3; // 启用状态转停用
			} else {
				data.enablestate = 2; // 其他状态转启用
			}
			this.base.axios_post(data, '/platformUser/api/easymore/platformAdminUpdateEnableState', function (res) {
				// console.log(res);
				if (res.code === 0) {
					_this.$message('更新用户状态成功！');
					_this.getDataList(_this.currentPage);
				} else {
					_this.$message(res.message);
				}
			});
		},
		// 显示‘详情’弹框
		showDetails (row) {
			// console.log(row);
			this.detailData = row;
			this.detailsVisible = true;
		},
		// 点击‘搜索’按钮
		// search () {
		// 	this.searchValue = trim(this.searchInput);
		// 	this.getDataList(1);
		// 	this.currentPage = 1;
		// },
		// 点击‘新增’按钮，显示‘新增’弹框
		add () {
			// 默认值
			this.editDatasForm = {
				emService: 'N',
				typesEnterprise: 0
			};
			this.isParent = false;
			// this.isDisabled_typesEnterprise = true;
			this.getpkOrgName_options();
			this.getparentId_options();
			this.dialogTitle = '新增';
			this.submitState = 1;
			this.editVisible = true;
		},
		// 点击‘编辑’按钮，显示‘编辑’弹框
		edit (row) {
			let {...datas} = row;
			datas.categorySort = String(datas.categorySort);
			if (datas.categoryType === 0) {
				this.isParent = false;
				delete datas.parentId;
				// datas.parentId = undefined;
			} else {
				this.isParent = true;
			}
			// if (datas.emService === 'N') {
			// 	this.isDisabled_typesEnterprise = true;
			// } else {
			// 	this.isDisabled_typesEnterprise = false;
			// }
			this.getpkOrgName_options();
			this.getparentId_options();
			this.editDatasForm = datas;
			this.dialogTitle = '编辑';
			this.submitState = 0;
			this.editVisible = true;
		},
		beforeClose (done) {
			this.$refs['editDatasForm'].clearValidate();
			this.editVisible = false;
		},
		getpkOrgName_options () {
			let _this = this;
			this.base.axios_post(null, '/platformBase/api/base/platform/queryGroupInfoListByUser', function (res) {
				console.log(res);
				if (res.code === 0) {
					_this.pkOrgName_options = res.data;
					for (let item of _this.pkOrgName_options) {
						// 只有易茂可选
						if (item.code !== '0000002') {
							item.disabled = true;
						}
					}
				}
			});
		},
		getparentId_options () {
			let _this = this;
			this.base.axios_post(null, '/platformBase/api/easymore/queryEMFirstCategory', function (res) {
				console.log(res);
				if (res.code === 0) {
					_this.parentId_options = res.data;
				}
			});
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
			datas.categorySort = Number(datas.categorySort);
			return datas;
		},
		// 保存表单
		saveForm (formName) {
			let _this = this;
			this.$refs[formName].validate((valid) => {
				if (valid) {
					let formDatas = _this.transformDatas(_this.editDatasForm);
					if (formDatas.categoryType === 0) {
						formDatas.parentId = '';
					}
					let data = {
						categoryIcon: '~',
						categoryName: formDatas.categoryName,
						categorySort: formDatas.categorySort,
						categoryType: formDatas.categoryType,
						emService: formDatas.emService,
						parentId: formDatas.parentId,
						pkOrg: formDatas.pkOrg,
						typesEnterprise: formDatas.typesEnterprise
					};
					for (let item of _this.pkOrgName_options) {
						if (item.code === formDatas.pkOrg) {
							data.pkOrgName = item.name;
							break;
						}
					}
					console.log(data);
					if (_this.submitState === 1) {
						// 新增
						console.log('新增');
						_this.base.axios_post(data, '/platformBase/api/easymore/saveCategoryInfo', function (res) {
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
						data.categoryId = formDatas.categoryId;
						_this.base.axios_post(data, '/platformBase/api/easymore/updateCategoryInfo', function (res) {
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
			// debugger;
			let _this = this;
			let data = {
				nicknameOrPhoneNo: this.searchValue,
				pageNo: pagno,
				pageSize: this.pagesize,
				sortType: this.sortType
			};
			this.base.axios_post(data, '/platformBase/api/easymore/queryCategoryPage', function (res) {
				console.log(res);
				if (res.code === 0) {
					_this.DataList = res.data.resultList;
					_this.pagecount = res.data.pageTotal;
				} else {
					_this.$message(res.message);
				}
			});
		},
		handleCategoryTypeChange (value) {
			if (value === 0) {
				delete this.editDatasForm.parentId;
				// this.editDatasForm.parentId = undefined;
				this.isParent = false;
			} else {
				this.isParent = true;
			}
		},
		handleEmServiceChange (value) {
			if (value === 'Y') {
				this.editDatasForm.typesEnterprise = 1;
			} else {
				this.editDatasForm.typesEnterprise = 0;
			}
		}
	}
};
</script>

<style>
.projectClassifyConfig .el-table__expanded-cell[class*=cell] {
	padding: 0;
}
</style>

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
</style>
