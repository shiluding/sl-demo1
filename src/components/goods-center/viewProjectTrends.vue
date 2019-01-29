<template>
	<el-container class="syh-container">
		<el-header>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>主页</el-breadcrumb-item>
				<el-breadcrumb-item>商品中心</el-breadcrumb-item>
				<el-breadcrumb-item to="/emailProjectTrends">易茂项目申报动态</el-breadcrumb-item>
				<el-breadcrumb-item>查看项目状态</el-breadcrumb-item>
			</el-breadcrumb>
		</el-header>
		<el-main>
			<div class="trends">
				<div class="trends_content">
					<img class="bg" src="../../assets/images/trends/trend.png" alt="">
					<ul class="topBox">
						<li>
							<div class="nodeNumber">1</div>
							<div class="nodeIcon"><img src="../../assets/images/trends/node_blue.png" alt="" height="100%"></div>
							<div class="nodeState">
								<p>已完成</p>
								<p>2018-09-02</p>
							</div>
							<div class="nodeBox">
								<div class="nodeBoxContent">
									<span class="triangle"></span>
									<span class="nodeBoxText">客户基础信息录入</span>
								</div>
							</div>
						</li>
						<li>
							<div class="nodeNumber">2</div>
							<div class="nodeIcon"><img src="../../assets/images/trends/node_blue.png" alt="" height="100%"></div>
							<div class="nodeState">
								<p>已完成</p>
								<p>2018-09-02</p>
							</div>
							<div class="nodeBox">
								<div class="nodeBoxContent">
									<span class="triangle"></span>
									<span class="nodeBoxText">合同签订,录入合同与付款信息,发起项目流程</span>
								</div>
							</div>
						</li>
						<li>
							<div class="nodeNumber">3</div>
							<div class="nodeIcon"><img src="../../assets/images/trends/node_blue.png" alt="" height="100%"></div>
							<div class="nodeState">
								<p>已完成</p>
								<p>2018-09-02</p>
							</div>
							<div class="nodeBox">
								<div class="nodeBoxContent">
									<span class="triangle"></span>
									<span class="nodeBoxText">负责人审批,分派项目</span>
								</div>
							</div>
						</li>
						<li>
							<div class="nodeNumber">4</div>
							<div class="nodeIcon"><img src="../../assets/images/trends/node_blue.png" alt="" height="100%"></div>
							<div class="nodeState">
								<p>已完成</p>
								<p>2018-09-02</p>
							</div>
							<div class="nodeBox">
								<div class="nodeBoxContent">
									<span class="triangle"></span>
									<span class="nodeBoxText">项目负责人开始项目</span>
								</div>
							</div>
						</li>
						<li>
							<div class="nodeNumber">5</div>
							<div class="nodeIcon"><img src="../../assets/images/trends/node_blue.png" alt="" height="100%"></div>
							<div class="nodeState">
								<p>已完成</p>
								<p>2018-09-02</p>
							</div>
							<div class="nodeBox">
								<div class="nodeBoxContent">
									<span class="triangle"></span>
									<span class="nodeBoxText">录入项目基础信息及主要节点进度</span>
								</div>
							</div>
						</li>
					</ul>
					<ul class="bottomBox">
						<li>
							<div class="nodeNumber">9</div>
							<div class="nodeIcon"><img src="../../assets/images/trends/node_blue.png" alt="" height="100%"></div>
							<div class="nodeState">
								<p>已完成</p>
								<p>2018-09-02</p>
							</div>
							<div class="nodeBox">
								<div class="nodeBoxContent">
									<span class="triangle"></span>
									<span class="nodeBoxText">结束流程</span>
								</div>
							</div>
						</li>
						<li>
							<div class="nodeNumber">8</div>
							<div class="nodeIcon"><img src="../../assets/images/trends/node_blue.png" alt="" height="100%"></div>
							<div class="nodeState">
								<p>已完成</p>
								<p>2018-09-02</p>
							</div>
							<div class="nodeBox">
								<div class="nodeBoxContent">
									<span class="triangle"></span>
									<span class="nodeBoxText">项目成功</span>
								</div>
							</div>
						</li>
						<li>
							<div class="nodeNumber">7</div>
							<div class="nodeIcon"><img src="../../assets/images/trends/node_blue.png" alt="" height="100%"></div>
							<div class="nodeState">
								<p>已完成</p>
								<p>2018-09-02</p>
							</div>
							<div class="nodeBox">
								<div class="nodeBoxContent">
									<span class="triangle"></span>
									<span class="nodeBoxText">跟进项目动态并实时更新</span>
								</div>
							</div>
						</li>
						<li>
							<div class="nodeNumber">6</div>
							<div class="nodeIcon"><img src="../../assets/images/trends/node_blue.png" alt="" height="100%"></div>
							<div class="nodeState">
								<p>已完成</p>
								<p>2018-09-02</p>
							</div>
							<div class="nodeBox">
								<div class="nodeBoxContent">
									<span class="triangle"></span>
									<span class="nodeBoxText">项目遇到什么问题,是否能解决</span>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</el-main>
	</el-container>
</template>

<script>
export default {
	name: 'viewProjectTrends',
	props: ['id'],
	created () {
		this.fetchData();
	},
	data () {
		return {};
	},
	watch: {
		'$route': 'fetchData'
	},
	computed: {},
	methods: {
		fetchData () {
			console.log(this.id);
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@media screen and (max-width: 1024px) {
	.trends {
		font-size: 12px;
	}
	.trends .trends_content .nodeBox .nodeBoxContent .triangle {
		top: -18px !important;
		border-width: 9px !important;
	}
	.trends .trends_content .nodeState p+p {
		margin-top: 0 !important;
	}
}
@media screen and (min-width: 1024px) {
	.trends {
		font-size: 13px;
	}
	.trends .trends_content .nodeBox .nodeBoxContent .triangle {
		top: -24px !important;
		border-width: 12px !important;
	}
	.trends .trends_content .nodeState p+p {
		margin-top: 1% !important;
	}
}
@media screen and (min-width: 1280px) {
	.trends {
		font-size: 13px;
	}
	.trends .trends_content .nodeBox .nodeBoxContent .triangle {
		top: -26px !important;
		border-width: 13px !important;
	}
	.trends .trends_content .nodeState p+p {
		margin-top: 1% !important;
	}
}
@media screen and (min-width: 1440px) {
	.trends {
		font-size: 14px;
	}
	.trends .trends_content .nodeBox .nodeBoxContent .triangle {
		top: -28px !important;
		border-width: 14px !important;
	}
	.trends .trends_content .nodeState p+p {
		margin-top: 2% !important;
	}
}
@media screen and (min-width: 1680px) {
	.trends {
		font-size: 16px;
	}
	.trends .trends_content .nodeBox .nodeBoxContent .triangle {
		top: -30px !important;
		border-width: 15px !important;
	}
}
.trends {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	padding: 40px 60px 0 60px;
	box-sizing: border-box;
}
.trends .trends_content {
	width: 100%;
	position: relative;
	/* background: url(../../assets/images/trends/trend.png) center 0/100% auto no-repeat; */
}
.trends .trends_content .bg {
	display: block;
	width: 100%;
}
.trends .trends_content .topBox {
	position: absolute;
	left: 0;
	top: 0;
	height: 39.65%;
	width: 95%;
}
.trends .trends_content .topBox li {
	float: left;
	width: 17.7%;
	height: 100%;
}
.trends .trends_content .topBox li+li {
	margin-left: 2.875%;
}
.trends .trends_content .nodeNumber {
	text-align: center;
	height: 8.79%;
}
.trends .trends_content .nodeIcon {
	height: 13.2%;
	text-align: center;
}
.trends .trends_content .nodeState {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	height: 17%;
	color: #84B7E5;
	box-sizing: border-box;
}
.trends .trends_content .nodeState p+p {
	margin-top: 3.3%;
}
.trends .trends_content .nodeBox {
	height: 61.01%;
	padding-top: 6.3%;
	box-sizing: border-box;
}
.trends .trends_content .nodeBox .nodeBoxContent {
	position: relative;
	height: 100%;
	padding: 0 5%;
	background-color: #84B7E5;
	color: #fff;
	text-align: center;
	border-radius: 6px;
	display: flex;
	align-items: center;
	justify-content: center;
}
.trends .trends_content .nodeBox .nodeBoxContent .triangle {
	width: 0;
    height: 0;
    position: absolute;
	top: -26px;
	left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    z-index: 1;
    border-width: 13px;
    border-style: solid;
    border-color: transparent;
	border-bottom-color: #84B7E5;
}
.trends .trends_content .nodeBox .nodeBoxContent .nodeBoxText {
	text-align: left;
}
.trends .trends_content .bottomBox {
	position: absolute;
	right: 5.4%;
	top: 51%;
	height: 39.65%;
	width: 75.4%;
}
.trends .trends_content .bottomBox li {
	float: left;
	width: 22.17%;
	height: 100%;
}
.trends .trends_content .bottomBox li+li {
	margin-left: 3.77%;
}

</style>
