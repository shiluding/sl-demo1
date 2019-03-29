<template>
	<el-container class="syh-container moduleRegistration">
		<el-header>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>主页</el-breadcrumb-item>
				<el-breadcrumb-item>组织建模</el-breadcrumb-item>
				<el-breadcrumb-item>功能注册</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="syh-editdata">
				<!-- <el-input v-model="searchInput" placeholder="请输入昵称或手机号" clearable size="small"></el-input>
				<el-button class="search" size="small" @click="search">搜索</el-button> -->
				<el-button class="add" size="small" @click="addModule">新增模块</el-button>
				<el-button class="add" size="small" @click="addMenu">添加菜单</el-button>
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
						'background-color': '#F8E7D2'
					}"
					max-height="100%"
					style="width: 100%"
					:default-expand-all="true">
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
								:data="props.row.menuVOS"
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
									prop="menuCode"
									width="100"
									align="center"
									label="功能编码">
								</el-table-column>
								<el-table-column
									prop="menuName"
									min-width="100"
									align="left"
									label="功能名称">
								</el-table-column>
								<el-table-column
									prop="menuDesc"
									min-width="150"
									align="left"
									label="描述">
								</el-table-column>
								<!-- <el-table-column
									prop="typesEnterpriseText"
									width="100"
									align="center"
									label="创建时间">
								</el-table-column>
								<el-table-column
									prop="categorySort"
									width="100"
									align="center"
									label="修改时间">
								</el-table-column> -->
								<el-table-column
									align="center"
									header-align="left"
									class-name="usestate"
									width="150"
									label="启用状态">
									<template slot-scope="scope">
										<span :style="{color: scope.row.menu_stateColor}">{{scope.row.menu_enablestateText}}</span>
										<el-button @click="change_menu_enablestate(scope.row.menuCode, scope.row.menuEnable)" :style="{'background-color': scope.row.btn_menu_stateColor}">{{scope.row.btn_menu_enablestateText}}</el-button>
									</template>
								</el-table-column>
								<el-table-column
									min-width="165">
									<template slot-scope="scope">
										<el-button @click="editMenu(scope.row)" style="background-color:#0199F9;">编辑</el-button>
									</template>
								</el-table-column>
							</el-table>
						</template>
					</el-table-column>
					<el-table-column
						prop="funcCode"
						width="100"
						align="center"
						label="功能编码">
					</el-table-column>
					<el-table-column
						prop="funcName"
						min-width="100"
						align="left"
						label="功能名称">
					</el-table-column>
					<el-table-column
						prop="funcDesc"
						min-width="150"
						align="left"
						label="描述">
					</el-table-column>
					<!-- <el-table-column
						prop="typesEnterpriseText"
						width="100"
						align="center"
						label="创建时间">
					</el-table-column>
					<el-table-column
						prop="categorySort"
						width="100"
						align="center"
						label="修改时间">
					</el-table-column> -->
					<el-table-column
						align="center"
						header-align="left"
						class-name="usestate"
						width="150"
						label="启用状态">
						<template slot-scope="scope">
							<span :style="{color: scope.row.func_stateColor}">{{scope.row.func_enablestateText}}</span>
							<el-button @click="change_module_enablestate(scope.row.funcCode, scope.row.funcEnable)" :style="{'background-color': scope.row.btn_func_stateColor}">{{scope.row.btn_func_enablestateText}}</el-button>
						</template>
					</el-table-column>
					<el-table-column
						min-width="165">
						<template slot-scope="scope">
							<el-button @click="editModule(scope.row)" style="background-color:#0199F9;">编辑</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="syh-dialog">
				<el-dialog v-if="addModuleVisible" :visible="true" width="50%" top="20vh" custom-class="rowEdit" :before-close="addModule_beforeClose" :close-on-click-modal="false" :close-on-press-escape="false">
					<span slot="title" class="el-dialog__title">新增模块</span>
					<el-form :model="addModuleForm" ref="addModuleForm" hide-required-asterisk label-width="100px" inline :rules="addModule_rules" size="small">
						<table>
							<tr>
								<td>
									<el-form-item label="功能编码" prop="funcCode">
										<el-input clearable placeholder="请输入功能编码" v-model="addModuleForm.funcCode"></el-input>
									</el-form-item>
								</td>
								<td>
									<el-form-item label="功能名称" prop="funcName">
										<el-input clearable placeholder="请输入功能名称" v-model="addModuleForm.funcName"></el-input>
									</el-form-item>
								</td>
							</tr>
							<tr>
								<td>
									<el-form-item label="描述" prop="funcDesc">
										<el-input
											type="textarea"
											autosize
											placeholder="请输入描述"
											v-model="addModuleForm.funcDesc" maxlength="100">
										</el-input>
									</el-form-item>
								</td>
							</tr>
						</table>
					</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button @click="resetForm('addModuleForm')" type="primary" plain  icon="el-icon-refresh" size="medium">重置</el-button>
						<el-button @click="saveForm('addModuleForm')" type="primary" icon="el-icon-check" size="medium">保存</el-button>
					</div>
				</el-dialog>
			</div>
			<div class="syh-dialog">
				<el-dialog v-if="editModuleVisible" :visible="true" width="50%" top="20vh" custom-class="rowEdit" :before-close="editModule_beforeClose" :close-on-click-modal="false" :close-on-press-escape="false">
					<span slot="title" class="el-dialog__title">编辑模块</span>
					<el-form :model="editModuleForm" ref="editModuleForm" hide-required-asterisk label-width="100px" inline :rules="editModule_rules" size="small">
						<table>
							<tr>
								<td>
									<el-form-item label="功能编码" prop="funcCode">
										<el-input clearable placeholder="请输入功能编码" v-model="editModuleForm.funcCode"></el-input>
									</el-form-item>
								</td>
								<td>
									<el-form-item label="功能名称" prop="funcName">
										<el-input clearable placeholder="请输入功能名称" v-model="editModuleForm.funcName"></el-input>
									</el-form-item>
								</td>
							</tr>
							<tr>
								<td>
									<el-form-item label="描述" prop="funcDesc">
										<el-input
											type="textarea"
											autosize
											placeholder="请输入描述"
											v-model="editModuleForm.funcDesc" maxlength="100">
										</el-input>
									</el-form-item>
								</td>
							</tr>
						</table>
					</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button @click="resetForm('editModuleForm')" type="primary" plain  icon="el-icon-refresh" size="medium">重置</el-button>
						<el-button @click="saveForm('editModuleForm')" type="primary" icon="el-icon-check" size="medium">保存</el-button>
					</div>
				</el-dialog>
			</div>
			<div class="syh-dialog">
				<el-dialog v-if="addMenuVisible" :visible="true" width="50%" top="20vh" custom-class="rowEdit" :before-close="addMenu_beforeClose" :close-on-click-modal="false" :close-on-press-escape="false">
					<span slot="title" class="el-dialog__title">添加菜单</span>
					<el-form :model="addMenuForm" ref="addMenuForm" hide-required-asterisk label-width="100px" inline :rules="addMenu_rules" size="small">
						<table>
							<tr>
								<td>
									<el-form-item label="功能名称" prop="funcCode">
										<el-select v-model="addMenuForm.funcCode" placeholder="请选择功能名称" filterable>
											<el-option
												v-for="item in func_options"
												:key="item.funcCode"
												:label="item.funcName"
												:value="item.funcCode">
											</el-option>
										</el-select>
									</el-form-item>
								</td>
								<td>
									<el-form-item label="菜单编码" prop="menuCode">
										<el-input clearable placeholder="请输入菜单编码" v-model="addMenuForm.menuCode"></el-input>
									</el-form-item>
								</td>
							</tr>
							<tr>
								<td>
									<el-form-item label="描述" prop="menuDesc">
										<el-input
											type="textarea"
											autosize
											placeholder="请输入描述"
											v-model="addMenuForm.menuDesc" maxlength="100">
										</el-input>
									</el-form-item>
								</td>
								<td>
									<el-form-item label="菜单名称" prop="menuName">
										<el-input clearable placeholder="请输入菜单名称" v-model="addMenuForm.menuName"></el-input>
									</el-form-item>
								</td>
							</tr>
						</table>
					</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button @click="resetForm('addMenuForm')" type="primary" plain  icon="el-icon-refresh" size="medium">重置</el-button>
						<el-button @click="saveForm('addMenuForm')" type="primary" icon="el-icon-check" size="medium">保存</el-button>
					</div>
				</el-dialog>
			</div>
			<div class="syh-dialog">
				<el-dialog v-if="editMenuVisible" :visible="true" width="50%" top="20vh" custom-class="rowEdit" :before-close="editMenu_beforeClose" :close-on-click-modal="false" :close-on-press-escape="false">
					<span slot="title" class="el-dialog__title">编辑菜单</span>
					<el-form :model="editMenuForm" ref="editMenuForm" hide-required-asterisk label-width="100px" inline :rules="editMenu_rules" size="small">
						<table>
							<tr>
								<td>
									<el-form-item label="菜单编码" prop="menuCode">
										<el-input clearable placeholder="请输入菜单编码" v-model="editMenuForm.menuCode"></el-input>
									</el-form-item>
								</td>
								<td>
									<el-form-item label="菜单名称" prop="menuName">
										<el-input clearable placeholder="请输入菜单名称" v-model="editMenuForm.menuName"></el-input>
									</el-form-item>
								</td>
							</tr>
							<tr>
								<td>
									<el-form-item label="描述" prop="menuDesc">
										<el-input
											type="textarea"
											autosize
											placeholder="请输入描述"
											v-model="editMenuForm.menuDesc" maxlength="100">
										</el-input>
									</el-form-item>
								</td>
							</tr>
						</table>
					</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button @click="resetForm('editMenuForm')" type="primary" plain  icon="el-icon-refresh" size="medium">重置</el-button>
						<el-button @click="saveForm('editMenuForm')" type="primary" icon="el-icon-check" size="medium">保存</el-button>
					</div>
				</el-dialog>
			</div>
		</el-main>
		<!-- <el-footer>
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
		</el-footer> -->
	</el-container>
</template>

<script>
import { trim } from '@/common/js/common.js';
export default {
	name: 'moduleRegistration',
	data () {
		return {
			// 表格数据
			DataList: [],
			// sortType: 1, // 排序字段
			// searchInput: '', // 搜索输入内容
			// searchValue: '', // 当前搜索值
			// pagecount: 0, // 总页数
			// pagesize: 10, // 每页的数据条数
			// currentPage: 1, // 当前页码
			// isFirstPageActive: false,
			// isLastPageActive: true,
			addModuleVisible: false, // 新增功能弹框是否显示
			addModuleForm: {},
			editModuleVisible: false, // 编辑功能弹框是否显示
			editModuleForm: {},
			addMenuVisible: false, // 新增菜单弹框是否显示
			addMenuForm: {},
			editMenuVisible: false, // 编辑菜单弹框是否显示
			editMenuForm: {},
			func_options: [],
			addModule_rules: {
				funcCode: [
					{ required: true, whitespace: true, message: '请输入功能编码', trigger: 'blur' }
				],
				funcName: [
					{ required: true, whitespace: true, message: '请输入功能名称', trigger: 'blur' },
					{
						pattern: /^[\u4e00-\u9fa50-9a-zA-Z]+$/,
						message: '名称为汉字、字母或数字组合',
						transform (value) {
							if (typeof value === 'string') {
								return trim(value);
							}
							return value;
						},
						trigger: 'blur'
					}
				],
				funcDesc: [
					{ required: true, whitespace: true, message: '请输入描述', trigger: 'blur' }
				]
			},
			editModule_rules: {
				funcCode: [
					{ required: true, whitespace: true, message: '请输入功能编码', trigger: 'blur' }
				],
				funcName: [
					{ required: true, whitespace: true, message: '请输入功能名称', trigger: 'blur' },
					{
						pattern: /^[\u4e00-\u9fa50-9a-zA-Z]+$/,
						message: '名称为汉字、字母或数字组合',
						transform (value) {
							if (typeof value === 'string') {
								return trim(value);
							}
							return value;
						},
						trigger: 'blur'
					}
				],
				funcDesc: [
					{ required: true, whitespace: true, message: '请输入描述', trigger: 'blur' }
				]
			},
			addMenu_rules: {
				funcCode: [
					{ required: true, message: '请选择功能名称', trigger: 'blur' }
				],
				menuCode: [
					{ required: true, whitespace: true, message: '请输入菜单编码', trigger: 'blur' }
				],
				menuName: [
					{ required: true, whitespace: true, message: '请输入菜单名称', trigger: 'blur' },
					{
						pattern: /^[\u4e00-\u9fa50-9a-zA-Z]+$/,
						message: '名称为汉字、字母或数字组合',
						transform (value) {
							if (typeof value === 'string') {
								return trim(value);
							}
							return value;
						},
						trigger: 'blur'
					}
				],
				menuDesc: [
					{ required: true, whitespace: true, message: '请输入描述', trigger: 'blur' }
				]
			},
			editMenu_rules: {
				menuCode: [
					{ required: true, whitespace: true, message: '请输入菜单编码', trigger: 'blur' }
				],
				menuName: [
					{ required: true, whitespace: true, message: '请输入菜单名称', trigger: 'blur' },
					{
						pattern: /^[\u4e00-\u9fa50-9a-zA-Z]+$/,
						message: '名称为汉字、字母或数字组合',
						transform (value) {
							if (typeof value === 'string') {
								return trim(value);
							}
							return value;
						},
						trigger: 'blur'
					}
				],
				menuDesc: [
					{ required: true, whitespace: true, message: '请输入描述', trigger: 'blur' }
				]
			}
		};
	},
	// watch: {
	// 	currentPage: function (currentPage) {
	// 		if (currentPage === 1) {
	// 			this.isFirstPageActive = false;
	// 		} else {
	// 			this.isFirstPageActive = true;
	// 		}
	// 		if (currentPage === this.pagecount) {
	// 			this.isLastPageActive = false;
	// 		} else {
	// 			this.isLastPageActive = true;
	// 		}
	// 		this.getDataList(currentPage);
	// 	}
	// },
	mounted () {
		this.getDataList();
	},
	computed: {
		tableData () {
			let tableData = this.handleData(this.DataList);
			for (let item of tableData) {
				item.menuVOS = this.handleData(item.menuVOS, item.funcCode);
			}
			console.log(tableData);
			return tableData;
		}
		// // 首页按钮class
		// firstPageClassObj: function () {
		// 	return {
		// 		active: this.pagecount > 1 ? this.isFirstPageActive : false,
		// 		disabled: this.pagecount > 1 ? !this.isFirstPageActive : true
		// 	};
		// },
		// // 尾页按钮class
		// lastPageClassObj: function () {
		// 	return {
		// 		active: this.pagecount > 1 ? this.isLastPageActive : false,
		// 		disabled: this.pagecount > 1 ? !this.isLastPageActive : true
		// 	};
		// }
	},
	methods: {
		handleData (list, funcCode = -1) {
			let data = [];
			if (funcCode === -1) {
				for (let item of list) {
					let { ...itemData } = item;
					switch (itemData.funcEnable) {
					case 'Y':
						itemData.func_enablestateText = '启用';
						itemData.func_stateColor = '#05baa4';
						itemData.btn_func_enablestateText = '停用';
						itemData.btn_func_stateColor = '#fe3c51';
						break;
					case 'N':
						itemData.func_enablestateText = '停用';
						itemData.func_stateColor = '#fe3c51';
						itemData.btn_func_enablestateText = '启用';
						itemData.btn_func_stateColor = '#05baa4';
						break;
					};
					data.push(itemData);
				}
			} else {
				for (let item of list) {
					let { ...itemData } = item;
					switch (itemData.menuEnable) {
					case 'Y':
						itemData.menu_enablestateText = '启用';
						itemData.menu_stateColor = '#05baa4';
						itemData.btn_menu_enablestateText = '停用';
						itemData.btn_menu_stateColor = '#fe3c51';
						break;
					case 'N':
						itemData.menu_enablestateText = '停用';
						itemData.menu_stateColor = '#fe3c51';
						itemData.btn_menu_enablestateText = '启用';
						itemData.btn_menu_stateColor = '#05baa4';
						break;
					};
					itemData.funcCode = funcCode;
					data.push(itemData);
				}
			}
			return data;
		},
		// // 点击‘首页’或‘尾页’按钮处理事件
		// jumpPage (val) {
		// 	switch (val) {
		// 	case '1':
		// 		this.currentPage = 1;
		// 		break;
		// 	case '0':
		// 		this.currentPage = this.pagecount;
		// 		break;
		// 	}
		// },
		// // 当前页改变处理事件
		// currentchange (currentPage) {
		// 	this.currentPage = currentPage;
		// },
		// 启用状态改变处理事件
		change_module_enablestate (code, state) {
			// Y是启用，N是停用
			let _this = this;
			let data = {
				funcCode: code
			};
			if (state === 'Y') {
				data.funcEnable = 'N'; // 启用状态转停用
			} else {
				data.funcEnable = 'Y'; // 停用状态转启用
			}
			this.base.axios_post(data, '/platformBase/api/common/updateFuncStatus', function (res) {
				// console.log(res);
				if (res.code === 0) {
					_this.$message('更新状态成功！');
					// _this.getDataList(_this.currentPage);
					_this.getDataList();
				} else {
					_this.$message(res.message);
				}
			});
		},
		change_menu_enablestate (code, state) {
			// Y是启用，N是停用
			let _this = this;
			let data = {
				menuCode: code
			};
			if (state === 'Y') {
				data.menuEnable = 'N'; // 启用状态转停用
			} else {
				data.menuEnable = 'Y'; // 停用状态转启用
			}
			this.base.axios_post(data, '/platformBase/api/common/updateMenuStatus', function (res) {
				// console.log(res);
				if (res.code === 0) {
					_this.$message('更新状态成功！');
					// _this.getDataList(_this.currentPage);
					_this.getDataList();
				} else {
					_this.$message(res.message);
				}
			});
		},
		// 点击‘搜索’按钮
		// search () {
		// 	this.searchValue = trim(this.searchInput);
		// 	this.getDataList(1);
		// 	this.currentPage = 1;
		// },
		// 点击‘新增’按钮，显示‘新增’弹框
		addModule () {
			// 默认值
			this.addModuleForm = {};
			this.addModuleVisible = true;
		},
		// 点击‘编辑’按钮，显示‘编辑’弹框
		editModule (row) {
			let { ...datas } = row;
			this.editModuleForm = datas;
			this.editModuleVisible = true;
		},
		// 点击‘添加菜单’按钮，显示‘添加菜单’弹框
		addMenu () {
			debugger;
			let _this = this;
			this.base.axios_post(null, '/platformBase/api/common/funcMenuTreeQry', function (res) {
				console.log(res);
				if (res.code === 0) {
					let dataList = res.data;
					let list = [];
					for (let item of dataList) {
						let itemData = {};
						itemData.funcCode = item.funcCode;
						itemData.funcName = item.funcName;
						list.push(itemData);
					}
					_this.func_options = list;
					_this.addMenuVisible = true;
				} else {
					_this.$message(res.message);
				}
			});
		},
		// 点击‘编辑’按钮，显示‘编辑’弹框
		editMenu (row) {
			let { ...datas } = row;
			this.editMenuForm = datas;
			this.editMenuVisible = true;
		},
		addModule_beforeClose (done) {
			this.$refs['addModuleForm'].clearValidate();
			this.addModuleVisible = false;
		},
		editModule_beforeClose (done) {
			this.$refs['editModuleForm'].clearValidate();
			this.editModuleVisible = false;
		},
		addMenu_beforeClose (done) {
			this.$refs['addMenuForm'].clearValidate();
			this.addMenuVisible = false;
		},
		editMenu_beforeClose (done) {
			this.$refs['editMenuForm'].clearValidate();
			this.editMenuVisible = false;
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
		// 保存表单
		saveForm (formName) {
			let _this = this;
			this.$refs[formName].validate((valid) => {
				if (valid) {
					if (formName === 'addModuleForm') {
						let formDatas = _this.transformDatas(_this.addModuleForm);
						let data = {
							funcCode: formDatas.funcCode,
							funcDesc: formDatas.funcDesc,
							funcName: formDatas.funcName
						};
						_this.base.axios_post(data, '/platformBase/api/common/saveFuncModeling', function (res) {
							console.log(res);
							if (res.code === 0) {
								_this.$message('新增成功');
								_this.$refs[formName].clearValidate();
								_this.addModuleVisible = false;
								// _this.currentPage = 1;
								// _this.getDataList(1);
								_this.getDataList();
							} else {
								_this.$message(res.message);
							}
						});
					} else if (formName === 'editModuleForm') {
						let formDatas = _this.transformDatas(_this.editModuleForm);
						let data = {
							funcCode: formDatas.funcCode,
							funcDesc: formDatas.funcDesc,
							funcName: formDatas.funcName
						};
						_this.base.axios_post(data, '/platformBase/api/common/updateFuncModeling', function (res) {
							console.log(res);
							if (res.code === 0) {
								_this.$message('修改成功');
								_this.$refs[formName].clearValidate();
								_this.editModuleVisible = false;
								// _this.getDataList(_this.currentPage);
								_this.getDataList();
							} else {
								_this.$message(res.message);
							}
						});
					} else if (formName === 'addMenuForm') {
						let formDatas = _this.transformDatas(_this.addMenuForm);
						let data = {
							menuCode: formDatas.menuCode,
							menuDesc: formDatas.menuDesc,
							menuName: formDatas.menuName,
							funcCode: formDatas.funcCode
						};
						_this.base.axios_post(data, '/platformBase/api/common/saveMenuModeling', function (res) {
							console.log(res);
							if (res.code === 0) {
								_this.$message('新增成功');
								_this.$refs[formName].clearValidate();
								_this.addMenuVisible = false;
								// _this.currentPage = 1;
								// _this.getDataList(1);
								_this.getDataList();
							} else {
								_this.$message(res.message);
							}
						});
					} else if (formName === 'editMenuForm') {
						let formDatas = _this.transformDatas(_this.editMenuForm);
						let data = {
							menuCode: formDatas.menuCode,
							menuDesc: formDatas.menuDesc,
							menuName: formDatas.menuName,
							funcCode: formDatas.funcCode
						};
						_this.base.axios_post(data, '/platformBase/api/common/updateMenuModeling', function (res) {
							console.log(res);
							if (res.code === 0) {
								_this.$message('修改成功');
								_this.$refs[formName].clearValidate();
								_this.editMenuVisible = false;
								// _this.getDataList(_this.currentPage);
								_this.getDataList();
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
		// 获取列表数据
		getDataList () {
			// debugger;
			let _this = this;
			// let data = {
			// 	nicknameOrPhoneNo: this.searchValue,
			// 	pageNo: pagno,
			// 	pageSize: this.pagesize,
			// 	sortType: this.sortType
			// };
			this.base.axios_post(null, '/platformBase/api/common/funcMenuTreeQry', function (res) {
				console.log(res);
				if (res.code === 0) {
					_this.DataList = res.data;
					// _this.pagecount = res.data.pageTotal;
				} else {
					_this.$message(res.message);
				}
			});
		}
	}
};
</script>

<style>
.moduleRegistration .el-table__expanded-cell[class*=cell] {
	padding: 0;
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
