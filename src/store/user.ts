import { createStore, StoreOptions } from "vuex";
import ACCESSENUM from "@/access/accessEnum";
import { UserControllerService } from "../../generated";

export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      userName: "未登录",
    },
  }),
  getters: {},
  mutations: {
    updateUser(state, payload) {
      console.log("payload: ", payload);
      state.loginUser = payload;
    },
  },
  actions: {
    async getLoginUser({ commit, state }, payload) {
      const res = await UserControllerService.getLoginUserUsingGet();
      if (res.code === 0) {
        commit("updateUser", res.data);
      } else {
        commit("updateUser", {
          ...state.loginUser,
          userRole: ACCESSENUM.NOT_LOGIN,
        });
      }
    },
  },
} as StoreOptions<any>;
