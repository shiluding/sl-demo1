<template>
	<el-container class="syh-container" style="background-color: #F1F1F1;">
		<el-header>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>主页</el-breadcrumb-item>
				<el-breadcrumb-item>数据中心</el-breadcrumb-item>
				<el-breadcrumb-item to="/information">资讯</el-breadcrumb-item>
				<el-breadcrumb-item>{{dialogtitle}}</el-breadcrumb-item>
			</el-breadcrumb>
			<router-link to="/information"><div class="back">返回上一页</div></router-link>
		</el-header>
		<el-main>
			<div class="wrap">
				<div class="editDialog">
					<div class="title"><span>{{dialogtitle}}</span></div>
					<el-form ref="formDatas" :model="formDatas" label-width="80px" class="formBox">
						<div class="content1">
							<el-form-item label="资讯名称" class="name" prop="adviceName">
								<el-input v-model="formDatas.adviceName" placeholder="请输入资讯名称" size="medium"></el-input>
							</el-form-item>
							<el-form-item label="资讯图片">
								<div class="uploadBox">
									<el-upload
										action=""
										:multiple="false"
										:show-file-list="false"
										accept=".png,.jpg,.jpeg,.gif"
										:http-request="Upload">
										<img v-if="imageUrl" :src="imageUrl" class="uploadImg">
										<span v-if="!imageUrl" class="uploadBtn">点击上传</span>
									</el-upload>
								</div>
							</el-form-item>
						</div>
						<div class="content2">
							<el-form-item prop="adviceContent">
								<quill-editor v-model="formDatas.adviceContent"
									ref="myQuillEditor"
									class="editer"
									:options="editorOption"
									@ready="onEditorReady($event)"
									@blur="onEditorBlur($event)"
									@focus="onEditorFocus($event)">
								</quill-editor>
							</el-form-item>
						</div>
					</el-form>
					<div class="btnBox">
						<el-button @click="resetForm" type="primary" plain  icon="el-icon-refresh" size="medium">重置</el-button>
						<el-button @click="saveForm" type="primary" icon="el-icon-check" size="medium">保存</el-button>
					</div>
				</div>
			</div>
		</el-main>
	</el-container>
</template>

<script>
import { client, prefixFileName, trim } from '@/common/js/common.js';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import { quillEditor } from 'vue-quill-editor'; // 调用富文本编辑器
export default {
	name: 'editInformation',
	components: {
		quillEditor
	},
	props: ['id'],
	data () {
		return {
			formDatas: {},
			sourceDatas: {},
			imageUrl: '',
			submitState: 1, // 保存类型：新增：1 编辑：0
			dialogtitle: '',
			editorOption: {
				modules: {
					toolbar: ['bold', 'italic', 'underline']
				},
				theme: 'snow',
				placeholder: '请输入资讯内容。。。'
			}
		};
	},
	created () {
		console.log(this.id);
		if (this.id === undefined) {
			this.submitState = 1;
			this.dialogtitle = '新增';
		} else {
			this.submitState = 0;
			this.dialogtitle = '编辑';
			this.setDatas(this.id);
		}
	},
	computed: {
		editor () {
			return this.$refs.myQuillEditor.quillEditor;
		}
	},
	methods: {
		setDatas (id) {
			let _this = this;
			let data = {
				policyAdviceId: id
			};
			this.base.axios_post(data, '/platformEasymall/api/easymore/queryPolicyAdviceInfo', function (res) {
				console.log(res);
				if (res.code === 0) {
					_this.sourceDatas = {...res.data};
					_this.formDatas = res.data;
					if (/^https?:\/\/.*$/.test(res.data.adviceUrl)) {
						_this.imageUrl = res.data.adviceUrl;
					}
				}
			});
		},
		onEditorBlur (quill) {
			console.log('editor blur!', quill);
		},
		onEditorFocus (quill) {
			console.log('editor focus!', quill);
		},
		onEditorReady (quill) {
			console.log('editor ready!', quill);
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
		// 数据传入服务器之前，进行转换
		transformDatas (obj) {
			let {...datas} = obj;
			// 去除字符串数据的首尾空白
			datas.adviceName = trim(datas.adviceName);
			return datas;
			// for (let key of Object.keys(datas)) {
			// 	if (typeof datas[key] === 'string') {
			// 		datas[key] = trim(datas[key]);
			// 	}
			// }
		},
		// 保存表单
		saveForm () {
			let _this = this;
			if (!this.formDatas.adviceName || trim(this.formDatas.adviceName) === '') {
				this.$message('请输入资讯名称');
				return;
			}
			if (!/^.{1,100}$/.test(this.formDatas.adviceName)) {
				this.$message('资讯名称字数不超过100');
				return;
			}
			if (this.imageUrl === '') {
				this.$message('请上传资讯图片');
				return;
			}
			let re = new RegExp('<.+?>', 'g');
			if (!this.formDatas.adviceContent || trim(this.formDatas.adviceContent.replace(re, '')) === '') {
				this.$message('请输入资讯内容');
				return;
			}
			if (!/^.{1,5000}$/.test(this.formDatas.adviceContent)) {
				this.$message('资讯内容不超过5000字符');
				return;
			}
			let formDatas = _this.transformDatas(_this.formDatas);
			let data = {
				adviceContent: formDatas.adviceContent,
				adviceUrl: _this.imageUrl,
				adviceName: formDatas.adviceName
			};
			if (_this.submitState === 1) {
				// 新增
				console.log('新增');
				this.base.axios_post(data, '/platformEasymall/api/easymore/savePolicyAdvice', function (res) {
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
				data.policyAdviceId = _this.id;
				this.base.axios_post(data, '/platformEasymall/api/easymore/updatePolicyAdvice', function (res) {
					console.log(res);
					if (res.code === 0) {
						_this.$message('修改成功');
						_this.$router.go(-1);
					} else {
						_this.$message(res.message);
					}
				});
			}
		},
		// 重置表单
		resetForm () {
			console.log(this.sourceDatas);
			this.formDatas = {...this.sourceDatas};
			this.imageUrl = this.sourceDatas.adviceUrl;
		}
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
	background-color: #fff;
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
.editDialog .formBox {
	display: flex;
	flex-direction: column;
	height: 86%;
	padding: 0 30px;
}
.editDialog .formBox .content1 {
	padding: 20px 0;
}
.editDialog .formBox .content1 .el-form-item {
	margin-bottom: 0;
	float: left;
}
.editDialog .formBox .content1 .name {
	margin-right: 30px;
}
.editDialog .formBox .content1 .el-input {
	width: 300px;
}
.editDialog .formBox .content1 .uploadBox {
	display: inline-block;
	width: 100px;
	height: 36px;
	line-height: 36px;
	border: 1px solid #dcdfe6;
	border-radius: 4px;
	box-sizing: border-box;
}
.editDialog .formBox .content1 .uploadImg {
	display: block;
	width: 100px;
	height: 100px;
}
.editDialog .formBox .content1 .uploadBtn {
	text-decoration: underline;
	color: #409EFF;
	margin-left: 17px;
}
.editDialog .formBox .content2 {
	flex: 1;
	overflow-y: auto;
}
.editDialog .formBox .content2 .el-form-item {
	margin-bottom: 0;
	height: 100%;
}
.editDialog .formBox .content2 .el-form-item >>> .el-form-item__content {
	margin: 0 !important;
	height: 100%;
	line-height: 0;
}
.editDialog .formBox .content2 .editer {
	display: flex;
	flex-direction: column;
	height: 100%;
}
.editDialog .formBox .content2 .editer >>> .ql-toolbar {
	background-color: #EFEFEF;
}
.editDialog .formBox .content2 .editer >>> .ql-container {
	flex: 1;
}
.editDialog .btnBox {
	display: flex;
	align-items: flex-end;
	justify-content: flex-end;
	height: 8%;
	padding-right: 30px;
}
.editDialog .btnBox .el-button+.el-button {
	margin-left: 30px;
}
</style>
