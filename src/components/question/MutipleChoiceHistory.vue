<template lang="">
  <div v-if="question">
    <div class="flex items-center justify-between my-4 gap-x-5">
      <span class="w-4/5"
        ><strong>Question {{ index + 1 }}.</strong>
        {{ question.questionValue }}</span
      >
      <span>
        <img
          @click="updateTheoryModalStatus(true)"
          class="hover:opacity-80 cursor-pointer"
          :src="theoryIcon"
          alt=""
        />
      </span>
    </div>
    <div class="font-medium">
      <div
        v-for="answer in question.answers"
        :key="answer.answerID"
        :class="[
          question.selectedAnswer == answer.answerID &&
          question.correctAnswer == answer.answerID
            ? 'bg-green-lighter border-green'
            : '',
          question.selectedAnswer == answer.answerID &&
          question.correctAnswer != answer.answerID
            ? 'bg-raspberry-lighter border-raspberry'
            : '',
          question.selectedAnswer != answer.answerID &&
          question.correctAnswer == answer.answerID
            ? '!border-green border-dashed'
            : '',
        ]"
        class="px-4 py-3 border border-neutral-300 rounded mb-2"
      >
        <span>{{ answer.answerValue }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { storeToRefs } from "pinia";
import theoryIcon from "../../assets/images/theory-icon.svg";
import { useUnitStore } from "../../store/unitStore";
import { useModalStore } from "../../store/modalStore";

export default defineComponent({
  name: "MutipleChoiceHistory",
  props: {
    index: Number,
    question: Object,
    updateSelectedAnswer: Function,
    partID: [Number, String],
  },
  setup() {
    const { unitDetail } = storeToRefs(useUnitStore());
    const modal = useModalStore();
    const { updateTheoryModalStatus } = modal;
    return {
      theoryIcon,
      unitDetail,
      updateTheoryModalStatus,
    };
  },
});
</script>
