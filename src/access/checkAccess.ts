/**
 * 判断用户是否具有需要的权限
 * @param loginUser 当前登录用户
 * @param needAccess 需要的权限
 * @param boolean 有无权限
 */
import ACCESSENUM from "@/access/accessEnum";

const checkAccess = (loginUser: any, needAccess = ACCESSENUM.NOT_LOGIN) => {
  // 默认为没有登录
  const loginUserAccess = loginUser?.userRole ?? ACCESSENUM.NOT_LOGIN;

  if (needAccess === ACCESSENUM.NOT_LOGIN) {
    return true;
  }

  // 用户登录才能访问
  if (needAccess === ACCESSENUM.USER) {
    // 没有登录，没有权限
    if (loginUserAccess === ACCESSENUM.NOT_LOGIN) {
      return false;
    }
  }

  // 管理员才能访问
  if (needAccess === ACCESSENUM.ADMIN) {
    // 不是管理员，没有权限
    if (loginUserAccess !== ACCESSENUM.ADMIN) {
      return false;
    }
  }

  return true;
};

export default checkAccess;
