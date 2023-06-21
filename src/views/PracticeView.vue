<template>
  <div class="overflow-hidden" v-if="JSON.stringify(unitDetail) != '{}'">
    <div
      class="px-4 py-5 relative shadow shadow-gray-300 flex items-center lg:justify-center"
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
    <div v-if="currentPartQuestion && !showWorkbook" class="relative">
      <!-- Matching  -->
      <div
        v-if="currentPartQuestion.type == 'QUIZ4'"
        class="two-question-wrapper"
      >
        <div class="w-full h-full px-8 lg:px-0 lg:relative">
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
        <div class="px-1 pb-8 border-b border-gray-300 text-sm">
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
              currentPartQuestion.questions.length < 2 ? 'one-question' : ''
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
              currentPartQuestion.questions.length < 2 ? 'one-question' : ''
            "
            v-for="(question, index) in currentPartQuestion.questions"
            :key="question.questionID"
            :question="question"
            :index="index"
            :partID="currentPartQuestion.id"
            :optionList="optionList"
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
      <!-- 2 Question  -->
      <div
        v-if="
          currentPartQuestion.questions.length >= 2 &&
          currentPartQuestion.type != 'QUIZ4'
        "
        class="two-question-wrapper"
      >
        <div
          :class="showTheoryMobile ? '!right-0' : ''"
          class="w-full lg:w-1/2 h-full lg:border-r lg:border-gray-400 px-8 lg:pt-4 lg:px-4 absolute lg:relative -right-full lg:!right-0 transition-all duration-500 question-part-content scroll-area"
        >
          <span
            v-if="showTheoryMobile"
            @click="showTheoryMobile = false"
            class="absolute top-2/5 left-0 lg:hidden"
          >
            <img :src="circleRightIcon" alt=""
          /></span>
          <div v-html="currentPartQuestion.partContent"></div>
        </div>
        <div
          :class="showTheoryMobile ? '!-left-full' : ''"
          class="w-full lg:w-1/2 h-full px-8 pt-4 lg:px-4 lg:pr-1 lg:relative absolute transition-all duration-500"
        >
          <span
            v-if="!showTheoryMobile"
            @click="showTheoryMobile = true"
            class="absolute top-2/5 right-0 lg:hidden"
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
      <!-- Desktop -->
      <div
        :class="
          currentPartQuestion.questions.length < 2 &&
          currentPartQuestion.type != 'QUIZ4'
            ? 'w-1/2'
            : 'w-2/3'
        "
        class="ml-1/2 -translate-x-1/2 mt-4 justify-between hidden lg:flex"
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
      <!-- Mobile -->
      <div class="flex py-2 justify-between px-4 items-center lg:hidden">
        <div class="flex w-full gap-x-2 items-center">
          <span @click="showAnswer = true"
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
        <div class="flex gap-x-2">
          <button
            @click="unitDetail.currentIndex--"
            :disabled="unitDetail.currentIndex == 0"
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
          <button
            :disabled="
              unitDetail.currentIndex == unitDetail.questionPart.length - 1
            "
            @click="goNextPartQuestion"
          >
            <img
              :src="
                unitDetail.currentIndex == unitDetail.questionPart.length - 1
                  ? circleDownDisableIcon
                  : circleDownIcon
              "
              alt=""
            />
          </button>
        </div>
      </div>
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
        class="absolute -left-40 hover:left-0 top-0 bg-primary text-white items-center gap-x-4 px-4 py-2 rounded-r cursor-pointer transition-all hidden lg:flex"
        @click="showAnswer = true"
        v-else
      >
        <span class="text-sm">Xem danh sách câu hỏi</span>
        <span class="icon-right"></span>
      </div>
    </div>
    <div class="pb-4" v-if="currentPartQuestion && showWorkbook">
      <div class="one-question-wrapper">
        <h2>Bạn đã làm rất tốt</h2>
        <h3>
          Hãy nhấn vào nút “Hoàn thành” để xem lại đáp án và đánh giá kết quả
          của mình.
        </h3>
        <p class="text-sm text-indigo-lighter mb-5 font-medium">
          Đã trả lời {{ unitDetail.numberQuestionComplete }}/{{
            unitDetail.numberQuestion
          }}
          câu
          <span class="text-raspberry italic"
            >(còn
            {{ unitDetail.numberQuestion - unitDetail.numberQuestionComplete }}
            câu)</span
          >
        </p>
        <div class="list-question-part scroll-area">
          <div v-for="(part, index) in unitDetail.questionPart" :key="part.id">
            <h3 class="text-indigo font-semibold mb-2">Phần {{ index + 1 }}</h3>
            <!-- Question -->
            <div
              v-for="(question, questionIndex) in part.questions"
              :key="question.questionID"
              class="flex justify-between"
            >
              <div class="flex items-center gap-x-2.5 py-2">
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
      // Mutiple check
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
      }
    };
    // reset question
    const redoQuestion = () => {
      currentPartQuestion.value.status = "unmake";
      //Type choice
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
      } else if (currentPartQuestion.value.type == "QUIZ4") {
        for (let i = 0; i < currentPartQuestion.value.questions.length; i++) {
          currentPartQuestion.value.questions[i].answers.forEach((answer) => {
            answer.currentContent = "";
            answer.status = "unmake";
            answer.choosedContent = false;
          });
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

        container.addEventListener("scroll", function () {
          container.classList.add("scrollbar-invisible");
        });

        container.addEventListener("mouseleave", function () {
          container.classList.remove("scrollbar-invisible");
        });
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
  position: fixed;
  width: 250px;
  left: 0;
  top: 85px;
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

.question-part-content {
  overflow-y: auto;
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
  margin-left: 50%;
  transform: translateX(-50%);
  margin-top: 16px;
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

@media screen and (max-width: 1023px) {
  .two-question-wrapper {
    width: 100%;
  }

  .one-question-wrapper {
    width: 100%;
  }

  .checking-btn-wrapper {
    width: calc(100% - 76px);
    bottom: 12px;
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
}
</style>
