<template lang="">
  <div class="flex flex-wrap" v-if="question">
    <div class="w-full h-full pl-8 pr-5 lg:pl-4 lg:pr-1 relative lg:pt-4">
      <div>
        <div v-for="(answer, index) in question.answers" :key="answer.answerID">
          <div class="mb-4 flex items-center">
            <div v-html="answer.contentAnswer" class="font-medium flex-1"></div>
            <div
              @click="currentIndex = index"
              :class="[
                answer.status == false ? 'false' : '',
                answer.status == 'unmake' ? 'unmake' : '',
                answer.status == true ? 'true' : '',
              ]"
              class="matching-input flex-1"
            >
              <span
                @click="removeImage($event, index)"
                :class="answer.status != 'answered' ? 'hidden' : ''"
                class="w-6 h-6 absolute right-2 top-2"
                ><img :src="removeIcon" alt=""
              /></span>
              <div
                v-if="answer.status == 'unmake'"
                v-html="answer.contentQuestion"
              ></div>
              <div
                v-if="answer.status != 'unmake'"
                v-html="answer.currentContent"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import theoryIcon from "../../assets/images/theory-icon.svg";
import { useModalStore } from "../../store/modalStore";
import removeIcon from "../../assets/images/remove.svg";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Matching",
  props: {
    index: Number,
    question: Object,
    updateSelectedAnswer: Function,
    partID: [Number, String],
    answerList: Array,
    currentPartQuestion: Object,
    setAllSelectd: Function,
    unitIndex: Number,
  },
  setup(props) {
    const modal = useModalStore();
    const { updateTheoryModalStatus } = modal;
    const labels = ["A", "B", "C"];
    const currentIndex = ref(0);
    const currentAnswerSelected = ref(null);
    const currentAnswer = ref(null);

    //Set image answer when click

    const setImage = (event, index) => {
      if (currentAnswer.value.status == "unmake") {
        const targetDiv = event.target.closest(".target-div");
        if (targetDiv) {
          const targetElement = targetDiv.firstChild;
          // const newTargetElement = document.createElement("img");
          // newTargetElement.src = targetElement.src;
          targetElement.classList.add("new-target-element");
          // targetElement.width = targetElement.width;
          targetElement.dataset.indexNumber = targetDiv.id;
          currentAnswer.value.status = "answered";
          currentAnswer.value.currentContent = targetElement.outerHTML;
          const currentImageAnswer = props.question.answers[index];
          currentImageAnswer.choosedContent = true;
          if (currentIndex.value < props.question.answers.length - 1) {
            currentIndex.value++;
          }
        }
        props.setAllSelectd(true);
        props.question.answers.forEach((answer) => {
          if (answer.status == "unmake") {
            props.setAllSelectd(false);
          }
        });
      }
    };
    // Set current answer when click
    const setCurrentAnswer = (index = currentIndex.value) => {
      const elements = document.getElementsByClassName("matching-input");
      currentAnswerSelected.value = elements[index];
      currentAnswer.value = props.question.answers[index];
    };
    //Remove image in div
    const removeImage = async (event, index) => {
      const currentDiv = event.target.closest(".matching-input");
      const currentImg = currentDiv.querySelector(".new-target-element");
      await setCurrentAnswer(index);
      currentAnswer.value.status = "unmake";
      const answerIndex = props.question.answers.findIndex(
        (answer) => answer.answerID == currentImg.dataset.indexNumber
      );
      const currentAnswerImage = props.question.answers[answerIndex];
      currentAnswerImage.choosedContent = false;
      props.setAllSelectd(false);
    };
    onMounted(() => {
      setCurrentAnswer();
    });
    watch(
      () => currentIndex.value,
      () => setCurrentAnswer()
    );
    watch(
      () => props.unitIndex,
      () => {
        currentIndex.value = 0;
        setCurrentAnswer();
      }
    );
    return {
      theoryIcon,
      labels,
      currentIndex,
      currentAnswerSelected,
      currentAnswer,
      updateTheoryModalStatus,
      setImage,
      removeImage,
      removeIcon,
    };
  },
});
</script>

<style>
.image-wrapper {
  max-width: 225px;
}
.matching-input {
  border: 1px dashed #a1a1a1;
  outline: none;
  padding: 8px 12px;
  position: relative;
  width: 100%;
  border-radius: 4px;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: 500;
}
.matching-input.active {
  border: 1px solid #1c4c66;
}
.matching-input-text {
  font-style: italic;
  color: #0009;
}
.checking-btn-wrapper.matching {
  width: calc(50% - 32px);
  right: 16px;
}
.matching-input.false {
  border: 1px solid #d03239;
  background: #fbebec;
}
.matching-input.true {
  border: 1px solid #55934b;
  background: #eaf1e9;
}
.matching-input.unmake {
  border: 1px dashed #55934b;
  color: #55934b;
}
.matching-input.has-content {
  border: 1px solid #a1a1a1;
  padding-right: 36px;
}
.new-target-element p {
  margin: 0;
}
.target-div p {
  border: 1px solid #a1a1a1;
  padding: 0 16px;
  border-radius: 4px;
  margin-bottom: 0;
}
.target-div p:has(img):first-child {
  border: none;
  padding: 0;
}

@media screen and (max-width: 1023px) {
  .checking-btn-wrapper.matching {
    width: calc(100% - 64px);
    right: unset;
    margin-left: 32px;
  }
}
</style>
