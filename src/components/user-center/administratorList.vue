<template>
	<el-container class="syh-container">
		<el-header>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>主页</el-breadcrumb-item>
				<el-breadcrumb-item>用户中心</el-breadcrumb-item>
				<el-breadcrumb-item>管理员列表</el-breadcrumb-item>
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
						sortable
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
						prop="creationTime"
						align="center"
						label="创建时间">
					</el-table-column>
					<el-table-column
						prop="modifiedTime"
						align="center"
						label="修改时间">
					</el-table-column>
					<el-table-column
						prop="lastLoginTime"
						align="center"
						label="最后一次登录时间">
					</el-table-column>
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
					<el-table-column
						align="center"
						width="220">
						<template slot-scope="scope">
							<el-button @click="edit(scope.row)" style="background-color:#0199F9;">编辑</el-button>
							<el-button @click="showDetails(scope.row.userId)" style="background-color:#0199F9;">查看</el-button>
							<el-button @click="giveRole(scope.row)" style="background-color:#0199F9;">分配</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="syh-dialog">
				<el-dialog title="详情" :visible.sync="detailsVisible" width="45%" top="25vh" custom-class="rowDetails" :close-on-click-modal="false" :close-on-press-escape="false">
					<div class="box">
						<div class="left">
							<p><span class="lab">登录用户名：</span><span class="val">{{detailData.userName}}</span></p>
							<p><span class="lab">手机号：</span><span class="val">{{detailData.phoneNo}}</span></p>
							<p><span class="lab">所属组织编码：</span><span class="val">{{detailData.pkOrg}}</span></p>
							<p><span class="lab">创建时间：</span><span class="val">{{detailData.creationTime}}</span></p>
							<p><span class="lab">最后一次登录时间：</span><span class="val">{{detailData.lastLoginTime}}</span></p>
						</div>
						<div class="right">
							<p><span class="lab">真实姓名：</span><span class="val">{{detailData.realName}}</span></p>
							<p><span class="lab">启用状态：</span><span class="val">{{detailData.enablestateText}}</span></p>
							<p><span class="lab">所属组织名称：</span><span class="val">{{detailData.pkOrgName}}</span></p>
							<p><span class="lab">修改时间：</span><span class="val">{{detailData.modifiedTime}}</span></p>
						</div>
					</div>
					<!-- <table>
						<tr>
							<td>登录用户名：</td>
							<td>{{detailData.userName}}</td>
							<td>真实姓名：</td>
							<td>{{detailData.realName}}</td>
						</tr>
						<tr>
							<td>手机号：</td>
							<td>{{detailData.phoneNo}}</td>
							<td>启用状态：</td>
							<td>{{detailData.enablestateText}}</td>
						</tr>
						<tr>
							<td>所属组织编码：</td>
							<td>{{detailData.pkOrg}}</td>
							<td>所属组织名称：</td>
							<td>{{detailData.pkOrgName}}</td>
						</tr>
						<tr>
							<td>创建时间：</td>
							<td>{{detailData.creationTime}}</td>
                            <td>修改时间：</td>
							<td>{{detailData.modifiedTime}}</td>
						</tr>
						<tr>
							<td>最后一次登录时间：</td>
							<td>{{detailData.lastLoginTime}}</td>
						</tr>
					</table> -->
				</el-dialog>
			</div>
			<div class="syh-dialog">
				<el-dialog v-if="editVisible" :visible="true" width="45%" top="20vh" custom-class="rowEdit" :before-close="beforeClose" :close-on-click-modal="false" :close-on-press-escape="false">
					<span slot="title" class="el-dialog__title">{{dialogTitle}}</span>
					<el-form :model="editDatasForm" ref="editDatasForm" hide-required-asterisk label-width="100px" inline :rules="rules" size="small">
						<table>
							<tr>
								<td>
									<el-form-item label="登录用户名" prop="userName">
										<el-input clearable placeholder="请输入登录用户名" v-model="editDatasForm.userName"></el-input>
									</el-form-item>
								</td>
								<td>
									<el-form-item label="真实姓名" prop="realName">
										<el-input clearable placeholder="请输入真实姓名" v-model="editDatasForm.realName"></el-input>
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
									<el-form-item label="登录密码" prop="userPassword">
										<el-input clearable placeholder="请输入登录密码" v-model="editDatasForm.userPassword"></el-input>
									</el-form-item>
								</td>
							</tr>
							<tr>
								<td>
									<el-form-item label="所属组织" prop="pkOrg">
										<el-select v-model="editDatasForm.pkOrg" placeholder="请选择所属组织" filterable>
											<el-option
												v-for="item in pkOrgName_options"
												:key="item.code"
												:label="item.name"
												:value="item.code">
											</el-option>
										</el-select>
									</el-form-item>
								</td>
							</tr>
						</table>
					</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button @click="resetForm('editDatasForm')" type="primary" plain  icon="el-icon-refresh" size="medium">重置</el-button>
						<el-button @click="saveForm('editDatasForm')" type="primary" icon="el-icon-check" size="medium">保存</el-button>
					</div>
				</el-dialog>
			</div>
			<div class="syh-dialog">
				<el-dialog :visible.sync="distributeVisible" width="40%" top="25vh" custom-class="rowEdit distributeDialog" :before-close="cancelDistribution" :close-on-click-modal="false" :close-on-press-escape="false">
					<span slot="title" class="el-dialog__title">分配角色</span>
					<p class="username">{{ distributeUserName }}</p>
					<div class="content">
						<div class="undistribute">
							<h6>未分配</h6>
							<ul>
								<li
									v-for="(v, k) in unDistributeRole"
									:key="k"
									@click="select(v, k, 1)"
									:class="{active: k === isActive_add}">
										{{ v.roleName }}
								</li>
							</ul>
						</div>
						<div class="distributeBtn">
							<!-- <div class="triangle_border_right"><span></span></div> -->
							<!-- <div class="triangle_border_nw"></div> -->
							<!-- <div class="test_triangle_border">
								<a href="#">三角形</a>
								<div class="popup">
									<span><em></em></span>纯CSS写带边框的三角形
								</div>
							</div> -->
							<div class="add" @click="addRole"><span class="s1"></span><span class="s2"></span></div>
							<div class="remove" @click="removeRole"><span class="s1"></span><span class="s2"></span></div>
							<!-- <img src="../../assets/images/distribute/blue.png" alt="添加" @click="addRole">
							<img src="../../assets/images/distribute/white.png" alt="取消" @click="removeRole"> -->
						</div>
						<div class="distributed">
							<h6>已分配</h6>
							<ul>
								<li
									v-for="(v, k) in hasDistributeRole"
									:key="k"
									@click="select(v, k, 0)"
									:class="{active: k === isActive_remove}">
										{{ v.roleName }}
								</li>
							</ul>
						</div>
					</div>
					<!-- <div slot="footer" class="dialog-footer">
						<el-button @click="cancelDistribution" type="primary" plain size="medium">取消</el-button>
						<el-button @click="saveDistribute" type="primary" size="medium">保存</el-button>
					</div> -->
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
	name: 'administratorList',
	data () {
		return {
			// 表格数据
			DataList: [],
			// sortType: 1, // 排序字段
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
			pkOrgName_options: [], // 所属组织列表
			distributeVisible: false,
			distributeUserName: '',
			distributeUserId: '',
			unDistributeRole: [],
			hasDistributeRole: [],
			selectAddRole: null,
			selectRemoveRole: null,
			isActive_add: -1,
			isActive_remove: -1,
			rules: {
				userName: [
					{ required: true, whitespace: true, message: '请输入登录用户名', trigger: 'blur' },
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
				realName: [
					{ required: true, whitespace: true, message: '请输入真实姓名', trigger: 'blur' },
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
				userPassword: [
					{ required: true, whitespace: true, message: '请输入登录密码', trigger: 'blur' },
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
				pkOrg: [
					{ required: true, message: '请选择所属组织', trigger: 'blur' }
				]
			}
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
				let { ...itemData } = item;
				// 启用状态:1=未启用，2=已启用，3=已停用
				switch (itemData.enablestate) {
				case 1:
					itemData.enablestateText = '未启用';
					itemData.stateColor = '#ccc';
					itemData.btn_enablestateText = '启用';
					itemData.btn_stateColor = '#05baa4';
					break;
				case 2:
					itemData.enablestateText = '已启用';
					itemData.stateColor = '#05baa4';
					itemData.btn_enablestateText = '停用';
					itemData.btn_stateColor = '#fe3c51';
					break;
				case 3:
					itemData.enablestateText = '已停用';
					itemData.stateColor = '#fe3c51';
					itemData.btn_enablestateText = '启用';
					itemData.btn_stateColor = '#05baa4';
					break;
				};
				itemData.creationTime = this.base.trans_time(itemData.creationTime, 4);
				itemData.modifiedTime = this.base.trans_time(itemData.modifiedTime, 4);
				itemData.lastLoginTime = this.base.trans_time(itemData.lastLoginTime, 4);
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
			// 启用状态:1=未启用，2=已启用，3=已停用
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
					let { ...list } = res.data;
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
					list.creationTime = _this.base.trans_time(list.creationTime, 4);
					list.modifiedTime = _this.base.trans_time(list.modifiedTime, 4);
					list.lastLoginTime = _this.base.trans_time(list.lastLoginTime, 4);
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
		getpkOrgName_options () {
			let _this = this;
			this.base.axios_post(null, '/platformBase/api/base/platform/queryGroupInfoListByUser', function (res) {
				console.log(res);
				if (res.code === 0) {
					_this.pkOrgName_options = res.data;
				}
			});
		},
		// 点击‘新增’按钮，显示‘新增’弹框
		add () {
			this.editDatasForm = {};
			this.dialogTitle = '新增';
			this.getpkOrgName_options();
			this.submitState = 1;
			this.editVisible = true;
		},
		// 点击‘编辑’按钮，显示‘编辑’弹框
		edit (row) {
			let { ...datas } = row;
			this.editDatasForm = datas;
			this.dialogTitle = '编辑';
			this.getpkOrgName_options();
			this.submitState = 0;
			this.editVisible = true;
		},
		beforeClose (done) {
			this.$refs['editDatasForm'].clearValidate();
			this.editVisible = false;
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
					let formDatas = _this.transformDatas(_this.editDatasForm);
					let data = {
						userName: formDatas.userName,
						realName: formDatas.realName,
						phoneNo: formDatas.phoneNo,
						userPassword: formDatas.userPassword,
						pkOrg: formDatas.pkOrg
					};
					if (_this.submitState === 1) {
						// 新增
						console.log('新增');
						_this.base.axios_post(data, '/platformUser/api/easymore/platformEmAdminUserAdd', function (res) {
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
						_this.base.axios_post(data, '/platformUser/api/easymore/platformEmAdminUserUpdate', function (res) {
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
				userType: 2
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
		},
		giveRole (row) {
			this.distributeUserName = row.userName;
			this.distributeUserId = row.userId;
			this.distributeVisible = true;
			this.getRoleList();
		},
		getRoleList () {
			let _this = this;
			let data = {
				userId: this.distributeUserId
			};
			this.base.axios_post(data, '/platformBase/api/common/userRoleQryDistributeList', function (res) {
				console.log(res);
				if (res.code === 0) {
					_this.unDistributeRole = (res.data.UnDistributeRole && res.data.UnDistributeRole.length > 0) ? res.data.UnDistributeRole : [];
					_this.hasDistributeRole = (res.data.HasDistributeRole && res.data.HasDistributeRole.length > 0) ? res.data.HasDistributeRole : [];
					_this.isActive_add = -1;
					_this.isActive_remove = -1;
				} else {
					_this.$message(res.message);
				}
			});
		},
		cancelDistribution () {
			this.distributeVisible = false;
		},
		select (value, key, type) {
			// type 1: 添加，0：取消
			if (type === 1) {
				this.isActive_add = key;
				this.selectAddRole = { ...value };
			} else {
				this.isActive_remove = key;
				this.selectRemoveRole = { ...value };
			}
		},
		addRole () {
			if (!this.selectAddRole) {
				this.$message('请选择一个未分配角色');
				return;
			}
			let _this = this;
			let data = { ...this.selectAddRole };
			data.userId = this.distributeUserId;
			this.base.axios_post(data, '/platformBase/api/common/userDistributeRole', function (res) {
				console.log(res);
				if (res.code === 0) {
					_this.$message('分配成功');
					_this.selectAddRole = null;
					_this.getRoleList();
				} else {
					_this.$message(res.message);
				}
			});
		},
		removeRole () {
			if (!this.selectRemoveRole) {
				this.$message('请选择一个已分配角色');
				return;
			}
			let _this = this;
			let data = { ...this.selectRemoveRole };
			data.userId = this.distributeUserId;
			this.base.axios_post(data, '/platformBase/api/common/userCancelDistributeRole', function (res) {
				console.log(res);
				if (res.code === 0) {
					_this.$message('取消分配成功');
					_this.selectRemoveRole = null;
					_this.getRoleList();
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
.distributeDialog .username {
	margin-bottom: 15px;
	color: #4E99E5;
}
.distributeDialog .content {
	display: flex;
	height: 300px;
}
.distributeDialog .undistribute,
.distributeDialog .distributed {
	flex: 2 1 50px;
	background: #F7F7F7;
}
.distributeDialog .distributeBtn {
	flex: 1 2;
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: center;
}
.distributeDialog .distributeBtn img {
	width: 50%;
}
.distributeDialog .distributeBtn img:first-child {
	margin-bottom: 35px;
}
.distributeDialog .undistribute h6,
.distributeDialog .distributed h6 {
	color: #4E99E5;
	font-size: 14px;
	padding: 10px 0 10px 15px;
}
.distributeDialog .undistribute ul,
.distributeDialog .distributed ul {
	font-size: 13px;
	padding-left: 30px;
	height: 250px;
	box-sizing: border-box;
	overflow-y: auto;
}
.distributeDialog .undistribute ul li,
.distributeDialog .distributed ul li {
	padding: 5px 0;
	cursor: pointer;
}
.distributeDialog .undistribute ul li.active,
.distributeDialog .distributed ul li.active {
	color: #4E99E5;
}
.distributeDialog .distributeBtn .add {
	margin-bottom: 35px;
}
.distributeDialog .distributeBtn .add .s1 {
	display: inline-block;
	width: 40px;
	height: 18px;
	background: #0198F8;
	border-top-left-radius: 3px;
	border-bottom-left-radius: 3px;
	vertical-align: middle;
}
.distributeDialog .distributeBtn .add .s2 {
	display: inline-block;
	border-radius: 3px;
	vertical-align: middle;
	border-width: 18px 0 18px 26px;
	border-style: solid;
	border-color: transparent transparent transparent #0198F8;
}
.distributeDialog .distributeBtn .remove .s1 {
	display: inline-block;
	border-radius: 3px;
	vertical-align: middle;
	border-width: 18px 26px 18px 0;
	border-style: solid;
	border-color: transparent #E1E1E1 transparent transparent;
}
.distributeDialog .distributeBtn .remove .s2 {
	display: inline-block;
	width: 40px;
	height: 18px;
	background: #E1E1E1;
	border-top-left-radius: 3px;
	border-bottom-left-radius: 3px;
	vertical-align: middle;
}

/* 纯CSS写三角形-border法相关示例 */
.triangle_border_right {
	position: relative;
	width: 0;
	height: 0;
	border-width: 26px 0 26px 26px;
	border-style: solid;
	border-color: transparent transparent transparent #333;
}
.triangle_border_right span {
	display: block;
	border-width: 24px 0 24px 24px;
	border-style: solid;
	border-color: transparent transparent transparent #0198F8;
	position: absolute;
	left: -25px;
	top: -24px;
}

.triangle_border_nw {
	width: 0;
	height: 0;
	border-width: 30px 30px 0 0;
	border-style: solid;
	border-color: #6c6 transparent transparent transparent;
}

.test_triangle_border {
	width: 200px;
	position: relative;
}
.test_triangle_border a {
	color: #333;
	font-weight: bold;
}
.test_triangle_border .popup {
	width: 100px;
	background: #fc0;
	padding: 10px 20px;
	color: #333;
	border-radius: 4px;
	position: absolute;
	top: 30px;
	left: 30px;
	border:1px solid #333;
}
.test_triangle_border .popup span {
	display: block;
	width: 0;
	height: 0;
	border-width: 0 10px 10px;
	border-style:solid;
    border-color:transparent transparent #333;
	position: absolute;
	top: -10px;
	left: 50%;
	transform: translateX(-50%);
}
.test_triangle_border .popup em {
	display: block;
	width: 0;
	height: 0;
	border-width:0 10px 10px;
    border-style:solid;
    border-color:transparent transparent #fc0;
	position:absolute;
	top: 1px;
	left: -10px;
}
</style>
