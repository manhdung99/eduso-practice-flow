<template lang="">
  <div v-if="question" :id="question.ID">
    <div class="flex items-center justify-between my-4">
      <span class="w-4/5" v-html="question.Content"> </span>
    </div>
    <div class="font-medium">
      <div
        v-for="answer in question.Answers"
        :key="answer.ID"
        :class="[
          question.CloneAnswers.includes(answer.ID) &&
          question.status == 'unmake'
            ? 'bg-iceberg text-white'
            : '',
          question.CloneAnswers.includes(answer.ID) &&
          answer.IsCorrect == true &&
          question.status != 'unmake'
            ? '!bg-green-lighter !border-green !text-green'
            : '',
          question.CloneAnswers.includes(answer.ID) &&
          answer.IsCorrect == false &&
          question.status != 'unmake'
            ? 'bg-raspberry-lighter border-raspberry !text-raspberry'
            : '',
          question.CloneAnswers.length == 0 &&
          answer.IsCorrect == true &&
          question.status == 'unmake'
            ? '!bg-green-lighter !border-green !text-green !border-dashed'
            : '',
        ]"
        @click="updateSelectedAnswerMany(question.ID, answer.ID)"
        class="px-4 py-3 border border-neutral-300 rounded mb-2 cursor-pointer"
      >
        <span v-html="answer.Content"></span>
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
  name: "MutipleChoiceMany",
  props: {
    index: Number,
    question: Object,
    updateSelectedAnswerMany: Function,
    partID: [Number, String],
  },
  setup() {
    const { lessonDetail } = storeToRefs(useUnitStore());
    const modal = useModalStore();
    const { updateTheoryModalStatus } = modal;
    return {
      theoryIcon,
      lessonDetail,
      updateTheoryModalStatus,
    };
  },
});
</script>
