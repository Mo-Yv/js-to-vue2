<template>
	<div class="sign-in">
		<Login v-show="isLogin" />
		<Register v-show="!isLogin" />
	</div>
</template>

<script>
import Login from "./login/Login.vue";
import Register from "./login/Register.vue";

export default {
	name: "SignIn",
	components: {
		Login,
		Register,
	},
	data() {
		return {
			// 用于切换登录/注册组件
			isLogin: true,
		};
	},
	mounted() {
		// 通过全局事件总线获取Login/Register组件的数据
		this.$bus.$on("changeSignIn", data => {
			this.isLogin = data;
		});
	},
	beforeDestroy() {
		// 解绑局事件总线的changeSignIn事件
		this.$bus.$off("changeSignIn");
	},
};
</script>

<style>
@import url("./css/SignIn.css");
</style>
