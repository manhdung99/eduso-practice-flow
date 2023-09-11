<template lang="">
  <div v-if="question" :id="question.ID">
    <div class="flex items-center justify-between my-4">
      <span v-html="question.Content"> </span>
    </div>
    <div
      :class="question.Answers[0].Media ? 'flex justify-center flex-wrap' : ''"
      class="font-medium"
    >
      <div
        v-for="answer in question.Answers"
        :key="answer.ID"
        :class="[
          question.CloneAnswers == answer.ID && question.status == 'true'
            ? '!bg-green-lighter !border-green !text-green'
            : '',
          question.CloneAnswers == answer.ID && question.status == 'false'
            ? 'bg-raspberry-lighter border-raspberry !text-raspberry'
            : '',
          answer.IsCorrect && question.status == 'false'
            ? ' border-dashed !background-white !text-green !border-green'
            : '',
          answer.IsCorrect && question.status == 'unmake'
            ? ' border-dashed !background-white !text-green !border-green'
            : '',
          answer.IsCorrect &&
          question.status == 'true' &&
          question.CloneAnswers == null
            ? ' border-dashed !background-white !text-green !border-green'
            : '',
          answer.Media ? 'w-3/10 mx-1 flex items-center justify-center' : '',
        ]"
        class="px-4 py-3 border border-neutral-300 rounded mb-2 cursor-pointer"
      >
        <span v-if="!answer.Media" v-html="answer.Content"></span>
        <div v-else>
          <div v-if="answer.Media.Extension.includes('image')">
            <span v-if="!answer.Media" v-html="answer.Content"></span>
            <div v-else>
              <div v-if="answer.Media.Extension.includes('image')">
                <img :src="answer.Media.Path" alt="" />
              </div>
            </div>
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
  name: "MutipleChoiceHistory",
  props: {
    index: Number,
    question: Object,
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
