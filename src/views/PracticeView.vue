<template>
  <div
    class="overflow-hidden pb-2 lg:pb-0"
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
    <div class="px-4 lg:px-0">
      <div v-if="currentPartQuestion && !showWorkbook" class="relative px-0">
        <div class="flex mt-4">
          <div>
            <!-- List question -->
            <div v-if="showAnswer" class="list-question-wrapper">
              <div class="list-question">
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
                  Đã trả lời {{ unitDetail.numberQuestionComplete }}/{{
                    unitDetail.numberQuestion
                  }}
                  câu
                </p>
                <div class="list-question-part scroll-area">
                  <div
                    v-for="(part, index) in unitDetail.questionPart"
                    :key="part.id"
                  >
                    <h3 class="text-indigo font-semibold mb-2">
                      Phần {{ index + 1 }}
                    </h3>
                    <!-- Question -->
                    <div
                      v-for="(question, questionIndex) in part.questions"
                      :key="question.questionID"
                      @click="moveToChoosedQuestion(part.id)"
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
                      <span class="text-sm text-indigo"
                        >Câu {{ questionIndex + 1 }}</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="absolute -left-42 hover:left-0 top-0 bg-primary text-white items-center gap-x-5 px-4 py-2 rounded-r cursor-pointer transition-all hidden lg:flex"
              @click="showAnswer = true"
              v-else
            >
              <span class="text-sm">Xem danh sách câu hỏi</span>
              <span class="icon-right"></span>
            </div>
          </div>
          <div class="px-0 pb-2 w-full">
            <!-- Matching  -->
            <div
              v-if="currentPartQuestion.type == 'QUIZ4'"
              class="two-question-wrapper lg:mx-auto mt-4"
            >
              <div class="w-full h-full px-0 relative">
                <div class="question-wrapper scroll-area">
                  <Matching
                    v-for="(question, index) in currentPartQuestion.questions"
                    :key="question.questionID"
                    :updateSelectedAnswer="updateSelectedAnswer"
                    :question="question"
                    :index="index"
                    :partID="currentPartQuestion.id"
                    :currentPartQuestion="currentPartQuestion"
                    :setAllSelectd="setAllSelectd"
                    :unitIndex="unitDetail.currentIndex"
                  />
                </div>
                <div
                  class="checking-btn-wrapper matching"
                  v-if="currentPartQuestion.status == 'unmake'"
                >
                  <button
                    :disabled="!selectedAll"
                    class="check-btn btn"
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
                currentPartQuestion.questions.length < 2 &&
                currentPartQuestion.type != 'QUIZ4'
              "
              class="one-question-wrapper"
            >
              <div class="content-question-part scroll-area">
                <div class="px-1 pb-2 lg:pb-8 border-b border-gray-300 text-sm">
                  <div v-html="currentPartQuestion.partContent"></div>
                </div>
                <div class="h-full" v-if="currentPartQuestion.type == 'QUIZ1'">
                  <MutipleChoice
                    v-for="(question, index) in currentPartQuestion.questions"
                    :key="question.questionID"
                    :updateSelectedAnswer="updateSelectedAnswer"
                    :question="question"
                    :index="index"
                    :partID="currentPartQuestion.id"
                  />
                </div>
                <div class="h-full" v-if="currentPartQuestion.type == 'QUIZ2'">
                  <FillInBlank
                    :class="
                      currentPartQuestion.questions.length < 2
                        ? 'one-question scroll-area'
                        : ''
                    "
                    v-for="(question, index) in currentPartQuestion.questions"
                    :key="question.questionID"
                    :question="question"
                    :index="index"
                    :partID="currentPartQuestion.id"
                    :answerList="answerList"
                  />
                </div>
                <div class="h-full" v-if="currentPartQuestion.type == 'QUIZ3'">
                  <DropBox
                    :class="
                      currentPartQuestion.questions.length < 2
                        ? 'one-question scroll-area'
                        : ''
                    "
                    v-for="(question, index) in currentPartQuestion.questions"
                    :key="question.questionID"
                    :question="question"
                    :index="index"
                    :partID="currentPartQuestion.id"
                    :optionList="optionList"
                  />
                </div>
                <div class="h-full" v-if="currentPartQuestion.type == 'QUIZ5'">
                  <MutipleChoiceMany
                    v-for="(question, index) in currentPartQuestion.questions"
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
                    class="check-btn btn"
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
                currentPartQuestion.questions.length >= 2 &&
                currentPartQuestion.type != 'QUIZ4'
              "
              class="two-question-wrapper lg:mx-auto"
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
                <div v-html="currentPartQuestion.partContent"></div>
              </div>
              <div
                :class="!showTheoryMobile ? 'show' : ''"
                class="answer-question-part shadow-primary"
              >
                <span
                  v-if="!showTheoryMobile"
                  @click="showTheoryMobile = true"
                  class="absolute top-1/2 -right-4 lg:hidden"
                >
                  <img :src="circleLeftIcon" alt=""
                /></span>
                <div class="question-wrapper scroll-area">
                  <div v-if="currentPartQuestion.type == 'QUIZ1'">
                    <MutipleChoice
                      v-for="(question, index) in currentPartQuestion.questions"
                      :key="question.questionID"
                      :updateSelectedAnswer="updateSelectedAnswer"
                      :question="question"
                      :index="index"
                      :partID="currentPartQuestion.id"
                    />
                  </div>
                  <div v-if="currentPartQuestion.type == 'QUIZ2'">
                    <FillInBlank
                      v-for="(question, index) in currentPartQuestion.questions"
                      :key="question.questionID"
                      :question="question"
                      :index="index"
                      :partID="currentPartQuestion.id"
                      :answerList="answerList"
                    />
                  </div>
                  <div v-if="currentPartQuestion.type == 'QUIZ3'">
                    <DropBox
                      v-for="(question, index) in currentPartQuestion.questions"
                      :key="question.questionID"
                      :question="question"
                      :index="index"
                      :partID="currentPartQuestion.id"
                      :optionList="optionList"
                    />
                  </div>
                  <div v-if="currentPartQuestion.type == 'QUIZ5'">
                    <MutipleChoiceMany
                      v-for="(question, index) in currentPartQuestion.questions"
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
                    class="check-btn btn"
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
              :class="
                currentPartQuestion.questions.length < 2 &&
                currentPartQuestion.type != 'QUIZ4'
                  ? 'w-1/2'
                  : 'w-2/3'
              "
              class="ml-1/2 -translate-x-1/2 mt-4 justify-between hidden lg:flex lg:px-1"
            >
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
                      (unitDetail.numberQuestionComplete /
                        unitDetail.numberQuestion) *
                      100
                    "
                  />
                </div>
              </div>
              <div class="flex gap-x-4">
                <button
                  @click="unitDetail.currentIndex--"
                  :disabled="unitDetail.currentIndex == 0"
                  class="btn btn-primary flex items-center gap-x-2"
                >
                  <span class="icon-up"></span>
                  <span class="whitespace-nowrap">Câu trước</span>
                </button>
                <button
                  @click="goNextPartQuestion"
                  class="btn btn-primary flex items-center gap-x-2"
                >
                  <span class="whitespace-nowrap">Câu sau</span>
                  <span class="icon-down"></span>
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
          </div>
          <div class="flex">
            <button
              @click="unitDetail.currentIndex--"
              :disabled="unitDetail.currentIndex == 0"
              class="mr-2"
            >
              <img
                :src="
                  unitDetail.currentIndex == 0
                    ? circleTopDisableIcon
                    : circleTopIcon
                "
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

    <div class="pb-4" v-if="currentPartQuestion && showWorkbook">
      <div class="workbook-question-wrapper mt-4">
        <div class="history-content">
          <h2 class="text-lg text-indigo">Bạn đã làm rất tốt</h2>
          <h3 class="italic text-indigo-lighter">
            Hãy nhấn vào nút “Hoàn thành” để xem lại đáp án và đánh giá kết quả
            của mình.
          </h3>
          <p class="text-sm text-indigo-lighter mt-5 mb-5 font-medium">
            Đã trả lời {{ unitDetail.numberQuestionComplete }}/{{
              unitDetail.numberQuestion
            }}
            câu
            <span class="text-raspberry italic"
              >(còn
              {{
                unitDetail.numberQuestion - unitDetail.numberQuestionComplete
              }}
              câu)</span
            >
          </p>
          <div class="list-question-part scroll-area">
            <div
              v-for="(part, index) in unitDetail.questionPart"
              :key="part.id"
            >
              <h3 class="text-indigo font-semibold mb-2">
                Phần {{ index + 1 }}
              </h3>
              <!-- Question -->
              <div
                v-for="(question, questionIndex) in part.questions"
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
                  v-if="question.status == 'unmake'"
                  @click="
                    moveToChoosedQuestion(part.id);
                    showWorkbook = false;
                  "
                  class="text-iceberg-lighter italic hover:underline cursor-pointer"
                  >Làm ngay</span
                >
              </div>
            </div>
          </div>
          <router-link :to="`/unit/${unitDetail.id}`">
            <button class="btn btn-primary complete-btn">Hoàn thành</button>
          </router-link>
        </div>
      </div>
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
import DropBox from "@/components/question/Dropbox.vue";
import Matching from "@/components/question/Matching.vue";
import TheoryModal from "@/components/modal/TheoryModal.vue";
export default defineComponent({
  name: "PracticeView",
  components: {
    MutipleChoice,
    TheoryModal,
    FillInBlank,
    DropBox,
    Matching,
    MutipleChoiceMany,
  },
  setup() {
    const { unitDetail, questions } = storeToRefs(useUnitStore());
    const { openTheoryModal } = storeToRefs(useModalStore());
    const prevRoute = ref("");
    const showAnswer = ref(false);
    const currentPartQuestion = ref(null);
    const currentQuestion = ref(null);
    const selectedAll = ref(false);
    const showTheoryMobile = ref(false);
    const answerList = ref([]);
    const optionList = ref([]);
    const showWorkbook = ref(false);

    //Update answer type Mutiple choice
    const updateSelectedAnswer = (questionID, answerID) => {
      if (currentPartQuestion.value.status == "unmake") {
        const question = currentPartQuestion.value.questions.find(
          (data) => data.questionID == questionID
        );
        question.selectedAnswer = answerID;
        selectedAll.value = true;
        currentPartQuestion.value.questions.forEach((question) => {
          if (question.selectedAnswer == 0) {
            selectedAll.value = false;
          }
        });
      }
    };
    const updateSelectedAnswerMany = (questionID, answerID) => {
      const question = currentPartQuestion.value.questions.find(
        (data) => data.questionID == questionID
      );
      if (question.status == "unmake") {
        if (question.selectedAnswer.includes(answerID)) {
          question.selectedAnswer = question.selectedAnswer.filter(
            (answer) => answer !== answerID
          );
        } else {
          question.selectedAnswer = [...question.selectedAnswer, answerID];
        }

        selectedAll.value = true;
        currentPartQuestion.value.questions.forEach((question) => {
          if (question.selectedAnswer == 0) {
            selectedAll.value = false;
          }
        });
      }
    };
    const goNextPartQuestion = () => {
      if (
        unitDetail.value.currentIndex <
        unitDetail.value.questionPart.length - 1
      ) {
        unitDetail.value.currentIndex++;
      } else {
        unitDetail.value.completed = true;
        showWorkbook.value = true;
      }
    };
    const checkAnswer = () => {
      // Mutiple check single
      if (currentPartQuestion.value.type == "QUIZ1") {
        for (let i = 0; i < currentPartQuestion.value.questions.length; i++) {
          if (
            currentPartQuestion.value.questions[i].selectedAnswer ==
            currentPartQuestion.value.questions[i].correctAnswer
          ) {
            unitDetail.value.numberQuestionCorrect++;
            currentPartQuestion.value.questions[i].status = "true";
          } else {
            currentPartQuestion.value.questions[i].status = "false";
          }
          unitDetail.value.numberQuestionComplete++;
        }
        currentPartQuestion.value.status = "true";
        currentPartQuestion.value.questions.forEach((question) => {
          if (question.status == "false") {
            currentPartQuestion.value.status = "false";
          }
        });
      }
      // Type fill in blank & select box
      else if (
        currentPartQuestion.value.type == "QUIZ2" ||
        currentPartQuestion.value.type == "QUIZ3"
      ) {
        currentPartQuestion.value.status = "true";
        currentPartQuestion.value.questions.forEach((question) => {
          question.status = "true";
          unitDetail.value.numberQuestionComplete++;
          const answers = question.answers;
          answers.forEach((answer) => {
            const input = document.getElementById(
              answer.answerID
            ) as HTMLInputElement;
            answer.currentAnswer = input.value;
            input.setAttribute("disabled", "");
            if (input.value == answer.answerValue) {
              input.classList.add("true");
              answer.status = "true";
            } else {
              input.classList.add("false");
              answer.status = "false";
              currentPartQuestion.value.status = "false";
              question.status = "false";
            }
          });
          if (question.status == "true") {
            unitDetail.value.numberQuestionCorrect++;
          }
        });
      } else if (currentPartQuestion.value.type == "QUIZ4") {
        for (let i = 0; i < currentPartQuestion.value.questions.length; i++) {
          currentPartQuestion.value.status = "true";
          currentPartQuestion.value.questions[i].status = "true";
          currentPartQuestion.value.questions[i].answers.forEach((answer) => {
            answer.status = true;
            const htmlString = answer.currentContent;
            const regex = /data-index-number="([^"]*)"/;
            const match = htmlString.match(regex);
            const dataIndexNumber = match ? match[1] : null;
            if (dataIndexNumber != answer.answerID) {
              answer.status = false;
              currentPartQuestion.value.questions[i].status = "false";
              currentPartQuestion.value.status = "false";
            }
          });
          unitDetail.value.numberQuestionComplete++;
          if (currentPartQuestion.value.questions[i].status == "true") {
            unitDetail.value.numberQuestionCorrect++;
          }
        }
      } else if (currentPartQuestion.value.type == "QUIZ5") {
        currentPartQuestion.value.questions.forEach((question) => {
          question.status = "true";
          const sortedCorrect = question.correctAnswer.sort();
          const sortedSelect = question.selectedAnswer.sort();
          console.log(sortedCorrect, sortedSelect);
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
          unitDetail.value.numberQuestionComplete++;
        });
        currentPartQuestion.value.status = "true";
        currentPartQuestion.value.questions.forEach((question) => {
          if (question.status == "false") {
            currentPartQuestion.value.status = "false";
          } else {
            unitDetail.value.numberQuestionCorrect++;
          }
        });
      }
    };
    // reset question
    const redoQuestion = () => {
      currentPartQuestion.value.status = "unmake";
      //Type choice (Single)
      if (currentPartQuestion.value.type == "QUIZ1") {
        for (let i = 0; i < currentPartQuestion.value.questions.length; i++) {
          currentPartQuestion.value.questions[i].selectedAnswer = 0;
        }
      }
      //Type fill in blank
      else if (currentPartQuestion.value.type == "QUIZ2") {
        answerList.value.forEach((answer) => {
          const input = document.getElementById(answer.answerID);
          if (input.classList.contains("false")) {
            input.classList.remove("false");
            input.removeAttribute("disabled");
          }
        });
      }
      //Type Select box
      else if (currentPartQuestion.value.type == "QUIZ3") {
        optionList.value.forEach((answer) => {
          const select = document.getElementById(answer.answerID);
          if (select.classList.contains("false")) {
            select.classList.remove("false");
            select.removeAttribute("disabled");
          }
        });
        // Type Matching
      } else if (currentPartQuestion.value.type == "QUIZ4") {
        for (let i = 0; i < currentPartQuestion.value.questions.length; i++) {
          currentPartQuestion.value.questions[i].answers.forEach((answer) => {
            answer.currentContent = "";
            answer.status = "unmake";
            answer.choosedContent = false;
          });
        }
      }
      //Type Choice (Mutiple)
      else if (currentPartQuestion.value.type == "QUIZ5") {
        for (let i = 0; i < currentPartQuestion.value.questions.length; i++) {
          const question = currentPartQuestion.value.questions[i];
          question.selectedAnswer.forEach((answer) => {
            if (!question.correctAnswer.includes(answer)) {
              question.selectedAnswer = question.selectedAnswer.filter(
                (data) => data != answer
              );
            }
          });
          question.correctAnswerLeft = 0;
        }
      }
      for (let i = 0; i < currentPartQuestion.value.questions.length; i++) {
        if (currentPartQuestion.value.questions[i].status == "true") {
          unitDetail.value.numberQuestionCorrect--;
        }
        currentPartQuestion.value.questions[i].status = "unmake";
        unitDetail.value.numberQuestionComplete--;
      }
    };
    // Move to click part question
    const moveToChoosedQuestion = (id) => {
      const index = unitDetail.value.questionPart.findIndex(
        (unit) => unit.id == id
      );
      unitDetail.value.currentIndex = index;
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
    onMounted(() => {
      //Get Current data here (Call api for practice view)
      currentPartQuestion.value =
        unitDetail.value.questionPart[unitDetail.value.currentIndex];
      // Current Question
      currentQuestion.value = questions.value.findIndex(
        (question) =>
          question.questionID ==
          currentPartQuestion.value.questions[0].questionID
      );
      if (currentPartQuestion.value.type == "QUIZ2") {
        answerList.value = [];
        currentPartQuestion.value.questions.forEach((question) => {
          answerList.value = [...answerList.value, ...question.answers];
        });
      }
      if (currentPartQuestion.value.type == "QUIZ3") {
        optionList.value = [];
        currentPartQuestion.value.questions.forEach((question) => {
          question.answers.forEach((answer) => {
            optionList.value = [...optionList.value, answer];
          });
        });
        nextTick(() => {
          checkSelectAllInput();
        });
      }
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
    watch(
      () => unitDetail.value.currentIndex,
      () => {
        currentPartQuestion.value =
          unitDetail.value.questionPart[unitDetail.value.currentIndex];
        //Disable check button
        if (currentPartQuestion.value.status == "unmake") {
          selectedAll.value = false;
        }
        // Current Question
        currentQuestion.value = questions.value.findIndex(
          (question) =>
            question.questionID ==
            currentPartQuestion.value.questions[0].questionID
        );
        if (currentPartQuestion.value.type == "QUIZ2") {
          answerList.value = [];
          currentPartQuestion.value.questions.forEach((question) => {
            answerList.value = [...answerList.value, ...question.answers];
          });
          nextTick(() => {
            checkFillAllInput();
          });
        }
        if (currentPartQuestion.value.type == "QUIZ3") {
          optionList.value = [];
          currentPartQuestion.value.questions.forEach((question) => {
            question.answers.forEach((answer) => {
              optionList.value = [...optionList.value, answer];
            });
          });
          nextTick(() => {
            checkSelectAllInput();
          });
        }
      }
    );
    return {
      unitDetail,
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
      currentQuestion,
      answerList,
      optionList,
      showWorkbook,
      setAllSelectd,
    };
  },
});
</script>
<style>
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
  column-gap: 12px;
  display: flex;
  justify-content: center;
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
  height: calc(100vh - 160px);
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
  overflow-y: auto;
}
.scroll-area::-webkit-scrollbar {
  height: 6px;
  width: 2px;
}
.scroll-area::-webkit-scrollbar-thumb {
  background: #ffffff;
  border-radius: 10px;
}
.scroll-area::-webkit-scrollbar-track {
  box-shadow: inset 0 0 2px #ffffff;
  border-radius: 10px;
}
.scroll-area.scrollbar-invisible::-webkit-scrollbar-thumb {
  background-color: #555555;
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
.workbook-question-wrapper {
  position: relative;
  width: 50%;
  height: calc(100vh - 128px);
  padding: 24px 24px 0;
  margin: 0;
  transform: unset;
  padding-bottom: 28px;
  margin-left: 50%;
  transform: translateX(-50%);
  box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 12px;
}
.history-content {
  height: calc(100% - 70px);
}
.content-question-part {
  height: 100%;
}
@media screen and (max-width: 1023px) {
  .two-question-wrapper {
    width: 100%;
    height: calc(100vh - 200px);
    box-shadow: unset;
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
    bottom: 16px;
    left: 24px;
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
  @supports (-webkit-touch-callout: none) {
    .two-question-wrapper {
      height: calc(100vh - 210px);
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
  }
  .theory-question-part.show {
    right: 0;
  }
  .workbook-question-wrapper {
    position: relative;
    width: 100%;
    height: calc(100vh - 72px);
    padding: 16px 16px 0;
    margin: 0;
    transform: unset;
    padding-bottom: 28px;
  }
}
</style>
