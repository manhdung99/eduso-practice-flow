<template>
  <div
    ref="process"
    class="process-bar"
    :style="{ width: process.width + '%' }"
  ></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  name: "ProcessVue",
  props: {
    completeQuestion: Number,
    totalQuestion: Number,
    correctQuestion: Number,
  },
  setup(props) {
    const process = ref({ width: 0 });

    onMounted(() => {
      if (
        props.totalQuestion !== undefined &&
        props.completeQuestion != undefined &&
        props.totalQuestion !== 0
      ) {
        process.value.width =
          (props.completeQuestion / props.totalQuestion) * 100;
      }
    });

    return { process };
  },
});
</script>

<style scoped>
.process-bar {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: #28a7452e;
}
</style>
