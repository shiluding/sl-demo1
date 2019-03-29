<template>
	<el-container class="syh-container">
		<el-header>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>主页</el-breadcrumb-item>
				<el-breadcrumb-item>组织建模</el-breadcrumb-item>
				<el-breadcrumb-item>角色定义</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="syh-editdata">
				<!-- <el-input v-model="searchInput" placeholder="请输入伙伴名称" clearable size="small"></el-input>
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
						sortable
						width="80"
						fixed
						align="center"
						label="序号">
					</el-table-column>
					<el-table-column
						prop="roleCode"
						min-width="100"
						align="center"
						label="角色编码">
					</el-table-column>
					<el-table-column
						min-width="120"
						align="center"
						label="角色名称">
						<template slot-scope="scope">
							{{scope.row.roleName}}&nbsp;&nbsp;
							<el-button @click="distribute(scope.row)" style="background-color:#0199F9;">分配</el-button>
						</template>
					</el-table-column>
					<!-- <el-table-column
						prop="pkOrgName"
						min-width="120"
						align="center"
						label="所属组织名称">
					</el-table-column> -->
					<!-- <el-table-column
						prop="createTime"
						min-width="120"
						align="center"
						label="创建时间">
					</el-table-column>
					<el-table-column
						prop="partnerAddress"
						min-width="120"
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
							<span :style="{color: scope.row.stateColor}">{{scope.row.enablestateText}}</span>
							<el-button @click="change_enablestate(scope.row.roleId, scope.row.status)" :style="{'background-color': scope.row.btn_stateColor}">{{scope.row.btn_enablestateText}}</el-button>
						</template>
					</el-table-column>
					<el-table-column>
						<template slot-scope="scope">
							<!-- <el-button @click="edit(scope.row)" style="background-color:#0199F9;">编辑</el-button> -->
							<el-button @click="showDetails(scope.row)" style="background-color:#0199F9;">查看</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="syh-dialog">
				<el-dialog title="详情" :visible.sync="detailsVisible" width="35%" top="30vh" custom-class="rowDetails" :close-on-click-modal="false" :close-on-press-escape="false">
					<div class="box">
						<div class="left">
							<p><span class="lab">角色编码：</span><span class="val">{{detailData.roleCode}}</span></p>
							<p><span class="lab">状态：</span><span class="val">{{detailData.enablestateText}}</span></p>
							<!-- <p><span class="lab">创建时间：</span><span class="val">{{detailData.pkOrgName}}</span></p> -->
						</div>
						<div class="right">
							<p><span class="lab">角色名称：</span><span class="val">{{detailData.roleName}}</span></p>
							<!-- <p><span class="lab">所属组织名称：</span><span class="val">{{detailData.pkOrgName}}</span></p> -->
							<!-- <p><span class="lab">修改时间：</span><span class="val">{{detailData.pkOrgName}}</span></p> -->
						</div>
					</div>
				</el-dialog>
			</div>
			<div class="syh-dialog">
				<el-dialog v-if="addVisible" :visible="true" width="45%" top="20vh" custom-class="rowEdit" :before-close="beforeCloseAdd" :close-on-click-modal="false" :close-on-press-escape="false">
					<span slot="title" class="el-dialog__title">新增</span>
					<el-form :model="addDatasForm" ref="addDatasForm" hide-required-asterisk label-width="100px" inline :rules="addRules" size="small">
						<table>
							<tr>
								<td>
									<el-form-item label="角色编码" prop="roleCode">
										<el-input clearable placeholder="请输入角色编码" v-model="addDatasForm.roleCode"></el-input>
									</el-form-item>
								</td>
								<td>
									<el-form-item label="角色名称" prop="roleName">
										<el-input clearable placeholder="请输入角色名称" v-model="addDatasForm.roleName"></el-input>
									</el-form-item>
								</td>
							</tr>
							<!-- <tr>
								<td>
									<el-form-item label="所属组织" prop="pkOrg">
										<el-select v-model="addDatasForm.pkOrg" placeholder="请选择所属组织" filterable @change="handlePkOrgChange">
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
							</tr> -->
						</table>
					</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button @click="resetForm('addDatasForm')" type="primary" plain  icon="el-icon-refresh" size="medium">重置</el-button>
						<el-button @click="saveForm('addDatasForm')" type="primary" icon="el-icon-check" size="medium">保存</el-button>
					</div>
				</el-dialog>
			</div>
			<div class="syh-dialog">
				<el-dialog v-if="editVisible" :visible="true" width="45%" top="20vh" custom-class="rowEdit" :before-close="beforeCloseEdit" :close-on-click-modal="false" :close-on-press-escape="false">
					<span slot="title" class="el-dialog__title">编辑</span>
					<el-form :model="editDatasForm" ref="editDatasForm" hide-required-asterisk label-width="100px" inline :rules="editRules" size="small">
						<table>
							<tr>
								<td>
									<el-form-item label="角色编码" prop="roleCode">
										<el-input clearable placeholder="请输入角色编码" v-model="editDatasForm.roleCode"></el-input>
									</el-form-item>
								</td>
								<td>
									<el-form-item label="角色名称" prop="roleName">
										<el-input clearable placeholder="请输入角色名称" v-model="editDatasForm.roleName"></el-input>
									</el-form-item>
								</td>
							</tr>
							<!-- <tr>
								<td>
									<el-form-item label="所属组织" prop="pkOrg">
										<el-select v-model="editDatasForm.pkOrg" placeholder="请选择所属组织" filterable @change="handlePkOrgChange">
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
							</tr> -->
						</table>
					</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button @click="resetForm('editDatasForm')" type="primary" plain  icon="el-icon-refresh" size="medium">重置</el-button>
						<el-button @click="saveForm('editDatasForm')" type="primary" icon="el-icon-check" size="medium">保存</el-button>
					</div>
				</el-dialog>
			</div>
			<div class="syh-dialog">
				<el-dialog :visible.sync="distributeVisible" width="35%" top="20vh" custom-class="rowEdit distributeDialog" :before-close="cancelDistribution" :close-on-click-modal="false" :close-on-press-escape="false">
					<span slot="title" class="el-dialog__title">分配角色</span>
					<p class="tip">请选择分配内容</p>
					<p class="role">{{ distributeRoleName }}</p>
					<el-tree
						class="tree"
						:data="treeData"
						:props="treeprops"
						show-checkbox
						node-key="id"
						ref="treeMenu"
						default-expand-all>
					</el-tree>
					<div slot="footer" class="dialog-footer">
						<el-button @click="cancelDistribution" type="primary" plain size="medium">取消</el-button>
						<el-button @click="saveDistribute" type="primary" size="medium">保存</el-button>
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
import { trim } from '@/common/js/common.js';
export default {
	name: 'roleDefinition',
	data () {
		return {
			// 表格数据
			DataList: [],
			// sortType: 1, // 排序字段
			// searchInput: '', // 搜索输入内容
			// searchValue: '', // 当前搜索值
			pagecount: 0, // 总页数
			pagesize: 10, // 每页的数据条数
			currentPage: 1, // 当前页码
			isFirstPageActive: false,
			isLastPageActive: true,
			detailsVisible: false, // 详情弹框是否显示
			detailData: {},
			addVisible: false, // 新增弹框是否显示
			editVisible: false, // 编辑弹框是否显示
			addDatasForm: {},
			editDatasForm: {},
			distributeRoleName: '',
			distributeRoleCode: '',
			distributeVisible: false,
			distributeDatasForm: [],
			treeData: [],
			treeprops: {
				children: 'children',
				label: 'label'
			},
			// dialogTitle: '新增', // 新增或编辑弹框的title设置
			submitState: 1, // 保存类型：新增：1 编辑：0
			pkOrgName_options: [],
			addRules: {
				roleCode: [
					{ required: true, whitespace: true, message: '请输入角色编码', trigger: 'blur' },
					{
						pattern: /^\d{4}$/,
						message: '编码格式要求为4个数字',
						transform (value) {
							if (typeof value === 'string') {
								return trim(value);
							}
							return value;
						},
						trigger: 'blur'
					}
				],
				roleName: [
					{ required: true, whitespace: true, message: '请输入角色名称', trigger: 'blur' },
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
				]
			}
			// editRules: {
			// 	roleCode: [
			// 		{ required: true, whitespace: true, message: '请输入角色编码', trigger: 'blur' }
			// 	],
			// 	roleName: [
			// 		{ required: true, whitespace: true, message: '请输入角色名称', trigger: 'blur' }
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
		this.getMenuTree();
	},
	computed: {
		tableData () {
			let tableData = [];
			for (let item of this.DataList) {
				let { ...itemData } = item;
				// status 0 启用，1 停用
				switch (itemData.status) {
				case 0:
					itemData.enablestateText = '启用';
					itemData.stateColor = '#05baa4';
					itemData.btn_enablestateText = '停用';
					itemData.btn_stateColor = '#fe3c51';
					break;
				case 1:
					itemData.enablestateText = '停用';
					itemData.stateColor = '#fe3c51';
					itemData.btn_enablestateText = '启用';
					itemData.btn_stateColor = '#05baa4';
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
			// state： 1 启用，0 停用
			let _this = this;
			let data = {
				roleId: id
			};
			if (state === 0) {
				data.status = 1; // 启用状态转停用
			} else {
				data.status = 0; // 停用状态转启用
			}
			this.base.axios_post(data, '/platformBase/api/common/updateRoleStatus', function (res) {
				// console.log(res);
				if (res.code === 0) {
					_this.$message('更新状态成功！');
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
			this.addDatasForm = {};
			// this.getpkOrgName_options();
			// this.dialogTitle = '新增';
			this.submitState = 1;
			this.addVisible = true;
		},
		// 点击‘编辑’按钮，显示‘编辑’弹框
		// edit (row) {
		// 	let {...datas} = row;
		// 	this.editDatasForm = datas;
		// 	// this.dialogTitle = '编辑';
		// 	this.submitState = 0;
		// 	this.editVisible = true;
		// },
		// 分配
		distribute (row) {
			let _this = this;
			this.distributeRoleName = row.roleName;
			this.distributeRoleCode = row.roleCode;
			this.distributeVisible = true;
			let data = {
				roleCode: row.roleCode
			};
			this.base.axios_post(data, '/platformBase/api/common/roleDistributeFuncMenuQry', function (res) {
				console.log(res);
				if (res.code === 0) {
					let arraykeys = [];
					let dataList = res.data;
					for (let item of dataList) {
						if (item.funcEnable === 'Y') {
							if (item.menuVOS && item.menuVOS.length > 0) {
								for (let leaf of item.menuVOS) {
									if (leaf.menuEnable === 'Y') {
										arraykeys.push(leaf.menuCode);
									}
								}
							}
						}
					}
					console.log(arraykeys);
					_this.$refs['treeMenu'].setCheckedKeys(arraykeys);
				} else {
					_this.distributeVisible = false;
					_this.$message('获取角色下的功能菜单失败！');
				}
			});
		},
		getMenuTree () {
			let _this = this;
			this.base.axios_post(null, '/platformBase/api/common/funcMenuTreeQry', function (res) {
				console.log(res);
				if (res.code === 0) {
					let arrayList = [];
					let dataList = res.data;
					for (let item of dataList) {
						if (item.funcEnable === 'Y') {
							if (item.menuVOS && item.menuVOS.length > 0) {
								let itemData = {};
								itemData.label = item.funcName;
								itemData.id = item.funcCode;
								// itemData.disabled = item.funcEnable === 'N';
								let children = [];
								for (let leaf of item.menuVOS) {
									if (leaf.menuEnable === 'Y') {
										let leafData = {};
										leafData.label = leaf.menuName;
										leafData.id = leaf.menuCode;
										leafData.menuName = leaf.menuName;
										leafData.menuCode = leaf.menuCode;
										leafData.funcName = item.funcName;
										leafData.funcCode = item.funcCode;
										// leafData.disabled = leaf.menuEnable === 'N';
										children.push(leafData);
									}
								}
								itemData.children = children;
								arrayList.push(itemData);
							}
						}
					}
					_this.treeData = arrayList;
				} else {
					_this.$message('获取菜单失败！');
				}
			});
		},
		cancelDistribution () {
			this.distributeVisible = false;
		},
		beforeCloseAdd (done) {
			this.$refs['addDatasForm'].clearValidate();
			this.addVisible = false;
		},
		beforeCloseEdit (done) {
			this.$refs['editDatasForm'].clearValidate();
			this.editVisible = false;
		},
		getpkOrgName_options () {
			let _this = this;
			this.base.axios_post(null, '/platformBase/api/base/platform/queryGroupInfoListByUser', function (res) {
				console.log(res);
				if (res.code === 0) {
					_this.pkOrgName_options = res.data;
					// for (let item of _this.pkOrgName_options) {
					// 	// 只有易茂可选
					// 	if (item.code !== '0000002') {
					// 		item.disabled = true;
					// 	}
					// }
				}
			});
		},
		handlePkOrgChange (code) {
			let obj = {};
			obj = this.pkOrgName_options.find((item) => {
				return item.code === code;
			});
			this.addDatasForm.pkOrgName = obj.name;
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
					if (_this.submitState === 1) {
						// 新增
						console.log('新增');
						let formDatasAdd = _this.transformDatas(_this.addDatasForm);
						let data = {
							roleCode: formDatasAdd.roleCode,
							roleName: formDatasAdd.roleName
						};
						_this.base.axios_post(data, '/platformBase/api/common/userRoleDefine', function (res) {
							console.log(res);
							if (res.code === 0) {
								_this.$message('新增成功');
								_this.$refs[formName].clearValidate();
								_this.addVisible = false;
								_this.currentPage = 1;
								_this.getDataList(1);
							} else {
								_this.$message(res.message);
							}
						});
					} else {
						// 编辑
						// console.log('编辑');
						// let formDatasEdit = _this.transformDatas(_this.editDatasForm);
						// let data = {
						// 	roleCode: formDatasEdit.roleCode,
						// 	roleName: formDatasEdit.roleName
						// };
						// _this.base.axios_post(data, '/platformBase/api/common/userRoleDefine', function (res) {
						// 	console.log(res);
						// 	if (res.code === 0) {
						// 		_this.$message('修改成功');
						// 		_this.$refs[formName].clearValidate();
						// 		_this.editVisible = false;
						// 		_this.getDataList(_this.currentPage);
						// 	} else {
						// 		_this.$message(res.message);
						// 	}
						// });
					}
				} else {
					console.log('表单校验不通过！');
					return false;
				}
			});
		},
		saveDistribute () {
			let list = this.$refs['treeMenu'].getCheckedNodes(true);
			let data = [];
			for (let item of list) {
				let { ...itemdata } = item;
				itemdata.roleCode = this.distributeRoleCode;
				itemdata.roleName = this.distributeRoleName;
				delete itemdata.id;
				delete itemdata.label;
				data.push(itemdata);
			}
			console.log(data);
			let _this = this;
			this.base.axios_post(data, '/platformBase/api/common/userRoleDistributeFuncMenu', function (res) {
				console.log(res);
				if (res.code === 0) {
					_this.$message('分配成功');
					_this.distributeVisible = false;
				} else {
					_this.$message(res.message);
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
		// 	}
		// 	this.getDataList(this.currentPage);
		// },
		// 获取列表数据
		getDataList (pagno) {
			let _this = this;
			let data = {
				pageNo: pagno,
				pageSize: this.pagesize
			};
			this.base.axios_post(data, '/platformBase/api/common/roleQryList', function (res) {
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
.distributeDialog .tip {
	margin-left: 5px;
	margin-bottom: 15px;
}
.distributeDialog .role {
	margin-left: 20px;
	color: #4E99E5;
}
.distributeDialog .tree {
	margin-left: 20px;
}
</style>
