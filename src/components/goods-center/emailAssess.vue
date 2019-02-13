<template>
	<el-container class="syh-container">
		<el-header>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>主页</el-breadcrumb-item>
				<el-breadcrumb-item>商品中心</el-breadcrumb-item>
				<el-breadcrumb-item>易茂在线评估</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="syh-editdata">
				<el-input v-model="searchInput" placeholder="请输入公司名称" clearable size="small"></el-input>
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
						prop="companyName"
						align="center"
						min-width="100px"
						show-overflow-tooltip
						label="公司名称">
					</el-table-column>
					<el-table-column
						prop="appraisalStatusText"
						align="center"
						label="评估状态">
					</el-table-column>
					<el-table-column
						prop="creator"
						align="center"
						label="申请人">
					</el-table-column>
					<el-table-column
						prop="createTime"
						align="center"
						label="申请时间">
					</el-table-column>
					<el-table-column
						prop="assessor"
						align="center"
						label="评估人">
					</el-table-column>
					<el-table-column
						prop="startTime"
						align="center"
						label="开始评估时间">
					</el-table-column>
					<el-table-column
						prop="endTime"
						align="center"
						label="结束时间">
					</el-table-column>
					<el-table-column
						width="150"
						align="center"
						fixed="right">
						<template slot-scope="scope">
							<el-button @click="edit(scope.row.projectAppraisalId)" style="background-color:#0199F9;">编辑</el-button>
							<el-button @click="showDetails(scope.row.projectAppraisalId)" class="viewAssess">查看</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<!-- <div class="syh-dialog">
				<el-dialog title="详情" :visible.sync="detailsVisible" width="35%" top="30vh" custom-class="rowDetails">
					<table>
						<tr>
							<td>项目名称：</td>
							<td>{{detailData.xmmc}}</td>
							<td>评估状态：</td>
							<td>{{detailData.pgzt}}</td>
						</tr>
						<tr>
							<td>申请人：</td>
							<td>{{detailData.sqr}}</td>
							<td>申请时间：</td>
							<td>{{detailData.sqsj}}</td>
						</tr>
						<tr>
							<td>评估人：</td>
							<td>{{detailData.pgr}}</td>
							<td>开始评估时间：</td>
							<td>{{detailData.pgstart}}</td>
						</tr>
						<tr>
							<td>结束时间：</td>
							<td>{{detailData.pgend}}</td>
						</tr>
					</table>
				</el-dialog>
			</div> -->
			<!-- <div class="syh-dialog">
				<el-dialog :visible.sync="editVisible" width="40%" top="20vh" custom-class="rowEdit">
					<span slot="title" class="el-dialog__title">{{dialogTitle}}</span>
					<el-form :model="editDatasForm" ref="editDatasForm" hide-required-asterisk label-width="100px" inline :rules="rules">
						<table>
							<tr>
								<td>
									<el-form-item label="项目名称" prop="xmmc">
										<el-input placeholder="请输入项目名称" v-model="editDatasForm.xmmc"></el-input>
									</el-form-item>
								</td>
								<td>
									<el-form-item label="评估状态" prop="pgzt">
										<el-input placeholder="请输入评估状态" v-model="editDatasForm.pgzt"></el-input>
									</el-form-item>
								</td>
							</tr>
							<tr>
								<td>
									<el-form-item label="申请人" prop="sqr">
										<el-input placeholder="请输入申请人" v-model="editDatasForm.sqr"></el-input>
									</el-form-item>
								</td>
								<td>
									<el-form-item label="申请时间" prop="sqsj">
										<el-input placeholder="请输入申请时间" v-model="editDatasForm.sqsj"></el-input>
									</el-form-item>
								</td>
							</tr>
							<tr>
								<td>
									<el-form-item label="评估人" prop="pgr">
										<el-input placeholder="请输入评估人" v-model="editDatasForm.pgr"></el-input>
									</el-form-item>
								</td>
								<td>
									<el-form-item label="开始评估时间" prop="pgstart">
										<el-input placeholder="请输入开始评估时间" v-model="editDatasForm.pgstart"></el-input>
									</el-form-item>
								</td>
							</tr>
							<tr>
								<td>
									<el-form-item label="结束时间" prop="pgend">
										<el-input placeholder="请输入结束时间" v-model="editDatasForm.pgend"></el-input>
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
			</div> -->
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
	name: 'information',
	data () {
		return {
			// 表格数据
			DataList: [],
			sortType: 1, // 排序字段
			searchInput: '', // 搜索输入内容
			searchValue: '', // 当前搜索值
			pagecount: 0, // 总页数
			pagesize: 10, // 每页的数据条数
			currentPage: 1, // 当前页码
			isFirstPageActive: false,
			isLastPageActive: true
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
				// 评估状态：0是全部，1待评估，2是已评估
				switch (itemData.appraisalStatus) {
				case 1:
					itemData.appraisalStatusText = '待评估';
					break;
				case 2:
					itemData.appraisalStatusText = '已评估';
					break;
				};
				itemData.createTime = this.base.trans_time(itemData.createTime, 4);
				itemData.startTime = this.base.trans_time(itemData.startTime, 4);
				itemData.endTime = this.base.trans_time(itemData.endTime, 4);
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
		// 显示‘详情’
		showDetails (id) {
			this.$router.push({ path: `/viewAssessState/${id}` });
		},
		// 点击‘搜索’按钮
		search () {
			this.searchValue = trim(this.searchInput);
			this.getDataList(1);
			this.currentPage = 1;
		},
		// 点击‘新增’按钮
		add () {
			this.$router.push({ path: '/editEmailAssess' });
		},
		// 点击‘编辑’按钮
		edit (id) {
			this.$router.push({ path: `/editEmailAssess/${id}` });
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
			// 评估状态appraisalStatus：0是全部，1待评估，2是已评估
			let _this = this;
			let data = {
				companyName: this.searchValue,
				appraisalStatus: 0,
				pageNo: pagno,
				pageSize: this.pagesize
			};
			this.base.axios_post(data, '/platformEasymall/api/easymore/token/emAdminQueryProjectAppraisalPage', function (res) {
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
.syh-dialog .rowDetails table {
	border-spacing:10px 20px;
}
.viewAssess {
	color: #0199F9 !important;
	margin-left: 10px;
	background-color: #fff;
	border-color:  #0199F9;
}
</style>
