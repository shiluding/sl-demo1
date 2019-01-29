<template>
	<div id="app">
		<el-container class="syh-backmanage" v-if="haslogin">
			<el-header height="8%" class="top_box">
				<el-row type="flex" style="height:100%;" justify="space-between" align="middle">
					<el-col class="logo_pic"><span class="logo"><img src="./assets/images/logo.png" height="100%"></span></el-col>
					<el-col class="logo_state">
						<a href="javascript:;" class="userinfo" v-if="haslogin"><img class="user_pic" src="./assets/images/userpic.jpeg" height="100%"><span class="user_name">{{nickname}}</span></a>
						<el-button plain class="login_btn" v-if="haslogin" @click="logout">退出登录</el-button>
					</el-col>
				</el-row>
			</el-header>
			<el-container class="middle_box">
				<el-aside class="left_box" width="">
					<el-menu class="el-menu-vertical-demo left_nav" unique-opened text-color="#fff" >
						<el-submenu index="1">
							<template slot="title">
								<i class="syh-icon-data"></i>
								<span>数据中心</span>
							</template>
							<!-- <router-link to="/organization"><el-menu-item index="1-1">组织定义</el-menu-item></router-link>
							<router-link to="/payConfig"><el-menu-item index="1-2">支付配置</el-menu-item></router-link>
							<router-link to="/logisticsConfig"><el-menu-item index="1-3">物流配置</el-menu-item></router-link>
							<router-link to="/areaConfig"><el-menu-item index="1-4">区域配置</el-menu-item></router-link>
							<router-link to="/terminalConfig"><el-menu-item index="1-5">终端配置</el-menu-item></router-link>
							<router-link to="/advertisingConfig"><el-menu-item index="1-6">广告位配置</el-menu-item></router-link>
							<router-link to="/slideshowConfig"><el-menu-item index="1-7">轮播图配置</el-menu-item></router-link>
							<router-link to="/provinceConfig"><el-menu-item index="1-8">省市区配置</el-menu-item></router-link>
							<router-link to="/goodsClassifyConfig"><el-menu-item index="1-9">商品分类配置</el-menu-item></router-link>
							<router-link to="/invoiceTypeConfig"><el-menu-item index="1-10">单据类型配置</el-menu-item></router-link>
							<router-link to="/tradeTypeConfig"><el-menu-item index="1-11">交易类型配置</el-menu-item></router-link> -->
							<!-- <router-link to="/projectClassifyConfig"><el-menu-item index="1-12">服务项目分类配置</el-menu-item></router-link>
							<router-link to="/partner"><el-menu-item index="1-13">合作伙伴</el-menu-item></router-link>
							<router-link to="/link"><el-menu-item index="1-14">友情链接</el-menu-item></router-link>
							<router-link to="/information"><el-menu-item index="1-15">资讯</el-menu-item></router-link> -->
							<router-link to="/projectClassifyConfig"><el-menu-item index="1-1">服务项目分类配置</el-menu-item></router-link>
							<router-link to="/partner"><el-menu-item index="1-2">合作伙伴</el-menu-item></router-link>
							<router-link to="/link"><el-menu-item index="1-3">友情链接</el-menu-item></router-link>
							<router-link to="/information"><el-menu-item index="1-4">资讯</el-menu-item></router-link>
						</el-submenu>
						<el-submenu index="2">
							<template slot="title">
								<i class="syh-icon-user"></i>
								<span>用户中心</span>
							</template>
							<router-link to="/administratorList"><el-menu-item index="2-1">管理员列表</el-menu-item></router-link>
							<router-link to="/emailUserList"><el-menu-item index="2-2">易茂用户列表</el-menu-item></router-link>
						</el-submenu>
						<el-submenu index="3">
							<template slot="title">
								<i class="syh-icon-goods"></i>
								<span>商品中心</span>
							</template>
							<router-link to="/emailGoods"><el-menu-item index="3-1">易茂科技服务商品</el-menu-item></router-link>
							<router-link to="/emailAssess"><el-menu-item index="3-2">易茂在线评估</el-menu-item></router-link>
							<router-link to="/emailProjectTrends"><el-menu-item index="3-3">易茂项目申报动态</el-menu-item></router-link>
						</el-submenu>
						<!-- <el-submenu index="4">
							<template slot="title">
								<i class="syh-icon-trade"></i>
								<span>贸易中心</span>
							</template>
						</el-submenu> -->
					</el-menu>
				</el-aside>
				<el-main class="content_box">
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
		<login v-else @login_state="loginState"></login>
	</div>
</template>

<script>
import login from './login.vue';
export default {
	name: 'App',
	data () {
		return {
			haslogin: false,
			nickname: ''
		};
	},
	components: {
		login
	},
	created () {
		if (!sessionStorage.getItem('syh_key')) {
			this.haslogin = false;
			this.nickname = '';
		} else {
			this.haslogin = true;
			this.nickname = sessionStorage.getItem('syh_nickname');
		}
	},
	methods: {
		loginState (data) {
			this.haslogin = true;
			sessionStorage.setItem('syh_key', 1);
			sessionStorage.setItem('syh_token', data.token);
			sessionStorage.setItem('syh_nickname', data.userInfo.nickname);
			this.$router.push('/index');
			this.nickname = data.userInfo.nickname;
		},
		logout () {
			let _this = this;
			this.base.axios_post(null, '/platformUser/api/platformUserExitLogin', function (res) {
				if (res.code === 0) {
					// console.log(res.data);
					_this.haslogin = false;
					sessionStorage.removeItem('syh_key');
					sessionStorage.removeItem('syh_token');
					sessionStorage.removeItem('syh_nickname');
					_this.$router.push('/');
					_this.nickname = '';
				} else {
					_this.$message(res.message);
				}
			});
		}
	}
};
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		/* 字体抗锯齿渲染 */
		-webkit-font-smoothing: antialiased; /*chrome、safari*/
		-moz-osx-font-smoothing: grayscale; /*firefox*/
		color: #424242;
		/*background: rgb(86,201,166);*/
		overflow:hidden;
		height: 100%;
	}
	.syh-backmanage {
		overflow:hidden;
		height: 100%;
	}
	.syh-backmanage .top_box {
		padding: 0;
		background-color: #FEFEFE;
	}
	.syh-backmanage .middle_box {
		height: 92%;
	}
	.syh-backmanage .top_box .logo_pic {
		margin-left: 50px;
		height: 72%;
	}
	.syh-backmanage .top_box .logo_state {
		margin-right: 40px;
		text-align: right;
		height: 44%;
	}
	.syh-backmanage .top_box .logo_pic .logo {
		display: inline-block;
		width: 160px;
		height: 100%;
	}
	.syh-backmanage .top_box .logo_state .userinfo {
		font-size: 16px;
		color: #333;
		display: inline-block;
		height: 100%;
	}
	.syh-backmanage .top_box .logo_state .userinfo .user_pic {
		vertical-align: middle;
		border-radius: 50%;
		margin-right: 10px;
	}
	.syh-backmanage .top_box .logo_state .login_btn {
		margin-left: 15px;
		color: #05baa2;
		border-color: #05baa2;
		padding: 0 10px;
		height: 100%;
	}
	.syh-backmanage .middle_box .left_box {
		height: 100%;
		background-color:#26242c;
	}
	.syh-backmanage .middle_box .left_box .left_nav {
		border-right: 0;
		min-width: 200px;
	}
	.syh-backmanage .middle_box .left_box .el-submenu .el-submenu__title {
		background-color:#333238;
	}
	.syh-backmanage .middle_box .left_box .el-menu-item {
		background-color:#26242c;
	}
	.syh-backmanage .middle_box .left_box .el-menu-item,
	.syh-backmanage .middle_box .left_box .el-submenu__title {
		height: 45px;
		line-height: 45px;
	}
	.syh-backmanage .middle_box .left_box .el-menu-item.is-active,
	.syh-backmanage .middle_box .left_box .el-menu-item:hover {
		color: #fff;
		background-color: #05baa2;
	}
	.syh-backmanage .middle_box .left_box .el-submenu [class^=syh-icon-] {
		display: inline-block;
		width: 20px;
		vertical-align: middle;
		height: 18px;
		margin-right: 5px;
		background-size: contain;
		background-repeat: no-repeat;
	}
	.syh-backmanage .middle_box .left_box .el-submenu .syh-icon-data {
		background-image: url(./assets/images/data-white.png);
	}
	.syh-backmanage .middle_box .left_box .el-submenu.is-opened .syh-icon-data {
		background-image: url(./assets/images/data-green.png);
	}
	.syh-backmanage .middle_box .left_box .el-submenu .syh-icon-user {
		background-image: url(./assets/images/user-white.png);
	}
	.syh-backmanage .middle_box .left_box .el-submenu.is-opened .syh-icon-user {
		background-image: url(./assets/images/user-green.png);
	}
	.syh-backmanage .middle_box .left_box .el-submenu .syh-icon-goods {
		background-image: url(./assets/images/goods-white.png);
	}
	.syh-backmanage .middle_box .left_box .el-submenu.is-opened .syh-icon-goods {
		background-image: url(./assets/images/goods-green.png);
	}
	.syh-backmanage .middle_box .left_box .el-submenu .syh-icon-trade {
		background-image: url(./assets/images/trade-white.png);
	}
	.syh-backmanage .middle_box .left_box .el-submenu.is-opened .syh-icon-trade {
		background-image: url(./assets/images/trade-green.png);
	}
	.syh-backmanage .middle_box .left_box .el-submenu.is-opened .el-submenu__title {
		color: #05baa2 !important;
	}
	.syh-backmanage .middle_box .content_box {
		height: 100%;
		padding: 0;
	}

	/* 分页器全局设置start */
	.syh-pagination .el-pagination .btn-next,
	.syh-pagination .el-pagination .btn-prev {
		color: #fffffa;
		background-color:#05baa2;
		padding: 0 9px;
	}
	.syh-pagination .el-pagination .btn-next:disabled,
	.syh-pagination .el-pagination .btn-prev:disabled,
	.syh-pagination .el-pagination .firstlast-pager.disabled {
		color: #fffffa;
		background-color:#BFBFBF;
		cursor: not-allowed;
	}
	.syh-pagination .el-pagination {
		float: left;
	}
	.syh-pagination .el-pagination:nth-child(2) {
		padding-left: 0;
	}
	.syh-pagination .el-pagination:nth-child(3) {
		float: right;
	}
	.syh-pagination .el-pagination:nth-child(3) span.pageinfo {
		vertical-align: middle !important;
		color: #606266;
	}
	.syh-pagination .el-pagination:nth-child(3) span.pageinfo i {
		color: #05baa2;
	}
	.syh-pagination .el-pagination .el-pager li:not(.disabled).active {
		background-color: #05baa2;
	}
	.syh-pagination .el-pagination .el-pagination__jump {
		margin-left: 10px;
	}
	.syh-pagination .el-pagination .el-pagination__editor {
		vertical-align: middle !important;
	}
	.syh-pagination .el-pagination .el-pagination__editor .el-input__inner {
		border-color: #BEBEBE;
		font-size: 13px;
		height: 25px;
	}
	.syh-pagination .el-pagination .firstlast-pager {
		border-radius: 2px;
	}
	.syh-pagination .el-pagination .firstlast-pager.active {
		color: #fffffa;
		background-color:#05baa2;
	}
	/* 分页器全局设置end */
	/* Table表格全局设置start */
	.syh-table>.el-table {
		border: 1px solid #E0E0E0;
		border-radius: 7px;
		color: #333;
	}
	.syh-table .el-table .el-button {
		color: #fffffa;
		border-radius: 5px;
		padding: 8px 12px;
		font-size: 13px;
	}
	.syh-table .usestate .el-button {
		margin-left: 20px;
	}
	/* Table表格全局设置end */
	/* dialog全局设置start */
	.syh-dialog .el-dialog {
		border-radius: 5px;
	}
	.syh-dialog .el-dialog__header {
		border-radius: 5px 5px 0 0;
		background-color: #4e99e5;
		padding-top: 10px;
	}
	.syh-dialog .el-dialog__header .el-dialog__title {
		color: #fff;
		font-size: 16px;
	}
	.syh-dialog .el-dialog__header .el-dialog__headerbtn {
		top:10px;
		font-size: 18px;
	}
	.syh-dialog .el-dialog__header .el-dialog__headerbtn .el-dialog__close {
		color: #fff;
	}
	.syh-dialog .el-dialog__body {
		padding: 15px;
	}
	.syh-dialog .el-dialog__footer {
		padding: 10px 15px 15px;
	}
	.syh-dialog .rowEdit .dialog-footer {
		text-align: center;
	}
	.syh-dialog .rowEdit .el-form-item {
		margin: 0;
	}
	.syh-dialog .rowEdit .dialog-footer .el-button+.el-button {
		margin-left: 30px;
	}
	.syh-dialog .rowDetails table,
	.syh-dialog .rowEdit table {
		width: 100%;
	}
	.syh-dialog .el-form-item__content {
		vertical-align: middle;
	}
	/* dialog全局设置end */
	/* 搜索和新增样式全局设置start */
	.syh-editdata {
		float: right;
	}
	.syh-editdata .el-input {
		width: 200px;
		margin-right: 10px;
	}
	.syh-editdata .el-input .el-input__inner {
		border: 1px solid #05baa2;
	}
	.syh-editdata .search,
	.syh-editdata .add {
		color: #fffffa;
		font-size: 14px;
		border-radius: 5px;
	}
	.syh-editdata .search {
		background: #05baa2;
	}
	.syh-editdata .add {
		background: #0199F9;
	}
	/* 搜索和新增样式全局设置end */
	/* 全局布局设置start */
	.syh-container {
		height: 100%;
	}
	.syh-container .el-header {
		padding: 10px 35px 0 35px;
	}
	.syh-container .el-header .el-breadcrumb {
		float: left;
		margin-top: 10px;
	}
	.syh-container .el-main {
		padding-top: 0;
		min-width: 824px;
		position: relative;
	}
	.syh-container .el-footer {
		padding: 0 35px;
	}
	.syh-container .el-header .el-breadcrumb .el-breadcrumb__inner.is-link {
		color: #606266;
	}
	.syh-container .el-header .el-breadcrumb .el-breadcrumb__inner.is-link:hover,
	.syh-container .el-header .el-breadcrumb__item:last-child .el-breadcrumb__inner {
		color: #05baa2;
	}
	/* 全局布局设置end */
</style>
