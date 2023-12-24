<template>
  <div id="app">
    <template v-if="route.path.startsWith('/user')">
      <router-view></router-view>
    </template>
    <template v-else>
      <BasicLayout />
    </template>
  </div>
</template>

<style>
#app {
}
</style>
<script setup lang="ts">
import BasicLayout from "@/layouts/BasicLayout.vue";
import UserLayout from "@/layouts/UserLayout.vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import ACCESSENUM from "@/access/accessEnum";
import { onMounted } from "vue";
import "@/access/index";

const route = useRoute();
/**
 * 全局初始化函数，全局单词调用的函数可以写到这里
 */
const doInit = () => {
  console.log("欢迎来到这里");
};

onMounted(() => {
  doInit();
});
</script>
