<template>
	<el-container class="syh-container">
		<el-header>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>主页</el-breadcrumb-item>
				<el-breadcrumb-item>数据中心</el-breadcrumb-item>
				<el-breadcrumb-item to="/information">资讯</el-breadcrumb-item>
				<el-breadcrumb-item>详情</el-breadcrumb-item>
			</el-breadcrumb>
			<router-link to="/information"><div class="back">返回上一页</div></router-link>
		</el-header>
		<el-main>
			<div class="wrap">
				<div class="editDialog">
					<div class="title"><span>详情</span></div>
					<div class="showDetail">
						<p class="name"><span>资讯名称：{{datadetail.adviceName}}</span></p>
						<div class="content_mid">
							<p class="content_title"><span>正文</span></p>
							<p class="content_detail" v-html="datadetail.adviceContent">{{datadetail.adviceContent}}</p>
						</div>
						<div class="content_bottom">
							<span>创建时间：{{datadetail.createTime}}</span>
							<span>发布时间：{{datadetail.releaseTime}}</span>
							<span>创建人：{{datadetail.adviceArrange}}</span>
							<span>发布人：{{datadetail.releaseName}}</span>
							<span>发布状态：{{datadetail.adviceStateText}}</span>
						</div>
					</div>
				</div>
			</div>
		</el-main>
	</el-container>
</template>

<script>
export default {
	name: 'showInformation',
	props: ['id'],
	data () {
		return {
			datadetail: {}
		};
	},
	created () {
		console.log(this.id);
		let _this = this;
		let data = {
			policyAdviceId: this.id
		};
		this.base.axios_post(data, '/platformEasymall/api/easymore/queryPolicyAdviceInfo', function (res) {
			console.log(res);
			if (res.code === 0) {
				_this.datadetail = res.data;
				_this.datadetail.createTime = _this.base.trans_time(_this.datadetail.createTime, 4);
				_this.datadetail.releaseTime = _this.base.trans_time(_this.datadetail.releaseTime, 4);
				// adviceState： 0 未启用，1 发布，2 下架
				switch (_this.datadetail.adviceState) {
				case 0:
					_this.datadetail.adviceStateText = '未启用';
					break;
				case 1:
					_this.datadetail.adviceStateText = '已发布';
					break;
				case 2:
					_this.datadetail.adviceStateText = '已下架';
					break;
				};
			}
		});
	}
};
</script>

<style scoped>
.back {
	float: right;
	font-size: 14px;
	color: #05baa2;
	margin-top: 10px;
}
.wrap {
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	padding: 0 20px 40px;
}
.editDialog {
	height: 100%;
	border-radius: 6px;
	background-color: #F5F4F7;
}
.editDialog .title {
	height: 6%;
	background-color: #4F98E5;
	display: flex;
	align-items: center;
	padding-left: 20px;
	color: #fff;
	border-top-left-radius: 6px;
	border-top-right-radius: 6px;
}
.editDialog .showDetail {
	height: 94%;
	box-sizing: border-box;
	padding: 0 30px;
	font-size: 14px;
}
.editDialog .showDetail .name,
.editDialog .content_bottom {
	display: flex;
	align-items: center;
	height: 7%;
}
.editDialog .content_mid {
	height: 86%;
	border: 1px solid #BFBFBF;
}
.editDialog .content_mid .content_title {
	display: flex;
	align-items: center;
	height: 5%;
	padding-left: 15px;
	border-bottom: 1px solid #BFBFBF;
	background-color: #EFEFEF;
}
.editDialog .content_mid .content_detail {
	height: 95%;
	padding: 20px 20px 0;
	box-sizing: border-box;
	overflow-y: auto;
}
.editDialog .content_bottom span {
	margin-right: 5%;
}
</style>
