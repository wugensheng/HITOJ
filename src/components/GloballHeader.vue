<template>
  <a-row id="globalHeader" align="center" :wrap="false">
    <a-col flex="auto">
      <a-menu
        mode="horizontal"
        :selected-keys="selectedKeys"
        @menu-item-click="doMenuClick"
        style="background: transparent"
      >
        <a-menu-item
          key="0"
          :style="{ padding: 0, marginRight: '38px', background: transparent }"
          disabled
        >
          <div class="title-bar">
            <img class="logo" src="../assets/hitlog.png" />
            <div class="title">HIT Judge</div>
          </div>
        </a-menu-item>
        <a-menu-item
          style="fontsize: '60px'"
          v-for="item in visiableRoutes"
          :key="item.path"
          class="arco-avg"
        >
          <icon-storage v-if="item.path === '/question'" />
          <icon-mind-mapping v-else-if="item.path === '/question_submit'" />
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col
      flex="35px"
      v-if="store.state.user?.loginUser?.userName ?? undefined"
    >
      <a-avatar :size="26">
        <img
          alt="avatar"
          src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
        />
      </a-avatar>
    </a-col>
    <a-col flex="70px">
      <a-space
        :style="{
          fontSize: 30,
          color: 'gray',
        }"
        >{{ store.state.user?.loginUser?.userName ?? "未登录" }}</a-space
      >
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
const selectedKeys = ref(["/question"]);

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
#globalHeader {
  /*background: linear-gradient(to right, blue, pink);*/
}

.title-bar {
  display: flex;
  align-items: center;
}

.title-bar .title {
  color: #444;
  margin-left: 16px;
  font-size: 20px;
  font-weight: bolder;
}

.title-bar .logo {
  height: 40px;
}

.arco-menu .arco-menu-item .arco-icon {
  margin-right: 0px;
}

.arco-avg.arco-menu-selected-label {
  display: none !important;
}

.arco-menu-light .arco-menu-item,
.arco-menu-light .arco-menu-group-title,
.arco-menu-light .arco-menu-pop-header,
.arco-menu-light .arco-menu-inline-header {
  background: transparent;
}

/*.arco-menu-light .arco-menu-item.arco-menu-selected,*/
/*.arco-menu-light .arco-menu-group-title.arco-menu-selected,*/
/*.arco-menu-light .arco-menu-pop-header.arco-menu-selected,*/
/*.arco-menu-light .arco-menu-inline-header.arco-menu-selected {*/
/*  display: none;*/
/*}*/
</style>
