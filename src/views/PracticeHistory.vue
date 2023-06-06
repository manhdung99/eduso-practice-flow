<template>
  <div class="overflow-hidden" v-if="JSON.stringify(unitDetail) != '{}'">
    <div class="px-4 py-5 relative shadow shadow-gray-300 overflow-hidden">
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
    <div class="relative pb-6">
      <div
        v-for="questionPart in unitDetail.questionPart"
        :key="questionPart.id"
        class="list-answer-wrapper"
      >
        <div class="px-1 pb-8 border-b border-gray-300 text-sm">
          <div v-html="questionPart.partContent"></div>
        </div>
        <div>
          <MutipleChoiceHistory
            v-for="(question, index) in questionPart.questions"
            :key="question.questionID"
            :question="question"
            :index="index"
          />
        </div>
      </div>

      <!-- List question -->
      <div v-if="showListQuestion" class="list-question-wrapper">
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
          <div class="list-question-part">
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
        class="fixed -left-40 hover:left-0 top-24 bg-indigo text-white flex items-center gap-x-4 px-4 py-2 rounded-r cursor-pointer transition-all"
        @click="showListQuestion = true"
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
import { defineComponent, ref } from "vue";
import { useUnitStore } from "../store/unitStore";
import { useModalStore } from "../store/modalStore";
import { storeToRefs } from "pinia";
import theoryIcon from "../assets/images/theory-icon.svg";
import MutipleChoiceHistory from "@/components/question/MutipleChoiceHistory.vue";
import TheoryModal from "@/components/modal/TheoryModal.vue";
export default defineComponent({
  name: "PracticeHistory",
  components: {
    MutipleChoiceHistory,
    TheoryModal,
  },
  setup() {
    const { unitDetail } = storeToRefs(useUnitStore());
    const { openTheoryModal } = storeToRefs(useModalStore());
    const prevRoute = ref("");
    const showListQuestion = ref(false);
    const currentPartQuestion = ref(null);
    const currentQuestion = ref(null);
    const selectedAll = ref(false);

    const moveToChoosedQuestion = (id) => {
      const index = unitDetail.value.questionPart.findIndex(
        (unit) => unit.id == id
      );
      unitDetail.value.currentIndex = index;
    };
    return {
      unitDetail,
      prevRoute,
      theoryIcon,
      showListQuestion,
      currentPartQuestion,
      openTheoryModal,
      selectedAll,
      moveToChoosedQuestion,
      currentQuestion,
    };
  },
});
</script>
<style>
.list-answer-wrapper {
  background: white;
  border-radius: 8px;
  padding: 16px;
  width: 50%;
  transform: translateX(-50%);
  margin: 10px 0 10px 50%;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
}
@media screen and (max-width: 767px) {
  .list-answer-wrapper {
    width: 100%;
    padding: 16px 40px;
  }
}
</style>
