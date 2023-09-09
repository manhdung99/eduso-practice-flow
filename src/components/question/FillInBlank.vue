<template lang="">
  <div class="h-full" v-if="question">
    <div
      v-html="question.Description"
      class="font-medium pt-12 leading-12"
    ></div>
  </div>
</template>
<script lang="ts">
import { defineComponent, nextTick, onMounted, watch } from "vue";
import { storeToRefs } from "pinia";
import theoryIcon from "../../assets/images/theory-icon.svg";
import { useUnitStore } from "../../store/unitStore";
import { useModalStore } from "../../store/modalStore";

export default defineComponent({
  name: "FillInBlank",
  props: {
    index: Number,
    question: Object,
    updateSelectedAnswer: Function,
    partID: [Number, String],
    answerList: Array,
    oldAnswer: Array,
    partIndex: Number,
  },
  setup(props) {
    const { lessonDetail, theoryData } = storeToRefs(useUnitStore());
    const modal = useModalStore();
    const { updateTheoryModalStatus } = modal;
    const setDefaultProperty = () => {
      const answers = props.answerList as Array<any>;
      const oldAnswer = props.oldAnswer as Array<any>;
      const questions = props.question;
      const elements = document.getElementsByClassName("fillquiz");
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i] as HTMLInputElement;

        element.setAttribute("placeholder", "Trả lời");
        element.id = answers[i][0].ParentID;
        if (questions.Questions[i].CloneAnswers) {
          element.value = questions.Questions[i].CloneAnswers;
          if (questions.Questions[i].status == "unmake") {
            questions.Questions[i].status = "answered";
          }
        }
        const oldIndex = oldAnswer.findIndex(
          (data) => data.QuestionID == element.id
        );
        if (oldIndex >= 0) {
          element.setAttribute("disabled", "");
          element.value = oldAnswer[oldIndex].AnswerValue;
        }
        if (questions.Questions[i].status == "true") {
          element.classList.add("true");
        } else if (questions.Questions[i].status == "false") {
          element.classList.add("false");
        }
      }
    };
    onMounted(() => {
      nextTick(() => {
        setDefaultProperty();
      });
    });
    watch(
      () => props.partIndex,
      () => {
        nextTick(() => {
          setDefaultProperty();
        });
      }
    );
    return {
      theoryIcon,
      lessonDetail,
      theoryData,
      updateTheoryModalStatus,
    };
  },
});
</script>
<style>
.one-question {
  height: calc(100% - 128px);
  position: relative;
}
.fillquiz {
  border: 1px solid #d9d9d9;
  height: 40px;
  outline: none;
  padding-left: 12px;
  position: relative;
  border-radius: 4px;
}
.fillquiz.false {
  border-color: #d03239;
  background: #fbebec;
  color: #d03239;
}
.fillquiz.true {
  border-color: #55934b;
  background: #eaf1e9;
}
.fillquiz::placeholder {
  color: #c2c2c2;
  font-style: italic;
  font-weight: 400;
}
.fillquiz:focus {
  border-color: #40a9ff;
}
.one-question {
  height: calc(100% - 100px);
  position: relative;
}
</style>
