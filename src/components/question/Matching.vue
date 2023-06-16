<template lang="">
  <div v-if="question">
    <!-- <div class="absolute right-1 top-4">
      <img
        @click="updateTheoryModalStatus(true)"
        class="hover:opacity-80 cursor-pointer"
        :src="theoryIcon"
        alt=""
      />
    </div> -->
    <div class="">
      <div
        class="image-wrapper"
        v-for="(image, index) in question.images"
        :key="image.id"
      >
        <span>{{ labels[index] }}</span>
        <div class="rounded-md inline-block overflow-hidden">
          <img :src="image.answerImage" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, nextTick, onMounted } from "vue";
import theoryIcon from "../../assets/images/theory-icon.svg";
import { useModalStore } from "../../store/modalStore";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Matching",
  props: {
    index: Number,
    question: Object,
    updateSelectedAnswer: Function,
    partID: [Number, String],
    answerList: Array,
  },
  setup() {
    const modal = useModalStore();
    const { updateTheoryModalStatus } = modal;
    const labels = ["A", "B", "C"];
    return {
      theoryIcon,
      labels,
      updateTheoryModalStatus,
    };
  },
});
</script>

<style>
.image-wrapper {
  max-width: 225px;
}
</style>
