<template>
	<!-- 外层容器 -->
	<div class="sign-in-content register">
		<!-- 标题 -->
		<h1>注册</h1>
		<!-- 手机号输入框 -->
		<div class="inputBox">
			<input
			 type="tel" 
			 maxlength="11" 
			 required 
			 v-model="phoneObj.iptVal"
			 @blur="verifyPhone"
			/>
			<!-- 提示文字 -->
			<span class="text">手机号</span>
			<!-- 校验通过或失败提示符号 -->
			<span class="status" :class="phoneStatusClass"></span>
			<!-- 错误提示文字 -->
			<span class="error" v-show="phoneObj.hasErr">手机号格式错误!</span>
		</div>
		<!-- 验证码输入框 -->
		<div class="inputBox">
			<input
			 type="number" 
			 maxlength="12" 
			 required
			 v-model="codeObj.iptVal"
			 @blur="verifyCode"
			/>
			<span class="text">手机验证码</span>
			<!-- 获取验证码按钮 -->
			<button @click="getCode" :disabled="isDisabled">
				{{ getCodeBtnTxt }}
			</button>
			<span class="status" :class="codeStatusClass"></span>
			<span class="error" v-show="codeObj.hasErr">验证码错误!</span>
		</div>
		<!-- 密码输入框 -->
		<div class="inputBox">
			<input
			 type="text" 
			 required 
			 v-model="pwdObj.iptVal"
			 @blur="pwdVerifyFun"
			/>
			<span class="text">输入密码</span>
			<span class="status" :class="pwdStatusClass"></span>
			<!-- 密码规则提示 -->
			<div class="tip">
				<i class="el-icon-question" @click="showTipFun"></i>
				<pre v-show="showTip" :class="{pwdErr: pwdObj.hasErr}">
					密码长度: 
					&ensp;最少6位,最长12位
					至少包含: 
					&ensp;1个大写字母,1个小写字母,1个数字
					且不能含有任何特殊符号
				</pre>
			</div>
		</div>
		<!-- 确认密码输入框 -->
		<div class="inputBox">
			<input
			 type="text" 
			 required 
			 v-model="verifyPwdObj.iptVal"
			 @blur="verifyPwdFun"
			/>
			<span class="text">确认密码</span>
			<span class="status" :class="verifyPwdStatusClass"></span>
			<span class="error" v-show="verifyPwdObj.hasErr">两次密码不一致!</span>
		</div>
		<!-- 提交按钮 -->
		<button class="sign-in-submit" @click="submitRegister">注册账号</button>
		<!-- 功能链接 -->
		<div class="links">
			<a class="back" href="javascript:;" @click="sendStatus">返回登录</a>
			<a class="reset" href="javascript:;" @click="resetIpt">重新填写</a>
		</div>
	</div>
</template>

<script>
// 引入混合
import { verifyIptVal, returnClassName } from "@/mixins/signIn";

export default {
	name: "Register",
	mixins: [ verifyIptVal, returnClassName ],
	data() {
		return {
			// 按钮文本
			getCodeBtnTxt: "获取验证码",
			// 倒计时时间
			countDownTime: 60,
			// 按钮disabled属性
			isDisabled: false,
			// 储存生成的验证码
			code: "",
			// 显示/隐藏密码的要求提示(div.tips)
			showTip: false,
			/**
			 * keysObj储存每个字段对应的数据
			 * iptVal: 输入框绑定的值
			 * hasErr: 输入框内容是否符合要求
			 * hasStatus: 输入框后span.status的状态
			 */
			keysObj: {
				// 手机号
				phone: { iptVal: "", hasErr: false, hasStatus: false },
				// 验证码
				code: { iptVal: "", hasErr: false, hasStatus: false },
				// 密码
				pwd: { iptVal: "", hasErr: false, hasStatus: false },
				// 确认密码
				verifyPwd: { iptVal: "", hasErr: false, hasStatus: false },
			},
		};
	},
	methods: {
		// 向父组件传递数据
		sendStatus() {
			this.$bus.$emit("changeSignIn", true);
		},
		// 切换密码要求提示的显示状态
		showTipFun() {
			this.showTip = !this.showTip;
		},
		// 创建随机验证码
		createCode() {
			// 清空上一次的结果
			this.code = "";
			// 循环拼接6次,验证码长度为6
			for(let i = 0; i < 6; i++) {
				this.code += Math.floor(Math.random() * 10 + 0);
			}
			// 弹出提示
			this.$notify({
				title: "注册验证码为:",
				type: "success",
				duration: 10000,
				dangerouslyUseHTMLString: true,
				message: `
					<span id="code">${this.code}</span>
					<i 
					 class="copyCode el-icon-copy-document" 
					 title="复制验证码"
					 onclick="navigator.clipboard.writeText(document.getElementById('code').innerHTML)"
					></i>
				`,
				offset: 40
			});
		},
		// 点击获取验证码按钮
		getCode() {
			this.isDisabled = true;
			this.getCodeBtnTxt = `${this.countDownTime}秒后可重新获取`;
			// 创建验证码
			this.createCode();
			// 倒计时
			const timer = setInterval(() => {
				// 倒计时
				this.countDownTime--;
				if(this.countDownTime > 0) {
					// 渲染按钮文本
					this.getCodeBtnTxt = `${this.countDownTime < 10 ? "0" + this.countDownTime : this.countDownTime}秒后可重新获取`;
				} else {
					// 清除计时器
					clearInterval(timer);
					// 重置时间
					this.countDownTime = 60;
					// 修改属性
					this.isDisabled = false;
					// 渲染文本
					this.getCodeBtnTxt = `重新获取验证码`;
				}
			}, 1000);
		},
		// 校验手机号
		verifyPhone() {
			const phone = this.phoneObj;
			this.verifyIptVal(phone, () => {
				const reg = /^1[3456789]\d{9}$/;
				phone.hasErr = !(reg.test(phone.iptVal));
			});
		},
		// 校验验证码
		verifyCode() {
			const code = this.codeObj;
			this.verifyIptVal(code, () => code.hasErr = !(code.iptVal === this.code));
		},
		// 校验密码
		pwdVerifyFun() {
			const pwd = this.pwdObj;
			this.verifyIptVal(pwd, () => {
				const reg = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{6,12}$/;
				pwd.hasErr = this.showTip = !(reg.test(pwd.iptVal));
			});
		},
		// 校验确认密码
		verifyPwdFun() {
			const vPwd = this.verifyPwdObj;
			this.verifyIptVal(vPwd, () => vPwd.hasErr = !(vPwd.iptVal.trim() === this.pwdObj.iptVal));
		},
		// 提交
		submitRegister() {
			// 清除上一次的提示框
			this.$message.closeAll();
			const phone = this.phoneObj,
				code = this.codeObj,
				pwd = this.pwdObj,
				vPwd = this.verifyPwdObj,
				arr = [
					!phone.hasErr && !!phone.iptVal,
					!code.hasErr && !!code.iptVal,
					!pwd.hasErr && !!pwd.iptVal,
					!vPwd.hasErr && !!vPwd.iptVal
				];
			// 数据无误
			if(!arr.includes(false)){
				// 向vuex提交数据
				this.$store.commit("signIn/PHONE", phone.iptVal);
				this.$store.commit("signIn/PWD", pwd.iptVal);
				// 询问是否返回登录
				if(confirm("注册成功!是否返回登录")) return this.sendStatus();
			} else {
				// 否则弹出提示
				return this.$message({
					message: "请检查信息是否完善无误!",
					type: "error",
					offset: 50
				});
			}
		},
		// 重置表单
		resetIpt() {
			if(confirm("确认要重新填写吗?")) {
				this.showTip = false,
				this.keysObj = {
					phone: { iptVal: "", hasErr: false, hasStatus: false },
					code: { iptVal: "", hasErr: false, hasStatus: false },
					pwd: { iptVal: "", hasErr: false, hasStatus: false },
					verifyPwd: { iptVal: "", hasErr: false, hasStatus: false },
				}
			}
		}
	},
	computed: {
		phoneObj() {
			return this.keysObj.phone;
		},
		codeObj() {
			return this.keysObj.code;
		},
		pwdObj() {
			return this.keysObj.pwd;
		},
		verifyPwdObj() {
			return this.keysObj.verifyPwd;
		},
		phoneStatusClass() {
			return this.returnClassName(this.phoneObj);
		},
		codeStatusClass() {;
			return this.returnClassName(this.codeObj);
		},
		pwdStatusClass() {
			return this.returnClassName(this.pwdObj);
		},
		verifyPwdStatusClass() {
			return this.returnClassName(this.verifyPwdObj);
		},
	},
};
</script>

<style scoped>
@import url("./css/register.css");
</style>
