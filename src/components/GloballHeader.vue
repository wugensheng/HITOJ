<template>
  <a-row id="globalHeader" align="center" :wrap="false">
    <a-col flex="auto">
      <a-menu
        mode="horizontal"
        :selected-keys="selectedKeys"
        @menu-item-click="doMenuClick"
      >
        <a-menu-item
          key="0"
          :style="{ padding: 0, marginRight: '38px' }"
          disabled
        >
          <div class="title-bar">
            <img class="logo" src="../assets/hitlog.png" />
            <div class="title">HITOJ</div>
          </div>
        </a-menu-item>
        <a-menu-item v-for="item in visiableRoutes" :key="item.path">
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="100px">
      <div>{{ store.state.user?.loginUser?.userName ?? "未登录" }}</div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { routes } from "../router/routes";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import checkAccess from "@/access/checkAccess";
import ACCESSENUM from "@/access/accessEnum";

const router = useRouter();
const store = useStore();
const loginUser = store.state?.user?.loginUser;
// 默认是主页
const selectedKeys = ref(["/"]);

router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path];
});

// 路由切换
const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};

// 展示在菜单中元素 根据是否显示和用户权限过滤
const visiableRoutes = computed(() => {
  return routes.filter((item, index) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    // 根据用户权限过滤
    if (
      !checkAccess(store.state?.user?.loginUser, item?.meta?.access as string)
    ) {
      return false;
    }
    return true;
  });
});

// setTimeout(() => {
//   store.dispatch("user/getLoginUser", {
//     username: "管理员",
//     userRole: ACCESSENUM.ADMIN,
//   });
// }, 3000);
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.title-bar .title {
  color: #444;
  margin-left: 16px;
}

.title-bar .logo {
  height: 40px;
}
</style>
