<template lang="">
  <div v-if="question">
    <div class="absolute right-1 top-4">
      <img
        @click="updateTheoryModalStatus(true)"
        class="hover:opacity-80 cursor-pointer"
        :src="theoryIcon"
        alt=""
      />
    </div>
    <div
      v-html="question.Description"
      class="font-medium lg:pr-14 pt-4 leading-12"
    ></div>
  </div>
</template>
<script lang="ts">
import { defineComponent, nextTick, onMounted } from "vue";
import { storeToRefs } from "pinia";
import theoryIcon from "../../assets/images/theory-icon.svg";
import { useUnitStore } from "../../store/unitStore";
import { useModalStore } from "../../store/modalStore";

export default defineComponent({
  name: "FillInBlankHistory",
  props: {
    index: Number,
    question: Object,
    updateSelectedAnswer: Function,
    partID: [Number, String],
    answerList: Array,
  },
  setup(props) {
    const { unitDetail } = storeToRefs(useUnitStore());
    const modal = useModalStore();
    const { updateTheoryModalStatus } = modal;
    const setAnswer = () => {
      const answers = props.answerList as Array<any>;
      const elements = document.getElementsByClassName("fillquiz");
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i] as HTMLInputElement;
        if (props.question.status != "unmake") {
          element.setAttribute("disabled", "");
        }
        element.id = answers[i].answerID;
        element.value = answers[i].currentAnswer;
        element.style.width = answers[i].currentAnswer.length + 4 + "ch";
        if (answers[i].status == "true") {
          element.classList.add("true");
        } else if (answers[i].status == "false") {
          const siblingElement = element.nextSibling;
          if (siblingElement == null) {
            const newSpan = document.createElement("span");
            newSpan.textContent = answers[i].answerValue;
            newSpan.classList.add("true-answer");
            element.parentNode.appendChild(newSpan);
          }
          element.classList.add("false");
        } else {
          element.value = answers[i].answerValue;
          element.style.width = answers[i].answerValue.length + 4 + "ch";
          element.classList.add("unmake");
        }
      }
    };
    onMounted(() => {
      nextTick(() => {
        setAnswer();
      });
    });
    return {
      theoryIcon,
      unitDetail,
      updateTheoryModalStatus,
    };
  },
});
</script>
<style>
.true-answer {
  color: #55934b;
  margin-left: 8px;
}
.fillquiz.unmake {
  background: white;
  border: 1px #55934b dashed;
  color: #55934b;
}
</style>
