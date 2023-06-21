<template lang="">
  <div class="flex" v-if="question">
    <div
      class="w-1/2 h-full lg:border-r lg:border-gray-400 px-8 pt-4 lg:px-4 absolute lg:relative -right-full lg:!right-0 transition-all question-part-content scroll-area"
    >
      <div v-html="currentPartQuestion.partContent"></div>
      <div
        v-for="(answer, index) in question.answers"
        :key="answer.answerID"
        :id="answer.answerID"
        class="font-medium pt-4 leading-12 target-div cursor-pointer"
        @click="setImage($event, index)"
      >
        <div v-show="!answer.choosedContent" v-html="answer.image"></div>
      </div>
    </div>
    <div
      class="w-full lg:w-1/2 h-full px-8 lg:pl-4 lg:pr-1 lg:relative absolute transition-all lg:pt-4"
    >
      <div class="">
        <div
          class=""
          v-for="(answer, index) in question.answers"
          :key="answer.answerID"
        >
          <div>
            <p class="font-medium">{{ answer.content }}</p>
            <div
              @click="currentIndex = index"
              :class="[
                index == currentIndex && answer.status == 'unmake'
                  ? 'active'
                  : '',
                answer.status == false ? 'false' : '',
                answer.status == true ? 'true' : '',
              ]"
              class="matching-input"
            >
              <span
                @click="removeImage($event, index)"
                :class="answer.status != 'answered' ? 'hidden' : ''"
                class="w-6 h-6 absolute right-0 top-1"
                ><img :src="removeIcon" alt=""
              /></span>
              <span
                :class="answer.status != 'unmake' ? 'hidden' : ''"
                class="matching-input-text"
              >
                {{
                  index == currentIndex
                    ? "Chọn đáp án từ danh sách bên cạnh"
                    : "Đáp án"
                }}
              </span>
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
import { defineComponent, nextTick, onMounted, ref, watch } from "vue";
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
          const imageElement = targetDiv.querySelector("img");
          const newImageElement = document.createElement("img");
          newImageElement.src = imageElement.src;
          newImageElement.classList.add("new-image");
          newImageElement.width = imageElement.width;
          newImageElement.dataset.indexNumber = targetDiv.id;
          currentAnswer.value.status = "answered";
          currentAnswer.value.currentContent = newImageElement.outerHTML;
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
      const currentImg = currentDiv.querySelector(".new-image");
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
}
.matching-input.true {
  border: 1px solid #55934b;
}
</style>
