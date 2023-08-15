<template>
  <div class="home">Home Page</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import router from "@/router";
export default defineComponent({
  name: "HomeView",
  setup() {
    onMounted(() => router.push("/course/5e83f76cf4e1ee1140b3cd4e"));
    return {};
  },
});
</script>
