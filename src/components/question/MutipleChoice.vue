<template lang="">
  <div v-if="question" :id="question.ID">
    <div class="flex items-center justify-between my-4">
      <span v-html="question.Content"> </span>
    </div>
    <div class="font-medium">
      <div
        v-for="answer in question.Answers"
        :key="answer.ID"
        :class="[
          question.CloneAnswers == answer.ID && question.status == 'selected'
            ? 'bg-iceberg text-white'
            : '',
          question.CloneAnswers == answer.ID && question.status == 'true'
            ? '!bg-green-lighter !border-green !text-green'
            : '',
          question.CloneAnswers == answer.ID && question.status == 'false'
            ? 'bg-raspberry-lighter border-raspberry !text-raspberry'
            : '',
          question.CloneAnswers != answer.ID && question.status == 'selected'
            ? 'hover:border-iceberg hover:text-iceberg'
            : '',
        ]"
        @click="updateSelectedAnswer(question.ID, answer.ID)"
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
  name: "MutipleChoice",
  props: {
    index: Number,
    question: Object,
    updateSelectedAnswer: Function,
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
