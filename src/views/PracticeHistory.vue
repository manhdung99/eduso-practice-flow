<template>
  <div
    class="overflow-hidden history-view"
    v-if="JSON.stringify(unitDetail) != '{}'"
  >
    <div
      class="px-4 py-3 lg:py-5 relative shadow shadow-gray-300 flex items-center lg:justify-center"
    >
      <div
        @click="$router.go(-1)"
        class="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 cursor-pointer"
      >
        <img src="../assets/images/left.svg" alt="" />
      </div>
      <div
        class="ml-10 inline-block text-indigo text-xl font-semibold whitespace-nowrap truncate"
      >
        {{ unitDetail.unitTitle }}
      </div>
    </div>
    <div class="flex relative pt-2.5">
      <!-- List question -->
      <div v-show="showListQuestion" class="list-question-wrapper lg:!hidden">
        <div class="list-question">
          <div class="flex items-center mb-6 justify-between">
            <div class="text-lg text-indigo-darker font-medium">
              Danh sách câu hỏi
            </div>
            <span
              @click="showListQuestion = false"
              class="icon-close text-xs cursor-pointer text-gray-400 hover:text-black"
            ></span>
          </div>
          <p class="text-sm italic text-indigo-lighter mb-5 font-medium">
            Đã trả lời {{ unitDetail.numberQuestionComplete }}/{{
              unitDetail.numberQuestion
            }}
            câu
          </p>
          <div class="list-question-part scroll-area">
            <div
              v-for="(part, index) in unitDetail.questionPart"
              :key="part.id"
              @click.prevent="scrollToSectionMobile(part.id)"
            >
              <h3 class="text-indigo font-semibold mb-2">
                Phần {{ index + 1 }}
              </h3>
              <!-- Question -->
              <div
                v-for="(question, questionIndex) in part.questions"
                :key="question.questionID"
                class="flex items-center gap-x-2.5 py-2 hover:bg-slate-200 cursor-pointer"
              >
                <span
                  v-if="question.status == 'true'"
                  class="icon-correct-answer"
                  ><span class="path1"></span><span class="path2"></span
                  ><span class="path3"></span
                ></span>
                <span
                  v-else-if="question.status == 'false'"
                  class="icon-incorrect-answer"
                  ><span class="path1"></span><span class="path2"></span
                ></span>
                <span class="icon-unmake-answer" v-else></span>
                <span class="text-sm text-indigo ml-2.5"
                  >Câu {{ questionIndex + 1 }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-show="showListQuestion"
        class="list-question-wrapper hidden lg:block"
      >
        <div class="list-question">
          <div class="flex items-center mb-6 justify-between">
            <div class="text-lg text-indigo-darker font-medium">
              Danh sách câu hỏi
            </div>
            <span
              @click="showListQuestion = false"
              class="icon-close text-xs cursor-pointer text-gray-400 hover:text-black"
            ></span>
          </div>
          <p class="text-sm italic text-indigo-lighter mb-5 font-medium">
            Đã trả lời {{ unitDetail.numberQuestionComplete }}/{{
              unitDetail.numberQuestion
            }}
            câu
          </p>
          <div class="list-question-part scroll-area">
            <div
              v-for="(part, index) in unitDetail.questionPart"
              :key="part.id"
              @click.prevent="scrollToSection(part.id)"
            >
              <h3 class="text-indigo font-semibold mb-2">
                Phần {{ index + 1 }}
              </h3>
              <!-- Question -->
              <div
                v-for="(question, questionIndex) in part.questions"
                :key="question.questionID"
                class="flex items-center gap-x-2.5 py-2 hover:bg-slate-200 cursor-pointer"
              >
                <span
                  v-if="question.status == 'true'"
                  class="icon-correct-answer"
                  ><span class="path1"></span><span class="path2"></span
                  ><span class="path3"></span
                ></span>
                <span
                  v-else-if="question.status == 'false'"
                  class="icon-incorrect-answer"
                  ><span class="path1"></span><span class="path2"></span
                ></span>
                <span class="icon-unmake-answer" v-else></span>
                <span class="text-sm text-indigo ml-2.5"
                  >Câu {{ questionIndex + 1 }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-show="!showListQuestion"
        class="absolute -left-42 hover:left-0 top-2.5 bg-primary text-white items-center gap-x-5 px-4 py-2 rounded-r cursor-pointer transition-all hidden lg:flex"
        @click="showListQuestion = true"
      >
        <span class="text-sm">Xem danh sách câu hỏi</span>
        <span class="icon-right"></span>
      </div>
      <div class="w-full">
        <div
          @scroll="onScroll($event)"
          ref="el"
          class="history-question-wrapper mx-auto scroll-area"
        >
          <div
            v-for="questionPart in unitDetail.questionPart"
            :key="questionPart.id"
            class="list-answer-wrapper"
            :id="questionPart.id"
          >
            <div class="px-1 pb-8 border-b border-gray-300 text-sm">
              <div v-html="questionPart.partContent"></div>
            </div>
            <div v-if="questionPart.type == 'QUIZ1'">
              <MutipleChoiceHistory
                v-for="(question, index) in questionPart.questions"
                :key="question.questionID"
                :question="question"
                :index="index"
              />
            </div>
            <div v-if="questionPart.type == 'QUIZ2'">
              <FillInBlankHistory
                v-for="(question, index) in questionPart.questions"
                :key="question.questionID"
                :question="question"
                :index="index"
                :partID="questionPart.id"
                :answerList="answerList"
              />
            </div>
            <div v-if="questionPart.type == 'QUIZ3'">
              <DropboxHistory
                v-for="(question, index) in questionPart.questions"
                :key="question.questionID"
                :question="question"
                :index="index"
                :partID="questionPart.id"
                :optionList="optionList"
              />
            </div>
            <div v-if="questionPart.type == 'QUIZ4'">
              <MatchingHistory
                v-for="(question, index) in questionPart.questions"
                :key="question.questionID"
                :question="question"
                :index="index"
                :partID="questionPart.id"
                :currentPartQuestion="questionPart"
              />
            </div>
            <div v-if="questionPart.type == 'QUIZ5'">
              <MutipleChoiceManyHistory
                v-for="(question, index) in questionPart.questions"
                :key="question.questionID"
                :question="question"
                :index="index"
              />
            </div>
          </div>
          <!-- Mobile bottom  -->
        </div>
        <!-- Desktop bottom  -->
        <div class="relative bottom-2 ml-1/2 -translate-x-1/2 w-1/2 mt-6 px-2">
          <div class="mt-4 justify-between hidden lg:flex">
            <div class="w-1/3 relative">
              <div>
                Câu <span>{{ currentQuestion + 1 }}</span> /
                {{ unitDetail.numberQuestion }}
              </div>
              <div>
                <a-progress
                  stroke-color="#3699CF"
                  stroke-linecap="square"
                  :percent="
                    ((currentQuestion + 1) / unitDetail.numberQuestion) * 100
                  "
                />
              </div>
            </div>
            <div class="flex gap-x-4">
              <button
                :disabled="currentPartQuestion == 0"
                @click="moveToPart(-1)"
                class="btn btn-primary flex items-center gap-x-2"
              >
                <span class="icon-up"></span>
                <span class="whitespace-nowrap">Câu trước</span>
              </button>
              <button
                @click="moveToPart(1)"
                :disabled="
                  lastPart ||
                  currentPartQuestion == unitDetail.questionPart.length - 1
                "
                class="btn btn-primary flex items-center gap-x-2"
              >
                <span class="whitespace-nowrap">Câu sau</span>
                <span class="icon-down"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <TheoryModal v-if="openTheoryModal" />
  <div class="mobile-next-previous-part">
    <div class="flex w-full items-center">
      <span class="mr-2" @click="showListQuestion = true"
        ><img :src="showListIcon" alt=""
      /></span>
      <div class="relative w-1/2">
        <div class="text-indigo text-sm font-semibold">
          Câu <span>{{ currentQuestion + 1 }}</span> /
          {{ unitDetail.numberQuestion }}
        </div>
        <div>
          <a-progress
            stroke-color="#3699CF"
            stroke-linecap="square"
            :percent="((currentQuestion + 1) / unitDetail.numberQuestion) * 100"
          />
        </div>
      </div>
    </div>
    <div class="flex">
      <button
        class="mr-2"
        @click="moveToPart(-1)"
        :disabled="currentPartQuestion == 0"
      >
        <img
          :src="currentPartQuestion == 0 ? circleTopDisableIcon : circleTopIcon"
          alt=""
        />
      </button>
      <button
        :disabled="
          lastPart || currentPartQuestion == unitDetail.questionPart.length - 1
        "
        @click="moveToPart(1)"
      >
        <img
          :src="
            lastPart ||
            currentPartQuestion == unitDetail.questionPart.length - 1
              ? circleDownDisableIcon
              : circleDownIcon
          "
          alt=""
        />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useUnitStore } from "../store/unitStore";
import { useModalStore } from "../store/modalStore";
import { storeToRefs } from "pinia";
import theoryIcon from "../assets/images/theory-icon.svg";
import circleTopDisableIcon from "../assets/images/circle-top-disable.svg";
import circleTopIcon from "../assets/images/circle-top.svg";
import circleDownIcon from "../assets/images/circle-down.svg";
import circleLeftIcon from "../assets/images/circle-left.svg";
import showListIcon from "../assets/images/show-list.svg";
import circleDownDisableIcon from "../assets/images/circle-down-disable.svg";
import MutipleChoiceHistory from "@/components/question/MutipleChoiceHistory.vue";
import MutipleChoiceManyHistory from "@/components/question/MutipleChoiceManyHistory.vue";
import FillInBlankHistory from "@/components/question/FillInBlankHistory.vue";
import DropboxHistory from "@/components/question/DropboxHistory.vue";
import MatchingHistory from "@/components/question/MatchingHistory.vue";
import TheoryModal from "@/components/modal/TheoryModal.vue";
export default defineComponent({
  name: "PracticeHistory",
  components: {
    MutipleChoiceManyHistory,
    MutipleChoiceHistory,
    FillInBlankHistory,
    DropboxHistory,
    MatchingHistory,
    TheoryModal,
  },
  setup() {
    const { unitDetail, questions } = storeToRefs(useUnitStore());
    const { openTheoryModal } = storeToRefs(useModalStore());
    const showListQuestion = ref(false);
    const currentPartQuestion = ref(0);
    const currentQuestion = ref(null);
    const selectedAll = ref(false);
    const lastPart = ref(false);
    const el = ref(null);
    const answerList = ref([]);
    const optionList = ref([]);
    const scrollToSection = (id) => {
      const section = document.getElementById(id);
      el.value.scrollTo({ top: section.offsetTop - 8, behavior: "smooth" });
    };
    const scrollToSectionMobile = (id) => {
      const section = document.getElementById(id);
      el.value.scrollTo({ top: section.offsetTop - 8, behavior: "smooth" });
      showListQuestion.value = false;
    };
    const onScroll = (event) => {
      const scrollTop = event.target.scrollTop;
      const clientHeight = event.target.clientHeight;
      const scrollHeight = event.target.scrollHeight;
      if (scrollTop + clientHeight == scrollHeight) {
        lastPart.value = true;
      } else {
        lastPart.value = false;
      }
      unitDetail.value.questionPart.forEach((part) => {
        const section = document.getElementById(part.id);
        if (
          section.offsetTop <= scrollTop &&
          section.offsetTop + section.offsetHeight > scrollTop
        ) {
          currentPartQuestion.value = unitDetail.value.questionPart.findIndex(
            (data) => data.id == part.id
          );
        }
      });
    };
    const moveToPart = (number) => {
      currentPartQuestion.value = currentPartQuestion.value + number;
      const id = unitDetail.value.questionPart[currentPartQuestion.value].id;
      const section = document.getElementById(id);
      el.value.scrollTo({ top: section.offsetTop, behavior: "smooth" });
    };
    onMounted(() => {
      unitDetail.value.questionPart.forEach((part) => {
        if (part.type == "QUIZ2") {
          part.questions.forEach(
            (question) =>
              (answerList.value = [...answerList.value, ...question.answers])
          );
        }
        if (part.type == "QUIZ3") {
          part.questions.forEach(
            (question) =>
              (optionList.value = [...optionList.value, ...question.answers])
          );
        }
      });
    });
    return {
      unitDetail,
      theoryIcon,
      showListQuestion,
      currentPartQuestion,
      openTheoryModal,
      selectedAll,
      currentQuestion,
      el,
      questions,
      lastPart,
      circleTopDisableIcon,
      circleDownDisableIcon,
      circleTopIcon,
      circleDownIcon,
      circleLeftIcon,
      showListIcon,
      answerList,
      optionList,
      scrollToSection,
      onScroll,
      moveToPart,
      scrollToSectionMobile,
    };
  },
});
</script>
<style>
.history-view p {
  margin: 0;
}
.history-question-wrapper {
  height: calc(100vh - 150px);
  overflow-x: hidden;
  position: relative;
  padding: 0 8px;
  width: 50%;
}
.list-answer-wrapper {
  margin-top: 0;
}
.list-answer-wrapper {
  background: white;
  border-radius: 8px;
  padding: 16px;
  width: 100%;
  margin-bottom: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  position: relative;
}
@media screen and (max-width: 767px) {
  .list-answer-wrapper {
    width: 100%;
    padding: 16px 40px;
  }
  .history-question-wrapper {
    width: 100%;
    height: calc(100vh - 120px);
  }
  .history-view .mobile-next-previous-part {
    border: 1px solid #000;
    box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
      rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  }
  @supports (-webkit-touch-callout: none) {
    .history-question-wrapper {
      width: 100%;
      height: calc(100vh - 190px);
    }
  }
}
</style>
