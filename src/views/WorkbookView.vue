<template>
  <div class="overflow-hidden pb-2" v-if="JSON.stringify(lessonDetail) != '{}'">
    <div
      class="px-4 py-3 lg:py-5 relative shadow shadow-gray-300 flex items-center justify-center"
    >
      <router-link
        :to="`/practice/${route.params.courseId}/${route.params.id}`"
      >
        <div
          class="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 cursor-pointer"
        >
          <img src="../assets/images/left.svg" alt="" />
        </div>
      </router-link>
      <div
        class="ml-10 inline-block text-indigo text-xl font-semibold whitespace-nowrap truncate"
      >
        {{ lessonDetail.Title }}
      </div>
    </div>
    <div class="lg:w-1/2"></div>
  </div>
</template>

<script lang="ts">
import { storeToRefs } from "pinia";
import { defineComponent, nextTick, onMounted, ref } from "vue";
import { useUnitStore } from "../store/unitStore";
import { useRoute } from "vue-router";
export default defineComponent({
  name: "WorkbookView",
  setup() {
    const route = useRoute();
    const questionProcess = ref(0);
    const correctProcess = ref(0);
    const { lessonDetail } = storeToRefs(useUnitStore());
    // const { getQuestion } = useUnitStore();
    const setProcess = () => {
      if (lessonDetail.value.CompleteQuestions > 0) {
        questionProcess.value = Math.round(
          (lessonDetail.value.CompleteQuestions /
            lessonDetail.value.TotalQuestions) *
            100
        );
      }
    };
    const setCorrectProcess = () => {
      if (lessonDetail.value.CompleteQuestions > 0) {
        correctProcess.value = Math.round(
          (lessonDetail.value.numberQuestionCorrect /
            lessonDetail.value.TotalQuestions) *
            100
        );
      }
    };

    onMounted(() => {
      nextTick(() => {
        // getQuestion();
      });
    });
    onMounted(setProcess);
    onMounted(setCorrectProcess);
    return {
      lessonDetail,
      questionProcess,
      correctProcess,
      setCorrectProcess,
      route,
    };
  },
});
</script>
