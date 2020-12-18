import axios from "axios";
import layer from "vue-layer-mobile";

//联调该地址
var BASE_URL = "/api";
// create an axios instance
//创建链接服务
const service = axios.create({
	//全局地址
	baseURL: BASE_URL, // url = base url + request url
	// withCredentials: true, // send cookies when cross-domain requests
	//等待时间
	timeout: 5000, // request timeout
});

// response interceptor
//响应数据后的拦截
service.interceptors.response.use(
	(response) => {
		const res = response.data;

		// if the custom code is not 1, it is judged as an error.
		if (res.code !== 1) {
			console.log("请求失败", res.msg || "没有返回信息");

			layer.toast({
				icon: "", // 图标clssName 如果为空 toast位置位于下方,否则居中
				content: res.msg,
				time: 2000, // 自动消失时间 toast类型默认消失时间为2000毫秒
			});

			// this.$layer.open({
			//     style: 'border:none; background-color:#78BA32; color:#fff;',
			//     content:'内容'
			// })

			return Promise.reject(new Error(res.message || "Error"));
		} else {
			return res;
		}
	},
	(error) => {
		console.log("err" + error); // for debug
		return Promise.reject(error);
	}
);

export default service;
