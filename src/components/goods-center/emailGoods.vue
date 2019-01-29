<template>
	<el-container class="syh-container">
		<el-header>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>主页</el-breadcrumb-item>
				<el-breadcrumb-item>商品中心</el-breadcrumb-item>
				<el-breadcrumb-item>易茂科技服务商品</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="syh-editdata">
				<el-input v-model="searchInput" placeholder="请输入商品名称" clearable size="small"></el-input>
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
						prop="projectProductName"
						align="center"
						min-width="120"
						label="商品名称">
					</el-table-column>
					<el-table-column
						min-width="80"
						header-align="center"
						align="right"
						label="价格">
						<template slot-scope="scope">
							<span v-if="scope.row.referencePrice === '0'">面议</span>
							<span v-else>{{scope.row.referencePrice}}</span>
						</template>
					</el-table-column>
					<el-table-column
                        min-width="100"
						align="center"
						label="商品图片">
						<template slot-scope="scope">
							<img :src="scope.row.productIcon" alt="图片" width="80px" height="80px">
						</template>
					</el-table-column>
					<el-table-column
						width="250"
						align="left"
						label="商品简介">
						<template slot-scope="scope">
							<el-tooltip placement="right-end" effect="light">
								<div slot="content" class="tooltip">{{scope.row.productContent}}</div>
								<div>{{scope.row.productContent_limited}}</div>
							</el-tooltip>
						</template>
					</el-table-column>
					<el-table-column
                        min-width="100"
						align="center"
						label="服务介绍">
						<template slot-scope="scope">
							<img :src="scope.row.productUrl" alt="图片" width="80px" height="80px">
						</template>
					</el-table-column>
					<el-table-column
						prop="categoryParentName"
						min-width="100"
						align="center"
						label="一级分类">
					</el-table-column>
					<el-table-column
						prop="categoryName"
						min-width="100"
						align="center"
						label="二级分类">
					</el-table-column>
					<el-table-column
						min-width="210"
						align="left">
						<template slot-scope="scope">
							<el-button @click="changeState(scope.row.projectProductId, scope.row.productState)" :style="{'background-color':scope.row.btn_stateColor}">{{scope.row.btn_stateText}}</el-button>
							<el-button @click="edit(scope.row)" style="background-color:#0199F9;">编辑</el-button>
							<el-button @click="showDetails(scope.row)" style="background-color:#0199F9;">查看</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="syh-dialog">
				<el-dialog title="详情" :visible.sync="detailsVisible" width="40%" top="27vh" custom-class="rowDetails" :close-on-click-modal="false" :close-on-press-escape="false">
					<div class="box">
						<div class="left">
							<p><span class="lab">商品名称：</span><span class="val">{{detailData.projectProductName}}</span></p>
							<p><span class="lab">一级分类：</span><span class="val">{{detailData.categoryParentName}}</span></p>
							<p><span class="lab">商品图片：</span><img :src="detailData.productIcon" alt="图片" width="80px" height="80px"></p>
							<p><span class="lab">商品简介：</span><span class="val">{{detailData.productContent}}</span></p>
						</div>
						<div class="right">
							<p><span class="lab">商品价格：</span><span class="val">{{detailData.referencePrice}}</span></p>
							<p><span class="lab">二级分类：</span><span class="val">{{detailData.categoryName}}</span></p>
							<p><span class="lab">服务介绍：</span><img :src="detailData.productUrl" alt="图片" width="80px" height="80px"></p>
						</div>
					</div>
					<!-- <table>
						<tr>
							<td>商品名称：</td>
							<td>{{detailData.projectProductName}}</td>
							<td>商品价格：</td>
							<td>{{detailData.referencePrice}}</td>
						</tr>
						<tr>
							<td>一级分类：</td>
							<td>{{detailData.categoryParentName}}</td>
							<td>二级分类：</td>
							<td>{{detailData.categoryName}}</td>
						</tr>
						<tr>
							<td>商品图片：</td>
							<td><img :src="detailData.productIcon" alt="图片" width="80px" height="80px"></td>
							<td>服务介绍：</td>
							<td><img :src="detailData.productUrl" alt="图片" width="80px" height="80px"></td>
						</tr>
						<tr>
							<td>商品简介：</td>
							<td colspan="3">{{detailData.productContent}}</td>
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
									<el-form-item label="商品名称" prop="projectProductName">
										<el-input clearable placeholder="请输入商品名称" v-model="addDatasForm.projectProductName"></el-input>
									</el-form-item>
								</td>
								<td>
									<el-form-item label="商品价格(元)" prop="referencePrice">
										<el-input clearable placeholder="请输入价格" v-model="addDatasForm.referencePrice"></el-input>
									</el-form-item>
								</td>
							</tr>
							<tr>
								<td>
									<el-form-item label="一级分类" prop="categoryParentId">
										<el-select v-model="addDatasForm.categoryParentId" placeholder="请选择一级分类" filterable @change="handleCategoryParentChange">
											<el-option
												v-for="item in categoryParent_options"
												:key="item.categoryId"
												:label="item.categoryName"
												:value="item.categoryId">
											</el-option>
										</el-select>
									</el-form-item>
								</td>
								<td>
									<el-form-item label="二级分类" prop="categoryId">
										<el-select v-model="addDatasForm.categoryId" placeholder="请选择二级分类" filterable @change="handleCategoryChange_add">
											<el-option
												v-for="item in category_options"
												:key="item.categoryId"
												:label="item.categoryName"
												:value="item.categoryId">
											</el-option>
										</el-select>
									</el-form-item>
								</td>
							</tr>
							<tr>
                                <td>
									<el-form-item label="商品图片" prop="productIcon">
										<div class="uploadBox">
											<el-upload
												action=""
												:multiple="false"
												:show-file-list="false"
												accept=".png,.jpg,.jpeg,.gif"
												:http-request="Upload_goods">
												<img v-if="imageUrl_goods" :src="imageUrl_goods" class="uploadImg">
												<span v-if="!imageUrl_goods" class="uploadBtn">点击上传</span>
												<div v-if="!imageUrl_goods" slot="tip" class="uploadTip">只能上传jpg/jpeg/png/gif文件</div>
											</el-upload>
										</div>
									</el-form-item>
								</td>
								<td>
									<el-form-item label="服务介绍" prop="productUrl">
										<div class="uploadBox">
											<el-upload
												action=""
												:multiple="false"
												:show-file-list="false"
												accept=".png,.jpg,.jpeg,.gif"
												:http-request="Upload_service">
												<img v-if="imageUrl_service" :src="imageUrl_service" class="uploadImg">
												<span v-if="!imageUrl_service" class="uploadBtn">点击上传</span>
												<div v-if="!imageUrl_service" slot="tip" class="uploadTip">只能上传jpg/jpeg/png/gif文件</div>
											</el-upload>
										</div>
									</el-form-item>
								</td>
							</tr>
							<tr>
								<td>
									<el-form-item label="商品简介" prop="productContent">
										<el-input
											type="textarea"
											autosize
											placeholder="请输入商品简介"
											v-model="addDatasForm.productContent" maxlength="100">
										</el-input>
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
									<el-form-item label="商品名称" prop="projectProductName">
										<el-input clearable placeholder="请输入商品名称" v-model="editDatasForm.projectProductName"></el-input>
									</el-form-item>
								</td>
								<td>
									<el-form-item label="商品价格" prop="referencePrice">
										<el-input clearable placeholder="请输入价格" v-model="editDatasForm.referencePrice"></el-input>
									</el-form-item>
								</td>
							</tr>
							<tr>
								<td>
									<el-form-item label="一级分类" prop="categoryParentId">
										<el-select v-model="editDatasForm.categoryParentId" placeholder="请选择一级分类" filterable @change="handleCategoryParentChange">
											<el-option
												v-for="item in categoryParent_options"
												:key="item.categoryId"
												:label="item.categoryName"
												:value="item.categoryId">
											</el-option>
										</el-select>
									</el-form-item>
								</td>
								<td>
									<el-form-item label="二级分类" prop="categoryId">
										<el-select v-model="editDatasForm.categoryId" placeholder="请选择二级分类" filterable @change="handleCategoryChange_edit">
											<el-option
												v-for="item in category_options"
												:key="item.categoryId"
												:label="item.categoryName"
												:value="item.categoryId">
											</el-option>
										</el-select>
									</el-form-item>
								</td>
							</tr>
							<tr>
                                <td>
									<el-form-item label="商品图片" prop="productIcon">
										<div class="uploadBox">
											<el-upload
												action=""
												:multiple="false"
												:show-file-list="false"
												accept=".png,.jpg,.jpeg,.gif"
												:http-request="Upload_goods">
												<img v-if="imageUrl_goods" :src="imageUrl_goods" class="uploadImg">
												<span v-if="!imageUrl_goods" class="uploadBtn">点击上传</span>
												<div v-if="!imageUrl_goods" slot="tip" class="uploadTip">只能上传jpg/jpeg/png/gif文件</div>
											</el-upload>
										</div>
									</el-form-item>
								</td>
								<td>
									<el-form-item label="服务介绍" prop="productUrl">
										<div class="uploadBox">
											<el-upload
												action=""
												:multiple="false"
												:show-file-list="false"
												accept=".png,.jpg,.jpeg,.gif"
												:http-request="Upload_service">
												<img v-if="imageUrl_service" :src="imageUrl_service" class="uploadImg">
												<span v-if="!imageUrl_service" class="uploadBtn">点击上传</span>
												<div v-if="!imageUrl_service" slot="tip" class="uploadTip">只能上传jpg/jpeg/png/gif文件</div>
											</el-upload>
										</div>
									</el-form-item>
								</td>
							</tr>
							<tr>
								<td>
									<el-form-item label="商品简介" prop="productContent">
										<el-input
											type="textarea"
											autosize
											placeholder="请输入商品简介"
											v-model="editDatasForm.productContent" maxlength="100">
										</el-input>
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
import { client, prefixFileName, trim, limitStr } from '@/common/js/common.js';
import SlPagination from '@/components/common/sl-pagination.vue';
export default {
	name: 'emailGoods',
	components: {
		SlPagination
	},
	data () {
		return {
			// 表格数据
			DataList: [],
			// sortType: 1, // 排序字段
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
			imageUrl_goods: '',
			imageUrl_service: '',
			categoryDatas: [], // 分类数据
			categoryParent_options: [], // 一级分类
			category_options: [], // 二级分类
			addRules: {
				projectProductName: [
					{ required: true, whitespace: true, message: '请输入商品名称', trigger: 'blur' },
					{
						pattern: /^[\u4e00-\u9fa50-9a-zA-Z()（）]{1,100}$/,
						message: '名称字数不超过100',
						transform (value) {
							if (typeof value === 'string') {
								return trim(value);
							}
							return value;
						},
						trigger: 'blur'
					}
				],
				referencePrice: [
					{ required: true, whitespace: true, message: '请输入价格', trigger: 'blur' },
					{
						pattern: /^([0]|[1-9]\d{0,8})$/,
						message: '价格输入不正确,请输入一个正整数',
						transform (value) {
							if (typeof value === 'string') {
								return trim(value);
							}
							return value;
						},
						trigger: 'blur'
					}
				],
				categoryParentId: [
					{ required: true, message: '请选择一级分类', trigger: 'blur' }
				],
				categoryId: [
					{ required: true, message: '请选择二级分类', trigger: 'blur' }
				],
				productContent: [
					{ required: true, whitespace: true, message: '请输入商品简介', trigger: 'blur' }
				]
			},
			editRules: {
				projectProductName: [
					{ required: true, whitespace: true, message: '请输入商品名称', trigger: 'blur' },
					{
						pattern: /^[\u4e00-\u9fa50-9a-zA-Z()（）]{1,100}$/,
						message: '名称字数不超过100',
						transform (value) {
							if (typeof value === 'string') {
								return trim(value);
							}
							return value;
						},
						trigger: 'blur'
					}
				],
				referencePrice: [
					{ required: true, whitespace: true, message: '请输入价格', trigger: 'blur' },
					{
						pattern: /^([0]|[1-9]\d{0,8})$/,
						message: '价格输入不正确,请输入一个正整数',
						transform (value) {
							if (typeof value === 'string') {
								return trim(value);
							}
							return value;
						},
						trigger: 'blur'
					}
				],
				categoryParentId: [
					{ required: true, message: '请选择一级分类', trigger: 'blur' }
				],
				categoryId: [
					{ required: true, message: '请选择二级分类', trigger: 'blur' }
				],
				productContent: [
					{ required: true, whitespace: true, message: '请输入商品简介', trigger: 'blur' }
				]
			}
		};
	},
	created () {
		// 获取分类
		this.getCategory();
	},
	mounted () {
		this.getDataList(1);
	},
	computed: {
		tableData () {
			let tableData = [];
			for (let item of this.DataList) {
				let { ...itemData } = item;
				// 商品状态: 0是草稿，1是提交，2是发布上架 3是下架
				if (itemData.productState === 2) {
					itemData.btn_stateText = '下架';
					itemData.btn_stateColor = '#fe3c51';
				} else {
					itemData.btn_stateText = '上架';
					itemData.btn_stateColor = '#05baa4';
				}
				itemData.referencePrice = String(itemData.referencePrice);
				itemData.productContent_limited = limitStr(itemData.productContent, 68);
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
		// 改变商品状态
		changeState (id, state) {
			// 商品状态: 0是草稿，1是提交，2是发布上架 3是下架
			let _this = this;
			let data = {
				projectProductId: id
			};
			if (state === 2) {
				data.productState = 3; // 上架转下架
			} else {
				data.productState = 2; // 其他转上架
			}
			this.base.axios_post(data, '/platformEasymall/api/easymore/updateProjectProductState', function (res) {
				console.log(res);
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
		// 获取分类数据
		getCategory () {
			let _this = this;
			this.base.axios_post(null, '/platformEasymall/api/easymore/emPCCategoryInfo', function (res) {
				console.log(res);
				if (res.code === 0) {
					_this.categoryDatas = res.data;
					let datalist = [];
					for (let item of res.data) {
						let itemData = {};
						itemData.categoryId = item.categoryId;
						itemData.categoryName = item.categoryName;
						datalist.push(itemData);
					}
					_this.categoryParent_options = datalist;
				}
			});
		},
		getCategoryTwo (parentId) {
			for (let item of this.categoryDatas) {
				if (item.categoryId === parentId) {
					if (!item.nodeList || item.nodeList.length <= 0) {
						this.$message('请先设置二级分类');
					} else {
						this.category_options = item.nodeList;
					}
					break;
				}
			}
		},
		handleCategoryParentChange (id) {
			delete this.editDatasForm.categoryId;
			delete this.addDatasForm.categoryId;
			// this.editDatasForm.categoryId = '';
			// this.addDatasForm.categoryId = '';
			this.getCategoryTwo(id);
		},
		handleCategoryChange_add (id) {
			let obj = {};
			obj = this.category_options.find((item) => {
				return item.categoryId === id;
			});
			this.addDatasForm.categoryName = obj.categoryName;
		},
		handleCategoryChange_edit (id) {
			let obj = {};
			obj = this.category_options.find((item) => {
				return item.categoryId === id;
			});
			this.editDatasForm.categoryName = obj.categoryName;
		},
		// 上传商品图片
		Upload_goods (file) {
			let _this = this;
			if (file.file) {
				let indexS = file.file.name.lastIndexOf('.');
				let name = prefixFileName + file.file.uid + file.file.name.substring(indexS); // 正式打包使用'proFile/'
				client().put(name, file.file).then((result) => {
					console.log(result.url);
					_this.imageUrl_goods = result.url;
				}).catch((err) => {
					console.log(err);
				});
			}
		},
		// 上传服务介绍
		Upload_service (file) {
			let _this = this;
			if (file.file) {
				let indexS = file.file.name.lastIndexOf('.');
				let name = prefixFileName + file.file.uid + file.file.name.substring(indexS); // 正式打包使用'proFile/'
				client().put(name, file.file).then((result) => {
					console.log(result.url);
					_this.imageUrl_service = result.url;
				}).catch((err) => {
					console.log(err);
				});
			}
		},
		// 点击‘新增’按钮，显示‘新增’弹框
		add () {
			this.addDatasForm = {};
			this.dialogTitle = '新增';
			this.imageUrl_goods = '';
			this.imageUrl_service = '';
			this.submitState = 1;
			this.addVisible = true;
		},
		// 点击‘编辑’按钮，显示‘编辑’弹框
		edit (row) {
			let { ...datas } = row;
			this.getCategoryTwo(datas.categoryParentId);
			this.editDatasForm = datas;
			this.imageUrl_goods = '';
			this.imageUrl_service = '';
			if (/^https?:\/\/.*$/.test(datas.productIcon)) {
				this.imageUrl_goods = datas.productIcon;
			}
			if (/^https?:\/\/.*$/.test(datas.productUrl)) {
				this.imageUrl_service = datas.productUrl;
			}
			this.dialogTitle = '编辑';
			this.submitState = 0;
			this.editVisible = true;
		},
		beforeCloseAdd (done) {
			this.$refs['addDatasForm'].clearValidate();
			this.imageUrl_goods = '';
			this.imageUrl_service = '';
			this.category_options = [];
			this.addVisible = false;
		},
		beforeCloseEdit (done) {
			this.$refs['editDatasForm'].clearValidate();
			this.imageUrl_goods = '';
			this.imageUrl_service = '';
			this.category_options = [];
			this.editVisible = false;
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
			datas.referencePrice = Number(datas.referencePrice);
			return datas;
		},
		// 保存表单
		saveForm (formName) {
			if (!this.imageUrl_goods) {
				this.$message('请上传商品图片');
				return;
			}
			if (!this.imageUrl_service) {
				this.$message('请上传服务介绍图片');
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
							categoryId: formDatasAdd.categoryId,
							categoryName: formDatasAdd.categoryName,
							categoryParentId: formDatasAdd.categoryParentId,
							productContent: formDatasAdd.productContent,
							productIcon: _this.imageUrl_goods,
							productUrl: _this.imageUrl_service,
							projectProductName: formDatasAdd.projectProductName,
							referencePrice: formDatasAdd.referencePrice
						};
						_this.base.axios_post(data, '/platformEasymall/api/easymore/saveProjectProduct', function (res) {
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
							categoryId: formDatasEdit.categoryId,
							categoryName: formDatasEdit.categoryName,
							categoryParentId: formDatasEdit.categoryParentId,
							productContent: formDatasEdit.productContent,
							productIcon: _this.imageUrl_goods,
							productUrl: _this.imageUrl_service,
							projectProductName: formDatasEdit.projectProductName,
							referencePrice: formDatasEdit.referencePrice,
							projectProductId: formDatasEdit.projectProductId
						};
						_this.base.axios_post(data, '/platformEasymall/api/easymore/updateProjectProduct', function (res) {
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
				projectProductName: this.searchValue,
				pageNo: pagno,
				pageSize: this.pagesize
			};
			this.base.axios_post(data, '/platformEasymall/api/easymore/queryProjectProductPage', function (res) {
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
	width: 100px;
	height: 100px;
	border: 1px solid #dcdfe6;
	border-radius: 4px;
	box-sizing: border-box;
}
.syh-dialog .rowEdit .uploadImg {
	display: block;
	width: 100px;
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
/* .productContent {
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 4;
	-webkit-box-orient: vertical;
} */
.tooltip {
	width: 300px;
}
</style>
