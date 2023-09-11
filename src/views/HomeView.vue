<template>
  <div class="home">Home Page</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import router from "@/router";
export default defineComponent({
  name: "HomeView",
  setup() {
    onMounted(() => router.push("/course/5db92529ab30e73154d7ed54"));
    return {};
  },
});
</script>
