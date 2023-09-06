import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const signIn = {
	// 命名空间,用于组件中通过mapXXX的第一个参数取值
	namespaced: true,

	// 响应组件的事件
	actions: {},

	// 操作state的数据
	mutations: {
		PHONE(state, value) {
			// 修改数据
			state.userPhone = value;
		},
		PWD(state, value) {
			state.userPwd = value;
		},
	},

	// 储存数据
	state: {
		// 用户手机号
		userPhone: "",
		// 用户密码
		userPwd: "",
	},
};

// 暴露
export default new Vuex.Store({
	modules: {
		signIn
	}
});
