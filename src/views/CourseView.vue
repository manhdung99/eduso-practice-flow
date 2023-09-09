<template>
  <div class="">
    <div class="text-center my-2">
      <p class="text-indigo text-2xl font-bold">Mục lục</p>
    </div>
    <a-menu
      class="pt-2"
      v-model:selectedKeys="selectedKeys"
      style="width: 100%"
      mode="inline"
      :open-keys="openKeys"
      @openChange="onOpenChange"
    >
      <a-sub-menu v-for="chapter in chapters" :key="chapter.ID">
        <template #title>
          <ProcessVue
            :totalQuestion="chapter.totalQuestions"
            :completeQuestion="chapter.completeQuestion"
            :correctQuestion="chapter.correctQuestion"
          />
          <div class="flex justify-between items-center pr-4">
            <span class="text-ellipsis overflow-hidden w-3/5 md:w-auto">{{
              chapter.Name
            }}</span>
            <div class="flex flex-col">
              <span class="leading-6">Trả lời đúng </span>
              <span class="leading-6"
                >{{ chapter.correctQuestion }} /
                {{ chapter.totalQuestions }}</span
              >
            </div>
          </div>
        </template>
        <div v-for="lesson in lessons" :key="lesson.ID">
          <router-link :to="`/course/${route.params.courseId}/${lesson.ID}`">
            <a-menu-item v-if="lesson.ChapterID == chapter.ID">
              <ProcessVue
                :totalQuestion="lesson.TotalQuestions"
                :completeQuestion="lesson.CompleteQuestions"
                :correctQuestion="lesson.PassQuestions"
              />
              <div class="flex justify-between">
                <div class="text-ellipsis overflow-hidden w-3/5 md:w-auto">
                  {{ lesson.Title }} ( đúng {{ lesson.PassQuestions }} /
                  {{ lesson.TotalQuestions }})
                </div>
                <div>
                  <span
                    :class="
                      lesson.CompleteQuestions >= lesson.TotalQuestions
                        ? 'text-green'
                        : lesson.CompleteQuestions == 0
                        ? 'text-gray-400'
                        : 'text-indigo'
                    "
                  >
                    {{
                      lesson.CompleteQuestions >= lesson.TotalQuestions
                        ? "Đã hoàn thành"
                        : lesson.CompleteQuestions == 0
                        ? "Chưa làm"
                        : "Chưa hoàn thành"
                    }}
                  </span>
                </div>
              </div>
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
import ProcessVue from "../components/common/ProcessVue.vue";
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
    onMounted(async () => {
      await getLessons(route.params.courseId as string);
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
  components: { ProcessVue },
});
</script>
