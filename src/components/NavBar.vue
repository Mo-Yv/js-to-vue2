<template>
	<!-- 导航栏 -->
	<div class="nav-bar">
		<!-- 动态条 -->
		<div class="nav" :style="{left: navLeft + 'px'}"></div>
		<!-- 左侧链接 -->
		<div class="links">
			<!-- Home链接 -->
			<router-link active-class="active" to="/Home" @click.native="navMove(1)">
				<i class="el-icon-s-home"></i>
				Home
			</router-link>
			<!-- 次要链接 -->
			<div class="minor-links" :class="{show: !isUnfold}">
				<div class="links-box">
					<div 
					 v-for="(item, index) in linksArr" 
					 :key="index" 
					 :style="{'--top': index}"
					 @click="navMove(index + 2)"
					>
						<router-link :to="item.url" active-class="active">{{ item.text }}</router-link>
					</div>
					<div class="github" :style="{'--top': linksArr.length}">
						<a href="https://github.com/Mo-Yv" target="_blank">Github</a>
					</div>
				</div>
			</div>
		</div>
		<!-- 收起展开按钮 -->
		<a class="switch" href="javascript:;" @click="switchFold">
			<i :class="isUnfold ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
			<span>{{ foldTip }}</span> 
		</a>
		<!-- 登录链接 -->
		<div class="toLogin">
			<router-link active-class="active" to="/Login">
				<i class="el-icon-user-solid"></i>
				Sign in
			</router-link>
		</div>
	</div>
</template>

<script>
export default {
	name: "NavBar",
	data() {
		return {
			// 导航栏展开状态
			isUnfold: true,
			foldTip: "Unfold",
			// 动态渲染路由链接
			linksArr: [
				{ text: "Test Link1", url: "/TestLink1" },
				{ text: "Test Link2", url: "/TestLink2" },
				{ text: "Test Link3", url: "/TestLink3" },
			],
			// 点击的路由链接索引,用于计算nav的left
			aIndex: 1
		};
	},
	methods: {
		// 切换导航栏菜单收起或展开
		switchFold() {
			this.isUnfold = !this.isUnfold;
			this.foldTip = this.isUnfold ? "Unfold" : "Fold";
		},
		// 点击导航栏链接移动nav
		navMove(index) {
			this.aIndex = index;
		}
	},
	computed: {
		// 修改nav的left值
		navLeft() {
			return this.aIndex * 20 + (this.aIndex - 1) * 75;
		}
	},
};
</script>

<style scoped>
@import "./css/NavBar.css";
</style>
