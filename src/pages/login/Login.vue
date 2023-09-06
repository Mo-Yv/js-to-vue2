<template>
	<form class="sign-in-content login-form">
		<h1>登录</h1>
		<div class="inputBox">
			<input
			 type="tel" 
			 required 
			 v-model="phoneObj.iptVal" 
			 @blur="verifyPhone"
			/>
			<span class="text">手机号</span>
			<span class="status" :class="phoneStatusClass"></span>
			<span class="error" v-show="phoneObj.hasErr">该用户不存在或手机号错误</span>
		</div>
		<div class="inputBox">
			<input
			 required
			 :type="switchPwdType"
			 v-model="pwdObj.iptVal" 
			 @blur="verifyPwd"
			/>
			<span class="text">密码</span>
			<span class="status" :class="pwdStatusClass"></span>
			<span class="error" v-show="pwdObj.hasErr">密码错误</span>
			<img
			 class="show-pwd" 
			 alt="show password" 
			 :src="imgUrl" 
			 @click="switchIsPwd" 
			/>
		</div>
		<div class="links">
			<a href="javascript:;" @click="sendStatus">前往注册</a>
			<a href="javascript:;">忘记密码</a>
		</div>
		<input
		 class="sign-in-submit" 
		 type="submit" 
		 value="确认登录" 
		 @click="submitLogin"
		/>
		<label title="用户须知" @click="agreeInfo">
			<span :class="{check: boolVal.isAgree}"></span>
			我已阅读并同意
			<a href="javascript:;">《用户协议》</a>
			和
			<a href="javascript:;">《隐私政策》</a>
		</label>
	</form>
</template>

<script>
// 引入混合
import { verifyIptVal, returnClassName } from "@/mixins/signIn";
// 引入mapState,用于映射vuex中的数据
import { mapState } from 'vuex';

export default {
	name: "Login",
	mixins: [ verifyIptVal, returnClassName ],
	data() {
		return {
			keyObj: {
				phone: { iptVal: "", hasErr: false, hasStatus: false },
				pwd: { iptVal: "", hasErr: false, hasStatus: false },
			},
			boolVal: {
				// 切换密码框的type
				isPwd: true,
				// 用户协议选择框
				isAgree: false
			},
		};
	},
	methods: {
		// 向父组件传值
		sendStatus() {
			// 通过全局事件总线绑定changeSignIn,向SignIn组件传递数据
			this.$bus.$emit("changeSignIn", false);
		},
		// 切换显示密码
		switchIsPwd() {
			this.boolVal.isPwd = !this.boolVal.isPwd;
		},
		// 同意用户协议
		agreeInfo() {
			this.boolVal.isAgree = !this.boolVal.isAgree;
		},
		// 验证手机号
		verifyPhone() {
			const phone = this.phoneObj;
			this.verifyIptVal(phone, () => {
				phone.hasErr = !(phone.iptVal.trim() === this.userPhone);
			});
		},
		// 验证密码
		verifyPwd() {
			const pwd = this.pwdObj;
			this.verifyIptVal(pwd, () => {
				pwd.hasErr = !(pwd.iptVal.trim() === this.userPwd);
			});
		},
		// 提交登录
		submitLogin() {
			this.$message.closeAll();
			const phoneObj = this.phoneObj,
				pwdObj = this.pwdObj,
				arr = [
					!!phoneObj.iptVal && !phoneObj.hasErr,
					!!pwdObj.iptVal && !pwdObj.hasErr,
					this.boolVal.isAgree
				];
			if(!arr.includes(false)) {
				this.$message({
					message: `登录成功,欢迎用户 ${this.userPhone}`,
					type: "success"
				});
			} else {
				this.$message({
					message: "请检查信息是否完善,且阅读同意用户协议",
					type: "error"
				});
			}
		},
	},
	computed: {
		...mapState("signIn", ["userPhone", "userPwd"]),
		phoneObj() {
			return this.keyObj.phone;
		},
		pwdObj() {
			return this.keyObj.pwd;
		},
		switchPwdType() {
			return this.boolVal.isPwd ? "password" : "text";
		},
		imgUrl() {
			// 引入图片
			return require("@/assets/imgs/" + (this.boolVal.isPwd ? "close" : "open") + ".jpg");
		},
		phoneStatusClass() {
			return this.returnClassName(this.phoneObj);
		},
		pwdStatusClass() {
			return this.returnClassName(this.pwdObj);
		},
	},
};
</script>

<style scoped>
@import "./css/login.css";
</style>
