<template>
  <div class="pb-2 lg:pb-8" v-if="JSON.stringify(lessonDetail) != '{}'">
    <div
      class="px-4 py-3 lg:py-5 relative shadow shadow-gray-300 flex items-center justify-center"
    >
      <router-link :to="`/course/${route.params.courseId}`">
        <div
          class="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 cursor-pointer"
        >
          <img src="../assets/images/left.svg" alt="" />
        </div>
      </router-link>
      <div
        class="ml-10 inline-block text-indigo text-xl font-semibold whitespace-nowrap truncate"
      >
        {{ chapterTitle }}
      </div>
    </div>
    <div
      class="lesson-view-wrapper"
      v-if="lessonDetail.CompleteQuestions >= lessonDetail.TotalQuestions"
    >
      <div class="lesson-view-content scroll-area h-full py-2">
        <div class="flex justify-center lesson-image-complete">
          <img class="object-contain" :src="LessonImage" alt="" />
        </div>
        <div class="px-6">
          <div class="w-full mb-8">
            <p class="text-xl text-indigo font-bold truncate mt-4">
              {{ lessonDetail.Title }}
            </p>
            <div>
              <p class="text-lg text-indigo font-semibold italic">Kết quả</p>
              <div class="w-full flex">
                <div style="width: 80px" class="w-20 h-20 mr-4">
                  <a-progress
                    :percent="
                      Math.round(
                        (lessonDetail.PassQuestions /
                          lessonDetail.TotalQuestions) *
                          100
                      )
                    "
                    stroke-color="#55934B"
                    type="circle"
                  >
                    <template #format="percent">
                      <span style="color: #55934b">{{ percent }} %</span>
                    </template>
                  </a-progress>
                </div>
                <div class="w-full flex flex-col justify-between">
                  <div class="flex justify-between items-center">
                    <span class="text-lg font-semibold text-green">Đúng</span>
                    <span class="text-base font-semibold text-indigo"
                      >{{ lessonDetail.PassQuestions }} Câu</span
                    >
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-lg font-semibold text-raspberry-darker"
                      >Sai</span
                    >
                    <span class="text-base font-semibold text-indigo"
                      >{{
                        lessonDetail.TotalQuestions -
                          lessonDetail.PassQuestions >
                        0
                          ? lessonDetail.TotalQuestions -
                            lessonDetail.PassQuestions
                          : 0
                      }}
                      Câu</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <router-link
            :to="`/history/${route.params.courseId}/${lessonDetail.ID}`"
          >
            <button
              class="text-white py-2 bg-iceberg rounded border-iceberg border-2 w-full mb-4 text-base font-medium hover:bg-white hover:text-iceberg flex items-center justify-center mt-15 lg:mt-0"
            >
              <span class="icon-book text-xl mr-3"
                ><span class="path1"></span><span class="path2"></span
                ><span class="path3"></span
              ></span>
              Lịch sử luyện tập
            </button>
          </router-link>
        </div>
      </div>
      <div class="button-wrapper">
        <button @click="resetUnit" class="btn btn-primary w-1/3 mr-4">
          Làm lại
        </button>
        <button @click="moveToNextUnit" class="btn btn-primary w-2/3 relative">
          Làm tiếp
          <span
            class="icon-right absolute top-1/2 -translate-y-1/2 right-4"
          ></span>
        </button>
      </div>
    </div>
    <div class="px-4 lg:px-0" v-else>
      <div
        class="rounded-lg bg-white w-full lg:w-1/2 lg:ml-1/2 lg:-translate-x-1/2 mt-4 shadow-md shadow-gray-300 overflow-hidden scroll-area"
      >
        <div class="flex justify-center img-lesson py-2">
          <img class="object-contain" :src="LessonImage" alt="" />
        </div>
        <div class="px-2 lg:px-6 pb-6">
          <div class="w-full">
            <p class="text-xl text-indigo font-bold truncate mt-4">
              {{ lessonDetail.Title }}
            </p>
          </div>
          <div v-if="lessonDetail.CompleteQuestions == 0">
            <p class="text-lg my-4">
              Tổng:
              <span class="text-xl text-indigo font-bold"
                >{{ lessonDetail.TotalQuestions }} câu</span
              >
            </p>
            <router-link
              :to="`/practice/${route.params.courseId}/${lessonDetail.ID}`"
            >
              <a-button
                class=""
                type="primary !h-11.5 w-full !font-medium text-center flex justify-center"
                >Làm bài</a-button
              >
            </router-link>
          </div>
          <div class="my-4 relative" v-else>
            <p class="text-lg">
              Hoàn thành:
              <span class="text-xl text-indigo font-bold"
                >{{ lessonDetail.CompleteQuestions }}/{{
                  lessonDetail.TotalQuestions
                }}
                câu</span
              >
            </p>
            <div class="w-1/2 mb-8">
              <a-progress
                stroke-color="#BAE7FF"
                stroke-linecap="square"
                :percent="
                  Math.round(
                    (lessonDetail.CompleteQuestions /
                      lessonDetail.TotalQuestions) *
                      100
                  )
                "
              />
            </div>
            <div class="flex w-full">
              <a-button
                @click="resetUnit"
                class="!h-11.5 !font-medium w-1/3 mr-3"
                >Làm lại</a-button
              >
              <router-link
                class="w-2/3 ml-2"
                :to="`/practice/${route.params.courseId}/${lessonDetail.ID}`"
              >
                <a-button
                  class="!h-11.5 w-full !font-medium justify-center relative"
                  type="primary"
                >
                  <div>
                    Làm tiếp
                    <span
                      class="icon-right absolute right-5 top-1/2 -translate-y-1/2"
                    ></span>
                  </div>
                </a-button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { storeToRefs } from "pinia";
import { defineComponent, nextTick, onMounted, ref } from "vue";
import { useUnitStore } from "../store/unitStore";
import router from "@/router";
import { useRoute } from "vue-router";
export default defineComponent({
  name: "LessonView",
  setup() {
    const correctProcess = ref(0);
    const route = useRoute();
    const questionPart = ref([]);
    const { lessons, lessonDetail, LessonImage, chapterTitle } = storeToRefs(
      useUnitStore()
    );
    const {
      setLessonDetail,
      redoLesson,
      setCourseID,
      getLessons,
      setLessonQuestion,
    } = useUnitStore();
    const resetUnit = async () => {
      // unitDetail.value.currentIndex = 0;
      lessonDetail.value.CompleteQuestions = 0;
      lessonDetail.value.PassQuestions = 0;
      const data = new FormData();
      data.append("lessonID", lessonDetail.value.ID as string);
      await redoLesson(data);
      questionPart.value.forEach((part) => {
        localStorage.removeItem(part.ID);
      });
      router.push(
        `/practice/${route.params.courseId}/${lessonDetail.value.ID}`
      );
    };
    const moveToNextUnit = () => {
      const currentUnitIndex = lessons.value.findIndex(
        (lesson) => lesson.ID == lessonDetail.value.ID
      );
      const nextUnitID = lessons.value[currentUnitIndex + 1].ID;
      setLessonDetail(nextUnitID);
    };
    onMounted(async () => {
      await getLessons(route.params.courseId as string);
      await setCourseID(route.params.courseId);
      await setLessonDetail(route.params.lessonId as string);
      questionPart.value = await setLessonQuestion(
        lessonDetail.value.ID as string
      );
    });
    return {
      lessonDetail,
      correctProcess,
      moveToNextUnit,
      resetUnit,
      route,
      LessonImage,
      chapterTitle,
      questionPart,
    };
  },
});
</script>
<style>
.lesson-view-wrapper {
  height: calc(100vh - 160px);
  position: relative;
}
.lesson-view-content {
  border-radius: 8px;
  background: white;
  width: 50%;
  margin-left: 50%;
  transform: translateX(-50%);
  margin-top: 16px;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 12px;
}
.button-wrapper {
  position: fixed;
  width: 50%;
  margin-left: 50%;
  transform: translate(-50%);
  display: flex;
  bottom: 4px;
}
.img-lesson {
  max-height: 55vh;
}
.lesson-image-complete {
  max-height: 45vh;
}
@media screen and (max-width: 1023px) {
  .lesson-view-content {
    width: 100%;
    height: calc(100% - 50px);
    margin-left: unset;
    transform: unset;
    padding: 0;
  }
  .lesson-view-wrapper {
    height: calc(100vh - 130px);
    padding: 0 1rem;
  }
  .button-wrapper {
    width: calc(100% - 32px);
    transform: unset;
    margin-left: unset;
  }
  .img-lesson {
    max-height: 50vh;
  }
  .lesson-image-complete {
    max-height: 30vh;
  }
}
</style>
