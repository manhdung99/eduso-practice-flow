import { defineStore } from "pinia";
import Unit from "@/types/unit";

export const useUnitStore = defineStore("unitStore", {
  state: () => ({
    units: [] as Unit[],
  }),
  actions: {
    getUnits(): void {
      const data = [
        {
          id: 1,
          unitTitle: "Bài 1: Mức độ nhận biết",
          chapterTitle: "Chương 1 - Tìm từ được gạch chân phát âm khác",
          chapterDescription: "Bài 1 - Mức độ nhận biết 1 ",
          numberQuestion: 30,
          numberQuestionComplete: 0,
          url: "https://i.ibb.co/JCXbvbB/cover.jpg",
        },
        {
          id: 2,
          unitTitle: "Bài 2: Mức độ cơ bản",
          chapterTitle: "Chương 1 - Tìm từ được gạch chân phát âm khác",
          chapterDescription: "Bài 2 - Mức độ cơ bản 2 ",
          numberQuestion: 30,
          numberQuestionComplete: 15,
          url: "https://i.ibb.co/JCXbvbB/cover.jpg",
        },
      ];
      this.units = data;
    },
  },
});
