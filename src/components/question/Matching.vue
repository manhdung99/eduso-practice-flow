<template lang="">
  <div v-if="currentPartQuestion" class="flex flex-wrap h-full">
    <div
      class="w-full lg:w-1/2 h-auto lg:h-full mb-4 lg:mb-0 lg:border-r lg:border-gray-400 pl-8 pr-5 lg:pr-8 pt-4 lg:px-4 relative scroll-area"
    >
      <div
        v-if="currentPartQuestion.Title"
        v-html="currentPartQuestion.Title"
      ></div>
      <div
        v-if="currentPartQuestion.Description"
        v-html="currentPartQuestion.Description"
      ></div>
      <div
        v-if="
          currentPartQuestion.Media != null &&
          currentPartQuestion.Media.Extension.includes('audio')
        "
      >
        <audio :src="currentPartQuestion.Media.Path" controls></audio>
      </div>
      <div
        v-for="answer in answerList"
        :key="answer.ID"
        :id="answer.ID"
        class="font-medium mt-12 leading-12 target-div cursor-pointer"
        @click="setAnswer(answer)"
      >
        <div
          class="border border-gray-400 rounded pl-4"
          v-if="answer.isShow && answer.Media == null"
          v-html="answer.Content"
        ></div>
        <div
          class="border border-gray-400 rounded pl-4"
          v-if="
            answer.isShow &&
            answer.Media != null &&
            answer.Media.Extension.includes('image')
          "
        >
          <img :src="answer.Media.Path" alt="" />
        </div>
      </div>
    </div>
    <div
      class="w-full lg:w-1/2 h-full pl-8 pr-5 lg:pl-4 lg:pr-1 relative lg:pt-4"
    >
      <div class="pt-2 border-t border-gray-400 lg:border-0 lg:pt-0">
        <div
          v-for="(question, index) in currentPartQuestion.Questions"
          :key="question.ID"
          :id="question.ID"
        >
          <div class="mb-4">
            <div v-html="question.Content" class="font-medium"></div>
            <div
              @click="currentIndex = index"
              :class="[
                index == currentIndex && question.status == 'unmake'
                  ? 'active'
                  : '',
                question.status == 'false' ? 'false' : '',
                question.status == 'true' ? 'true' : '',
                question.status == 'answered' ? 'has-content' : '',
              ]"
              class="matching-input"
            >
              <span
                @click="removeImage(question)"
                :class="question.status == 'answered' ? '' : 'hidden'"
                class="w-6 h-6 absolute right-2 top-3"
                ><img :src="removeIcon" alt=""
              /></span>
              <span
                :class="question.status != 'unmake' ? 'hidden' : ''"
                class="matching-input-text"
              >
                {{ index == currentIndex ? placeholderText : "Đáp án" }}
              </span>
              <div
                v-if="
                  question.status != 'unmake' &&
                  question.selectedAnswer.Path == null
                "
                v-html="question.selectedAnswer"
              ></div>
              <div
                v-if="
                  question.status != 'unmake' &&
                  question.selectedAnswer.Path != null &&
                  question.selectedAnswer.Extension.includes('image')
                "
              >
                <img :src="question.selectedAnswer.Path" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from "vue";
import theoryIcon from "../../assets/images/theory-icon.svg";
import { useModalStore } from "../../store/modalStore";
import removeIcon from "../../assets/images/remove.svg";
import Answer from "@/types/answer";
export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Matching",
  props: {
    index: Number,
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
    const isMobileView = ref(window.innerWidth <= 767);

    const placeholderText = computed(() => {
      return isMobileView.value
        ? "Chọn đáp án từ danh sách trên" // Text for mobile view
        : "Chọn đáp án từ danh sách bên cạnh"; // Text for desktop view
    });
    const handleResize = () => {
      isMobileView.value = window.innerWidth <= 767;
    };

    //Set image answer
    const setAnswer = (answer) => {
      const question = props.currentPartQuestion.Questions[currentIndex.value];
      const answerList = props.answerList as Array<Answer>;
      if (currentAnswer.value.status == "unmake") {
        if (answer.Media != null) {
          question.selectedAnswer = answer.Media;
        } else {
          question.selectedAnswer = answer.Content;
        }
        question.selectedAnswerID = answer.ID;
        question.status = "answered";

        const answerIndex = answerList.findIndex(
          (data: Answer) => data.ID == answer.ID
        );
        answerList[answerIndex].isShow = false;
        findCurrentIndex();
      }
      props.setAllSelectd(true);
      props.currentPartQuestion.Questions.forEach((question) => {
        if (question.selectedAnswer == "") {
          props.setAllSelectd(false);
        }
      });
    };
    const findCurrentIndex = () => {
      const answeredIndex = props.currentPartQuestion.Questions.findIndex(
        (answer: Answer) => {
          return answer.status == "unmake";
        }
      );
      currentIndex.value = answeredIndex >= 0 ? answeredIndex : 0;
    };
    // Set current answer when click
    const setCurrentAnswer = (index = currentIndex.value) => {
      currentAnswer.value = props.currentPartQuestion.Questions[index];
    };
    //Remove image in div
    const removeImage = async (question) => {
      const answerList = props.answerList as Array<Answer>;
      const answerIndex = answerList.findIndex(
        (data: Answer) => data.ID == question.selectedAnswerID
      );
      answerList[answerIndex].isShow = true;
      question.selectedAnswer = "";
      question.status = "unmake";
      props.setAllSelectd(false);
    };
    onMounted(() => {
      findCurrentIndex();
      setCurrentAnswer();
    });
    onMounted(() => {
      window.addEventListener("resize", handleResize);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("resize", handleResize);
    });
    watch(
      () => [currentIndex.value],
      () => {
        setCurrentAnswer();
      }
    );
    watch(
      () => [props.currentPartQuestion.status],
      () => {
        findCurrentIndex();
        setCurrentAnswer();
      }
    );
    watch(
      () => props.unitIndex,
      () => findCurrentIndex()
    );
    return {
      theoryIcon,
      labels,
      currentIndex,
      currentAnswerSelected,
      currentAnswer,
      updateTheoryModalStatus,
      setAnswer,
      removeImage,
      removeIcon,
      isMobileView,
      placeholderText,
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
  padding: 12px 12px;
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
.matching-input.has-content {
  border: 1px solid #a1a1a1;
  padding-right: 36px;
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

@media screen and (max-width: 1023px) {
  .checking-btn-wrapper.matching {
    width: calc(100% - 64px);
    right: unset;
    bottom: 16px;
    left: 32px;
  }
}
</style>
