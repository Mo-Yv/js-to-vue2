import Vue from "vue";
import App from "./App.vue";
// 引入路由
import VueRouter from "vue-router";
import router from "./router";
// 引入vuex
import store from "./store";
// 按需引入element-ui
import { Notification, Message } from "element-ui";

Vue.config.productionTip = false;

Vue.use(VueRouter);

Vue.prototype.$message = Message;
Vue.prototype.$notify = Notification;

new Vue({
	el: "#app",
	router,
	store,
	render: h => h(App),
	beforeCreate() {
		// 安装全局事件总线
		Vue.prototype.$bus = this;
	},
});
