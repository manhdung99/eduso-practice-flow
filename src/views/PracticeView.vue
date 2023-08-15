<template>
  <div class="overflow-hidden pb-2 lg:pb-0">
    <div
      class="px-4 py-3 lg:py-5 relative shadow shadow-gray-300 flex items-center justify-center"
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
        {{ lessonDetail.Title }}
      </div>
    </div>
    <div class="px-4 lg:px-0 mt-4 lg:mt-0">
      <div v-if="currentPartQuestion && !showWorkbook" class="relative px-0">
        <div class="flex">
          <div>
            <!-- List question -->
            <div v-if="showAnswer" class="list-question-wrapper">
              <div class="list-question h-full hidden lg:block">
                <div class="flex items-center mb-6 justify-between">
                  <div class="text-lg text-indigo-darker font-medium">
                    Danh sách câu hỏi
                  </div>
                  <span
                    @click="showAnswer = false"
                    class="icon-close text-xs cursor-pointer text-gray-400 hover:text-black"
                  ></span>
                </div>
                <p class="text-sm italic text-indigo-lighter mb-5 font-medium">
                  Đã trả lời {{ lessonDetail.CompleteQuestions }}/{{
                    lessonDetail.TotalQuestions
                  }}
                  câu
                </p>
                <div class="list-question-part scroll-area">
                  <div v-for="(part, index) in questionPart" :key="part.id">
                    <h3 class="text-indigo font-semibold mb-2">
                      Phần {{ index + 1 }}
                    </h3>
                    <!-- Question -->
                    <div
                      v-for="(question, questionIndex) in part.Questions"
                      :key="question.ID"
                      @click="moveToChoosedQuestion(part.ID, question.ID)"
                      class="flex items-center py-2 hover:bg-slate-200 cursor-pointer"
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
              <div class="list-question lg:!hidden">
                <div class="flex items-center mb-6 justify-between">
                  <div class="text-lg text-indigo-darker font-medium">
                    Danh sách câu hỏi
                  </div>
                  <span
                    @click="showAnswer = false"
                    class="icon-close text-xs cursor-pointer text-gray-400 hover:text-black"
                  ></span>
                </div>
                <p class="text-sm italic text-indigo-lighter mb-5 font-medium">
                  Đã trả lời {{ lessonDetail.CompleteQuestions }}/{{
                    lessonDetail.TotalQuestions
                  }}
                  câu
                </p>
                <div class="list-question-part scroll-area">
                  <div v-for="(part, index) in questionPart" :key="part.id">
                    <h3 class="text-indigo font-semibold mb-2">
                      Phần {{ index + 1 }}
                    </h3>
                    <!-- Question -->
                    <div
                      v-for="(question, questionIndex) in part.Questions"
                      :key="question.ID"
                      @click="moveToChoosedQuestionMobile(part.ID, question.ID)"
                      class="flex items-center py-2 hover:bg-slate-200 cursor-pointer"
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
              class="absolute -left-42 hover:left-0 top-4 bg-primary text-white items-center px-4 py-2 rounded-r cursor-pointer transition-all hidden lg:flex"
              @click="showAnswer = true"
              v-else
            >
              <span class="text-sm mr-2">Xem danh sách câu hỏi</span>
              <span class="icon-right ml-3"></span>
            </div>
          </div>
          <div class="px-0 pb-2 w-full">
            <!-- Matching  -->
            <div
              v-if="currentPartQuestion.Type == 'QUIZ3'"
              class="two-question-wrapper lg:mx-auto mt-4"
            >
              <div class="w-full h-full px-0 relative">
                <div ref="el" class="question-wrapper scroll-area">
                  <Matching
                    :currentPartQuestion="currentPartQuestion"
                    :setAllSelectd="setAllSelectd"
                    :unitIndex="partIndex"
                    :answerList="answerList"
                  />
                </div>
                <div
                  class="checking-btn-wrapper matching"
                  v-if="currentPartQuestion.status == 'unmake'"
                >
                  <button
                    :disabled="!selectedAll"
                    class="check-btn btn !m-0"
                    @click="checkAnswer"
                  >
                    Kiểm tra
                  </button>
                </div>
                <div
                  class="checking-btn-wrapper matching"
                  v-else-if="currentPartQuestion.status == 'true'"
                >
                  <button @click="goNextPartQuestion" class="check-btn btn">
                    Tiếp tục
                  </button>
                </div>
                <div class="checking-btn-wrapper matching" v-else>
                  <button
                    @click="goNextPartQuestion"
                    class="btn btn-disable w-1/3 hover:bg-gray-400 hover:text-white"
                  >
                    Bỏ qua
                  </button>
                  <button @click="redoQuestion" class="btn btn-primary w-2/3">
                    Làm lại
                  </button>
                </div>
              </div>
            </div>
            <!-- One question  -->
            <div
              v-if="
                currentPartQuestion.Type != 'QUIZ3' &&
                (currentPartQuestion.Type == 'QUIZ2' ||
                  currentPartQuestion.Questions.length < 2 ||
                  ((!currentPartQuestion.Title ||
                    currentPartQuestion.Title.split(' ').length < 200) &&
                    (!currentPartQuestion.Description ||
                      currentPartQuestion.Description.split(' ').length < 200)))
              "
              class="one-question-wrapper"
            >
              <div ref="el" class="content-question-part scroll-area">
                <!-- <div class="px-1 pb-2 lg:pb-8 border-b border-gray-300 text-sm">
                  <div v-html="currentPartQuestion.Description"></div>
                </div> -->
                <div class="h-full" v-if="currentPartQuestion.Type == 'QUIZ1'">
                  <div
                    class="px-1 pb-2 lg:pb-4 border-b border-gray-300 text-sm flex justify-between"
                  >
                    <div class="w-9/10">
                      <div v-html="currentPartQuestion.Title"></div>
                      <div v-if="currentPartQuestion.Media != null">
                        <audio
                          :src="currentPartQuestion.Media.Path"
                          :controls="true"
                        ></audio>
                      </div>
                      <div
                        v-if="currentPartQuestion.Description != null"
                        v-html="currentPartQuestion.Description"
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

                  <MutipleChoice
                    v-for="(question, index) in currentPartQuestion.Questions"
                    :key="question.questionID"
                    :updateSelectedAnswer="updateSelectedAnswer"
                    :question="question"
                    :index="index"
                    :partID="currentPartQuestion.ID"
                  />
                </div>
                <div class="" v-if="currentPartQuestion.Type == 'QUIZ2'">
                  <div
                    class="px-1 pb-2 lg:pb-4 border-b border-gray-300 text-sm flex justify-between"
                  >
                    <div class="w-9/10">
                      <div v-html="currentPartQuestion.Title"></div>
                      <div v-if="currentPartQuestion.Media != null">
                        <audio
                          :src="currentPartQuestion.Media.Path"
                          :controls="true"
                        ></audio>
                      </div>
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
                  <FillInBlank
                    :class="
                      currentPartQuestion.Questions.length < 2
                        ? 'one-question scroll-area'
                        : ''
                    "
                    :question="currentPartQuestion"
                    :partID="currentPartQuestion.ID"
                    :answerList="answerList"
                    :oldAnswer="oldAnswer"
                    :partIndex="partIndex"
                  />
                </div>
                <!-- <div class="h-full" v-if="currentPartQuestion.Type == 'QUIZ3'">
                  <DropBox
                    :class="
                      currentPartQuestion.Questions.length < 2
                        ? 'one-question scroll-area'
                        : ''
                    "
                    :question="currentPartQuestion"
                    :partID="currentPartQuestion.ID"
                    :optionList="optionList"
                    :oldAnswer="oldAnswer"
                  />
                </div> -->
                <div class="h-full" v-if="currentPartQuestion.Type == 'QUIZ4'">
                  <div
                    class="px-1 pb-2 lg:pb-4 border-b border-gray-300 text-sm flex justify-between"
                  >
                    <div class="w-9/10">
                      <div v-html="currentPartQuestion.Title"></div>
                      <div v-if="currentPartQuestion.Media != null">
                        <audio
                          :src="currentPartQuestion.Media.Path"
                          :controls="true"
                        ></audio>
                      </div>
                      <div
                        v-if="currentPartQuestion.Description != null"
                        v-html="currentPartQuestion.Description"
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
                  <MutipleChoiceMany
                    v-for="(question, index) in currentPartQuestion.Questions"
                    :key="question.questionID"
                    :updateSelectedAnswerMany="updateSelectedAnswerMany"
                    :question="question"
                    :index="index"
                    :partID="currentPartQuestion.id"
                  />
                </div>
                <div
                  class="checking-btn-wrapper"
                  v-if="currentPartQuestion.status == 'unmake'"
                >
                  <button
                    :disabled="!selectedAll"
                    class="check-btn btn !m-0"
                    @click="checkAnswer"
                  >
                    Kiểm tra
                  </button>
                </div>
                <div
                  class="checking-btn-wrapper"
                  v-else-if="currentPartQuestion.status == 'true'"
                >
                  <button @click="goNextPartQuestion" class="check-btn btn">
                    Tiếp tục
                  </button>
                </div>
                <div class="checking-btn-wrapper" v-else>
                  <button
                    @click="goNextPartQuestion"
                    class="btn btn-disable w-1/3 hover:bg-gray-400 hover:text-white"
                  >
                    Bỏ qua
                  </button>
                  <button @click="redoQuestion" class="btn btn-primary w-2/3">
                    Làm lại
                  </button>
                </div>
              </div>
            </div>
            <!-- 2 Question  -->
            <div
              v-if="
                (currentPartQuestion.Type == 'QUIZ1' ||
                  currentPartQuestion.Type == 'QUIZ4') &&
                currentPartQuestion.Questions.length > 2 &&
                ((currentPartQuestion.Title &&
                  currentPartQuestion.Title.split(' ').length > 200) ||
                  (currentPartQuestion.Description &&
                    currentPartQuestion.Description.split(' ').length > 200))
              "
              class="two-question-wrapper lg:mx-auto mt-4"
            >
              <div
                :class="showTheoryMobile ? 'show' : ''"
                class="theory-question-part shadow-primary"
              >
                <span
                  v-if="showTheoryMobile"
                  @click="showTheoryMobile = false"
                  class="absolute top-1/2 -left-4 lg:hidden"
                >
                  <img :src="circleRightIcon" alt=""
                /></span>
                <div class="scroll-area theory-content scroll-x">
                  <div
                    v-if="currentPartQuestion.Title"
                    v-html="currentPartQuestion.Title"
                  ></div>
                  <div
                    v-if="currentPartQuestion.Description"
                    v-html="currentPartQuestion.Description"
                  ></div>
                </div>
                <div class="checking-btn-wrapper">
                  <button
                    @click="showTheoryMobile = false"
                    class="btn check-btn text-base lg:hidden"
                  >
                    Xem câu hỏi
                  </button>
                </div>
              </div>
              <div
                ref="el"
                :class="!showTheoryMobile ? 'show' : ''"
                class="answer-question-part"
              >
                <span
                  v-if="!showTheoryMobile"
                  @click="showTheoryMobile = true"
                  class="absolute top-1/2 -right-4 lg:hidden"
                >
                  <img :src="circleLeftIcon" alt=""
                /></span>
                <div class="question-wrapper scroll-area">
                  <div v-if="currentPartQuestion.Type == 'QUIZ1'">
                    <MutipleChoice
                      v-for="(question, index) in currentPartQuestion.Questions"
                      :key="question.questionID"
                      :updateSelectedAnswer="updateSelectedAnswer"
                      :question="question"
                      :index="index"
                      :partID="currentPartQuestion.id"
                    />
                  </div>
                  <div v-if="currentPartQuestion.Type == 'QUIZ4'">
                    <MutipleChoiceMany
                      v-for="(question, index) in currentPartQuestion.Questions"
                      :key="question.questionID"
                      :updateSelectedAnswerMany="updateSelectedAnswerMany"
                      :question="question"
                      :index="index"
                      :partID="currentPartQuestion.id"
                    />
                  </div>
                </div>
                <div
                  class="checking-btn-wrapper"
                  v-if="currentPartQuestion.status == 'unmake'"
                >
                  <button
                    :disabled="!selectedAll"
                    class="check-btn btn !m-0"
                    @click="checkAnswer"
                  >
                    Kiểm tra
                  </button>
                </div>
                <div
                  class="checking-btn-wrapper"
                  v-else-if="currentPartQuestion.status == 'true'"
                >
                  <button @click="goNextPartQuestion" class="check-btn btn">
                    Tiếp tục
                  </button>
                </div>
                <div class="checking-btn-wrapper" v-else>
                  <button
                    @click="goNextPartQuestion"
                    class="btn btn-disable w-1/3 hover:bg-gray-400 hover:text-white"
                  >
                    Bỏ qua
                  </button>
                  <button @click="redoQuestion" class="btn btn-primary w-2/3">
                    Làm lại
                  </button>
                </div>
              </div>
            </div>
            <!-- Desktop next/previous part -->
            <div
              :class="[
                ((currentPartQuestion.Type == 'QUIZ1' ||
                  currentPartQuestion.Type == 'QUIZ4') &&
                  currentPartQuestion.Questions.length > 2 &&
                  ((currentPartQuestion.Title &&
                    currentPartQuestion.Title.split(' ').length > 200) ||
                    (currentPartQuestion.Description &&
                      currentPartQuestion.Description.split(' ').length >
                        200))) ||
                currentPartQuestion.Type == 'QUIZ3'
                  ? 'two-question'
                  : '',
                showAnswer ? 'openmenu' : '',
              ]"
              class="desktop-next-previous-part"
            >
              <div class="w-1/3 relative">
                <div>
                  Câu <span>{{ currentQuestion + 1 }}</span> /
                  {{ lessonDetail.TotalQuestions }}
                </div>
                <div>
                  <a-progress
                    stroke-color="#3699CF"
                    stroke-linecap="square"
                    :percent="
                      (lessonDetail.CompleteQuestions /
                        lessonDetail.TotalQuestions) *
                      100
                    "
                  />
                </div>
              </div>
              <div class="flex">
                <button
                  @click="partIndex--"
                  :disabled="partIndex == 0"
                  class="btn btn-primary flex items-center mr-2"
                >
                  <span class="icon-up mr-1"></span>
                  <span class="whitespace-nowrap ml-1">Câu trước</span>
                </button>
                <button
                  @click="goNextPartQuestion"
                  class="btn btn-primary flex items-center ml-2"
                >
                  <span class="whitespace-nowrap mr-1">Câu sau</span>
                  <span class="icon-down ml-1"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- Mobile -->
        <div class="mobile-next-previous-part">
          <div class="flex w-full items-center">
            <span class="mr-2" @click="showAnswer = true"
              ><img :src="showListIcon" alt=""
            /></span>
            <div class="relative w-1/2">
              <div class="text-indigo text-sm font-semibold">
                Câu <span>{{ currentQuestion + 1 }}</span> /
                {{ lessonDetail.TotalQuestions }}
              </div>
              <div>
                <a-progress
                  stroke-color="#3699CF"
                  stroke-linecap="square"
                  :percent="
                    (lessonDetail.CompleteQuestions /
                      lessonDetail.TotalQuestions) *
                    100
                  "
                />
              </div>
            </div>
          </div>
          <div class="flex">
            <button
              @click="partIndex--"
              :disabled="partIndex == 0"
              class="mr-2"
            >
              <img
                :src="partIndex == 0 ? circleTopDisableIcon : circleTopIcon"
                alt=""
              />
            </button>
            <button @click="goNextPartQuestion">
              <img :src="circleDownIcon" alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="workbook-body" v-if="currentPartQuestion && showWorkbook">
      <div class="workbook-question-wrapper mt-4">
        <span
          @click="showWorkbook = false"
          class="icon-close absolute right-2 top-2 lg:right-4 lg:top-4 text-lg text-gray-500 hover:text-black cursor-pointer"
        ></span>
        <div class="history-content">
          <h2 class="text-lg text-indigo">Bạn đã làm rất tốt</h2>
          <h3 class="italic text-indigo-lighter">
            Hãy nhấn vào nút “Hoàn thành” để xem lại đáp án và đánh giá kết quả
            của mình.
          </h3>
          <p class="text-sm text-indigo-lighter mt-5 mb-5 font-medium">
            Đã trả lời {{ lessonDetail.CompleteQuestions }}/{{
              lessonDetail.TotalQuestions
            }}
            câu
            <span class="text-raspberry italic"
              >(còn
              {{ lessonDetail.TotalQuestions - lessonDetail.CompleteQuestions }}
              câu)</span
            >
          </p>
          <div class="list-question-part scroll-area">
            <div v-for="(part, index) in questionPart" :key="part.ID">
              <h3 class="text-indigo font-semibold mb-2">
                Phần {{ index + 1 }}
              </h3>
              <!-- Question -->
              <div
                v-for="(question, questionIndex) in part.Questions"
                :key="question.questionID"
                class="flex justify-between"
              >
                <div class="flex items-center py-2">
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
                <span
                  v-if="question.status != 'true' && question.status != 'false'"
                  @click="
                    moveToChoosedQuestion(part.ID, question.ID);
                    showWorkbook = false;
                  "
                  class="text-iceberg-lighter italic hover:underline cursor-pointer"
                  >Làm ngay</span
                >
              </div>
            </div>
          </div>

          <button @click="completeLesson" class="btn btn-primary complete-btn">
            Hoàn thành
          </button>
        </div>
      </div>
    </div>
    <div
      class="text-center mt-4 text-raspberry font-semibold text-xl"
      v-if="currentPartQuestion == null && !loading"
    >
      Bài này chưa có nội dung
    </div>
    <div class="loading-img" v-if="loading">
      <img src="../assets/images/Loading_icon.gif" alt="" />
    </div>
  </div>
  <TheoryModal v-if="openTheoryModal" />
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, ref, watch } from "vue";
import { useUnitStore } from "../store/unitStore";
import { useModalStore } from "../store/modalStore";
import { storeToRefs } from "pinia";
import theoryIcon from "../assets/images/theory-icon.svg";
import circleTopDisableIcon from "../assets/images/circle-top-disable.svg";
import circleTopIcon from "../assets/images/circle-top.svg";
import circleDownIcon from "../assets/images/circle-down.svg";
import circleLeftIcon from "../assets/images/circle-left.svg";
import circleRightIcon from "../assets/images/circle-right.svg";
import circleDownDisableIcon from "../assets/images/circle-down-disable.svg";
import showListIcon from "../assets/images/show-list.svg";
import MutipleChoice from "@/components/question/MutipleChoice.vue";
import MutipleChoiceMany from "@/components/question/MutipleChoiceMany.vue";
import FillInBlank from "@/components/question/FillInBlank.vue";
// import DropBox from "@/components/question/Dropbox.vue";
import Matching from "@/components/question/Matching.vue";
import TheoryModal from "@/components/modal/TheoryModal.vue";
import { useRoute } from "vue-router";
import {
  addStaticURLForDescription,
  addStaticURLForMedia,
  updatEdusolutionToEduso,
} from "@/uses/changeURL";
import router from "@/router";
export default defineComponent({
  name: "PracticeView",
  components: {
    MutipleChoice,
    TheoryModal,
    FillInBlank,
    // DropBox,
    Matching,
    MutipleChoiceMany,
  },
  setup() {
    const { questions, lessonDetail, lessonQuestion, oldAnswer, theoryData } =
      storeToRefs(useUnitStore());
    const {
      setLessonQuestion,
      getQuestion,
      getOldAnswer,
      setLessonDetail,
      updateAnswer,
      redoPart,
      setTheoryData,
    } = useUnitStore();
    const { openTheoryModal } = storeToRefs(useModalStore());
    const { updateTheoryModalStatus } = useModalStore();
    const prevRoute = ref("");
    const showAnswer = ref(false);
    const currentPartQuestion = ref(null);
    const currentQuestion = ref(null);
    const selectedAll = ref(false);
    const showTheoryMobile = ref(true);
    const answerList = ref([]);
    const optionList = ref([]);
    const showWorkbook = ref(false);
    const route = useRoute();
    const questionPart = ref([]);
    const partIndex = ref(0);
    const el = ref(null);
    const loading = ref(null);
    //Update answer type Mutiple choice
    const updateSelectedAnswer = (questionID, answerID) => {
      const question = currentPartQuestion.value.Questions.find(
        (data) => data.ID == questionID
      );
      if (question.status == "unmake") {
        question.CloneAnswers = answerID;
        selectedAll.value = true;
        currentPartQuestion.value.Questions.forEach((question) => {
          if (
            question.CloneAnswers == null ||
            question.CloneAnswers.length < 1
          ) {
            selectedAll.value = false;
          }
        });
      }
    };
    // Update Select mutiple choice answer
    const updateSelectedAnswerMany = (questionID, answerID) => {
      const question = currentPartQuestion.value.Questions.find(
        (data) => data.ID == questionID
      );
      if (question.status == "unmake") {
        if (question.CloneAnswers.includes(answerID)) {
          question.CloneAnswers = question.CloneAnswers.filter(
            (answer) => answer !== answerID
          );
        } else {
          question.CloneAnswers = [...question.CloneAnswers, answerID];
        }

        selectedAll.value = true;
        currentPartQuestion.value.Questions.forEach((question) => {
          if (
            question.CloneAnswers == null ||
            question.CloneAnswers.length == 0
          ) {
            selectedAll.value = false;
          }
        });
      }
    };
    const goNextPartQuestion = () => {
      if (partIndex.value < questionPart.value.length - 1) {
        partIndex.value++;
      } else {
        lessonDetail.value.completed = true;
        showWorkbook.value = true;
      }
    };
    const checkAnswer = () => {
      // Mutiple check single
      if (currentPartQuestion.value.Type == "QUIZ1") {
        for (let i = 0; i < currentPartQuestion.value.Questions.length; i++) {
          const question = currentPartQuestion.value.Questions[i];
          const currentAnswer = question.Answers.find(
            (answer) => answer.ID == question.CloneAnswers
          );
          const correctAnswer = question.Answers.find(
            (answer) => answer.IsCorrect == true
          );
          if (currentAnswer.IsCorrect) {
            lessonDetail.value.numberQuestionCorrect++;
            question.status = "true";
          } else {
            question.status = "false";
          }
          lessonDetail.value.CompleteQuestions++;
          updateAnswerToDatabase(
            question.ID,
            currentAnswer.ID,
            correctAnswer.ID
          );
        }
        currentPartQuestion.value.status = "true";
        currentPartQuestion.value.Questions.forEach((question) => {
          if (question.status == "false") {
            currentPartQuestion.value.status = "false";
          }
        });
      }
      // Type fill in blank & select box
      else if (currentPartQuestion.value.Type == "QUIZ2") {
        currentPartQuestion.value.status = "true";
        currentPartQuestion.value.Questions.forEach((question) => {
          lessonDetail.value.CompleteQuestions++;
          const answers = question.Answers;
          const input = document.getElementById(
            question.ID
          ) as HTMLInputElement;
          question.Content = input.value;
          input.setAttribute("disabled", "");
          question.status = "false";
          answers.forEach((answer) => {
            if (question.Content == answer.Content) {
              question.status = "true";
            }
          });
          if (question.status == true) {
            lessonDetail.value.numberQuestionCorrect++;
            input.classList.add("true");
          } else {
            input.classList.add("false");
            currentPartQuestion.value.status = "false";
          }
          updateAnswerToDatabase(question.ID, null, question.Content);
        });
      } else if (currentPartQuestion.value.Type == "QUIZ3") {
        const questions = currentPartQuestion.value.Questions;
        const questionLength = currentPartQuestion.value.Questions.length;
        for (let i = 0; i < questionLength; i++) {
          lessonDetail.value.CompleteQuestions++;
          if (questions[i].selectedAnswerID == questions[i].Answers[0].ID) {
            questions[i].status = "true";
            lessonDetail.value.numberQuestionCorrect++;
          } else {
            questions[i].status = "false";
          }
          updateAnswerToDatabase(
            questions[i].ID,
            questions[i].selectedAnswerID,
            null
          );
        }
      } else if (currentPartQuestion.value.Type == "QUIZ4") {
        currentPartQuestion.value.Questions.forEach((question) => {
          question.status = "true";
          let correctAnswers = question.Answers.filter(
            (answer) => answer.IsCorrect
          );
          correctAnswers = correctAnswers.map((answer) => answer.ID);
          const sortedCorrect = correctAnswers.sort();
          const sortedSelect = question.CloneAnswers.sort();
          question.correctAnswerLeft = sortedCorrect.length;
          for (let i = 0; i < sortedSelect.length; i++) {
            if (!sortedCorrect.includes(sortedSelect[i])) {
              question.status = "false";
            } else {
              question.correctAnswerLeft--;
            }
          }
          if (
            sortedCorrect.length < sortedSelect.length ||
            question.correctAnswerLeft != 0
          ) {
            question.status = "false";
          }
          updateAnswerToDatabase(question.ID, question.CloneAnswers, null);
        });
      }
      currentPartQuestion.value.status = "true";
      currentPartQuestion.value.Questions.forEach((question) => {
        if (question.status == "false") {
          currentPartQuestion.value.status = "false";
        }
      });
      cucalatorQuestion();
    };
    // reset question
    const redoQuestion = () => {
      currentPartQuestion.value.status = "unmake";
      selectedAll.value = false;
      //Type choice (Single)
      if (currentPartQuestion.value.Type == "QUIZ1") {
        for (let i = 0; i < currentPartQuestion.value.Questions.length; i++) {
          const question = currentPartQuestion.value.Questions[i];
          if (question.status == "false") {
            question.CloneAnswers = "";
            question.status = "unmake";
          }
        }
      }
      //Type fill in blank
      else if (currentPartQuestion.value.Type == "QUIZ2") {
        for (let i = 0; i < currentPartQuestion.value.Questions.length; i++) {
          const question = currentPartQuestion.value.Questions[i];
          const input = document.getElementById(question.ID);
          if (input.classList.contains("false")) {
            input.classList.remove("false");
            input.removeAttribute("disabled");
            question.status = "unmake";
          }
        }
      }
      // Type Matching
      else if (currentPartQuestion.value.Type == "QUIZ3") {
        const questionLength = currentPartQuestion.value.Questions.length;
        for (let i = 0; i < questionLength; i++) {
          const question = currentPartQuestion.value.Questions[i];
          if (question.status == "false") {
            const answersLength = answerList.value.length;
            for (let i = 0; i < answersLength; i++) {
              const answer = answerList.value[i];
              if (question.selectedAnswerID == answer.ID) {
                answer.isShow = true;
              }
            }
            question.selectedAnswer = "";
            question.selectedAnswerID = "";
            question.status = "unmake";
          }
        }
      }
      //Type Choice (Mutiple)
      else if (currentPartQuestion.value.Type == "QUIZ4") {
        for (let i = 0; i < currentPartQuestion.value.Questions.length; i++) {
          const question = currentPartQuestion.value.Questions[i];
          let correctAnswer = question.Answers.filter(
            (answer) => answer.IsCorrect
          );
          correctAnswer = correctAnswer.map((answer) => answer.ID);
          question.CloneAnswers.forEach((answer) => {
            if (!correctAnswer.includes(answer)) {
              question.CloneAnswers = question.CloneAnswers.filter(
                (data) => data != answer
              );
            }
          });
          question.correctAnswerLeft = 0;
        }
      }
      const data = new FormData();
      data.append("partID", currentPartQuestion.value.ID);
      cucalatorQuestion();
      redoPart(data);
    };
    // Push data to DB
    const updateAnswerToDatabase = (QuestionID, AnswerID, AnswerValue) => {
      const data = new FormData();
      data.append("QuestionID", QuestionID);
      if (AnswerID != null) {
        data.append("AnswerID", AnswerID);
      }
      if (AnswerValue != null) {
        data.append("AnswerValue", AnswerValue);
      }
      data.append("LessonPartID", currentPartQuestion.value.ID);
      data.append("CourseLessonID", lessonDetail.value.ID as string);
      data.append("CourseID", route.params.courseId as string);
      updateAnswer(data);
    };
    //Cucalator how many question unmake
    const cucalatorQuestion = () => {
      lessonDetail.value.CompleteQuestions = 0;
      const partQuestionLength = questionPart.value.length;
      for (let i = 0; i < partQuestionLength; i++) {
        const part = questionPart.value[i];
        part.Questions.forEach((question) => {
          if (question.status != "unmake") {
            lessonDetail.value.CompleteQuestions++;
            if (question.status == "true") {
              lessonDetail.value.numberQuestionCorrect++;
            }
          }
        });
      }
    };
    // Move to click part question
    const moveToChoosedQuestion = (id, questionID) => {
      const index = questionPart.value.findIndex((part) => part.ID == id);
      partIndex.value = index;
      setTimeout(() => {
        moveToQuestion(questionID);
      });
      currentQuestion.value = questions.value.findIndex(
        (question) => question.ID == questionID
      );
    };
    // Move to click part question
    const moveToChoosedQuestionMobile = (id, questionID) => {
      const index = questionPart.value.findIndex((part) => part.ID == id);
      partIndex.value = index;
      setTimeout(() => {
        moveToQuestion(questionID);
      });
      currentQuestion.value = questions.value.findIndex(
        (question) => question.ID == questionID
      );
      showAnswer.value = false;
    };
    // Check all input filled
    const checkFillAllInput = () => {
      const myInputs = document.getElementsByClassName("fillquiz");
      for (let i = 0; i < myInputs.length; i++) {
        const inputElement = myInputs[i] as HTMLInputElement;
        inputElement.addEventListener("blur", () => {
          selectedAll.value = true;
          for (let j = 0; j < myInputs.length; j++) {
            const currentInput = myInputs[j] as HTMLInputElement;
            if (currentInput.value.length < 1) {
              selectedAll.value = false;
            }
          }
        });
        inputElement.addEventListener("focus", () => {
          selectedAll.value = true;
          for (let j = 0; j < myInputs.length; j++) {
            const currentInput = myInputs[j] as HTMLInputElement;
            if (currentInput.value.length < 1) {
              selectedAll.value = false;
            }
          }
        });
      }
    };
    const checkSelectAllInput = () => {
      const mySelects = document.getElementsByClassName("selectquiz");
      for (let i = 0; i < mySelects.length; i++) {
        const selectElement = mySelects[i] as HTMLSelectElement;
        selectElement.addEventListener("change", () => {
          selectedAll.value = true;
          for (let j = 0; j < mySelects.length; j++) {
            const currentInput = mySelects[j] as HTMLSelectElement;
            if (currentInput.value.length < 1) {
              selectedAll.value = false;
            }
          }
        });
      }
    };
    onMounted(async () => {
      loading.value = true;
      //Get Current data here (Call api for practice view)
      await setLessonDetail(route.params.id as string); // Get lesson detail info when reload page
      await getQuestion(route.params.id as string); // get liet question
      await getOldAnswer(route.params.id as string); // get old answer
      await setTheoryData(route.params.id as string);
      questionPart.value = await setLessonQuestion(route.params.id as string);

      questionPart.value = questionPart.value.map((part) => {
        const newPart = { ...part, status: "unmake" };
        newPart.Description = addStaticURLForDescription(newPart.Description);
        newPart.Media = addStaticURLForMedia(newPart.Media);
        newPart.Media = updatEdusolutionToEduso(newPart.Media);
        return newPart;
      });
      questionPart.value.forEach((part, index) => {
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
          if (part.Type == "QUIZ3") {
            question = {
              ...question,
              selectedAnswer: "",
              selectedAnswerID: "",
            };
          }
          if (part.Type == "QUIZ4") {
            question = { ...question, correctAnswerLeft: 0 };
            if (question.CloneAnswers == null) {
              question.CloneAnswers = [];
            }
          }
          oldAnswer.value.forEach((old) => {
            if (question.ID == old.QuestionID) {
              if (old.TypePart == "QUIZ1") {
                question.CloneAnswers = old.AnswerID;
                if (old.AnswerID == old.RealAnswerID) {
                  question.status = "true";
                } else {
                  question.status = "false";
                }
              } else if (old.TypePart == "QUIZ2") {
                question.status = "false";
                question.Content = old.AnswerValue;
                question.Answers.forEach((answer) => {
                  if (answer.Content == old.AnswerValue) {
                    question.status = "true";
                  }
                });
              } else if (old.TypePart == "QUIZ3") {
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
                question.CloneAnswers = old.AnswerID.split(",");
                const oldSortAnswer = old.AnswerID.split(",").sort();
                if (old.RealAnswerID == null) {
                  question.status = "false";
                } else {
                  const oldSortRealAnswer = old.RealAnswerID.split(",").sort();
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
          });

          return question;
        });
        // Set part status
        part.Questions.forEach((question) => {
          if (question.status != "unmake") {
            part.status = "true";
          }
        });
        // Set part status
        part.Questions.forEach((question) => {
          if (question.status == "false") {
            part.status = "false";
          }
          if (question.status == "unmake") {
            part.status = "unmake";
          }
        });
        const lastAnswer =
          oldAnswer.value.length > 0
            ? oldAnswer.value[oldAnswer.value.length - 1]
            : null;
        //Find part index
        if (lastAnswer != null) {
          part.Questions.forEach((question) => {
            if (question.ID == lastAnswer.QuestionID) {
              partIndex.value = index;
            }
          });
        }
      });
      currentPartQuestion.value = questionPart.value[partIndex.value];
      if (currentPartQuestion.value) {
        // Current Question
        currentQuestion.value = questions.value.findIndex(
          (question) => question.ID == currentPartQuestion.value.Questions[0].ID
        );
        if (currentPartQuestion.value.Type == "QUIZ2") {
          answerList.value = [];
          currentPartQuestion.value.Questions.forEach((question) => {
            answerList.value = [...answerList.value, [...question.Answers]];
          });
          nextTick(() => {
            checkFillAllInput();
          });
        }
        if (currentPartQuestion.value.Type == "QUIZ3") {
          answerList.value = [];
          currentPartQuestion.value.Questions.forEach((question) => {
            answerList.value = [...answerList.value, question.Answers[0]];
          });
          answerList.value = answerList.value.map((answer) => {
            return { ...answer, isShow: true };
          });
          const oldAnswerLength = oldAnswer.value.length;
          for (let i = 0; i < oldAnswerLength; i++) {
            const old = oldAnswer.value[i];
            if (old.TypePart == "QUIZ3") {
              answerList.value = answerList.value.filter(
                (answer) => answer.ID != old.AnswerID
              );
            }
          }
        }
      }
      loading.value = false;
    });
    onMounted(() => {
      nextTick(() => {
        checkFillAllInput();
      });
    });
    onMounted(() => {
      nextTick(() => {
        checkSelectAllInput();
      });
    });
    onMounted(() => {
      nextTick(() => {
        const container = document.querySelector(".scroll-area") as HTMLElement;
        if (container) {
          container.addEventListener("scroll", function () {
            container.classList.add("scrollbar-invisible");
          });

          container.addEventListener("mouseleave", function () {
            container.classList.remove("scrollbar-invisible");
          });
        }
      });
    });
    const setAllSelectd = (status: boolean) => {
      selectedAll.value = status;
    };
    const completeLesson = () => {
      const partLength = questionPart.value.length;
      for (let i = 0; i < partLength; i++) {
        const part = questionPart.value[i];
        part.Questions.forEach((question) => {
          if (question.status == "unmake") {
            const data = new FormData();
            data.append("QuestionID", question.ID);
            data.append("AnswerID", "");
            if (part.Type == "QUIZ1") {
              data.append("AnswerValue", "");
            }
            data.append("LessonPartID", part.ID);
            data.append("CourseLessonID", lessonDetail.value.ID as string);
            data.append("CourseID", route.params.courseId as string);
            updateAnswer(data);
          }
        });
      }
      router.push(`/course/${route.params.courseId}/${lessonDetail.value.ID}`);
    };
    //Scroll to question
    const moveToQuestion = (id) => {
      const section = document.getElementById(id);
      el.value.scrollTo({ top: section.offsetTop - 8, behavior: "smooth" });
    };
    const disableCheckButton = () => {
      //Disable check button
      if (currentPartQuestion.value.status == "unmake") {
        if (currentPartQuestion.value.Type == "QUIZ1") {
          const index = currentPartQuestion.value.Questions.findIndex(
            (question) =>
              question.CloneAnswers == "" || question.CloneAnswers == null
          );
          if (index >= 0) {
            selectedAll.value = false;
          } else {
            selectedAll.value = true;
          }
        } else if (currentPartQuestion.value.Type == "QUIZ2") {
          const myInputs = document.getElementsByClassName("fillquiz");
          console.log("here");
          console.log(myInputs.length);

          for (let i = 0; i < myInputs.length; i++) {
            selectedAll.value = true;
            const currentInput = myInputs[i] as HTMLInputElement;
            if (currentInput.value.length < 1) {
              selectedAll.value = false;
            }
          }
        } else if (currentPartQuestion.value.Type == "QUIZ3") {
          const index = currentPartQuestion.value.Questions.findIndex(
            (question) => question.selectedAnswer == ""
          );
          console.log(index);

          if (index >= 0) {
            selectedAll.value = false;
          } else {
            selectedAll.value = true;
          }
        } else if (currentPartQuestion.value.Type == "QUIZ4") {
          const index = currentPartQuestion.value.Questions.findIndex(
            (question) =>
              question.CloneAnswers == null || question.CloneAnswers.length == 0
          );
          if (index >= 0) {
            selectedAll.value = false;
          } else {
            selectedAll.value = true;
          }
        }
      }
    };
    watch(
      () => partIndex.value,
      () => {
        currentPartQuestion.value = questionPart.value[partIndex.value];
        nextTick(() => disableCheckButton());

        if (currentPartQuestion.value) {
          // Current Question
          currentQuestion.value = questions.value.findIndex(
            (question) =>
              question.ID == currentPartQuestion.value.Questions[0].ID
          );

          if (currentPartQuestion.value.Type == "QUIZ2") {
            answerList.value = [];
            currentPartQuestion.value.Questions.forEach((question) => {
              answerList.value = [...answerList.value, [...question.Answers]];
            });
            nextTick(() => {
              checkFillAllInput();
            });
          }
          if (currentPartQuestion.value.Type == "QUIZ3") {
            answerList.value = [];
            currentPartQuestion.value.Questions.forEach((question) => {
              const answer = { ...question.Answers[0], isShow: true };
              if (question.status != "unmake") {
                answer.isShow = false;
              }
              answerList.value = [...answerList.value, answer];
            });
          }
        }
      }
    );
    return {
      prevRoute,
      theoryIcon,
      circleTopIcon,
      circleDownIcon,
      showListIcon,
      circleTopDisableIcon,
      circleDownDisableIcon,
      circleLeftIcon,
      circleRightIcon,
      showAnswer,
      currentPartQuestion,
      openTheoryModal,
      selectedAll,
      showTheoryMobile,
      checkAnswer,
      updateSelectedAnswer,
      updateSelectedAnswerMany,
      redoQuestion,
      goNextPartQuestion,
      moveToChoosedQuestion,
      moveToChoosedQuestionMobile,
      currentQuestion,
      answerList,
      optionList,
      showWorkbook,
      setAllSelectd,
      lessonDetail,
      lessonQuestion,
      oldAnswer,
      questionPart,
      partIndex,
      el,
      route,
      updateTheoryModalStatus,
      theoryData,
      completeLesson,
      loading,
      disableCheckButton,
    };
  },
});
</script>
<style>
.loading-img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.btn {
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 16px;
}

.btn-primary {
  color: white;
  background: linear-gradient(#105277, #00314c);
  border: #00314c 2px solid;
}
.bg-primary {
  background: linear-gradient(#105277, #00314c);
}

.btn-disable {
  border: 2px solid #dfdfdf;
  background: #dfdfdf;
  color: #555555;
}

.btn-primary:hover {
  color: #00314c;
  background: white;
}

.check-btn {
  width: 100%;
  background: #00314c;
  color: white;
  border: #00314c 2px solid;
}

.check-btn:hover {
  color: #00314c;
  background: white;
}

.check-btn:disabled {
  border: 1px solid #d9d9d9;
  background: #f5f5f5;
  color: #d9d9d9;
}

.btn:disabled {
  border: #dfdfdf 2px solid;
  background: #dfdfdf;
  color: #555555;
}

.list-question-wrapper {
  position: relative;
  width: 250px;
  background: white;
  height: calc(100vh - 84px);
  padding: 0 24px 24px 24px;
  margin-top: 16px;
}

.part-title {
  font-weight: 600;
  color: #002235;
}

.checking-btn-wrapper,
.complete-btn {
  position: absolute;
  bottom: 8px;
  width: calc(100% - 32px);
  /* column-gap: 12px; */
  display: flex;
  justify-content: center;
}
.checking-btn-wrapper button:first-of-type {
  margin-right: 6px;
}
.checking-btn-wrapper button:last-of-type {
  margin-left: 6px;
}
.question-wrapper {
  height: calc(100% - 65px);
  padding-right: 12px;
}

.list-question-part {
  overflow-y: auto;
  max-height: calc(100% - 75px);
}

.one-question-wrapper {
  background: white;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 12px;
  width: 50%;
  margin-left: 50%;
  transform: translateX(-50%);
  margin-top: 16px;
  height: calc(100vh - 176px);
  padding: 16px 16px 0;
}

.two-question-wrapper {
  background: white;
  display: flex;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 12px;
  width: 66%;
  height: calc(100vh - 160px);
}
.scroll-area {
  overflow: auto;
}
.scroll-area.scroll-x::-webkit-scrollbar-thumb {
  background: #000;
  border-radius: 10px;
}
.scroll-area::-webkit-scrollbar {
  height: 2px;
  width: 2px;
}
.scroll-area::-webkit-scrollbar-thumb {
  background: #fff;
  border-radius: 10px;
}
.scroll-area::-webkit-scrollbar-track {
  box-shadow: inset 0 0 2px #ffffff;
  border-radius: 10px;
}
.scroll-area.scrollbar-invisible::-webkit-scrollbar-thumb {
  background-color: #ffffff;
}
.question-wrapper.scrollbar-invisible::-webkit-scrollbar-thumb {
  background-color: #555555; /* Set the color of the scroll bar thumb when visible */
}
.mobile-next-previous-part {
  display: none;
}
.theory-question-part {
  width: 50%;
  height: 100%;
  border-right: 1px solid #c1c1c1;
  padding: 0 16px;
  padding-top: 24px;
  position: relative;
  right: 0;
  transition: all ease 500ms;
}
.answer-question-part {
  width: 50%;
  height: 100%;
  padding: 12px 4px 0 16px;
  position: relative;
  left: 0;
  transition: all ease 500ms;
}
.workbook-body {
  height: calc(100vh - 90px);
}
.workbook-question-wrapper {
  position: relative;
  width: 50%;
  height: calc(100% - 32px);
  padding: 24px 24px 0;
  margin: 0;
  transform: unset;
  padding-bottom: 60px;
  margin-left: 50%;
  transform: translateX(-50%);
  box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 12px;
}
.history-content {
  height: calc(100% - 100px);
}
.content-question-part {
  height: calc(100% - 80px);
}
.desktop-next-previous-part {
  display: flex;
  justify-content: space-between;
  width: 50%;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 16px;
}
.desktop-next-previous-part.two-question {
  width: 66.66%;
}
.desktop-next-previous-part.openmenu {
  left: calc(50% + 125px);
  width: calc(50% - 125px);
}
.desktop-next-previous-part.openmenu.two-question {
  left: calc(50% + 125px);
  width: calc(66.66% - 170px);
}
.theory-content {
  height: calc(100% - 60px);
}
@media screen and (max-width: 1023px) {
  .two-question-wrapper {
    width: 100%;
    height: calc(100vh - 200px);
  }

  .one-question-wrapper {
    position: relative;
    width: 100%;
    height: calc(100vh - 190px);
    padding: 24px 24px 0;
    margin: 0;
    transform: unset;
    padding-bottom: 28px;
  }

  .checking-btn-wrapper {
    width: calc(100% - 48px);
    position: absolute;
    bottom: 32px;
    left: 24px;
  }
  .one-question-wrapper .checking-btn-wrapper {
    bottom: 12px;
  }
  .mobile-next-previous-part {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: calc(100% - 32px);
    position: fixed;
    bottom: 4px;
    left: 16px;
    background: transparent;
  }
  .shadow-primary {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 12px;
  }
  .desktop-next-previous-part {
    display: none;
  }
  @supports (-webkit-touch-callout: none) {
    .two-question-wrapper {
      height: calc(100vh - 210px);
    }
    .one-question-wrapper {
      height: calc(100vh - 200px);
    }
  }
}

@media screen and (max-width: 767px) {
  .list-question-wrapper {
    position: fixed;
    bottom: 0;
    left: 0;
    top: 0;
    right: 0;
    padding: 0;
    width: auto;
    background: #00000080;
    height: auto;
    z-index: 10;
  }
  .question-wrapper {
    height: calc(100% - 80px);
    padding-right: 12px;
  }

  .list-question {
    padding: 24px;
    background: white;
    position: absolute;
    width: 100%;
    bottom: 0;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    height: 75%;
  }
  .theory-modal {
    margin: 0;
    transform: translateX(0);
    min-height: unset;
    width: unset;
    position: fixed;
    top: 8px;
    bottom: 8px;
    right: 8px;
    left: 8px;
  }
  .content-question-part {
    height: calc(100% - 40px);
  }
  .answer-question-part {
    width: 100%;
    border: unset;
    padding: 0 32px;
    padding-right: 20px;
    position: absolute;
    left: -105%;
    padding-top: 8px;
    border-radius: 8px;
  }
  .answer-question-part.show {
    left: 0;
  }
  .theory-question-part {
    width: 100%;
    border: unset;
    padding: 0 32px;
    position: absolute;
    right: -115%;
    border-radius: 8px;
    padding-top: 8px;
    padding-bottom: 32px;
  }
  .theory-question-part.show {
    right: 0;
  }
  .workbook-question-wrapper {
    position: relative;
    width: calc(100% - 32px);
    height: calc(100vh - 72px);
    padding: 16px 16px 0;
    margin: 0;
    margin: 0 auto;
    transform: unset;
    padding-bottom: 28px;
  }
}
</style>
