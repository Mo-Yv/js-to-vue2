import VueRouter from "vue-router";
import Home from "../pages/Home.vue";
import SignIn from '../pages/SignIn.vue';

const router = new VueRouter({
	routes: [
		{
			// 当访问根路径时,重定向到Home路由
			path: "/",
			redirect: "/Home",
		},
		{
			path: "/Home",
			component: Home,
			meta: { title: "首页" }
		},
		{
			path: "/Login",
			component: SignIn,
			meta: { title: "登录" },
		},
		{
			path: "/TestLink1",
			component: Home,
			meta: { title: "TestPage1" }
		},
		{
			path: "/TestLink2",
			component: Home,
			meta: { title: "TestPage2" }
		},
		{
			path: "/TestLink3",
			component: Home,
			meta: { title: "TestPage3" }
		},
	],
});

// 后置路由守卫
// 切换页面标题
router.afterEach((to, from) => document.title = to.meta.title || "My Vue2 Projects");

export default router;