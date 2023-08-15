<template lang="">
  <div class="flex flex-wrap" v-if="question" :id="question.ID">
    <div class="w-full h-full lg:pr-1 relative lg:pt-4 py-2">
      <div>
        <div>
          <div class="">
            <div
              v-html="question.Content"
              class="font-medium flex-1 mr-4"
            ></div>
            <!-- Chưa làm -->
            <div v-if="question.status == 'unmake'">
              <div class="text-green text-sm italic">đáp án đúng</div>
              <div class="matching-input unmake flex-1">
                <div
                  v-if="question.Answers[0].Media == null"
                  v-html="question.Answers[0].Content"
                ></div>
                <div
                  v-if="
                    question.Answers[0].Media != null &&
                    question.Answers[0].Media.Extension.includes('image')
                  "
                >
                  <img :src="question.Answers[0].Media.Path" alt="" />
                </div>
              </div>
            </div>
            <!-- Làm đúng -->
            <div v-else-if="question.status == 'true'">
              <div class="italic mb-1">Đáp án của bạn</div>
              <div class="matching-input true flex-1">
                <div
                  v-if="question.Answers[0].Media == null"
                  v-html="question.Answers[0].Content"
                ></div>
                <div
                  v-if="
                    question.Answers[0].Media != null &&
                    question.Answers[0].Media.Extension.includes('image')
                  "
                >
                  <img :src="question.Answers[0].Media.Path" alt="" />
                </div>
              </div>
            </div>
            <!-- làm sai  -->
            <div v-else-if="question.status == 'false'">
              <div v-if="question.selectedAnswer" class="italic">
                Đáp án của bạn
              </div>
              <div
                v-if="question.selectedAnswer"
                class="matching-input false flex-1"
              >
                <div
                  v-if="question.selectedAnswer.Path == null"
                  v-html="question.selectedAnswer"
                ></div>
                <div
                  v-if="
                    question.selectedAnswer != null &&
                    question.selectedAnswer.Path != null &&
                    question.selectedAnswer.Extension.includes('image')
                  "
                >
                  <img :src="question.selectedAnswer.Path" alt="" />
                </div>
              </div>
              <div class="text-green text-sm italic mt-2 mb-1">đáp án đúng</div>
              <div class="matching-input unmake flex-1">
                <div
                  v-if="question.Answers[0].Media == null"
                  v-html="question.Answers[0].Content"
                ></div>
                <div
                  v-if="
                    question.Answers[0].Media != null &&
                    question.Answers[0].Media.Extension.includes('image')
                  "
                >
                  <img :src="question.Answers[0].Media.Path" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import theoryIcon from "../../assets/images/theory-icon.svg";
import { useModalStore } from "../../store/modalStore";
import removeIcon from "../../assets/images/remove.svg";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "MatchingHistory",
  props: {
    index: Number,
    question: Object,
    updateSelectedAnswer: Function,
    partID: [Number, String],
    answerList: Array,
    currentPartQuestion: Object,
    setAllSelectd: Function,
    unitIndex: Number,
  },
  setup() {
    const modal = useModalStore();
    const { updateTheoryModalStatus } = modal;
    const labels = ["A", "B", "C"];
    const currentIndex = ref(0);
    const currentAnswerSelected = ref(null);
    const currentAnswer = ref(null);

    return {
      theoryIcon,
      labels,
      currentIndex,
      currentAnswerSelected,
      currentAnswer,
      updateTheoryModalStatus,
      removeIcon,
    };
  },
});
</script>

<style>
.matching-input.false {
  border: 1px solid #d03239;
  background: #fbebec;
}
.matching-input.true {
  border: 1px solid #55934b;
  background: #eaf1e9;
}
.matching-input.unmake {
  border: 1px dashed #55934b;
  color: #55934b;
}
</style>
