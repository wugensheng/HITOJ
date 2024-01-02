<template>
  <div id="basicLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <GloballHeader></GloballHeader>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <!--      <a-layout-footer class="footer">哈尔滨工业大学在线OJ</a-layout-footer>-->
    </a-layout>
  </div>
</template>

<!--<script>-->
<!--export default {-->
<!--  name: "userLayout",-->
<!--};-->
<!--</script>-->

<style scoped>
#basicLayout .header {
  /*margin-bottom: 16px;*/
  box-shadow: #eee 1px 1px 5px;
  background: linear-gradient(to right, #ffffff, #e6f7ff, #ffffff);
  backdrop-filter: blur(5px); /* 添加模糊效果 */
}

#basicLayout .content {
  padding: 15px;
  /*background: linear-gradient(to right, #f0f8ff, #b3e5fc, #add8e6, #f0f8ff);*/
  background: linear-gradient(to right, #f0f8ff, #e6f7ff, #e6f7ff, #f0f8ff);
  /*backdrop-filter: blur(5px); !* 添加模糊效果 *!*/
}

#basicLayout .footer {
  background: #efefef;
  padding: 16px;
  position: sticky;
  bottom: 0px;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
<script>
import GloballHeader from "@/components/GloballHeader";

export default {
  components: { GloballHeader },
};
</script>
