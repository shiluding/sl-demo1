<template>
	<el-container class="syh-container">
		<el-header>
				<el-breadcrumb separator="/">
					<el-breadcrumb-item>主页</el-breadcrumb-item>
					<el-breadcrumb-item>数据中心</el-breadcrumb-item>
					<el-breadcrumb-item>省市区配置</el-breadcrumb-item>
				</el-breadcrumb>
				<div class="syh-editdata">
					<el-input v-model="searchInput" placeholder="请输入轮播图名称" clearable size="small"></el-input>
					<el-input v-model="searchInput" placeholder="请输入轮播图名称" clearable size="small"></el-input>
					<el-input v-model="searchInput" placeholder="请输入轮播图名称" clearable size="small"></el-input>
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
						prop="id1"
						align="center"
						min-width="120"
						show-overflow-tooltip
						label="上级id">
					</el-table-column>
					<el-table-column
						prop="id2"
						align="center"
						min-width="120"
						show-overflow-tooltip
						label="地址id">
					</el-table-column>
					<el-table-column
						prop="dztype"
						align="center"
						width="100"
						label="地址类型">
					</el-table-column>
					<el-table-column
						prop="dzname"
						align="center"
						min-width="120"
						show-overflow-tooltip
						label="地址名称">
					</el-table-column>
					<el-table-column
						prop="szmdx"
						align="center"
						label="首字母大写">
					</el-table-column>
					<el-table-column
						sortable
						align="center"
						header-align="left"
						class-name="usestate"
						width="150"
						fixed="right"
						label="启用状态">
						<template slot-scope="scope">
							<span v-if="scope.row.state=='1'" style="color:#05baa4">启用</span>
							<span v-else style="color:#fe3c51">停用</span>
							<el-button @click="changestate(scope.row)" v-if="scope.row.state=='1'" style="background-color:#fe3c51;">停用</el-button>
							<el-button @click="changestate(scope.row)" v-else style="background-color:#05baa4;">启用</el-button>
						</template>
					</el-table-column>
					<el-table-column
						min-width="120"
						fixed="right">
						<template slot-scope="scope">
							<el-button @click="edit(scope.row)" style="background-color:#0199F9;">编辑</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="syh-dialog">
				<el-dialog title="详情" :visible.sync="detailsVisible" width="40%" top="30vh" custom-class="rowDetails">
					<table>
						<tr>
							<td>上级ID：</td>
							<td>{{detailData.id1}}</td>
							<td>地址名称：</td>
							<td>{{detailData.dzname}}</td>
						</tr>
						<tr>
							<td>地址ID：</td>
							<td>{{detailData.id2}}</td>
							<td>首字母大写：</td>
							<td>{{detailData.szmdx}}</td>
						</tr>
						<tr>
							<td>地址类型：</td>
							<td>{{detailData.dztype}}</td>
							<td>启用状态：</td>
							<td>{{detailData.state}}</td>
						</tr>
						<tr>
							<td>排序：</td>
							<td>{{detailData.px}}</td>
						</tr>
					</table>
				</el-dialog>
			</div>
			<div class="syh-dialog">
				<el-dialog :visible.sync="editVisible" width="42%" top="20vh" custom-class="rowEdit">
					<span slot="title" class="el-dialog__title">{{dialogTitle}}</span>
					<el-form :model="editDatasForm" ref="editDatasForm" hide-required-asterisk label-width="100px" inline :rules="rules">
						<table>
							<tr>
								<td>
									<el-form-item label="上级ID" prop="id1">
										<el-input placeholder="请输入上级ID" v-model="editDatasForm.id1"></el-input>
									</el-form-item>
								</td>
								<td>
									<el-form-item label="地址名称" prop="dzname">
										<el-input placeholder="请输入地址名称" v-model="editDatasForm.dzname"></el-input>
									</el-form-item>
								</td>
							</tr>
							<tr>
								<td>
									<el-form-item label="地址ID" prop="id2">
										<el-input placeholder="请输入地址ID" v-model="editDatasForm.id2"></el-input>
									</el-form-item>
								</td>
								<td>
									<el-form-item label="首字母大写" prop="szmdx">
										<el-input placeholder="请输入首字母大写" v-model="editDatasForm.szmdx"></el-input>
									</el-form-item>
								</td>
							</tr>
							<tr>
								<td>
									<el-form-item label="地址类型" prop="dztype">
										<el-input placeholder="请输入地址类型" v-model="editDatasForm.dztype"></el-input>
									</el-form-item>
								</td>
								<td>
									<el-form-item label="启用状态" prop="state">
										<!-- <el-input placeholder="请输入启用状态" v-model="editDatasForm.state"></el-input> -->
									</el-form-item>
								</td>
							</tr>
							<tr>
								<td>
									<el-form-item label="排序" prop="px">
										<el-input placeholder="请输入排序" v-model="editDatasForm.px"></el-input>
									</el-form-item>
								</td>
							</tr>
						</table>
					</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button @click="resetForm('editDatasForm')" type="primary" plain  icon="el-icon-refresh">重置</el-button>
						<el-button @click="saveForm('editDatasForm')" type="primary" icon="el-icon-check">保存</el-button>
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
				id1: 'https://www.baidu.com/',
				id2: 'https://www.baidu.com/',
				dzname: 'A类地址',
				szmdx: 'M',
				dztype: 'A类地址',
				px: '111111'
			}, {
				id1: 'https://www.baidu.com/',
				id2: 'https://www.baidu.com/',
				dzname: 'A类地址',
				szmdx: 'M',
				dztype: 'A类地址',
				px: '111111'
			}],
			searchInput: '', // 搜索输入内容
			total: 30, // 总数据条数
			pagesize: 13, // 每页的数据条数
			currentPage: 1, // 当前页码
			isFirstPageActive: false,
			isLastPageActive: true,
			detailsVisible: false, // 详情弹框是否显示
			detailData: {},
			editVisible: false, // 新增或编辑弹框是否显示
			editDatasForm: {},
			rules: {},
			dialogTitle: '新增', // 新增或编辑弹框的title设置
			submitState: 1 // 保存类型：新增：1 编辑：0
		};
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
			this.editDatasForm = {};
			this.dialogTitle = '新增';
			this.editVisible = true;
		},
		// 点击‘编辑’按钮，显示‘编辑’弹框
		edit (row) {
			this.editDatasForm = row;
			this.dialogTitle = '编辑';
			this.editVisible = true;
		},
		// 保存表单
		saveForm (formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					alert('submit!');
				} else {
					console.log('表单校验不通过！');
					return false;
				}
			});
		},
		// 重置表单
		resetForm (formName) {
			this.$refs[formName].resetFields();
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
