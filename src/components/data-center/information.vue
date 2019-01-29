<template>
	<el-container class="syh-container">
		<el-header>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>主页</el-breadcrumb-item>
				<el-breadcrumb-item>数据中心</el-breadcrumb-item>
				<el-breadcrumb-item>资讯</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="syh-editdata">
				<el-input v-model="searchInput" placeholder="请输入资讯名称" clearable size="small"></el-input>
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
						align="center"
						label="序号">
					</el-table-column>
					<el-table-column
						prop="adviceName"
						min-width="100"
						label="资讯名称">
					</el-table-column>
					<el-table-column
						width="320"
						label="资讯正文">
						<template slot-scope="scope">
							<el-tooltip placement="right-end" effect="light">
								<div slot="content" v-html="scope.row.adviceContent" class="tooltip">{{scope.row.adviceContent}}</div>
								<div>{{scope.row.adviceContent_processed}}</div>
							</el-tooltip>
						</template>
					</el-table-column>
					<el-table-column
                        min-width="120"
						align="center"
						label="资讯图片">
						<template slot-scope="scope">
							<img :src="scope.row.adviceUrl" alt="图片" width="100px" height="100px">
						</template>
					</el-table-column>
					<el-table-column
						prop="adviceArrange"
						min-width="100"
						align="center"
						label="创建人">
					</el-table-column>
					<el-table-column
						prop="releaseName"
						min-width="100"
						align="center"
						label="发布人">
					</el-table-column>
                    <el-table-column
						align="center"
						header-align="left"
						class-name="usestate"
						width="150"
						label="发布状态">
						<template slot-scope="scope">
							<span :style="{color: scope.row.stateColor}">{{scope.row.enablestateText}}</span>
							<el-button @click="change_enablestate(scope.row.policyAdviceId, scope.row.adviceState)" :style="{'background-color': scope.row.btn_stateColor}">{{scope.row.btn_enablestateText}}</el-button>
						</template>
					</el-table-column>
					<el-table-column
						min-width="150">
						<template slot-scope="scope">
							<el-button @click="edit(scope.row.policyAdviceId)" style="background-color:#0199F9;">编辑</el-button>
							<el-button @click="showDetails(scope.row)" style="background-color:#0199F9;">查看</el-button>
						</template>
					</el-table-column>
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
import { trim, limitStr } from '@/common/js/common.js';
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
			let re = new RegExp('<.+?>|&nbsp;', 'g');
			for (let item of this.DataList) {
				let {...itemData} = item;
				// adviceState： 0 未启用，1 发布，2 下架
				switch (itemData.adviceState) {
				case 0:
					itemData.enablestateText = '未启用';
					itemData.stateColor = '#000';
					itemData.btn_enablestateText = '发布';
					itemData.btn_stateColor = '#05baa4';
					break;
				case 1:
					itemData.enablestateText = '已发布';
					itemData.stateColor = '#05baa4';
					itemData.btn_enablestateText = '下架';
					itemData.btn_stateColor = '#fe3c51';
					break;
				case 2:
					itemData.enablestateText = '已下架';
					itemData.stateColor = '#fe3c51';
					itemData.btn_enablestateText = '发布';
					itemData.btn_stateColor = '#05baa4';
					break;
				};
				itemData.adviceContent_processed = limitStr(itemData.adviceContent.replace(re, ''), 155);
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
			// adviceState： 0 未启用，1 发布，2 下架
			let _this = this;
			let data = {
				policyAdviceId: id
			};
			if (state === 1) {
				data.adviceState = 2; // 发布状态转下架
			} else {
				data.adviceState = 1; // 其他状态转发布
			}
			this.base.axios_post(data, '/platformEasymall/api/easymore/updatePolicyAdviceState', function (res) {
				console.log(res);
				if (res.code === 0) {
					_this.$message('更新状态成功！');
					_this.getDataList(_this.currentPage);
				} else {
					_this.$message(res.message);
				}
			});
		},
		// 查看
		showDetails (row) {
			this.$router.push({ path: `/showInformation/${row.policyAdviceId}` });
		},
		// 点击‘搜索’按钮
		search () {
			this.searchValue = trim(this.searchInput);
			this.getDataList(1);
			this.currentPage = 1;
		},
		// 点击‘新增’按钮
		add () {
			this.$router.push({ path: '/editInformation' });
		},
		// 点击‘编辑’按钮
		edit (id) {
			this.$router.push({ path: `/editInformation/${id}` });
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
				adviceName: this.searchValue,
				pageNo: pagno,
				pageSize: this.pagesize
			};
			this.base.axios_post(data, '/platformEasymall/api/easymore/queryPolicyAdvicePage', function (res) {
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
/* .adviceContent {
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 4;
	-webkit-box-orient: vertical;
} */
.tooltip {
	width: 500px;
}
</style>
