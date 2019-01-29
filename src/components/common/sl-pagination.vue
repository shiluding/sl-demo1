<template>
<div class="sl-pagination" data-l-slPagination>
	<el-pagination
		background
		layout="slot, prev, pager, next"
		:page-count="pagecount"
		:page-size="pagesize"
		:current-page="page"
		@current-change="currentchange"
		prev-text="上一页"
		next-text="下一页">
		<el-button class="firstlast-pager" :class="firstPageClassObj" @click="jumpPage('1')">首页</el-button>
	</el-pagination>
	<el-pagination
		layout="slot"
		:page-count="pagecount"
		:page-size="pagesize"
		:current-page="page">
		<el-button class="firstlast-pager" :class="lastPageClassObj" @click="jumpPage('0')">尾页</el-button>
	</el-pagination>
	<el-pagination
		layout="slot, jumper"
		:page-count="pagecount"
		:page-size="pagesize"
		:current-page="page"
		@current-change="currentchange">
		<span class="pageinfo">当前第<i>{{page}}</i>页/共<i>{{pagecount}}</i>页</span>
	</el-pagination>
</div>
</template>

<script>
export default {
	name: 'SlPagination',
	props: {
		// 总页数
		pagecount: {
			type: Number,
			default: 0
		},
		// 每页的数据条数
		pagesize: {
			type: Number,
			default: 10
		},
		// 当前页码
		currentPage: {
			type: Number,
			default: 1
		}
	},
	data () {
		return {
			page: this.currentPage,
			isFirstPageActive: false,
			isLastPageActive: true
		};
	},
	watch: {
		page: function (page) {
			if (page === 1) {
				this.isFirstPageActive = false;
			} else {
				this.isFirstPageActive = true;
			}
			if (page === this.pagecount) {
				this.isLastPageActive = false;
			} else {
				this.isLastPageActive = true;
			}
			this.$emit('page-change', page);
		}
	},
	computed: {
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
				this.page = 1;
				break;
			case '0':
				this.page = this.pagecount;
				break;
			}
		},
		// 当前页改变处理事件
		currentchange (page) {
			this.page = page;
		}
	}
};
</script>

<style lang="less">
.sl-pagination[data-l-slPagination] {
	.el-pagination {
		float: left;
		.btn-next,
		.btn-prev {
			color: #fffffa;
			background-color:#05baa2;
			padding: 0 9px;
		}
		.btn-next:disabled,
		.btn-prev:disabled,
		.firstlast-pager.disabled {
			color: #fffffa;
			background-color:#BFBFBF;
			cursor: not-allowed;
		}
		&:nth-child(2) {
			padding-left: 0;
		}
		&:nth-child(3) {
			float: right;
			.pageinfo {
				vertical-align: middle !important;
				color: #606266;
				i {
					color: #05baa2;
				}
			}
		}
		.el-pager li:not(.disabled).active {
			background-color: #05baa2 !important;
		}
		.el-pagination__jump {
			margin-left: 10px;
			.el-pagination__editor {
				vertical-align: middle !important;
				.el-input__inner {
					border-color: #BEBEBE;
					font-size: 13px;
					height: 25px;
				}
			}
		}
		.firstlast-pager {
			border-radius: 2px;
			&.active {
				color: #fffffa;
				background-color:#05baa2;
			}
		}
	}
}
</style>
