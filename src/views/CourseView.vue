<template>
  <div class="">
    <div class="border-b text-center mt-4">
      <p class="text-indigo text-2xl font-bold">Mục lục</p>
    </div>
    <a-menu
      v-model:selectedKeys="selectedKeys"
      style="width: 100%"
      mode="inline"
      :open-keys="openKeys"
      @openChange="onOpenChange"
    >
      <a-sub-menu v-for="chapter in chapters" :key="chapter.ID">
        <template #title>{{ chapter.Name }}</template>
        <div v-for="lesson in lessons" :key="lesson.ID">
          <router-link :to="`/course/${route.params.courseId}/${lesson.ID}`">
            <a-menu-item v-if="lesson.ChapterID == chapter.ID">
              <div>{{ lesson.Title }}</div>
            </a-menu-item>
          </router-link>
        </div>
      </a-sub-menu>
    </a-menu>

    <!-- <router-link
      v-for="lesson in lessons"
      :key="lesson.ID"
      :to="`/course/${route.params.courseId}/${lesson.ID}`"
    >
      <CartUnit :title="lesson.Title" :numberQuestion="lesson.TotalQuestions" />
    </router-link> -->
  </div>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useUnitStore } from "../store/unitStore";
import { useRoute } from "vue-router";
export default defineComponent({
  name: "CourseView",
  setup() {
    const route = useRoute();
    const { lessons, chapters } = storeToRefs(useUnitStore());
    const { getLessons } = useUnitStore();
    const rootSubmenuKeys = ref(["sub1", "sub2", "sub4"]);
    const openKeys = ref(["sub1"]);
    const selectedKeys = ref([]);
    const onOpenChange = (openKeys: string[]) => {
      const latestOpenKey = openKeys.find(
        (key) => openKeys.indexOf(key) === -1
      );
      if (rootSubmenuKeys.value.indexOf(latestOpenKey!) != -1) {
        openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    };
    onMounted(() => {
      getLessons(route.params.courseId as string);
    });
    return {
      lessons,
      route,
      chapters,
      rootSubmenuKeys,
      openKeys,
      selectedKeys,
      onOpenChange,
    };
  },
  // components: { CartUnit },
});
</script>
