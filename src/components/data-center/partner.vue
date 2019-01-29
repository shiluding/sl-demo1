<template>
	<el-container class="syh-container">
		<el-header>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>主页</el-breadcrumb-item>
				<el-breadcrumb-item>数据中心</el-breadcrumb-item>
				<el-breadcrumb-item>合作伙伴</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="syh-editdata">
				<el-input v-model="searchInput" placeholder="请输入伙伴名称" clearable size="small"></el-input>
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
						fixed
						align="center"
						label="序号">
					</el-table-column>
					<el-table-column
                        width="220"
						align="center"
						label="图标">
						<template slot-scope="scope">
							<img :src="scope.row.partnerIcon" alt="图片" width="199px" height="100px">
						</template>
					</el-table-column>
					<el-table-column
						prop="partnerName"
						min-width="100"
						align="center"
						label="伙伴名称">
					</el-table-column>
					<el-table-column
						prop="partnerAddress"
						min-width="120"
						align="center"
						label="地址链接">
					</el-table-column>
                    <el-table-column
						align="center"
						header-align="left"
						class-name="usestate"
						width="150"
						label="启用状态">
						<template slot-scope="scope">
							<span :style="{color: scope.row.stateColor}">{{scope.row.enablestateText}}</span>
							<el-button @click="change_enablestate(scope.row.partnerId, scope.row.partnerDr)" :style="{'background-color': scope.row.btn_stateColor}">{{scope.row.btn_enablestateText}}</el-button>
						</template>
					</el-table-column>
					<el-table-column>
						<template slot-scope="scope">
							<el-button @click="edit(scope.row)" style="background-color:#0199F9;">编辑</el-button>
							<el-button @click="showDetails(scope.row)" style="background-color:#0199F9;">查看</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="syh-dialog">
				<el-dialog title="详情" :visible.sync="detailsVisible" width="50%" top="30vh" custom-class="rowDetails" :close-on-click-modal="false" :close-on-press-escape="false">
					<div class="box">
						<div class="left">
							<p><span class="lab">伙伴名称：</span><span class="val">{{detailData.partnerName}}</span></p>
							<p><span class="lab">启用状态：</span><span class="val">{{detailData.enablestateText}}</span></p>
							<p><span class="lab">图标：</span><img :src="detailData.partnerIcon" alt="图片" width="199px" height="100px"></p>
						</div>
						<div class="right">
							<p><span class="lab">所属组织编码：</span><span class="val">{{detailData.pkOrg}}</span></p>
							<p><span class="lab">所属组织名称：</span><span class="val">{{detailData.pkOrgName}}</span></p>
							<el-tooltip effect="light" :content="detailData.partnerAddress" placement="top-start">
								<p><span class="lab">地址链接：</span><span class="val">{{detailData.partnerAddress}}</span></p>
							</el-tooltip>
						</div>
					</div>
					<!-- <table>
						<tr>
							<td>图标：</td>
							<td><img :src="detailData.partnerIcon" alt="图片" width="199px" height="100px"></td>
							<td>所属组织编码：</td>
							<td>{{detailData.pkOrg}}</td>
						</tr>
						<tr>
							<td>伙伴名称：</td>
							<td>{{detailData.partnerName}}</td>
							<td>所属组织名称：</td>
							<td>{{detailData.pkOrgName}}</td>
						</tr>
						<tr>
							<td>启用状态：</td>
							<td>{{detailData.enablestateText}}</td>
                            <td>地址链接：</td>
							<td>{{detailData.partnerAddress}}</td>
						</tr>
					</table> -->
				</el-dialog>
			</div>
			<div class="syh-dialog">
				<el-dialog v-if="addVisible" :visible="true" width="45%" top="20vh" custom-class="rowEdit" :before-close="beforeCloseAdd" :close-on-click-modal="false" :close-on-press-escape="false">
					<span slot="title" class="el-dialog__title">{{dialogTitle}}</span>
					<el-form :model="addDatasForm" ref="addDatasForm" hide-required-asterisk label-width="100px" inline :rules="addRules" size="small">
						<table>
							<tr>
								<td>
									<el-form-item label="伙伴名称" prop="partnerName">
										<el-input clearable placeholder="请输入伙伴名称" v-model="addDatasForm.partnerName"></el-input>
									</el-form-item>
								</td>
								<td>
									<el-form-item label="地址链接" prop="partnerAddress">
										<el-input clearable placeholder="请输入地址链接" v-model="addDatasForm.partnerAddress"></el-input>
									</el-form-item>
								</td>
							</tr>
							<tr>
								<td>
									<el-form-item label="所属组织" prop="pkOrg">
										<el-select v-model="addDatasForm.pkOrg" placeholder="请选择所属组织" filterable @change="handlePkOrgChange">
											<el-option
												v-for="item in pkOrgName_options"
												:key="item.code"
												:label="item.name"
												:value="item.code"
												:disabled="item.disabled">
											</el-option>
										</el-select>
									</el-form-item>
								</td>
								<td>
									<el-form-item label="图标" prop="partnerIcon">
										<div class="uploadBox">
											<el-upload
												action=""
												:multiple="false"
												:show-file-list="false"
												accept=".png,.jpg,.jpeg,.gif"
												:http-request="Upload">
												<img v-if="imageUrl" :src="imageUrl" class="uploadImg">
												<span v-if="!imageUrl" class="uploadBtn">点击上传</span>
												<div v-if="!imageUrl" slot="tip" class="uploadTip">只能上传jpg/jpeg/png/gif文件</div>
											</el-upload>
										</div>
									</el-form-item>
								</td>
							</tr>
						</table>
					</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button @click="resetForm('addDatasForm')" type="primary" plain  icon="el-icon-refresh" size="medium">重置</el-button>
						<el-button @click="saveForm('addDatasForm')" type="primary" icon="el-icon-check" size="medium">保存</el-button>
					</div>
				</el-dialog>
			</div>
			<div class="syh-dialog">
				<el-dialog v-if="editVisible" :visible="true" width="45%" top="20vh" custom-class="rowEdit" :before-close="beforeCloseEdit" :close-on-click-modal="false" :close-on-press-escape="false">
					<span slot="title" class="el-dialog__title">{{dialogTitle}}</span>
					<el-form :model="editDatasForm" ref="editDatasForm" hide-required-asterisk label-width="100px" inline :rules="editRules" size="small">
						<table>
							<tr>
								<td>
									<el-form-item label="伙伴名称" prop="partnerName">
										<el-input clearable placeholder="请输入伙伴名称" v-model="editDatasForm.partnerName"></el-input>
									</el-form-item>
								</td>
								<td>
									<el-form-item label="地址链接" prop="partnerAddress">
										<el-input clearable placeholder="请输入地址链接" v-model="editDatasForm.partnerAddress"></el-input>
									</el-form-item>
								</td>
							</tr>
							<tr>
                                <td>
									<el-form-item label="启用状态" prop="partnerDr">
										<el-switch
											v-model="editDatasForm.partnerDr"
											:active-value="1"
											:inactive-value="0"
										>
										</el-switch>
									</el-form-item>
								</td>
								<td>
									<el-form-item label="图标" prop="partnerIcon">
										<div class="uploadBox">
											<el-upload
												action=""
												:multiple="false"
												:show-file-list="false"
												accept=".png,.jpg,.jpeg,.gif"
												:http-request="Upload">
												<img v-if="imageUrl" :src="imageUrl" class="uploadImg">
												<span v-if="!imageUrl" class="uploadBtn">点击上传</span>
												<div v-if="!imageUrl" slot="tip" class="uploadTip">只能上传jpg/jpeg/png/gif文件</div>
											</el-upload>
										</div>
									</el-form-item>
								</td>
							</tr>
						</table>
					</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button @click="resetForm('editDatasForm')" type="primary" plain  icon="el-icon-refresh" size="medium">重置</el-button>
						<el-button @click="saveForm('editDatasForm')" type="primary" icon="el-icon-check" size="medium">保存</el-button>
					</div>
				</el-dialog>
			</div>
		</el-main>
		<el-footer>
			<sl-pagination @page-change="pageChange" :pagecount="pagecount" :pagesize="pagesize" :currentPage="currentPage"></sl-pagination>
		</el-footer>
	</el-container>
</template>

<script>
import { client, prefixFileName, trim } from '@/common/js/common.js';
import SlPagination from '@/components/common/sl-pagination.vue';
export default {
	name: 'partner',
	components: {
		SlPagination
	},
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
			detailsVisible: false, // 详情弹框是否显示
			detailData: {},
			addVisible: false, // 新增弹框是否显示
			editVisible: false, // 编辑弹框是否显示
			addDatasForm: {},
			editDatasForm: {},
			dialogTitle: '新增', // 新增或编辑弹框的title设置
			submitState: 1, // 保存类型：新增：1 编辑：0
			imageUrl: '',
			pkOrgName_options: [],
			addRules: {
				pkOrg: [
					{ required: true, message: '请选择所属组织', trigger: 'blur' }
				],
				partnerName: [
					{ required: true, whitespace: true, message: '请输入伙伴名称', trigger: 'blur' },
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
				partnerAddress: [
					{ required: true, whitespace: true, message: '请输入地址链接', trigger: 'blur' },
					{// eslint-disable-next-line
						pattern: /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-.,@?^=%&:\/~+#]*[\w\-@?^=%&\/~+#])?$/,
						message: '地址链接格式不正确',
						transform (value) {
							if (typeof value === 'string') {
								return trim(value);
							}
							return value;
						},
						trigger: 'blur'
					}
				]
			},
			editRules: {
				partnerName: [
					{ required: true, whitespace: true, message: '请输入伙伴名称', trigger: 'blur' },
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
				partnerAddress: [
					{ required: true, whitespace: true, message: '请输入地址链接', trigger: 'blur' },
					{// eslint-disable-next-line
						pattern: /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-.,@?^=%&:\/~+#]*[\w\-@?^=%&\/~+#])?$/,
						message: '地址链接格式不正确',
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
	mounted () {
		this.getDataList(1);
	},
	computed: {
		tableData () {
			let tableData = [];
			for (let item of this.DataList) {
				let { ...itemData } = item;
				// partnerDr： 1 启用，0 停用
				switch (itemData.partnerDr) {
				case 1:
					itemData.enablestateText = '启用';
					itemData.stateColor = '#05baa4';
					itemData.btn_enablestateText = '停用';
					itemData.btn_stateColor = '#fe3c51';
					break;
				case 0:
					itemData.enablestateText = '停用';
					itemData.stateColor = '#fe3c51';
					itemData.btn_enablestateText = '启用';
					itemData.btn_stateColor = '#05baa4';
					break;
				};
				tableData.push(itemData);
			}
			return tableData;
		}
	},
	methods: {
		pageChange (currentPage) {
			this.currentPage = currentPage;
			this.getDataList(currentPage);
		},
		// 启用状态改变处理事件
		change_enablestate (id, state) {
			// state： 1 启用，0 停用
			let _this = this;
			let data = {
				partnerId: id
			};
			if (state === 1) {
				data.partnerDr = 0; // 启用状态转停用
			} else {
				data.partnerDr = 1; // 停用状态转启用
			}
			this.base.axios_post(data, '/platformEasymall/api/easymore/updatePartnerState', function (res) {
				// console.log(res);
				if (res.code === 0) {
					_this.$message('更新状态成功！');
					_this.getDataList(_this.currentPage);
				} else {
					_this.$message(res.message);
				}
			});
		},
		// 显示‘详情’弹框
		showDetails (row) {
			// console.log(row);
			this.detailData = row;
			this.detailsVisible = true;
		},
		// 点击‘搜索’按钮
		search () {
			this.searchValue = trim(this.searchInput);
			this.getDataList(1);
			this.currentPage = 1;
		},
		// 上传图标
		Upload (file) {
			let _this = this;
			if (file.file) {
				let indexS = file.file.name.lastIndexOf('.');
				let name = prefixFileName + file.file.uid + file.file.name.substring(indexS); // 正式打包使用'proFile/'
				client().put(name, file.file).then((result) => {
					console.log(result.url);
					_this.imageUrl = result.url;
				}).catch((err) => {
					console.log(err);
				});
			}
		},
		// 点击‘新增’按钮，显示‘新增’弹框
		add () {
			this.addDatasForm = {};
			this.imageUrl = '';
			this.getpkOrgName_options();
			this.dialogTitle = '新增';
			this.submitState = 1;
			this.addVisible = true;
		},
		// 点击‘编辑’按钮，显示‘编辑’弹框
		edit (row) {
			let { ...datas } = row;
			this.editDatasForm = datas;
			this.imageUrl = '';
			if (/^https?:\/\/.*$/.test(datas.partnerIcon)) {
				this.imageUrl = datas.partnerIcon;
			}
			this.dialogTitle = '编辑';
			this.submitState = 0;
			this.editVisible = true;
		},
		beforeCloseAdd (done) {
			this.$refs['addDatasForm'].clearValidate();
			this.imageUrl = '';
			this.addVisible = false;
		},
		beforeCloseEdit (done) {
			this.$refs['editDatasForm'].clearValidate();
			this.imageUrl = '';
			this.editVisible = false;
		},
		getpkOrgName_options () {
			let _this = this;
			this.base.axios_post(null, '/platformBase/api/base/platform/queryGroupInfoListByUser', function (res) {
				console.log(res);
				if (res.code === 0) {
					_this.pkOrgName_options = res.data;
					for (let item of _this.pkOrgName_options) {
						// 只有易茂可选
						if (item.code !== '0000002') {
							item.disabled = true;
						}
					}
				}
			});
		},
		handlePkOrgChange (code) {
			let obj = {};
			obj = this.pkOrgName_options.find((item) => {
				return item.code === code;
			});
			this.addDatasForm.pkOrgName = obj.name;
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
			return datas;
		},
		// 保存表单
		saveForm (formName) {
			if (!this.imageUrl) {
				this.$message('请上传图片');
				return;
			}
			let _this = this;
			this.$refs[formName].validate((valid) => {
				if (valid) {
					if (_this.submitState === 1) {
						// 新增
						console.log('新增');
						let formDatasAdd = _this.transformDatas(_this.addDatasForm);
						let data = {
							partnerAddress: formDatasAdd.partnerAddress,
							partnerIcon: _this.imageUrl,
							partnerName: formDatasAdd.partnerName,
							pkOrg: formDatasAdd.pkOrg,
							pkOrgName: formDatasAdd.pkOrgName
						};
						_this.base.axios_post(data, '/platformEasymall/api/easymore/savePartner', function (res) {
							console.log(res);
							if (res.code === 0) {
								_this.$message('新增成功');
								_this.$refs[formName].clearValidate();
								_this.addVisible = false;
								_this.currentPage = 1;
								_this.getDataList(1);
							} else {
								_this.$message(res.message);
							}
						});
					} else {
						// 编辑
						console.log('编辑');
						let formDatasEdit = _this.transformDatas(_this.editDatasForm);
						let data = {
							partnerAddress: formDatasEdit.partnerAddress,
							partnerIcon: _this.imageUrl,
							partnerName: formDatasEdit.partnerName,
							partnerId: formDatasEdit.partnerId,
							partnerDr: formDatasEdit.partnerDr
						};
						_this.base.axios_post(data, '/platformEasymall/api/easymore/updatePartner', function (res) {
							console.log(res);
							if (res.code === 0) {
								_this.$message('修改成功');
								_this.$refs[formName].clearValidate();
								_this.editVisible = false;
								_this.getDataList(_this.currentPage);
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
		},
		// 重置表单
		resetForm (formName) {
			this.$refs[formName].resetFields();
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
				partnerName: this.searchValue,
				pageNo: pagno,
				pageSize: this.pagesize
			};
			this.base.axios_post(data, '/platformEasymall/api/easymore/queryPartnerPage', function (res) {
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
.syh-dialog .rowDetails .box {
	display: flex;
	justify-content: space-around;
	overflow: hidden;
}
.syh-dialog .rowDetails .box .left,
.syh-dialog .rowDetails .box .right {
	flex: 1;
}
.syh-dialog .rowDetails .box p {
	margin-bottom: 15px;
}
.syh-dialog .rowDetails .box img {
	vertical-align: top;
}
.syh-dialog .rowEdit .uploadBox {
	display: inline-block;
	width: 199px;
	height: 100px;
	border: 1px solid #dcdfe6;
	border-radius: 4px;
	box-sizing: border-box;
}
.syh-dialog .rowEdit .uploadImg {
	display: block;
	width: 199px;
	height: 100px;
}
.syh-dialog .rowEdit .uploadBtn {
	text-decoration: underline;
	color: #409EFF;
	margin-left: 10px;
}
.syh-dialog .rowEdit .uploadTip {
	font-size: 12px;
	line-height: 14px;
	padding: 0 10px;
}
</style>
