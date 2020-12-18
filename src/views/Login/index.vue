<template>
	<div class="app-login">
		<div class="logo">
			<img src="@/assets/logo.png" alt srcset />
			<div class="form">
				<form action>
					<div class="form-item">
						<span>
							<i class="iconfont iconpersonal"></i>
						</span>
						<input
							type="text"
							name
							id
							placeholder="请输入用户名"
							ref="username"
							v-model="loginFormData.userAccount"
						/>
					</div>
					<div class="form-item">
						<span>
							<i class="iconfont iconmima"></i>
						</span>
						<input
							type="password"
							placeholder="请输入密码"
							ref="password"
							v-model="loginFormData.password"
						/>
					</div>
					<div class="submit" @click="handleSubmit">登录</div>
					<div class="regist">
						<a href class="forget">忘记密码?</a>

						<a href @click="change('/regist')">注册</a>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "login",
	data() {
		return {
			loginFormData: {
				loginAccount: "",
				password: "",
				isAdmin: "0",
				// phone: "",
			},

			/* loginRules: {
        username: [{ required: true, trigger: "blur" }],
        password: [{ required: true, trigger: "blur" }]
      }, */
			loading: false,
			passwordType: "password",
			redirect: undefined,
		};
	},
	watch: {
		$route: {
			handler: function(route) {
				this.redirect = route.query && route.query.redirect;
			},
			immediate: true,
		},
	},
	methods: {
		change(url) {
			// 页面跳转方法
			this.$router.push(url);
		},

		handleSubmit() {
			this.loginFormData.loginAccount = this.loginFormData.userAccount;
			this.$store.dispatch("login", this.loginFormData).then((response) => {
				console.log(response);
				this.$layer.toast({
					icon: "", // 图标clssName 如果为空 toast位置位于下方,否则居中
					content: "登录成功",
					time: 2000, // 自动消失时间 toast类型默认消失时间为2000毫秒
				});
				// 跳转
				this.$router.push("./home");
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.app-login {
	/*  */
	width: 100%;
	// border: 1px solid red;
	height: 100%;
	padding: 2rem;
	box-sizing: border-box;
	.logo {
		width: 100%;
		position: relative;
		//  由于图片的宽度是动态计算的，所以要先预定高度，把空间预留出来
		height: 0;
		padding-top: 100%;
		img {
			position: absolute;
			left: 0;
			top: 100px;
			// 图片自适应
			height: auto;
			width: auto;
			max-width: 100%;
			// min-width: ;
		}
	}
	.form {
		.form-item {
			display: flex;
			justify-content: space-between;
			border-bottom: solid 1px rgba($color: #000000, $alpha: 0.3);
			margin: 0 20px 2rem 20px;
			padding: 0 20px 0.5rem 20px;
			i {
				color: #d9bf9d;
				font-weight: bold;
			}
			input {
				flex: 1;
				margin-left: 1rem;
				border: none;
			}
			input::-webkit-input-placeholder {
				/* WebKit browsers */

				font-family: "黑体";
				font-size: 1.2rem;
				color: rgba(169, 169, 169, 0.3);
			}
		}
		.submit {
			margin: 60px 10px 20px;
			background: linear-gradient(to right, #e6bf8e, #cea570);
			font-size: 20px;
			color: #ffff;
			font-weight: bolder;
			border-radius: 10px;
			padding: 10px;
		}
		.regist {
			text-align: right;
			margin: 20px;
			font-size: 1rem;
			.forget {
				float: left;
			}
			a {
				color: darkgray;
				text-decoration: none;
			}
		}
	}
}
</style>
