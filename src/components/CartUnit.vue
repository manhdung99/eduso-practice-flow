<template>
  <div
    className="w-[300px] h-[150px] relative shadow-md shadow-slate-400 rounded-md mt-4"
  >
    <div
      className="bg-white border border-black rounded-md overflow-hidden w-full h-full"
    >
      <div class="h-1/2">
        <div>
          <p className="font-bold text-tiny">{{ title }}</p>
        </div>
        <div className="flex gap-[16px] font-semibold">
          <p className="text-sm">Số câu: {{ numberQuestion }}</p>
        </div>
      </div>
      <div class="h-1/2">
        <img :src="imageURL" alt="" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    title: String,
    numberQuestion: Number,
    imageURL: String,
  },
  name: "CartUnit",
});
</script>
