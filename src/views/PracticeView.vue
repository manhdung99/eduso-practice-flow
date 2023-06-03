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
    <div v-if="currentPartQuestion" class="relative">
      <div
        v-if="currentPartQuestion.questions.length < 2"
        class="bg-white rounded-lg shadow-slate-300 shadow-md p-4 w-1/2 ml-1/2 -translate-x-1/2 mt-4 h-200"
      >
        <div class="px-1 pb-8 border-b border-gray-300 text-sm">
          <div v-html="currentPartQuestion.partContent"></div>
        </div>
        <div>
          <MutipleChoice
            v-for="(question, index) in currentPartQuestion.questions"
            :key="question.questionID"
            :updateSelectedAnswer="updateSelectedAnswer"
            :question="question"
            :index="index"
          />
        </div>
        <div v-if="currentPartQuestion.status == 'unmake'">
          <button
            :disabled="currentPartQuestion.selectedAnswer == 0"
            class="check-btn btn"
            @click="checkAnswer"
          >
            Kiểm tra
          </button>
        </div>
        <div
          @click="unitDetail.currentIndex++"
          class="flex gap-x-3"
          v-else-if="currentPartQuestion.status == 'true'"
        >
          <button class="check-btn btn">Tiếp tục</button>
        </div>
        <div class="flex gap-x-3" v-else>
          <button
            @click="unitDetail.currentIndex++"
            class="btn btn-disable w-1/3 hover:bg-gray-400 hover:text-white"
          >
            Bỏ qua
          </button>
          <button @click="redoQuestion" class="btn btn-primary w-2/3">
            Làm lại
          </button>
        </div>
      </div>
      <div
        v-else
        class="bg-white rounded-lg shadow-slate-300 shadow-md w-full lg:w-2/3 ml-1/2 -translate-x-1/2 mt-4 h-200 flex"
      >
        <div class="w-1/2 h-full border-r border-gray-400 px-4">
          <div v-html="currentPartQuestion.partContent"></div>
        </div>
        <div class="w-1/2 h-full px-4 relative">
          <MutipleChoice
            v-for="(question, index) in currentPartQuestion.questions"
            :key="question.questionID"
            :updateSelectedAnswer="updateSelectedAnswer"
            :question="question"
            :index="index"
            :partID="currentPartQuestion.id"
          />
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
            <button @click="unitDetail.currentIndex++" class="check-btn btn">
              Tiếp tục
            </button>
          </div>
          <div class="checking-btn-wrapper" v-else>
            <button
              @click="unitDetail.currentIndex++"
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
      <div class="w-1/2 ml-1/2 -translate-x-1/2 mt-4 flex justify-between">
        <div class="w-1/3 relative">
          <p>Câu 1/{{ unitDetail.numberQuestion }}</p>
          <div class="w-full bg-grey-lighter rounded-lg h-2 absolute"></div>
          <div
            ref="questionProcess"
            class="w-1/2 bg-blue-lighter rounded-lg h-2 absolute"
          ></div>
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
            :disabled="
              unitDetail.currentIndex == unitDetail.questionPart.length - 1
            "
            @click="unitDetail.currentIndex++"
            class="btn btn-primary flex items-center gap-x-2"
          >
            <span class="whitespace-nowrap">Câu sau</span>
            <span class="icon-down"></span>
          </button>
        </div>
      </div>
      <!-- List question -->
      <div v-if="showAnswer" class="list-question-wrapper">
        <div class="flex items-center mb-6 justify-between">
          <p class="text-lg text-indigo-darker font-medium">
            Danh sách câu hỏi
          </p>
          <span
            @click="showAnswer = false"
            class="icon-close text-xs cursor-pointer text-gray-400 hover:text-black"
          ></span>
        </div>

        <p class="text-sm italic text-indigo-lighter mb-5 font-medium">
          Đã trả lời 3/{{ unitDetail.numberQuestion }} câu
        </p>
        <div class="">
          <div v-for="(part, index) in unitDetail.questionPart" :key="part.id">
            <h3 class="text-indigo font-semibold mb-2">Phần {{ index + 1 }}</h3>
            <!-- Question -->
            <div
              v-for="(question, questionIndex) in part.questions"
              :key="question.questionID"
              @click="moveToChoosedQuestion(part.id)"
              class="flex items-center gap-x-2.5 py-2 hover:bg-slate-200 cursor-pointer"
            >
              <span v-if="question.status == 'true'" class="icon-correct-answer"
                ><span class="path1"></span><span class="path2"></span
                ><span class="path3"></span
              ></span>
              <span
                v-else-if="question.status == 'false'"
                class="icon-incorrect-answer"
                ><span class="path1"></span><span class="path2"></span
              ></span>
              <span class="icon-unmake-answer" v-else></span>
              <span>Câu {{ questionIndex + 1 }}</span>
            </div>
          </div>
        </div>
      </div>
      <div
        class="absolute -left-40 hover:left-0 top-0 bg-indigo text-white flex items-center gap-x-4 px-4 py-2 rounded-r cursor-pointer transition-all"
        @click="showAnswer = true"
        v-else
      >
        <span class="text-sm">Xem danh sách câu hỏi</span>
        <span class="icon-right"></span>
      </div>
    </div>
  </div>
  <TheoryModal v-if="openTheoryModal" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { useUnitStore } from "../store/unitStore";
import { useModalStore } from "../store/modalStore";
import { storeToRefs } from "pinia";
import theoryIcon from "../assets/images/theory-icon.svg";
import MutipleChoice from "@/components/question/MutipleChoice.vue";
import TheoryModal from "@/components/modal/TheoryModal.vue";
export default defineComponent({
  name: "PracticeView",
  components: {
    MutipleChoice,
    TheoryModal,
  },
  setup() {
    const { unitDetail } = storeToRefs(useUnitStore());
    const { openTheoryModal } = storeToRefs(useModalStore());
    const prevRoute = ref("");
    const showAnswer = ref(false);
    const currentPartQuestion = ref(null);
    const selectedAll = ref(false);
    const updateSelectedAnswer = (questionID, answerID) => {
      const question = currentPartQuestion.value.questions.find(
        (data) => data.questionID == questionID
      );
      if (question.status == "unmake") {
        question.selectedAnswer = answerID;
      }
      selectedAll.value = true;
      currentPartQuestion.value.questions.forEach((question) => {
        if (question.selectedAnswer == 0) {
          selectedAll.value = false;
        }
      });
    };
    const goNextPartQuestion = () => {
      unitDetail.value.currentIndex++;
    };
    const checkAnswer = () => {
      for (let i = 0; i < currentPartQuestion.value.questions.length; i++) {
        const answer = Math.floor(Math.random() * 4) + 1 + 4 * i;
        currentPartQuestion.value.questions[i].correctAnswer = answer;
        if (currentPartQuestion.value.questions[i].selectedAnswer == answer) {
          currentPartQuestion.value.questions[i].status = "true";
        } else {
          currentPartQuestion.value.questions[i].status = "false";
        }
        unitDetail.value.numberQuestionComplete++;
      }
      currentPartQuestion.value.status = "true";
      currentPartQuestion.value.questions.forEach((question) => {
        if (question.selectedAnswer != question.correctAnswer) {
          currentPartQuestion.value.status = "false";
        }
      });
    };
    const redoQuestion = () => {
      currentPartQuestion.value.status = "unmake";
      for (let i = 0; i < currentPartQuestion.value.questions.length; i++) {
        currentPartQuestion.value.questions[i].selectedAnswer = 0;
        currentPartQuestion.value.questions[i].correctAnswer = 0;
        currentPartQuestion.value.questions[i].status = "unmake";
      }
    };
    const moveToChoosedQuestion = (id) => {
      const index = unitDetail.value.questionPart.findIndex(
        (unit) => unit.id == id
      );
      unitDetail.value.currentIndex = index;
    };
    onMounted(() => {
      currentPartQuestion.value =
        unitDetail.value.questionPart[unitDetail.value.currentIndex];
    });
    watch(
      () => unitDetail.value.currentIndex,
      () => {
        currentPartQuestion.value =
          unitDetail.value.questionPart[unitDetail.value.currentIndex];
      }
    );
    return {
      unitDetail,
      prevRoute,
      theoryIcon,
      showAnswer,
      currentPartQuestion,
      openTheoryModal,
      selectedAll,
      checkAnswer,
      updateSelectedAnswer,
      redoQuestion,
      goNextPartQuestion,
      moveToChoosedQuestion,
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
  background: #00314c;
  border: #00314c 2px solid;
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
  position: absolute;
  width: 250px;
  left: 0;
  top: 0;
  background: white;
  height: calc(100vh - 84px);
  padding: 24px;
}
.part-title {
  font-weight: 600;
  color: #002235;
}
.checking-btn-wrapper {
  position: absolute;
  bottom: 8px;
  width: calc(100% - 32px);
  column-gap: 12px;
  display: flex;
}
</style>
