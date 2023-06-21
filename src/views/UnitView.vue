<template>
  <div class="overflow-hidden pb-2" v-if="JSON.stringify(unitDetail) != '{}'">
    <div
      class="px-4 py-5 relative shadow shadow-gray-300 flex items-center lg:justify-center"
    >
      <router-link to="/">
        <div
          class="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 cursor-pointer"
        >
          <img src="../assets/images/left.svg" alt="" />
        </div>
      </router-link>
      <div
        class="ml-10 inline-block text-indigo text-xl font-semibold whitespace-nowrap truncate"
      >
        {{ unitDetail.unitTitle }}
      </div>
    </div>
    <div class="px-4 lg:px-0" v-if="unitDetail.completed">
      <div
        class="rounded-lg bg-white w-full lg:w-1/2 lg:ml-1/2 lg:-translate-x-1/2 mt-4 shadow-md shadow-gray-300 overflow-hidden"
      >
        <div><img src="https://i.ibb.co/P9sYjwc/cover-2.jpg" alt="" /></div>
        <div class="px-6">
          <div class="w-full mb-8">
            <p class="text-xl text-indigo font-bold truncate">
              {{ unitDetail.chapterTitle }}
            </p>
            <p class="text-lg italic text-gray-400">
              {{ unitDetail.chapterDescription }}
            </p>
            <div>
              <p class="text-lg text-indigo font-semibold italic">Kết quả</p>
              <div class="w-full flex gap-x-4">
                <div class="w-20 h-20">
                  <a-progress
                    :percent="correctProcess"
                    stroke-color="#55934B"
                    type="circle"
                    :width="80"
                  >
                    <template #format="percent">
                      <span style="color: #55934b">{{ percent }} %</span>
                    </template>
                  </a-progress>
                </div>
                <div class="w-full flex flex-col justify-between">
                  <div class="flex justify-between items-center">
                    <span class="text-lg font-semibold text-green">Đúng</span>
                    <span class="text-base font-semibold text-indigo"
                      >{{ unitDetail.numberQuestionCorrect }} Câu</span
                    >
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-lg font-semibold text-raspberry-darker"
                      >Sai</span
                    >
                    <span class="text-base font-semibold text-indigo"
                      >{{
                        unitDetail.numberQuestion -
                        unitDetail.numberQuestionCorrect
                      }}
                      Câu</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <router-link :to="`/history/${unitDetail.id}`">
            <button
              class="text-white py-2 bg-iceberg rounded border-iceberg border-2 w-full mb-8 text-base font-medium hover:bg-white hover:text-iceberg flex items-center justify-center gap-x-3"
            >
              <span class="icon-book text-xl"
                ><span class="path1"></span><span class="path2"></span
                ><span class="path3"></span
              ></span>
              Lịch sử luyện tập
            </button>
          </router-link>
        </div>
      </div>
      <div class="w-full lg:w-1/2 ml-1/2 -translate-x-1/2 gap-x-4 flex mt-20">
        <button @click="resetUnit" class="btn btn-primary w-1/3">
          Làm lại
        </button>
        <button @click="moveToNextUnit" class="btn btn-primary w-2/3 relative">
          Làm tiếp
          <span
            class="icon-right absolute top-1/2 -translate-y-1/2 right-4"
          ></span>
        </button>
      </div>
    </div>
    <div class="px-4 lg:px-0" v-else>
      <div
        class="rounded-lg bg-white w-full lg:w-1/2 lg:ml-1/2 lg:-translate-x-1/2 mt-4 shadow-md shadow-gray-300 overflow-hidden"
      >
        <div><img src="https://i.ibb.co/P9sYjwc/cover-2.jpg" alt="" /></div>
        <div class="px-2 lg:px-6 pb-6">
          <div class="w-full">
            <p class="text-xl text-indigo font-bold truncate">
              {{ unitDetail.chapterTitle }}
            </p>
            <p class="text-lg italic text-gray-400">
              {{ unitDetail.chapterDescription }}
            </p>
          </div>
          <div v-if="unitDetail.numberQuestionComplete == 0">
            <p class="text-lg my-4">
              Tổng:
              <span class="text-xl text-indigo font-bold"
                >{{ unitDetail.numberQuestion }} câu</span
              >
            </p>
            <router-link :to="`/practice/${unitDetail.id}`">
              <a-button
                class=""
                type="primary !h-11.5 w-full !font-medium text-center flex justify-center"
                >Làm bài</a-button
              >
            </router-link>
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
            <div class="w-1/2 mb-8">
              <a-progress
                stroke-color="#BAE7FF"
                stroke-linecap="square"
                :percent="questionProcess"
              />
            </div>
            <div class="flex w-full gap-x-5">
              <a-button @click="resetUnit" class="!h-11.5 !font-medium w-1/3"
                >Làm lại</a-button
              >
              <router-link class="w-2/3" :to="`/practice/${unitDetail.id}`">
                <a-button
                  class="!h-11.5 w-full !font-medium text-center flex justify-center"
                  type="primary"
                  >Làm tiếp
                  <span
                    class="icon-right absolute right-5 top-1/2 -translate-y-1/2"
                  ></span>
                </a-button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { storeToRefs } from "pinia";
import { defineComponent, nextTick, onMounted, ref } from "vue";
import { useUnitStore } from "../store/unitStore";
import router from "@/router";
export default defineComponent({
  name: "UnitView",
  setup() {
    const questionProcess = ref(0);
    const correctProcess = ref(0);
    const { units, unitDetail } = storeToRefs(useUnitStore());
    const { getQuestion, setUnitDetail } = useUnitStore();
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
    const resetUnit = () => {
      unitDetail.value.currentIndex = 0;
      unitDetail.value.completed = false;
      unitDetail.value.numberQuestionComplete = 0;
      unitDetail.value.numberQuestionCorrect = 0;
      unitDetail.value.questionPart.forEach((part) => {
        part.status = "unmake";
        part.questions.forEach((question) => {
          question.status = "unmake";
          if (part.type == "QUIZ1") {
            question.selectedAnswer = [];
          } else if (part.type == "QUIZ2") {
            question.answers.forEach((answer) => {
              answer.currentAnswer = "";
              answer.status = "unmake";
            });
          } else if (part.type == "QUIZ3") {
            question.answers.forEach((answer) => {
              answer.currentAnswer = "";
              answer.status = "unmake";
            });
          } else if (part.type == "QUIZ4") {
            question.answers.forEach((answer) => {
              answer.currentContent = "";
              answer.status = "unmake";
              answer.choosedContent = false;
            });
          }
        });
      });
      router.push(`/practice/${unitDetail.value.id}`);
    };
    const moveToNextUnit = () => {
      const currentUnitIndex = units.value.findIndex(
        (unit) => unit.id == unitDetail.value.id
      );
      const nextUnitID = units.value[currentUnitIndex + 1].id;
      setUnitDetail(nextUnitID);
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
      moveToNextUnit,
      setCorrectProcess,
      resetUnit,
    };
  },
});
</script>
