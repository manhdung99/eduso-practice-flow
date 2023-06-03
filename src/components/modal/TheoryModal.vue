<template>
  <div class="fixed top-0 bottom-0 left-0 right-0 bg-modal">
    <div class="theory-modal">
      <div
        class="border-b py-4 border-gray-300 px-6 flex items-center justify-between"
      >
        <span class="text-indigo-darker font-medium">Lý thuyết & Tài liệu</span>
        <span
          @click="updateTheoryModalStatus(false)"
          class="icon-close cursor-pointer text-gray-500 hover:text-black"
        ></span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useModalStore } from "../../store/modalStore";

export default defineComponent({
  name: "TheoryModal",
  setup() {
    const { updateTheoryModalStatus } = useModalStore();
    return {
      updateTheoryModalStatus,
    };
  },
});
</script>
<style>
.theory-modal {
  background: white;
  border-radius: 4px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  width: 50%;
  margin-left: 50%;
  transform: translateX(-50%);
  margin-top: 100px;
  min-height: 600px;
}
</style>
