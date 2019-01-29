<template>
	<el-container class="syh-container" style="background-color: #F1F1F1;">
		<el-header>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>主页</el-breadcrumb-item>
				<el-breadcrumb-item>商品中心</el-breadcrumb-item>
				<el-breadcrumb-item to="/emailAssess">易茂在线评估</el-breadcrumb-item>
				<el-breadcrumb-item>查看评估状态</el-breadcrumb-item>
			</el-breadcrumb>
		</el-header>
		<el-main>
			<div class="assess">
				<h3 class="title">企业基本信息表</h3>
				<div class="info1">
					<h6>基本信息</h6>
					<div class="infoBox">
						<div class="line">
							<p class="name">公司名称</p>
							<p class="content"><span class="text text1" title="">{{detailDatas.companyName}}</span></p>
						</div>
						<div class="line">
							<p class="name">注册时间</p>
							<div class="content">
								<span class="text text2" title="">{{detailDatas.registrationTime}}</span>
								<p class="name2">注册资本</p>
								<span class="text text2" title="">{{detailDatas.registrationCapital}}</span>
							</div>
						</div>
						<div class="line">
							<p class="name">所属区域</p>
							<div class="content">
								<span class="text text2" title="">{{detailDatas.belongRegion}}</span>
								<p class="name2">办公所在区</p>
								<span class="text text2" title="">{{detailDatas.officeArea}}</span>
							</div>
						</div>
					</div>
				</div>
				<div class="info2">
					<h6>基本资料</h6>
					<div class="infoBox">
						<div class="line">
							<p class="name">知识产权(数量)</p>
						</div>
						<div class="line">
							<p class="name">发明专利</p>
							<div class="content">
								<span class="text text2" title="">{{detailDatas.inventionPatent}}</span>
								<p class="name2">实用新型专利</p>
								<span class="text text2" title="">{{detailDatas.newPatent}}</span>
							</div>
						</div>
						<div class="line">
							<p class="name">外观专利</p>
							<div class="content">
								<span class="text text2" title="">{{detailDatas.surfacePatent}}</span>
								<p class="name2">计算机软件著作权</p>
								<span class="text text2" title="">{{detailDatas.softwareCopyright}}</span>
							</div>
						</div>
						<div class="line">
							<p class="name">财务情况</p>
						</div>
						<div class="line">
							<p class="name">上年度销售额</p>
							<div class="content">
								<span class="text text2" title="">{{detailDatas.salesVolumeLastYear}}</span>
								<p class="name2">上年度研发费用</p>
								<span class="text text2" title="">{{detailDatas.researchDevelopLastYear}}</span>
							</div>
						</div>
						<div class="line">
							<p class="name">研发设备资产原值</p>
							<div class="content">
								<span class="text text2" title="">{{detailDatas.originalValueAssets}}</span>
							</div>
						</div>
						<div class="line2">
							<p class="name">人员信息</p>
							<div class="content2">
								<span class="textarea" title="">{{detailDatas.personnelInformation}}</span>
								<span class="tip">提示：公司名下包括总人、总研发数、人员学历情况、留学经历等</span>
							</div>
						</div>
					</div>
				</div>
				<div class="info3">
					<h6>更多信息</h6>
					<div class="infoBox">
						<div class="line2">
							<p class="name">公司荣誉<br><span class="tip">(包括已申报的项目)</span></p>
							<div class="content2">
								<span class="textarea" title="">{{detailDatas.honors}}</span>
							</div>
						</div>
						<div class="line2">
							<p class="name">主要产品或<br>主要服务内容</p>
							<div class="content2">
								<span class="textarea" title="">{{detailDatas.product}}</span>
							</div>
						</div>
						<div class="line2">
							<p class="name">其他</p>
							<div class="content2">
								<span class="textarea" title="">{{detailDatas.other}}</span>
								<span class="tip">提示：如产学研结合，商标、企业标准、检测报告等其他情况说明</span>
							</div>
						</div>
					</div>
				</div>
				<div class="info4">
					<h6>评估结果</h6>
					<div class="infoBox">
						<p class="assessTitle">评估意见书</p>
						<!-- <p class="num">编号：</p> -->
						<p class="tip1">尊敬的某公司：</p>
						<p class="tip2">根据您提交的企业基本情况和对贵公司的初步了解，项目初步规划如下：</p>
						<table class="table">
							<tr>
								<th>序号</th>
								<th>项目名称</th>
								<th>预期费用</th>
							</tr>
							<tr v-for="(item, key) in assessDatas" :key="key">
								<th>{{key+1}}</th>
								<th>{{item.appraisalContent}}</th>
								<th>{{item.referencePrice}}</th>
							</tr>
							<tr>
								<td colspan="3" style="padding-left: 5px;">备注：{{note}}</td>
							</tr>
						</table>
						<p class="tip3">以上项目申报方案仅根据对企业的初步了解提出，详细方案可咨询易茂科技项目部，联系电话：56929103</p>
					</div>
				</div>
				<!-- <div class="info4">
					<h6>评估结果</h6>
					<div class="infoBox">
						<div class="line3">
							<p class="assessTip">经评估，依据现阶段公司情况，贵公司初期项目申报规划如下（勾选项）</p>
						</div>
						<div class="line3">
							<p class="name">知识产权类</p>
							<div class="content3">
								<span class="option"><i class="checkBox isalive"></i><i class="label isalive">专利</i></span>
								<span class="option"><i class="checkBox isalive"></i><i class="label isalive">软著</i></span>
								<span class="option"><i class="checkBox"></i><i class="label">版权</i></span>
								<span class="option"><i class="checkBox"></i><i class="label">商标</i></span>
							</div>
						</div>
						<div class="line3">
							<p class="name">初创期企业</p>
							<div class="content3">
								<span class="option"><i class="checkBox isalive"></i><i class="label isalive">双软企业</i></span>
								<span class="option"><i class="checkBox isalive"></i><i class="label isalive">雏鹰计划</i></span>
								<span class="option"><i class="checkBox"></i><i class="label">杭州市高新技术企业</i></span>
								<span class="option"><i class="checkBox"></i><i class="label">5050计划（高新区）</i></span>
								<br><br>
								<span class="option"><i class="checkBox isalive"></i><i class="label isalive">大学生创业资助资金项目</i></span>
								<span class="option"><i class="checkBox"></i><i class="label">市级（区级）知识产权补助</i></span>
								<span class="option"><i class="checkBox"></i><i class="label">浙江省科技型中小企业</i></span>
							</div>
						</div>
						<div class="line3">
							<p class="name">成长期企业</p>
							<div class="content3">
								<span class="option"><i class="checkBox isalive"></i><i class="label isalive">国家高新技术企业</i></span>
								<span class="option"><i class="checkBox"></i><i class="label">杭州市企业高新技术研发中心</i></span>
								<span class="option"><i class="checkBox"></i><i class="label">杭州市企业技术中心</i></span>
								<br><br>
								<span class="option"><i class="checkBox isalive"></i><i class="label isalive">瞪羚计划（高新区）</i></span>
								<span class="option"><i class="checkBox"></i><i class="label">浙江省优秀工业新产品（新技术）</i></span>
								<span class="option"><i class="checkBox"></i><i class="label">市级（区级）众创空间</i></span>
								<br><br>
								<span class="option"><i class="checkBox"></i><i class="label">杭州市创新型试点企业</i></span>
								<span class="option"><i class="checkBox"></i><i class="label">杭州市领军型创新创业团队</i></span>
								<br><br>
								<span class="option"><i class="checkBox"></i><i class="label">杭州市国内首台（套）重大技术装备级关键部件产品</i></span>
							</div>
						</div>
						<div class="line3">
							<p class="name">发展期企业</p>
							<div class="content3">
								<span class="option"><i class="checkBox isalive"></i><i class="label isalive">浙江省重点研发计划项目</i></span>
								<span class="option"><i class="checkBox"></i><i class="label">杭州市重大科技创新项目</i></span>
								<span class="option"><i class="checkBox"></i><i class="label">浙江省高新技术企业研究开发中心</i></span>
								<br><br>
								<span class="option"><i class="checkBox isalive"></i><i class="label isalive">浙江省企业技术中心</i></span>
								<span class="option"><i class="checkBox"></i><i class="label">杭州市工厂互联网</i></span>
								<span class="option"><i class="checkBox"></i><i class="label">国家服务业发展领导资金项目</i></span>
								<span class="option"><i class="checkBox"></i><i class="label">国家级孵化器</i></span>
								<br><br>
								<span class="option"><i class="checkBox"></i><i class="label">浙江省重点企业研究院</i></span>
								<span class="option"><i class="checkBox"></i><i class="label">浙江省省级企业研究院</i></span>
							</div>
						</div>
						<div class="line3">
							<p class="name">其他</p>
							<div class="content3">
								无
							</div>
						</div>
					</div>
				</div> -->
			</div>
		</el-main>
	</el-container>
</template>

<script>
export default {
	name: 'viewAssessState',
	props: ['id'],
	created () {
		this.infoDetail();
	},
	data () {
		return {
			detailDatas: {},
			assessDatas: [],
			note: ''
		};
	},
	methods: {
		infoDetail () {
			let data = {
				projectAppraisalId: this.id
			};
			let _this = this;
			this.base.axios_post(data, '/platformEasymall/api/easymore/queryProjectAppraisalInfo', function (res) {
				console.log(res);
				if (res.code === 0) {
					_this.detailDatas = res.data.data;
					let list = res.data.resultList;
					let otherList = [];
					for (let item of list) {
						if (item.projectProductId === '') {
							_this.note = item.appraisalContent;
						} else {
							otherList.push(item);
						}
					}
					_this.assessDatas = otherList;
				} else {
					_this.$message({
						message: res.message,
						type: 'warning'
					});
				}
			});
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.assess {
	width: 70%;
	box-sizing: border-box;
	margin: 20px auto 0;
	background-color: #fff;
	box-shadow: 0 0 10px 2px #BEBEBE;
	font-size: 13px;
}
.assess .title {
	padding: 15px 0;
	text-align: center;
	font-size: 16px;
	font-weight: bold;
	margin: 0;
}
.assess h6 {
	font-size: 15px;
	color: #F84A4F;
	border-bottom: 1px solid #E1E1E1;
	padding-bottom: 5px;
	margin: 0 10% 0 5%;
}
.assess .infoBox {
	padding: 15px 0;
}
.line {
	display: flex;
	align-items: center;
	margin-bottom: 10px;
}
.line2 {
	display: flex;
	align-items: flex-start;
	margin-bottom: 10px;
}
.line3 {
	display: flex;
	align-items: flex-start;
	margin-bottom: 15px;
}
.line:last-child,
.line2:last-child,
.line3:last-child {
	margin-bottom: 0;
}
.assess .infoBox .name {
	width: 20%;
	text-align: right;
	padding-right: 13px;
}
.assess .infoBox .content {
	display: flex;
	align-items: center;
	flex: 1;
	padding-right: 15%;
	box-sizing: border-box;
}
.content2 {
	display: flex;
	flex-direction: column;
	flex: 1;
	padding-right: 15%;
	box-sizing: border-box;
}
.content3 {
	flex: 1;
	padding-right: 5%;
}
.text {
	display: inline-block;
	border-radius: 3px;
	border: 1px solid #E1E1E1;
	padding: 5px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.text1 {
	width: 100%;
}
.text2 {
	width: 30%;
}
.name2 {
	flex: 1;
	text-align: right;
	padding-right: 13px;
}
.textarea {
	display: inline-block;
	border-radius: 3px;
	border: 1px solid #E1E1E1;
	padding: 5px;
	overflow-y: auto;
	width: 100%;
	height: 60px;
	box-sizing: border-box;
}
.tip {
	font-size: 12px;
	color: #22BBE1;
	padding-top: 5px;
}
.assessTip {
	color: #22BBE1;
	width: 100%;
	box-sizing: border-box;
	padding-left: 10%;
}
.option {
	margin-right: 13px;
}
.checkBox {
	display: inline-block;
	width: 13px;
	height: 13px;
	border: 1px solid #E1E1E1;
	border-radius: 3px;
	vertical-align: middle;
}
.label {
	padding-left: 5px;
	vertical-align: middle;
}
.checkBox.isalive {
	border: 1px solid #22BBE1;
	background: url(../../assets/images/checked.png) 0 0/contain no-repeat;
}
.label.isalive {
	color: #22BBE1;
}
.assessTitle {
	font-size: 15px;
	color: #22BBE1;
	text-align: center;
	margin-bottom: 5px;
}
.num {
	font-size: 12px;
	text-align: center;
	margin-bottom: 10px;
}
.tip1 {
	padding-left: 16%;
	margin-bottom: 5px;
}
.tip2 {
	padding-left: 20%;
	margin-bottom: 5px;
}
.tip3 {
	padding-left: 14%;
	margin-bottom: 5px;
}
.table {
	width: 60%;
	margin: 0 auto;
	border-collapse: collapse;
	margin-bottom: 5px;
}
.table td, .table th {
	border: 1px solid #333;
	padding: 10px 0;
}
</style>
