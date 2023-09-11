<template lang="">
  <div v-if="question" :id="question.ID">
    <div class="flex items-center justify-between my-4">
      <span v-html="question.Content"> </span>
    </div>
    <div class="text-raspberry mb-2" v-if="question.correctAnswerLeft > 0">
      Còn {{ question.correctAnswerLeft }} câu trả lời đúng
    </div>
    <div
      :class="question.Answers[0].Media ? 'flex justify-center flex-wrap' : ''"
      class="font-medium"
    >
      <div
        v-for="answer in question.Answers"
        :key="answer.ID"
        :class="[
          question.CloneAnswers.includes(answer.ID) &&
          question.status == 'selected'
            ? 'bg-iceberg text-white'
            : '',
          question.CloneAnswers.includes(answer.ID) &&
          answer.IsCorrect == true &&
          question.status != 'unmake' &&
          question.status != 'selected'
            ? '!bg-green-lighter !border-green !text-green'
            : '',
          question.CloneAnswers.includes(answer.ID) &&
          answer.IsCorrect == false &&
          question.status != 'unmake' &&
          question.status != 'selected'
            ? 'bg-raspberry-lighter border-raspberry !text-raspberry'
            : '',
          !question.CloneAnswers.includes(answer.ID) &&
          question.status == 'selected'
            ? 'hover:border-iceberg hover:text-iceberg'
            : '',
          answer.Media ? 'w-3/10 mx-1 flex items-center justify-center' : '',
        ]"
        @click="updateSelectedAnswerMany(question.ID, answer.ID)"
        class="px-4 py-3 border border-neutral-300 rounded mb-2 cursor-pointer"
      >
        <span v-if="!answer.Media" v-html="answer.Content"></span>
        <div v-else>
          <div class="" v-if="answer.Media.Extension.includes('image')">
            <img :src="answer.Media.Path" alt="" />
          </div>
        </div>
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
