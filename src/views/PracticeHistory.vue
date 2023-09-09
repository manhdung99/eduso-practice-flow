<template>
  <div
    class="overflow-hidden history-view"
    v-if="JSON.stringify(lessonDetail) != '{}'"
  >
    <div
      class="px-4 py-3 lg:py-5 relative shadow shadow-gray-300 flex items-center justify-center"
    >
      <router-link :to="`/course/${route.params.courseId}/${lessonDetail.ID}`">
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
    <div class="flex relative">
      <!-- List question -->
      <div
        v-show="showListQuestion"
        class="list-question-wrapper scrool-area lg:!hidden"
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

          <div class="list-question-part scroll-area">
            <div v-for="(part, index) in questionPart" :key="part.ID">
              <h3 class="text-indigo font-semibold mb-2">
                Phần {{ index + 1 }}
              </h3>
              <!-- Question -->
              <div
                v-for="(question, questionIndex) in part.Questions"
                :key="question.questionID"
                class="flex items-center py-2 hover:bg-slate-200 cursor-pointer px-2"
                @click.prevent="scrollToSectionMobile(question.ID)"
              >
                <span
                  v-if="
                    question.status == 'true' && question.CloneAnswers != null
                  "
                  class="icon-correct-answer"
                  ><span class="path1"></span><span class="path2"></span
                  ><span class="path3"></span
                ></span>
                <span
                  v-else-if="
                    question.status == 'false' && question.CloneAnswers != null
                  "
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
      <!-- Desktop  -->
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
          <div class="list-question-part scroll-area">
            <div v-for="(part, index) in questionPart" :key="part.ID">
              <h3 class="text-indigo font-semibold mb-2">
                Phần {{ index + 1 }}
              </h3>
              <!-- Question -->
              <div
                v-for="(question, questionIndex) in part.Questions"
                :key="question.questionID"
                class="flex items-center py-2 hover:bg-slate-200 cursor-pointer px-2"
                @click.prevent="scrollToSection(question.ID)"
              >
                <span
                  v-if="
                    question.status == 'true' && question.CloneAnswers != null
                  "
                  class="icon-correct-answer"
                  ><span class="path1"></span><span class="path2"></span
                  ><span class="path3"></span
                ></span>
                <span
                  v-else-if="
                    (question.status == 'false' &&
                      question.CloneAnswers != null &&
                      part.Type != 'QUIZ3' &&
                      part.Type != 'QUIZ2') ||
                    (question.status == 'false' &&
                      question.selectedAnswer != null &&
                      question.selectedAnswer != '' &&
                      part.Type == 'QUIZ3') ||
                    (question.status == 'false' &&
                      question.Content != null &&
                      part.Type == 'QUIZ2')
                  "
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
        class="absolute -left-45 hover:left-0 top-2.5 bg-primary text-white items-center px-4 py-2 rounded-r cursor-pointer transition-all hidden lg:flex"
        @click="showListQuestion = true"
      >
        <span class="text-sm mr-2">Xem danh sách câu hỏi</span>
        <span class="icon-right ml-3"></span>
      </div>
      <div class="w-full px-4 lg:px-0">
        <div
          @scroll="onScroll($event)"
          ref="el"
          class="history-question-wrapper p-4 w-full lg:w-1/2 mx-auto"
        >
          <div class="scroll-area h-full">
            <div
              v-for="part in questionPart"
              :key="part.ID"
              class="list-answer-wrapper"
              :id="part.ID"
            >
              <div class="px-1 border-gray-300 text-sm">
                <div
                  class="px-1 pb-2 lg:pb-4 border-b border-gray-300 text-sm flex justify-between"
                >
                  <div class="flex-1">
                    <div v-html="part.Title"></div>
                    <div v-if="part.Media != null">
                      <audio :src="part.Media.Path" :controls="true"></audio>
                    </div>
                    <div
                      v-if="part.Description != null && part.Type != 'QUIZ2'"
                      v-html="part.Description"
                    ></div>
                  </div>
                  <span
                    v-if="theoryData != null && theoryData.length > 0"
                    class="hover:opacity-80 cursor-pointer"
                  >
                    <img
                      @click="updateTheoryModalStatus(true)"
                      class=""
                      :src="theoryIcon"
                      alt=""
                    />
                  </span>
                </div>
              </div>
              <div v-if="part.Type == 'QUIZ1'">
                <MutipleChoiceHistory
                  v-for="(question, index) in part.Questions"
                  :key="question.questionID"
                  :question="question"
                  :index="index"
                />
              </div>
              <div v-if="part.Type == 'QUIZ2'">
                <FillInBlankHistory
                  :question="part"
                  :partID="part.ID"
                  :answerList="answerList"
                  :oldAnswer="oldAnswer"
                  :fillInBlankQuestionList="fillInBlankQuestionList"
                />
              </div>
              <div v-if="part.Type == 'QUIZ3'">
                <MatchingHistory
                  v-for="(question, index) in part.Questions"
                  :key="question.questionID"
                  :question="question"
                  :index="index"
                  :partID="part.ID"
                  :currentPartQuestion="questionPart"
                />
              </div>
              <div v-if="part.Type == 'QUIZ4'">
                <MutipleChoiceManyHistory
                  v-for="(question, index) in part.Questions"
                  :key="question.questionID"
                  :question="question"
                  :index="index"
                />
              </div>
            </div>
          </div>

          <!-- Mobile bottom  -->
        </div>
        <!-- Desktop bottom  -->
        <div class="relative bottom-2 ml-1/2 -translate-x-1/2 w-1/2 mt-6">
          <div class="mt-4 justify-between hidden items-center lg:flex">
            <div class="w-1/3 relative">
              <div>
                Câu <span>{{ currentQuestion + 1 }}</span> /
                {{ lessonDetail.TotalQuestions }}
              </div>
            </div>
            <div class="flex">
              <button
                :disabled="firstPart"
                @click="currentQuestion--"
                class="btn btn-primary flex items-center mr-2"
              >
                <span class="icon-up mr-1"></span>
                <span class="whitespace-nowrap ml-1">Câu trước</span>
              </button>
              <button
                @click="currentQuestion++"
                :disabled="lastPart || currentQuestion == questionList.length"
                class="btn btn-primary flex items-center ml-2"
              >
                <span class="whitespace-nowrap mr-1">Câu sau</span>
                <span class="icon-down ml-1"></span>
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
          {{ lessonDetail.TotalQuestions }}
        </div>
      </div>
    </div>
    <div class="flex">
      <button
        class="mr-2"
        @click="currentQuestion--"
        :disabled="currentQuestion == 0"
      >
        <img
          :src="currentQuestion == 0 ? circleTopDisableIcon : circleTopIcon"
          alt=""
        />
      </button>
      <button
        :disabled="lastPart || currentQuestion == questionList.length - 1"
        @click="currentQuestion++"
      >
        <img
          :src="
            lastPart || currentPartQuestion == questionPart.length - 1
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
import { defineComponent, onMounted, ref, watch } from "vue";
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
import MatchingHistory from "@/components/question/MatchingHistory.vue";
import TheoryModal from "@/components/modal/TheoryModal.vue";
import { useRoute } from "vue-router";
import {
  addStaticURLForDescription,
  addStaticURLForMedia,
} from "@/uses/changeURL";
export default defineComponent({
  name: "PracticeHistory",
  components: {
    MutipleChoiceManyHistory,
    MutipleChoiceHistory,
    FillInBlankHistory,
    // DropboxHistory,
    MatchingHistory,
    TheoryModal,
  },
  setup() {
    const { lessonDetail, questions, oldAnswer, theoryData } = storeToRefs(
      useUnitStore()
    );
    const {
      setLessonDetail,
      getQuestion,
      setLessonQuestion,
      getOldAnswer,
      setTheoryData,
    } = useUnitStore();
    const { openTheoryModal } = storeToRefs(useModalStore());
    const { updateTheoryModalStatus } = useModalStore();
    const showListQuestion = ref(false);
    const currentPartQuestion = ref(0);
    const currentQuestion = ref(0);
    const selectedAll = ref(false);
    const lastPart = ref(false);
    const firstPart = ref(true);
    const el = ref(null);
    const answerList = ref([]);
    const optionList = ref([]);
    const questionList = ref([]);
    const fillInBlankQuestionList = ref([]);
    const route = useRoute();
    const questionPart = ref([]);
    const scrollToSection = (id) => {
      currentQuestion.value = questionList.value.findIndex(
        (question) => question.ID == id
      );
    };
    const scrollToSectionMobile = (id) => {
      currentQuestion.value = questionList.value.findIndex(
        (question) => question.ID == id
      );
      showListQuestion.value = false;
    };
    const onScroll = (event) => {
      const scrollTop = event.target.scrollTop;
      const clientHeight = event.target.clientHeight;
      const scrollHeight = event.target.scrollHeight;
      if (scrollTop <= 100) {
        firstPart.value = true;
      } else {
        firstPart.value = false;
      }
      if (scrollTop + clientHeight == scrollHeight) {
        lastPart.value = true;
      } else {
        lastPart.value = false;
      }
      let questionHeights = [];
      let cumulativeHeight = 0;
      questionList.value.forEach((question) => {
        const questionHeight = question.clientHeight;
        cumulativeHeight += questionHeight;
        questionHeights.push(cumulativeHeight);
      });
    };
    const moveToPart = (number) => {
      currentPartQuestion.value = currentPartQuestion.value + number;
      const id = questionPart.value[currentPartQuestion.value].id;
      const section = document.getElementById(id);
      el.value.scrollTo({ top: section.offsetTop, behavior: "smooth" });
    };
    onMounted(async () => {
      await setLessonDetail(route.params.id as string); // Get lesson detail info when reload page
      await getQuestion(route.params.id as string); // get liet question
      await getOldAnswer(route.params.id as string); // get old answer
      await setTheoryData(route.params.id as string);
      questionPart.value = (await setLessonQuestion(
        route.params.id as string
      )) as Array<any>;
      // Change URL in Media and Description
      questionPart.value = questionPart.value.map((part) => {
        const newPart = { ...part, status: "unmake" };
        newPart.Description = addStaticURLForDescription(newPart.Description);
        newPart.Media = addStaticURLForMedia(newPart.Media);
        return newPart;
      });
      questionPart.value.forEach((part) => {
        part.Questions = part.Questions.map((question) => {
          question = { ...question, status: "unmake" };
          //Check url image
          question.Description = addStaticURLForDescription(
            question.Description
          );
          question.Answers = question.Answers.map((answer) => {
            const newAnswer = { ...answer };
            newAnswer.Media = addStaticURLForMedia(newAnswer.Media);
            return newAnswer;
          });
          // Add new field for matching type
          if (part.Type == "QUIZ3") {
            question = {
              ...question,
              selectedAnswer: "",
              selectedAnswerID: "",
            };
          }
          // Change answer to array
          if (part.Type == "QUIZ4") {
            question = { ...question, correctAnswerLeft: 0 };
            if (question.CloneAnswers == null) {
              question.CloneAnswers = [];
            }
          }
          //Check old answer
          oldAnswer.value.forEach((old) => {
            // If question answered
            if (question.ID == old.QuestionID) {
              //Type mutiple choice (single)
              if (old.TypePart == "QUIZ1") {
                question.CloneAnswers = old.AnswerID;
                if (old.AnswerID == old.RealAnswerID) {
                  question.status = "true";
                } else {
                  question.status = "false";
                }
              }
              //Type fill in blank (single)
              else if (old.TypePart == "QUIZ2") {
                question.status = "false";
                question.Content = old.AnswerValue;
                question.Answers.forEach((answer) => {
                  if (answer.Content == old.AnswerValue) {
                    question.status = "true";
                  }
                });
              }
              //Type matching
              else if (old.TypePart == "QUIZ3") {
                if (old.RealAnswerID == null) {
                  question.status = "false";
                } else {
                  question.status = "true";
                }
                if (old.Media == null) {
                  question.selectedAnswer = old.AnswerValue;
                } else {
                  old.Media = addStaticURLForMedia(old.Media);
                  question.selectedAnswer = old.Media;
                }
                question.selectedAnswerID = old.AnswerID;
              } else if (old.TypePart == "QUIZ4") {
                if (question.CloneAnswers && question.CloneAnswers != null) {
                  if (old.AnswerID != null) {
                    question.CloneAnswers = old.AnswerID.split(",");
                    const oldSortAnswer = old.AnswerID.split(",").sort();
                    if (old.RealAnswerID == null) {
                      question.status = "false";
                    } else {
                      const oldSortRealAnswer =
                        old.RealAnswerID.split(",").sort();
                      question.status = "true";
                      oldSortAnswer.forEach((answer) => {
                        if (!oldSortRealAnswer.includes(answer)) {
                          question.status = "false";
                        }
                      });
                    }
                    let correctAnswer = question.Answers.filter(
                      (answer) => answer.IsCorrect
                    );
                    correctAnswer = correctAnswer.map((answer) => answer.ID);
                    question.correctAnswerLeft = correctAnswer.length;
                    oldSortAnswer.forEach((answer) => {
                      if (correctAnswer.includes(answer)) {
                        question.correctAnswerLeft--;
                      }
                    });
                  }
                }
              }
            }
          });
          return question;
        });
        questionList.value = [...questionList.value, ...part.Questions];
        if (part.Type == "QUIZ2") {
          fillInBlankQuestionList.value = [
            ...fillInBlankQuestionList.value,
            ...part.Questions,
          ];
        }
      });
    });
    watch(
      () => currentQuestion.value,
      () => {
        const id = questionList.value[currentQuestion.value].ID;
        const section = document.getElementById(id);
        section.scrollIntoView({ behavior: "smooth" });
      }
    );
    return {
      lessonDetail,
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
      questionPart,
      oldAnswer,
      questionList,
      fillInBlankQuestionList,
      theoryData,
      updateTheoryModalStatus,
      firstPart,
      route,
    };
  },
});
</script>
<style>
.history-view p {
  margin: 0;
}
.history-view .list-question {
  height: 100%;
}
.history-question-wrapper {
  height: calc(100vh - 154px);
  overflow-x: hidden;
  position: relative;
  padding: 0 1rem;
  margin-top: 16px;
  background: white;
  border-radius: 12px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
}
.list-answer-wrapper {
  margin-top: 0;
}
.list-answer-wrapper {
  background: white;
  border-radius: 8px;
  width: 100%;
  margin-bottom: 10px;
  position: relative;
}
@media screen and (max-width: 767px) {
  .list-answer-wrapper {
    width: 100%;
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
