<template>
	<el-container class="syh-container">
		<el-header>
				<el-breadcrumb separator="/">
					<el-breadcrumb-item>主页</el-breadcrumb-item>
					<el-breadcrumb-item>组织建模</el-breadcrumb-item>
					<el-breadcrumb-item>组织定义</el-breadcrumb-item>
				</el-breadcrumb>
				<div class="syh-editdata">
					<el-input v-model="searchInput" placeholder="请输入组织编码或名称" clearable size="small" prefix-icon="el-icon-search"></el-input>
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
					style="width: 100%"
					@row-dblclick="showDetails">
					<el-table-column
						type="index"
						sortable
						width="80"
						fixed
						align="center"
						label="序号">
					</el-table-column>
					<el-table-column
						prop="zzcode"
						align="center"
						label="组织编码">
					</el-table-column>
					<el-table-column
						prop="zzname"
						align="center"
						min-width="100"
						show-overflow-tooltip
						label="组织名称">
					</el-table-column>
					<el-table-column
						prop="jtcode"
						align="center"
						label="所属集团编码">
					</el-table-column>
					<el-table-column
						prop="jtname"
						align="center"
						min-width="100"
						show-overflow-tooltip
						label="所属集团名称">
					</el-table-column>
					<el-table-column
						sortable
						align="center"
						header-align="left"
						class-name="usestate"
						width="130"
						fixed="right"
						label="启用状态">
						<template slot-scope="scope">
							<span v-if="scope.row.state=='1'" style="color:#05baa4">启用</span>
							<span v-else style="color:#fe3c51">停用</span>
							<el-button @click.stop="changestate(scope.row)" v-if="scope.row.state=='1'" style="background-color:#fe3c51;">停用</el-button>
							<el-button @click.stop="changestate(scope.row)" v-else style="background-color:#05baa4;">启用</el-button>
						</template>
					</el-table-column>
					<el-table-column
						min-width="80"
						fixed="right">
						<template slot-scope="scope">
							<el-button @click.stop="edit(scope.row)" style="background-color:#0199F9;">编辑</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="syh-dialog">
				<el-dialog title="详情" :visible.sync="detailsVisible" width="40%" top="30vh" custom-class="rowDetails">
					<table>
						<tr>
							<td>组织编码：</td>
							<td>{{detailData.zzcode}}</td>
							<td>所属组织编码：</td>
							<td>{{detailData.jtcode}}</td>
						</tr>
						<tr>
							<td>组织名称：</td>
							<td>{{detailData.zzname}}</td>
							<td>所属组织名称：</td>
							<td>{{detailData.jtname}}</td>
						</tr>
						<tr>
							<td>启用状态：</td>
							<td>{{detailData.state=='1'?'启用':'停用'}}</td>
						</tr>
					</table>
				</el-dialog>
			</div>
			<div class="syh-dialog">
				<el-dialog :visible.sync="editVisible" width="40%" top="30vh" custom-class="rowEdit">
					<span slot="title" class="el-dialog__title">{{dialogTitle}}</span>
					<el-form :model="editDatasForm" ref="editDatasForm" hide-required-asterisk label-width="100px" inline :rules="rules" size="small">
						<table>
							<tr>
								<td>
									<el-form-item label="组织编码" prop="zzcode">
										<el-input placeholder="请输入组织编码" v-model="editDatasForm.zzcode" clearable></el-input>
									</el-form-item>
								</td>
								<td>
									<el-form-item label="所属组织编码" prop="jtcode">
										<el-input placeholder="请输入所属组织编码" v-model="editDatasForm.jtcode" clearable></el-input>
									</el-form-item>
								</td>
							</tr>
							<tr>
								<td>
									<el-form-item label="组织名称" prop="zzname">
										<el-input placeholder="请输入组织名称" v-model="editDatasForm.zzname" clearable></el-input>
									</el-form-item>
								</td>
								<td>
									<el-form-item label="所属组织名称" prop="jtname">
										<el-input placeholder="请输入所属组织名称" v-model="editDatasForm.jtname" clearable></el-input>
									</el-form-item>
								</td>
							</tr>
							<tr>
								<td>
									<el-form-item label="启用状态" prop="statetext">
										<el-switch
											v-model="editDatasForm.state">
										</el-switch>
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
		</el-main>
		<el-footer>
			<div class="syh-pagination">
				<el-pagination
					background
					layout="slot, prev, pager, next"
					:total="total"
					:page-size="pagesize"
					:current-page="currentPage"
					@current-change="currentchange"
					prev-text="上一页"
					next-text="下一页">
					<el-button class="firstlast-pager" :class="firstPageClassObj" @click="jumpPage('1')">首页</el-button>
				</el-pagination>
				<el-pagination
					layout="slot"
					:total="total"
					:page-size="pagesize"
					:current-page="currentPage"
					>
					<el-button class="firstlast-pager" :class="lastPageClassObj" @click="jumpPage('0')">尾页</el-button>
				</el-pagination>
				<el-pagination
					layout="slot, jumper"
					:total="total"
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
export default {
	name: 'organization',
	data () {
		return {
			// 表格数据
			tableData: [{
				zzcode: '056',
				zzname: '速邮汇',
				jtcode: '04135612897',
				jtname: '杭州厚通网络科技有限公司',
				state: '1'
			}, {
				zzcode: '057',
				zzname: '速邮汇',
				jtcode: '676585648488',
				jtname: '杭州易贸科技有限公司',
				state: '0'
			}, {
				zzcode: '056',
				zzname: '速邮汇',
				jtcode: '04135612897',
				jtname: '杭州厚通网络科技有限公司',
				state: '0'
			}, {
				zzcode: '056',
				zzname: '速邮汇',
				jtcode: '04135612897',
				jtname: '杭州厚通网络科技有限公司',
				state: '1'
			}],
			searchInput: '', // 搜索输入内容
			total: 0, // 总数据条数
			pagesize: 10, // 每页的数据条数
			currentPage: 1, // 当前页码
			isFirstPageActive: false,
			isLastPageActive: true,
			detailsVisible: false, // 详情弹框是否显示
			detailData: {},
			editVisible: false, // 新增或编辑弹框是否显示
			editDatasForm: {
				zzcode: '',
				zzname: '',
				jtcode: '',
				jtname: '',
				state: false
			},
			rules: {
				zzcode: [
					{ required: true, message: '请输入组织编码', trigger: 'blur' }
				],
				zzname: [
					{ required: true, message: '请输入组织名称', trigger: 'blur' }
				],
				jtcode: [
					{ required: true, message: '请输入所属组织编码', trigger: 'blur' }
				],
				jtname: [
					{ required: true, message: '请输入所属组织名称', trigger: 'blur' }
				],
				state: [
					{ type: 'boolean', required: true, message: '请选择启用状态', trigger: 'change' }
				]
			},
			dialogTitle: '新增', // 新增或编辑弹框的title设置
			submitState: 0 // 保存类型：新增：0 编辑：1
		};
	},
	mounted () {
		this.getData(1);
	},
	computed: {
		// 总页数
		pagecount: function () {
			return Math.ceil(this.total / this.pagesize);
		},
		// 首页按钮class
		firstPageClassObj: function () {
			return {
				active: this.total > this.pagesize ? this.isFirstPageActive : false,
				disabled: this.total > this.pagesize ? !this.isFirstPageActive : true
			};
		},
		// 尾页按钮class
		lastPageClassObj: function () {
			return {
				active: this.total > this.pagesize ? this.isLastPageActive : false,
				disabled: this.total > this.pagesize ? !this.isLastPageActive : true
			};
		}
	},
	methods: {
		// 点击‘首页’或‘尾页’按钮处理事件
		jumpPage (val) {
			switch (val) {
			case '1':
				this.currentPage = 1;
				this.isFirstPageActive = false;
				this.isLastPageActive = true;
				break;
			case '0':
				this.currentPage = this.pagecount;
				this.isLastPageActive = false;
				this.isFirstPageActive = true;
				break;
			}
		},
		// 当前页改变处理事件
		currentchange (currentPage) {
			this.currentPage = currentPage;
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
		},
		// 启用状态改变处理事件
		changestate (row) {
			if (row.state === '1') {
				row.state = '0';
			} else {
				row.state = '1';
			}
		},
		// 双击表格某行，显示‘详情’弹框
		showDetails (row) {
			this.detailData = row;
			this.detailsVisible = true;
		},
		// 点击‘搜索’按钮
		search () {

		},
		// 点击‘新增’按钮，显示‘新增’弹框
		add () {
			this.editDatasForm.zzcode = '';
			this.editDatasForm.zzname = '';
			this.editDatasForm.jtcode = '';
			this.editDatasForm.jtname = '';
			this.editDatasForm.state = false;
			this.dialogTitle = '新增';
			this.submitState = 0;
			this.editVisible = true;
		},
		// 点击‘编辑’按钮，显示‘编辑’弹框
		edit (row) {
			this.editDatasForm.zzcode = row.zzcode;
			this.editDatasForm.zzname = row.zzname;
			this.editDatasForm.jtcode = row.jtcode;
			this.editDatasForm.jtname = row.jtname;
			this.editDatasForm.state = row.state === '1';
			this.dialogTitle = '编辑';
			this.submitState = 1;
			this.editVisible = true;
		},
		// 保存表单
		saveForm (formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					alert('submit!');
					// if(submitState === 0) {

					// }else {

					// }
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
		getData (pagno) {
			// debugger;
			// let _this = this;
			// let data = {
			// 	'code': '',
			// 	'name': '',
			// 	'pageNo': pagno,
			// 	'pageSize': this.pagesize,
			// 	'sortType': 1
			// };
			// let data = {
			// 	'pageNo': pagno,
			// 	'pageSize': this.pagesize,
			// 	'sortType': 1
			// };
			// this.base.axios_post(data, '/platformBase/api/base/platform/queryGroupInfoList', function (res) {
			// 	console.log(res);
			// });
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.syh-dialog .rowDetails table {
	border-spacing:10px 20px;
}
</style>
