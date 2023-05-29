<template>
  <div v-if="unit != null">
    <div class="px-4 py-5 relative shadow shadow-gray-300">
      <div
        class="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 cursor-pointer"
      >
        <router-link to="/">
          <img src="../assets/images/left.svg" alt="" />
        </router-link>
      </div>
      <div
        class="ml-1/2 -translate-x-1/2 inline-block text-indigo text-xl font-semibold whitespace-nowrap"
      >
        {{ unit.unitTitle }}
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
              {{ unit.chapterTitle }}
            </p>
            <p class="text-lg italic text-gray-400">
              {{ unit.chapterDescription }}
            </p>
            <div v-if="unit.numberQuestionComplete == 0">
              <p class="text-lg my-4">
                Tổng:
                <span class="text-xl text-indigo font-bold"
                  >{{ unit.numberQuestion }} câu</span
                >
              </p>
            </div>
            <div class="my-4 relative" v-else>
              <p class="text-lg">
                Hoàn thành:
                <span class="text-xl text-indigo font-bold"
                  >{{ unit.numberQuestionComplete }}/{{
                    unit.numberQuestion
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
          <button
            class="text-white py-2 bg-indigo rounded border-indigo border-2 w-full mb-8 text-base font-medium hover:bg-white hover:text-indigo"
          >
            Làm bài
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { storeToRefs } from "pinia";
import { defineComponent, nextTick, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useUnitStore } from "../store/unitStore";
import Unit from "../types/unit";
export default defineComponent({
  name: "UnitView",
  setup() {
    const route = useRoute();
    const { id } = route.params;
    const questionProcess = ref(null);
    const { units } = storeToRefs(useUnitStore());
    const unit = ref<Unit | null>(null);
    const findCurrentUnit = () => {
      unit.value = units.value.find((data: Unit) => data.id == id) || null;
    };
    const setProcess = () => {
      if (unit.value.numberQuestionComplete > 0) {
        nextTick(() => {
          questionProcess.value.style.width =
            (unit.value.numberQuestionComplete / unit.value.numberQuestion) *
              100 +
            "%";
        });
      }
    };
    onMounted(findCurrentUnit);
    onMounted(setProcess);
    return { unit, questionProcess };
  },
});
</script>
