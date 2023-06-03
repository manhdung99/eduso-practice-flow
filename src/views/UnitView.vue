<template>
  <div v-if="JSON.stringify(unitDetail) != '{}'">
    <div class="px-4 py-5 relative shadow shadow-gray-300">
      <div
        @click="$router.go(-1)"
        class="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 cursor-pointer"
      >
        <img src="../assets/images/left.svg" alt="" />
      </div>
      <div
        class="ml-1/2 -translate-x-1/2 inline-block text-indigo text-xl font-semibold whitespace-nowrap"
      >
        {{ unitDetail.unitTitle }}
      </div>
    </div>
    <div>
      <div
        class="rounded-lg bg-white w-full lg:w-1/2 lg:ml-1/2 lg:-translate-x-1/2 mt-4 shadow-md shadow-gray-300 overflow-hidden"
      >
        <div><img src="https://i.ibb.co/P9sYjwc/cover-2.jpg" alt="" /></div>
        <div class="px-6">
          <div class="w-full lg:w-1/2">
            <p class="text-xl text-indigo font-bold truncate">
              {{ unitDetail.chapterTitle }}
            </p>
            <p class="text-lg italic text-gray-400">
              {{ unitDetail.chapterDescription }}
            </p>
            <div v-if="unitDetail.numberQuestionComplete == 0">
              <p class="text-lg my-4">
                Tổng:
                <span class="text-xl text-indigo font-bold"
                  >{{ unitDetail.numberQuestion }} câu</span
                >
              </p>
            </div>
            <div class="my-4 relative" v-else>
              <p class="text-lg">
                Hoàn thành:
                <span class="text-xl text-indigo font-bold"
                  >{{ unitDetail.numberQuestionComplete }}/{{
                    unitDetail.numberQuestion
                  }}
                  câu</span
                >
              </p>
              <div class="w-full bg-grey-lighter rounded-lg h-2 absolute"></div>
              <div
                ref="questionProcess"
                class="bg-blue-lighter rounded-lg h-2 absolute"
              ></div>
            </div>
          </div>
          <router-link :to="`/practice/${unitDetail.id}`">
            <button
              class="text-white py-2 bg-indigo rounded border-indigo border-2 w-full mb-8 text-base font-medium hover:bg-white hover:text-indigo"
            >
              Làm bài
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { storeToRefs } from "pinia";
import { defineComponent, nextTick, onMounted, ref } from "vue";
import { useUnitStore } from "../store/unitStore";
export default defineComponent({
  name: "UnitView",
  setup() {
    const questionProcess = ref(null);
    const { unitDetail } = storeToRefs(useUnitStore());
    const setProcess = () => {
      if (unitDetail.value.numberQuestionComplete > 0) {
        nextTick(() => {
          questionProcess.value.style.width =
            (unitDetail.value.numberQuestionComplete /
              unitDetail.value.numberQuestion) *
              100 +
            "%";
        });
      }
    };
    onMounted(setProcess);
    return { unitDetail, questionProcess };
  },
});
</script>
