<template>
	<el-container class="syh-container" style="background-color: #F1F1F1;">
		<el-header>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>主页</el-breadcrumb-item>
				<el-breadcrumb-item>商品中心</el-breadcrumb-item>
				<el-breadcrumb-item to="/emailAssess">易茂在线评估</el-breadcrumb-item>
				<el-breadcrumb-item>{{title}}</el-breadcrumb-item>
			</el-breadcrumb>
		</el-header>
		<el-main>
			<div class="assess">
				<h3 class="title">企业基本信息表</h3>
				<el-form :model="formDatas" ref="formDatas" hide-required-asterisk label-width="" inline :rules="rules" size="small">
					<div class="info1">
						<h6>基本信息</h6>
						<div class="infoBox">
							<div class="line">
								<p class="name">公司名称</p>
								<p class="content">
									<span class="text text1" title="">
										<el-form-item prop="companyName">
											<el-input clearable v-model="formDatas.companyName" placeholder="请输入公司名称" size="small"></el-input>
										</el-form-item>
									</span>
								</p>
							</div>
							<div class="line">
								<p class="name">注册时间</p>
								<div class="content">
									<span class="text" title="">
										<el-form-item prop="registrationTime">
											<el-date-picker
												clearable
												v-model="formDatas.registrationTime"
												type="date"
												format="yyyy年MM月dd日"
												value-format="yyyy年MM月dd日"
												placeholder="请选择注册时间">
											</el-date-picker>
										</el-form-item>
									</span>
									<p class="name2">注册资本(元)</p>
									<span class="text text2" title="">
										<el-form-item prop="registrationCapital">
											<el-input clearable v-model="formDatas.registrationCapital" placeholder="请输入注册资本" size="small"></el-input>
										</el-form-item>
									</span>
								</div>
							</div>
							<div class="line">
								<p class="name">所属区域</p>
								<div class="content">
									<span class="text text2" title="">
										<el-form-item prop="belongRegion">
											<el-input clearable v-model="formDatas.belongRegion" placeholder="请输入所属区域" size="small"></el-input>
										</el-form-item>
									</span>
									<p class="name2">办公所在区</p>
									<span class="text text2" title="">
										<el-form-item prop="officeArea">
											<el-input clearable v-model="formDatas.officeArea" placeholder="请输入办公所在区" size="small"></el-input>
										</el-form-item>
									</span>
								</div>
							</div>
							<div class="line" v-if="submitState === 1">
								<p class="name">创建者手机号</p>
								<div class="content">
									<span class="text text2" title="">
										<el-form-item prop="creatorPhone">
											<el-input clearable v-model="formDatas.creatorPhone" placeholder="请输入创建者手机号" size="small"></el-input>
										</el-form-item>
									</span>
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
									<span class="text text2" title="">
										<el-form-item prop="inventionPatent">
											<el-input clearable v-model="formDatas.inventionPatent" placeholder="请输入发明专利" size="small"></el-input>
										</el-form-item>
									</span>
									<p class="name2">实用新型专利</p>
									<span class="text text2" title="">
										<el-form-item prop="newPatent">
											<el-input clearable v-model="formDatas.newPatent" placeholder="请输入实用新型专利" size="small"></el-input>
										</el-form-item>
									</span>
								</div>
							</div>
							<div class="line">
								<p class="name">外观专利</p>
								<div class="content">
									<span class="text text2" title="">
										<el-form-item prop="surfacePatent">
											<el-input clearable v-model="formDatas.surfacePatent" placeholder="请输入外观专利" size="small"></el-input>
										</el-form-item>
									</span>
									<p class="name2">计算机软件著作权</p>
									<span class="text text2" title="">
										<el-form-item prop="softwareCopyright">
											<el-input clearable v-model="formDatas.softwareCopyright" placeholder="请输入计算机软件著作权" size="small"></el-input>
										</el-form-item>
									</span>
								</div>
							</div>
							<div class="line">
								<p class="name">财务情况</p>
							</div>
							<div class="line">
								<p class="name">上年度销售额(元)</p>
								<div class="content">
									<span class="text text2" title="">
										<el-form-item prop="salesVolumeLastYear">
											<el-input clearable v-model="formDatas.salesVolumeLastYear" placeholder="请输入上年度销售额" size="small"></el-input>
										</el-form-item>
									</span>
									<p class="name2">上年度研发费用(元)</p>
									<span class="text text2" title="">
										<el-form-item prop="researchDevelopLastYear">
											<el-input clearable v-model="formDatas.researchDevelopLastYear" placeholder="请输入上年度研发费用" size="small"></el-input>
										</el-form-item>
									</span>
								</div>
							</div>
							<div class="line">
								<p class="name">研发设备资产原值(元)</p>
								<div class="content">
									<span class="text text2" title="">
										<el-form-item prop="originalValueAssets">
											<el-input clearable v-model="formDatas.originalValueAssets" placeholder="请输入研发设备资产原值" size="small"></el-input>
										</el-form-item>
									</span>
								</div>
							</div>
							<div class="line2">
								<p class="name">人员信息</p>
								<div class="content2">
									<span class="textarea" title="">
										<el-form-item prop="personnelInformation">
											<el-input type="textarea" v-model="formDatas.personnelInformation" size="small" placeholder="请输入人员信息" :autosize="{ minRows: 2, maxRows: 4 }"></el-input>
										</el-form-item>
									</span>
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
									<span class="textarea" title="">
										<el-form-item prop="honors">
											<el-input type="textarea" v-model="formDatas.honors" size="small" placeholder="请输入公司荣誉" :autosize="{ minRows: 2, maxRows: 4 }"></el-input>
										</el-form-item>
									</span>
								</div>
							</div>
							<div class="line2">
								<p class="name">主要产品或<br>主要服务内容</p>
								<div class="content2">
									<span class="textarea" title="">
										<el-form-item prop="product">
											<el-input type="textarea" v-model="formDatas.product" size="small" placeholder="请输入产品或服务内容" :autosize="{ minRows: 2, maxRows: 4 }"></el-input>
										</el-form-item>
									</span>
								</div>
							</div>
							<div class="line2">
								<p class="name">其他</p>
								<div class="content2">
									<span class="textarea" title="">
										<el-form-item prop="other">
											<el-input type="textarea" v-model="formDatas.other" size="small" placeholder="请输入其他内容" :autosize="{ minRows: 2, maxRows: 4 }"></el-input>
										</el-form-item>
									</span>
									<span class="tip">提示：如产学研结合，商标、企业标准、检测报告等其他情况说明</span>
								</div>
							</div>
						</div>
					</div>
					<!-- <div class="info4">
						<h6>评估结果</h6>
						<div class="infoBox">
							<p class="assessTitle">评估意见书</p>
							<p class="num">编号：</p>
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
					</div> -->
					<div class="info4" v-if="isAssess">
						<h6>评估结果</h6>
						<div class="infoBox">
							<div class="line3">
								<p class="assessTip">经评估，依据现阶段公司情况，贵公司初期项目申报规划如下（勾选项）</p>
							</div>
							<el-checkbox-group v-model="checkList">
								<div class="line3" v-for="list in assessList" :key="list.categoryId">
									<p class="name">{{list.categoryName}}</p>
									<div class="content3">
										<span class="option" v-for="item in list.categoryProjectProductVoList" :key="item.projectProductId"><el-checkbox :label="item.projectProductId">{{item.projectProductName}}</el-checkbox></span>
									</div>
								</div>
							</el-checkbox-group>
						</div>
					</div>
					<div class="info5">
						<div class="infoBox">
							<el-button @click="save" type="primary" icon="el-icon-check" size="small">保存</el-button>
						</div>
					</div>
				</el-form>
			</div>
		</el-main>
	</el-container>
</template>

<script>
import { trim } from '@/common/js/common.js';
export default {
	name: 'viewAssessState',
	props: ['id'],
	data () {
		return {
			formDatas: {},
			assessList: [],
			checkList: [],
			isAssess: false,
			title: '',
			submitState: 1, // 1新增 0编辑
			rules: {
				companyName: [
					{ required: true, whitespace: true, message: '请输入公司名称', trigger: 'blur' },
					{
						pattern: /^[\u4e00-\u9fa50-9a-zA-Z]{1,100}$/,
						message: '名称为汉字、字母或数字组合且字数不超过100',
						transform (value) {
							if (typeof value === 'string') {
								return trim(value);
							}
							return value;
						},
						trigger: 'blur'
					}
				],
				registrationTime: [
					{ required: true, message: '请选择注册时间', trigger: 'blur' }
				],
				registrationCapital: [
					{ required: true, whitespace: true, message: '请输入注册资本', trigger: 'blur' }
				],
				belongRegion: [
					{ required: true, whitespace: true, message: '请输入所属区域', trigger: 'blur' },
					{
						pattern: /^[\u4e00-\u9fa50-9a-zA-Z]{1,100}$/,
						message: '填写为汉字、字母或数字组合且字数不超过100',
						transform (value) {
							if (typeof value === 'string') {
								return trim(value);
							}
							return value;
						},
						trigger: 'blur'
					}
				],
				officeArea: [
					{ required: true, whitespace: true, message: '请输入办公所在区', trigger: 'blur' },
					{
						pattern: /^[\u4e00-\u9fa50-9a-zA-Z]{1,100}$/,
						message: '填写为汉字、字母或数字组合且字数不超过100',
						transform (value) {
							if (typeof value === 'string') {
								return trim(value);
							}
							return value;
						},
						trigger: 'blur'
					}
				],
				creatorPhone: [
					{ required: true, whitespace: true, message: '请输入创建者手机号', trigger: 'blur' },
					{
						pattern: /^1[3456789]\d{9}$/,
						message: '手机号格式不正确',
						transform (value) {
							if (typeof value === 'string') {
								return trim(value);
							}
							return value;
						},
						trigger: 'blur'
					}
				],
				inventionPatent: [
					{ required: true, whitespace: true, message: '请输入发明专利数量', trigger: 'blur' },
					{
						pattern: /^([0]|[1-9]\d{0,5})$/,
						message: '请输入一个正整数且数量不超过100万个',
						transform (value) {
							if (typeof value === 'string') {
								return trim(value);
							}
							return value;
						},
						trigger: 'blur'
					}
				],
				newPatent: [
					{ required: true, whitespace: true, message: '请输入实用新型专利数量', trigger: 'blur' },
					{
						pattern: /^([0]|[1-9]\d{0,5})$/,
						message: '请输入一个正整数且数量不超过100万个',
						transform (value) {
							if (typeof value === 'string') {
								return trim(value);
							}
							return value;
						},
						trigger: 'blur'
					}
				],
				surfacePatent: [
					{ required: true, whitespace: true, message: '请输入外观专利数量', trigger: 'blur' },
					{
						pattern: /^([0]|[1-9]\d{0,5})$/,
						message: '请输入一个正整数且数量不超过100万个',
						transform (value) {
							if (typeof value === 'string') {
								return trim(value);
							}
							return value;
						},
						trigger: 'blur'
					}
				],
				softwareCopyright: [
					{ required: true, whitespace: true, message: '请输入计算机软件著作权数量', trigger: 'blur' },
					{
						pattern: /^([0]|[1-9]\d{0,5})$/,
						message: '请输入一个正整数且数量不超过100万个',
						transform (value) {
							if (typeof value === 'string') {
								return trim(value);
							}
							return value;
						},
						trigger: 'blur'
					}
				],
				salesVolumeLastYear: [
					{ required: true, whitespace: true, message: '请输入上年度销售额', trigger: 'blur' },
					{
						pattern: /^([0]|[1-9]\d{0,8})$/,
						message: '请输入一个正整数',
						transform (value) {
							if (typeof value === 'string') {
								return trim(value);
							}
							return value;
						},
						trigger: 'blur'
					}
				],
				researchDevelopLastYear: [
					{ required: true, whitespace: true, message: '请输入上年度研发费用', trigger: 'blur' },
					{
						pattern: /^([0]|[1-9]\d{0,8})$/,
						message: '请输入一个正整数',
						transform (value) {
							if (typeof value === 'string') {
								return trim(value);
							}
							return value;
						},
						trigger: 'blur'
					}
				],
				originalValueAssets: [
					{ required: true, whitespace: true, message: '请输入研发设备资产原值', trigger: 'blur' },
					{
						pattern: /^([0]|[1-9]\d{0,8})$/,
						message: '请输入一个正整数',
						transform (value) {
							if (typeof value === 'string') {
								return trim(value);
							}
							return value;
						},
						trigger: 'blur'
					}
				],
				personnelInformation: [
					{ required: true, whitespace: true, message: '请输入人员信息', trigger: 'blur' },
					{
						pattern: /^.{1,400}$/,
						message: '填写不超过400字',
						transform (value) {
							if (typeof value === 'string') {
								return trim(value);
							}
							return value;
						},
						trigger: 'blur'
					}
				],
				honors: [
					{ required: true, whitespace: true, message: '请输入公司荣誉', trigger: 'blur' },
					{
						pattern: /^.{1,400}$/,
						message: '填写不超过400字',
						transform (value) {
							if (typeof value === 'string') {
								return trim(value);
							}
							return value;
						},
						trigger: 'blur'
					}
				],
				product: [
					{ required: true, whitespace: true, message: '请输入产品或服务内容', trigger: 'blur' },
					{
						pattern: /^.{1,400}$/,
						message: '填写不超过400字',
						transform (value) {
							if (typeof value === 'string') {
								return trim(value);
							}
							return value;
						},
						trigger: 'blur'
					}
				],
				other: [
					{
						pattern: /^.{1,400}$/,
						message: '填写不超过400字',
						transform (value) {
							if (typeof value === 'string') {
								return trim(value);
							}
							return value;
						},
						trigger: 'blur'
					}
				]
			}
		};
	},
	created () {
		this.getAssessList();
		if (this.id) {
			this.title = '编辑评估';
			this.submitState = 0;
			this.infoDetail();
		} else {
			this.title = '新增评估';
			this.submitState = 1;
		}
	},
	watch: {
		// checkList () {
		// 	console.log(this.checkList);
		// }
	},
	methods: {
		getAssessList () {
			let _this = this;
			this.base.axios_post(null, '/platformEasymall/api/easymore/emPCCategoryProjectProductInfo', function (res) {
				console.log(res);
				if (res.code === 0) {
					let dataList = res.data;
					let assessList = [];
					for (let item of dataList) {
						for (let list of item.nodeList) {
							if (list.categoryProjectProductVoList.length > 0) {
								assessList.push(list);
							}
						}
					}
					_this.assessList = assessList;
				} else {
					_this.$message({
						message: res.message,
						type: 'warning'
					});
				}
			});
		},
		infoDetail () {
			let data = {
				projectAppraisalId: this.id
			};
			let _this = this;
			this.base.axios_post(data, '/platformEasymall/api/easymore/queryProjectAppraisalInfo', function (res) {
				console.log(res);
				if (res.code === 0) {
					_this.formDatas = res.data.data;
					_this.formDatas.inventionPatent = String(_this.formDatas.inventionPatent);
					_this.formDatas.newPatent = String(_this.formDatas.newPatent);
					_this.formDatas.originalValueAssets = String(_this.formDatas.originalValueAssets);
					_this.formDatas.researchDevelopLastYear = String(_this.formDatas.researchDevelopLastYear);
					_this.formDatas.salesVolumeLastYear = String(_this.formDatas.salesVolumeLastYear);
					_this.formDatas.softwareCopyright = String(_this.formDatas.softwareCopyright);
					_this.formDatas.surfacePatent = String(_this.formDatas.surfacePatent);
					if (res.data.data.appraisalStatus === 2) { // 2已评估
						let list = [];
						for (let item of res.data.resultList) {
							if (item.projectProductId) {
								list.push(item.projectProductId);
							}
						}
						_this.checkList = list;
						_this.isAssess = true;
					}
				} else {
					_this.$message({
						message: res.message,
						type: 'warning'
					});
				}
			});
		},
		// 数据传入服务器之前，进行转换
		transformDatas (obj) {
			let { ...datas } = obj;
			// 去除字符串数据的首尾空白
			for (let key of Object.keys(datas)) {
				if (typeof datas[key] === 'string') {
					datas[key] = trim(datas[key]);
				}
			}
			if (datas.other === undefined) {
				datas.other = '';
			}
			datas.inventionPatent = Number(datas.inventionPatent);
			datas.newPatent = Number(datas.newPatent);
			datas.originalValueAssets = Number(datas.originalValueAssets);
			datas.researchDevelopLastYear = Number(datas.researchDevelopLastYear);
			datas.salesVolumeLastYear = Number(datas.salesVolumeLastYear);
			datas.softwareCopyright = Number(datas.softwareCopyright);
			datas.surfacePatent = Number(datas.surfacePatent);
			return datas;
		},
		save () {
			let _this = this;
			this.$refs['formDatas'].validate((valid) => {
				if (valid) {
					let formDatas = _this.transformDatas(_this.formDatas);
					let data = {
						belongRegion: formDatas.belongRegion,
						companyName: formDatas.companyName,
						honors: formDatas.honors,
						inventionPatent: formDatas.inventionPatent,
						newPatent: formDatas.newPatent,
						officeArea: formDatas.officeArea,
						originalValueAssets: formDatas.originalValueAssets,
						other: formDatas.other,
						personnelInformation: formDatas.personnelInformation,
						product: formDatas.product,
						registrationCapital: formDatas.registrationCapital,
						registrationTime: formDatas.registrationTime,
						researchDevelopLastYear: formDatas.researchDevelopLastYear,
						salesVolumeLastYear: formDatas.salesVolumeLastYear,
						softwareCopyright: formDatas.softwareCopyright,
						surfacePatent: formDatas.surfacePatent
					};
					if (_this.submitState === 1) {
						// 新增
						console.log('新增');
						data.creatorPhone = formDatas.creatorPhone;
						_this.base.axios_post(data, '/platformEasymall/api/easymore/token/emAdminAddProjectAppraisal', function (res) {
							console.log(res);
							if (res.code === 0) {
								_this.$message('新增成功');
								_this.$router.go(-1);
							} else {
								_this.$message(res.message);
							}
						});
					} else {
						// 编辑
						console.log('编辑');
						data.projectAppraisalId = formDatas.projectAppraisalId;
						data.appraisalUrl = '';
						data.otherB = '';
						data.assessorPhone = formDatas.assessorPhone;
						data.projectProductIds = _this.checkList;
						// 评估状态appraisalStatus：0是全部，1待评估，2是已评估
						if (formDatas.appraisalStatus === 2) {
							console.log(_this.checkList);
							if (_this.checkList.length <= 0) {
								_this.$message('请至少勾选一个评估项');
								return;
							}
						}
						_this.base.axios_post(data, '/platformEasymall/api/easymore/token/emAdminUpdateProjectAppraisal', function (res) {
							console.log(res);
							if (res.code === 0) {
								_this.$message('修改成功');
								_this.$router.go(-1);
							} else {
								_this.$message(res.message);
							}
						});
					}
				} else {
					console.log('表单校验不通过！');
					return false;
				}
			});
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.assess .el-form-item {
	margin-right: 0;
	margin-bottom: 30px;
}
.assess .content2 .el-form-item,
.assess .content2 .el-form-item >>> .el-form-item__content {
	width: 100%;
}
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
}
.line2 {
	display: flex;
	align-items: flex-start;
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
	padding-bottom: 30px;
	font-size: 13px;
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
	/* border-radius: 3px;
	border: 1px solid #E1E1E1;
	padding: 5px; */
	overflow: hidden;
	/* text-overflow: ellipsis;
	white-space: nowrap; */
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
	padding-bottom: 30px;
}
.textarea {
	display: inline-block;
	/* border-radius: 3px;
	border: 1px solid #E1E1E1;
	padding: 5px; */
	/* overflow-y: auto; */
	width: 100%;
	/* height: 60px; */
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
.info5 .infoBox {
	text-align: right;
	padding-right: 5%;
}
/* .checkBox {
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
} */
/* .assessTitle {
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
} */
</style>
