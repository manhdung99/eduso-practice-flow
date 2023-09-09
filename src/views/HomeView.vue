<template>
  <div class="home">Home Page</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import router from "@/router";
export default defineComponent({
  name: "HomeView",
  setup() {
    onMounted(() => router.push("/course/6290ab1f6c9f3d1f84abb70b"));
    return {};
  },
});
</script>
