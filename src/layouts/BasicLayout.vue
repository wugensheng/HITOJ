<template>
  <div id="basicLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <GloballHeader></GloballHeader>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">编程导航</a-layout-footer>
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
  margin-bottom: 16px;
  box-shadow: #eee 1px 1px 5px;
}

#basicLayout .content {
  background: linear-gradient(to right, #bbb, #fff);
  margin-bottom: 16px;
  padding: 20px;
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
