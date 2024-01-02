<template>
  <div id="userLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <a-space>
          <img class="logo" src="../assets/hitlog.png" />
          <div class="title">哈尔滨工业大学在线OJ系统</div>
        </a-space>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view></router-view>
      </a-layout-content>
      <!--      <a-layout-footer class="footer">@版权所有，违者必究</a-layout-footer>-->
    </a-layout>
  </div>
</template>

<!--<script>-->
<!--export default {-->
<!--  name: "userLayout",-->
<!--};-->
<!--</script>-->

<style scoped>
#userLayout {
  text-align: center;
  background: url("https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png")
    0% 0% / 100% 100%;
}

#userLayout .header {
  margin-top: 15px;
  margin-bottom: 16px;
  /*box-shadow: #eee 1px 1px 5px;*/
  /*background: #205372;*/
}

#userLayout .logo {
  height: 64px;
  /*width: 64px;*/
}

#userLayout .title {
  font-size: 28px;
}

#userLayout .content {
  /*background: linear-gradient(to right, #bbb, #fff);*/
  margin-bottom: 16px;
  padding: 20px;
}

#userLayout .footer {
  /*background: #efefef;*/
  padding: 16px;
  position: sticky;
  bottom: 0px;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
<script setup lang="ts">
// import GloballHeader from "@/components/GloballHeader";

// export default {
//   components: { GloballHeader },
// };
</script>
