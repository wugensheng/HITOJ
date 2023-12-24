import router from "@/router";
import store from "@/store";
// 全局路由拦截，判断权限
import ACCESSENUM from "@/access/accessEnum";
import { useStore } from "vuex";
import checkAccess from "@/access/checkAccess";

router.beforeEach(async (to, from, next) => {
  const loginUser = store.state?.user?.loginUser;
  // // 自动登录
  // if (!loginUser || !loginUser.userRole) {
  //   await store.dispatch("user/getLoginUser");
  // }

  const needAccess = (to?.meta?.access as string) ?? ACCESSENUM.NOT_LOGIN;
  // 权限校验
  if (needAccess !== ACCESSENUM.NOT_LOGIN) {
    if (!loginUser || !loginUser.userRole) {
      next(`/user/login?redirect=${to.fullPath}`);
      return;
    }
    // 已经登录，则校验权限
    if (!checkAccess(loginUser, needAccess)) {
      next("/noAuth");
      return;
    }
  }
  next();
});
