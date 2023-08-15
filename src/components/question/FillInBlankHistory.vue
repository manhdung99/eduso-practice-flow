<template lang="">
  <div v-if="question">
    <div
      v-html="question.Description"
      class="font-medium pt-6 leading-12"
    ></div>
  </div>
</template>
<script lang="ts">
import { defineComponent, nextTick, onMounted } from "vue";
import { storeToRefs } from "pinia";
import theoryIcon from "../../assets/images/theory-icon.svg";
import { useUnitStore } from "../../store/unitStore";
import { useModalStore } from "../../store/modalStore";
import Question from "@/types/question";
export default defineComponent({
  name: "FillInBlank",
  props: {
    index: Number,
    question: Object,
    updateSelectedAnswer: Function,
    answerList: Array,
    oldAnswer: Array,
    fillInBlankQuestionList: Array,
  },
  setup(props) {
    const { lessonDetail } = storeToRefs(useUnitStore());
    const modal = useModalStore();
    const { updateTheoryModalStatus } = modal;
    const setDefaultProperty = () => {
      const questions = props.fillInBlankQuestionList as Array<Question>;
      const oldAnswer = props.oldAnswer as Array<any>;
      const elements = document.querySelectorAll(".fillquiz");

      for (let i = 0; i < elements.length; i++) {
        const question = questions[i] as Question;
        const element = elements[i] as HTMLInputElement;
        element.setAttribute("placeholder", "Trả lời");
        element.setAttribute("disabled", "");
        element.id = question.ID;
        element.value = question.Content;
        const oldIndex = oldAnswer.findIndex(
          (data) => data.QuestionID == element.id
        );
        if (oldIndex >= 0) {
          element.setAttribute("disabled", "");
          element.value = oldAnswer[oldIndex].AnswerValue;
        }
        if (question.status == "true") {
          element.classList.add("true");
        } else if (question.status == "false" && question.Content != null) {
          const siblingElement = element.nextSibling;
          if (siblingElement == null) {
            const newSpan = document.createElement("span");
            let strReturn = "";
            question.Answers.forEach((answer, index) => {
              if (index > 0) {
                strReturn = strReturn + " / ";
              }
              strReturn = strReturn + answer.Content;
            });
            newSpan.textContent = "(" + strReturn + ")";
            newSpan.classList.add("true-answer");
            element.parentNode.appendChild(newSpan);
          }
          element.classList.add("false");
        } else if (
          question.status == "unmake" ||
          (question.status == "false" && question.Content == null)
        ) {
          let strReturn = "";
          question.Answers.forEach((answer, index) => {
            if (index > 0) {
              strReturn = strReturn + " / ";
            }
            strReturn = strReturn + answer.Content;
          });
          element.value = strReturn;
          element.classList.add("unmake");
        }
        element.style.width = element.value.length + 2 + "ch";
      }
    };
    onMounted(() => {
      nextTick(() => {
        setDefaultProperty();
      });
    });
    return {
      theoryIcon,
      lessonDetail,
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
  border-color: #55934b;
  background: #eaf1e9;
  border: dashed #55934b 1px;
  color: #55934b;
}
</style>
