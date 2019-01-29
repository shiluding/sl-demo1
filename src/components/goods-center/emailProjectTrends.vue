<template>
	<el-container class="syh-container">
		<el-header>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>主页</el-breadcrumb-item>
				<el-breadcrumb-item>商品中心</el-breadcrumb-item>
				<el-breadcrumb-item to="/emailProjectTrends">易茂项目申报动态</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="syh-editdata">
				<el-input v-model="searchInput" placeholder="请输入合同编号" clearable size="small"></el-input>
				<el-button class="search" size="small" @click="search">搜索</el-button>
				<!-- <el-button class="add" size="small" @click="add">新增</el-button> -->
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
						prop="contractNo"
						align="center"
						label="合同编号">
					</el-table-column>
					<el-table-column
						prop="categorySidName"
						align="center"
						label="所属类别">
					</el-table-column>
					<el-table-column
						prop="customerCompanyName"
						min-width="120"
						show-overflow-tooltip
						label="客户公司名称">
					</el-table-column>
					<el-table-column
						prop="beginTimeString"
						align="center"
						label="开始时间">
					</el-table-column>
					<el-table-column
						prop="deadlineTimeString"
						align="center"
						label="结束时间">
					</el-table-column>
					<el-table-column
						prop="applicationStatusString"
						align="center"
						label="项目状态">
					</el-table-column>
					<el-table-column
						fixed="right">
						<template slot-scope="scope">
							<el-button @click="showDetails(scope.row.projectApplicationId)" class="viewProject">查看项目详情</el-button>
						</template>
					</el-table-column>
					<!-- <el-table-column
						min-width="200"
						fixed="right">
						<template slot-scope="scope">
							<el-button @click="edit(scope.row)" style="background-color:#0199F9;">编辑</el-button>
							<el-button @click="view(scope.row.cqmc)" class="viewProject">查看项目状态</el-button>
						</template>
					</el-table-column> -->
				</el-table>
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
	name: 'emailProjectTrends',
	data () {
		return {
			// 表格数据
			DataList: [],
			sortType: 0, // 排序字段
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
				let {...itemData} = item;
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
		// 显示项目详情
		showDetails (id) {
			this.$router.push({ path: `/viewProjectDetail/${id}` });
		},
		// 点击‘搜索’按钮
		search () {
			this.searchValue = trim(this.searchInput);
			this.getDataList(1);
			this.currentPage = 1;
		},
		// 点击‘新增’按钮
		add () {
			this.$router.push({ path: '/addEmailProject' });
		},
		// 点击‘编辑’按钮
		edit (id) {
			// this.$router.push({ path: `/editInformation/${id}` });
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
				categorySid: '',
				finishProcess: 9,
				contractNo: this.searchValue,
				pageNo: pagno,
				pageSize: this.pagesize
			};
			this.base.axios_post(data, '/platformEasymall/api/easymore/listProjectApplicationInfo', function (res) {
				console.log(res);
				if (res.code === 0) {
					_this.DataList = res.data.data;
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
.viewProject {
	color: #0199F9 !important;
	background-color: #fff;
	border-color:  #0199F9;
}
</style>
