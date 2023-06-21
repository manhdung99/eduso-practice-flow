<template lang="">
  <div class="flex" v-if="question">
    <div
      class="w-1/2 h-full lg:border-r lg:border-gray-400 px-8 lg:px-4 absolute lg:relative -right-full lg:!right-0 transition-all question-part-content scroll-area"
    >
      <div v-html="currentPartQuestion.partContent"></div>
      <div
        v-for="answer in question.answers"
        :key="answer.answerID"
        v-html="answer.image"
        :id="answer.answerID"
        class="font-medium pt-4 leading-12 target-div cursor-pointer"
        @click="setImage($event)"
      ></div>
    </div>
    <div
      class="w-full lg:w-1/2 h-full px-8 lg:px-4 lg:relative absolute transition-all"
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
              :class="index == currentIndex ? 'active' : ''"
              class="matching-input"
            >
              <span
                @click="removeImage(index)"
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
  },
  setup(props) {
    const modal = useModalStore();
    const { updateTheoryModalStatus } = modal;
    const labels = ["A", "B", "C"];
    const currentIndex = ref(0);
    const currentAnswerSelected = ref(null);
    const currentAnswer = ref(null);
    const setImage = (event) => {
      if (currentAnswer.value.status == "unmake") {
        const targetDiv = event.target.closest(".target-div");
        if (targetDiv) {
          const imageElement = targetDiv.querySelector("img");
          const newImageElement = document.createElement("img");
          newImageElement.src = imageElement.src;
          newImageElement.classList.add("new-image");
          newImageElement.dataset.indexNumber = targetDiv.id;
          imageElement.style.display = "none";
          currentAnswerSelected.value.appendChild(newImageElement);
          currentAnswer.value.status = "answered";
        }
      }
    };
    const setCurrentAnswer = (index = currentIndex.value) => {
      const elements = document.getElementsByClassName("matching-input");
      currentAnswerSelected.value = elements[index];
      currentAnswer.value = props.question.answers[index];
    };
    const removeImage = async (index) => {
      await setCurrentAnswer(index);
      const imgElement =
        currentAnswerSelected.value.querySelector(".new-image");
      currentAnswerSelected.value.removeChild(imgElement);
      currentAnswer.value.status = "unmake";
      const targetDiv = document.getElementById(currentAnswer.value.answerID);
      const imageElement = targetDiv.querySelector("img");
      imageElement.style.display = "block";
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
</style>
