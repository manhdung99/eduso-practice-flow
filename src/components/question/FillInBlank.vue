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
      class="font-medium pr-14 pt-4 leading-12"
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
  name: "FillInBlank",
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
    const setDefaultProperty = () => {
      const answers = props.answerList as Array<any>;
      const elements = document.getElementsByClassName("fillquiz");
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i] as HTMLInputElement;
        if (props.question.status != "unmake") {
          element.setAttribute("disabled", "");
        }
        element.setAttribute("placeholder", "Trả lời");
        element.id = answers[i].answerID;
        element.value = answers[i].currentAnswer;
        if (answers[i].status == "true") {
          element.classList.add("true");
        } else if (answers[i].status == "false") {
          element.classList.add("false");
        }
      }
    };
    onMounted(() => {
      nextTick(() => {
        setDefaultProperty();
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
.one-question::-webkit-scrollbar {
  height: 6px;
  width: 2px;
}

.one-question::-webkit-scrollbar-thumb {
  background: #555555;
  border-radius: 10px;
}

.one-question::-webkit-scrollbar-track {
  box-shadow: inset 0 0 2px #555555;
  border-radius: 10px;
}
</style>
