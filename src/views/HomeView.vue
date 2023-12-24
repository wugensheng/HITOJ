<template>
  <div class="home">
    <!--    <MdEditor :value="value" :handleChange="onChange"></MdEditor>-->
    <CodeEditor :value="value" :handleChange="onChange"></CodeEditor>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import CodeEditor from "@/components/CodeEditor.vue";

/**
 * 父组件传递给子组件的值和方法，在父组件中可以拿到该值
 */
const value = ref("");
const onChange = (v: string) => {
  value.value = v;
  console.log(v);
};
</script>
