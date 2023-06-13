<template>
  <div class="overflow-hidden pb-2" v-if="JSON.stringify(unitDetail) != '{}'">
    <div class="px-4 py-5 relative shadow shadow-gray-300">
      <router-link to="/">
        <div
          class="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 cursor-pointer"
        >
          <img src="../assets/images/left.svg" alt="" />
        </div>
      </router-link>
      <div
        class="ml-1/2 -translate-x-1/2 inline-block text-indigo text-xl font-semibold whitespace-nowrap"
      >
        {{ unitDetail.unitTitle }}
      </div>
    </div>
    <div class="lg:w-1/2"></div>
  </div>
</template>

<script lang="ts">
import { storeToRefs } from "pinia";
import { defineComponent, nextTick, onMounted, ref } from "vue";
import { useUnitStore } from "../store/unitStore";
export default defineComponent({
  name: "WorkbookView",
  setup() {
    const questionProcess = ref(0);
    const correctProcess = ref(0);
    const { unitDetail } = storeToRefs(useUnitStore());
    const { getQuestion } = useUnitStore();
    const setProcess = () => {
      if (unitDetail.value.numberQuestionComplete > 0) {
        questionProcess.value = Math.round(
          (unitDetail.value.numberQuestionComplete /
            unitDetail.value.numberQuestion) *
            100
        );
      }
    };
    const setCorrectProcess = () => {
      if (unitDetail.value.numberQuestionComplete > 0) {
        correctProcess.value = Math.round(
          (unitDetail.value.numberQuestionCorrect /
            unitDetail.value.numberQuestion) *
            100
        );
      }
    };

    onMounted(() => {
      nextTick(() => {
        getQuestion();
      });
    });
    onMounted(setProcess);
    onMounted(setCorrectProcess);
    return {
      unitDetail,
      questionProcess,
      correctProcess,
      setCorrectProcess,
    };
  },
});
</script>
