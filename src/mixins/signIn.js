// 校验输入框的值
export const verifyIptVal = {
	methods: {
		verifyIptVal(target, callback) {
			// 空值判断 .status移除状态并隐藏错误提示
			if (!target.iptVal) return (target.hasErr = target.hasStatus = false);
			// 修改.status的状态
			target.hasStatus = true;
			// 执行回调函数
			callback();
		}
	}
};

// 计算属性返回类名
export const returnClassName = {
	methods: {
		returnClassName(obj) {
			if(obj["hasStatus"]) {
				return obj["hasErr"] ? "fail" : "pass";
			} else {
				return "";
			}
		}
	},
}