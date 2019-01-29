<template>
	<div class="loginPage">
		<div class="loginTop">
			<img src="./assets/images/logo_login.png" alt="logoimg">
			<span>杭州厚通网络科技有限公司</span>
		</div>
		<div class="loginContent">
			<div class="loginModel">
				<div>
					<div class="modelTop">后台管理系统</div>
					<div class="userName">
						<el-input v-model="userName" placeholder="用户名" clearable @blur="validation('0')" @focus="isUser=false"></el-input>
						<p class="warnmsg" v-if="isUser">请输入用户名</p>
					</div>
					<div class="password">
						<el-input v-model="password" placeholder="密码" type="password" clearable @blur="validation('1')" @focus="isPassword=false"></el-input>
						<p class="warnmsg" v-if="isPassword">请输入密码</p>
					</div>
					<div class="verificationCode">
						<el-input v-model="validateCode" placeholder="验证码" clearable @blur="validation('2')" @focus="isCode=false"></el-input>
						<img :src="verificationImg" alt="验证码" title="点击换一张" @click="reloadImg">
						<p class="warnmsg" v-if="isCode">请输入验证码</p>
					</div>
					<el-button class="btn_login" @click="login">登 录</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'login',
	data () {
		return {
			userName: '',
			password: '',
			validateCode: '',
			verificationImg: '',
			isUser: false,
			isPassword: false,
			isCode: false
		};
	},
	mounted () {
		this.reloadImg();
	},
	methods: {
		// 获取验证码图片
		reloadImg () {
			let _this = this;
			this.base.axios_get('getImageFlow', '/platformBase/api/common/platform/getVerificationCodeImg', function (res) {
				_this.verificationImg = res;
			});
		},
		// 验证
		validation (value) {
			switch (value) {
			case '0':
				if (!this.userName) {
					this.isUser = true;
					return false;
				} else {
					this.isUser = false;
					return true;
				}
			case '1':
				if (!this.password) {
					this.isPassword = true;
					return false;
				} else {
					this.isPassword = false;
					return true;
				}
			case '2':
				if (!this.validateCode) {
					this.isCode = true;
					return false;
				} else {
					this.isCode = false;
					return true;
				}
			}
		},
		// 登录
		login () {
			// debugger;
			if (!(this.validation('0') && this.validation('1') && this.validation('2'))) {
				return;
			}
			var data = {
				userName: this.userName,
				password: this.password,
				validateCode: this.validateCode
			};
			var _this = this;
			this.base.axios_post(data, '/platformUser/api/common/platformAdminLogin', function (res) {
				if (res.code === 0) {
					// console.log(res.data);
					_this.$emit('login_state', res.data);
				} else {
					_this.$message(res.message);
				}
				// else if (res.code === 1) {
				// 	_this.$message('系统异常');
				// } else if (res.code === 2) {
				// 	_this.$message('参数为空');
				// } else if (res.code === 3) {
				// 	_this.$message('新增失败');
				// } else if (res.code === 4) {
				// 	_this.$message('修改失败');
				// } else if (res.code === 5) {
				// 	_this.$message('删除失败');
				// } else if (res.code === 6) {
				// 	_this.$message('参数错误');
				// } else if (res.code === 7) {
				// 	_this.$message('数据已存在');
				// } else if (res.code === 8) {
				// 	_this.$message('新增失败');
				// } else if (res.code === 11) {
				// 	_this.$message('账号已冻结');
				// } else if (res.code === -10000000) {
				// 	_this.$message('异常');
				// }
			});
		}
	}
};
</script>

<style scoped>
.loginPage {
	min-width: 1024px;
	height: 100%;
	background-image: url(./assets/images/bg_login.png);
	background-size: 100% 100%;
	background-repeat: no-repeat;
}
.loginTop {
	display: flex;
	align-items: center;
	width: 100%;
	height: 11%;
	border-bottom: 1px solid #05baa2;
	padding-left: 6.5%;
}
.loginTop img {
	width: 2%;
	min-width: 30px;
	margin-right: 1%;
}
.loginTop span {
	font-size: 21px;
	color: #05baa2;
}
.loginContent {
	position: relative;
	height: 89%;
}
.loginContent .loginModel {
	position: absolute;
	top: 22%;
	left: 50%;
	transform: translateX(-50%);
	width: 31.5%;
	background-color: #fff;
	box-shadow: 0 0 10px 2px #BEBEBE;
	padding: 2.8% 4%;
	box-sizing: border-box;
}
.loginModel .modelTop,
.loginModel .userName,
.loginModel .password {
	margin-bottom: 15px;
}
.loginModel .verificationCode {
	margin-bottom: 20px;
}
.loginModel .warnmsg {
	color: #FF0000;
	font-size: 14px;
}
.loginModel .modelTop {
	width: 50%;
	margin: 0 auto 15px;
	border-top: 2px solid #05baa2;
	color: #05baa2;
	font-size: 16px;
	padding-top: 15px;
	text-align: center;
}
.loginModel .userName .el-input,
.loginModel .password .el-input {
	border-left: 2px solid #05baa2;
	border-radius: 4px;
}
.loginModel .verificationCode .el-input {
	width: 55%;
	vertical-align: middle;
}
.loginModel .verificationCode img {
	float: right;
	width: 40%;
	height: 40px;
	cursor: pointer;
	vertical-align: middle;
}
.loginModel .btn_login {
	width: 100%;
	background-color: #05baa2;
	color: #fff;
}
</style>
