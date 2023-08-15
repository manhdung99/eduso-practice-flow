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
      <div class="theory-content scroll-area">
        <div class="mb-4" v-for="theory in theoryData" :key="theory.ID">
          <div v-if="theory.Type == 'AUDIO'">
            <div v-if="theory.Media.Extension.includes('audio')">
              <audio :src="theory.Media.Path" controls></audio>
              <div v-html="theory.Description"></div>
            </div>
          </div>
          <div v-else-if="theory.Type == 'VOCAB'">
            <div v-html="theory.Description"></div>
          </div>
          <div v-if="theory.Type == 'DOC'">
            <div v-if="theory.Media.Extension.includes('pdf')">
              <embed class="w-full h-80" :src="theory.Media.Path" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useModalStore } from "../../store/modalStore";
import { useUnitStore } from "../../store/unitStore";
import { storeToRefs } from "pinia";
import PlayPronun from "../../uses/playMedia";
import {
  addStaticURLForDescription,
  addStaticURLForMedia,
  updateStaticToPublisher,
  updatEdusolutionToEduso,
} from "@/uses/changeURL";
export default defineComponent({
  name: "TheoryModal",
  setup() {
    const { updateTheoryModalStatus } = useModalStore();
    const { theoryData } = storeToRefs(useUnitStore());
    const newTheoryData = ref(null);
    const addClickEvent = () => {
      (window as any).PlayPronun = (obj) => {
        const audioElement = obj.nextElementSibling as HTMLAudioElement;
        audioElement.play();
      };
    };
    onMounted(() => {
      addClickEvent();
    });
    onMounted(() => {
      newTheoryData.value = theoryData.value.map(async (data) => {
        const newData = data;
        newData.Description = await addStaticURLForDescription(
          newData.Description
        );
        newData.Media = await addStaticURLForMedia(newData.Media);
        newData.Media = await updateStaticToPublisher(newData.Media);
        newData.Media = await updatEdusolutionToEduso(newData.Media);
        return newData;
      });
    });
    return {
      updateTheoryModalStatus,
      theoryData,
      newTheoryData,
      PlayPronun,
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
  height: 700px;
}
.theory-content {
  height: calc(100% - 80px);
  padding-left: 16px;
}
.theory-modal p {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
