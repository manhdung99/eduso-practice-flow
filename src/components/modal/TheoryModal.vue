<template>
  <div class="fixed top-0 bottom-0 left-0 right-0 bg-modal z-10">
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
        <div
          class="mb-4 h-4/5"
          v-for="(theory, index) in theoryData"
          :key="theory.ID"
          :class="index == currentIndex ? '' : 'hidden'"
        >
          <div class="h-full">
            <div
              class="text-xl text-indigo my-2 text-center"
              v-html="theory.Title"
            ></div>
            <div class="h-full" v-if="theory.Type == 'AUDIO'">
              <div
                class="h-full"
                v-if="theory.Media.Extension.includes('audio')"
              >
                <audio :src="theory.Media.Path" controls></audio>
                <div v-html="theory.Description"></div>
              </div>
            </div>
            <div class="h-full" v-if="theory.Type == 'VIDEO'">
              <div
                class="h-full"
                v-if="theory.Media.Extension.includes('audio')"
              >
                <div v-html="theory.Description"></div>
              </div>
            </div>
            <div v-else-if="theory.Type == 'VOCAB'">
              <div class="doc-content" v-html="theory.Description"></div>
            </div>
            <div class="h-full" v-if="theory.Type == 'DOC'">
              <div class="h-full" v-if="theory.Media.Extension.includes('pdf')">
                <embed class="w-full h-full" :src="theory.Media.Path" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="absolute bottom-0 flex justify-center w-full">
        <ul class="flex items-center">
          <li
            v-if="currentIndex > 0"
            @click="currentIndex--"
            class="px-4 py-2 border border-grey-lighter hover:text-indigo hover:border-indigo cursor-pointer"
          >
            Trang trước
          </li>
          <li
            v-for="(theory, index) in theoryData"
            :key="theory.ID"
            class="border border-grey-lighter hover:text-indigo hover:border-indigo cursor-pointer w-10 h-10"
            :class="index == currentIndex ? '!border-indigo' : ''"
            @click="currentIndex = index"
          >
            <img
              v-if="theory.Type == 'DOC'"
              class="w-10 h-10"
              :src="documentIcon"
              alt=""
            />
            <img
              v-if="theory.Type == 'AUDIO'"
              class="w-10 h-10"
              :src="volumeIcon"
              alt=""
            />
            <img
              v-if="theory.Type == 'VIDEO'"
              class="w-10 h-10"
              :src="videoIcon"
              alt=""
            />
            <img
              v-if="theory.Type == 'VOCAB'"
              class="w-10 h-10"
              :src="languageIcon"
              alt=""
            />
          </li>
          <li
            v-if="currentIndex != theoryData.length - 1"
            @click="currentIndex++"
            class="px-4 py-2 border border-grey-lighter hover:text-indigo hover:border-indigo cursor-pointer"
          >
            Trang sau
          </li>
        </ul>
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
import documentIcon from "../../assets/images/document-icon.svg";
import languageIcon from "../../assets/images/language-icon.svg";
import videoIcon from "../../assets/images/video-icon.svg";
import leftIcon from "../../assets/images/left.svg";
import volumeIcon from "../../assets/images/volume.svg";
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
    const currentIndex = ref(0);
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
      currentIndex,
      documentIcon,
      languageIcon,
      videoIcon,
      leftIcon,
      volumeIcon,
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
  margin-top: 4px;
  height: calc(100vh - 8px);
  position: relative;
}
.theory-content {
  height: calc(100% - 120px);
  padding: 0 48px;
}
.theory-modal p {
  display: flex;
  align-items: center;
  justify-content: center;
}
.two-question-wrapper .theory-content {
  padding-left: 0;
}
@media screen and (max-width: 767px) {
  .theory-content {
    padding: 0 16px;
  }
}
</style>
