<template lang="">
  <div v-if="question">
    <div class="absolute right-0 top-4">
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
  name: "DropBox",
  props: {
    index: Number,
    question: Object,
    updateSelectedAnswer: Function,
    partID: [Number, String],
    optionList: Array,
  },
  setup(props) {
    const { unitDetail } = storeToRefs(useUnitStore());
    const modal = useModalStore();
    const { updateTheoryModalStatus } = modal;
    const setDefaultProperty = () => {
      const answers = props.optionList as object;
      const elements = document.getElementsByClassName("selectquiz");
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i] as HTMLSelectElement;
        const options = answers[i].optionValue;
        const currentOption = element.options;
        if (currentOption.length < 1) {
          const defaultOption = document.createElement("option");
          defaultOption.value = "";
          defaultOption.text = "Chọn 1 đáp án";
          element.appendChild(defaultOption);
          for (let j = 0; j < options.length; j++) {
            const option = document.createElement("option");
            option.value = options[j];
            option.text = options[j];
            element.appendChild(option);
          }
        }
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
.selectquiz {
  border: 1px solid #d9d9d9;
  height: 40px;
  outline: none;
  padding: 0 12px;
  position: relative;
}
.selectquiz.false {
  border-color: #d03239;
  background: #fbebec;
  color: #d03239;
}
.selectquiz.true {
  border-color: #55934b;
  background: #eaf1e9;
}
.selectquiz:focus {
  border-color: #40a9ff;
}
</style>
