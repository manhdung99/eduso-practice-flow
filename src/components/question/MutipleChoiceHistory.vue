<template lang="">
  <div v-if="question">
    <div class="flex items-center justify-between my-4 gap-x-5">
      <span
        ><strong>Question {{ index + 1 }}.</strong>
        {{ question.questionValue }}</span
      >
      <img
        @click="updateTheoryModalStatus(true)"
        class="hover:opacity-80 cursor-pointer"
        :src="theoryIcon"
        alt=""
      />
    </div>
    <div class="font-medium">
      <div
        v-for="answer in question.answers"
        :key="answer.answerID"
        :class="[
          answer.answerID == question.selectedAnswer &&
          question.status == 'true'
            ? 'bg-green-lighter border-green'
            : '',
          answer.answerID == question.selectedAnswer &&
          question.status == 'false'
            ? 'bg-raspberry-lighter border-raspberry'
            : '',
          answer.answerID == question.correctAnswer &&
          question.status == 'false'
            ? '!border-green border-dashed'
            : '',
          answer.answerID == question.correctAnswer &&
          question.status == 'unmake'
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
