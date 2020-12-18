import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import { login } from "@/api";
export default new Vuex.Store({
	state: {
		userInfo: {},
	},
	mutations: {
		SET_USER: (state, data) => {
			Object.assign(state.userInfo, data);
		},
	},
	actions: {
		login({ commit }, userInfo) {
			// console.log(userInfo);
			// debugger
			sessionStorage.setItem(
				"loginAccount",
				JSON.stringify(userInfo.userAccount)
			);

			return new Promise((resolve, reject) => {
				login(userInfo)
					.then((response) => {
						sessionStorage.setItem("id", JSON.stringify(response.data.id));
						sessionStorage.setItem(
							"userSex",
							JSON.stringify(response.data.userSex)
						);
						sessionStorage.setItem(
							"frontScore",
							JSON.stringify(response.data.score)
						);

						const { data } = response;
						commit("SET_USER", data);
						resolve(data);
					})
					.catch((err) => {
						reject(err);
					});
			});
		},
	},
	modules: {},
});
