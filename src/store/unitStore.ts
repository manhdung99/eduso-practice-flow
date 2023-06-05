import { defineStore } from "pinia";
import Unit from "@/types/unit";

export const useUnitStore = defineStore("unitStore", {
  state: () => ({
    units: [] as Unit[],
    unitDetail: {} as Unit,
  }),
  actions: {
    getUnits(): void {
      const data = [
        {
          id: 1,
          unitTitle: "Bài 1: Mức độ nhận biết",
          chapterTitle: "Chương 1 - Tìm từ được gạch chân phát âm khác",
          chapterDescription: "Bài 1 - Mức độ nhận biết 1 ",
          numberQuestion: 4,
          numberQuestionComplete: 0,
          numberQuestionCorrect: 0,
          url: "https://i.ibb.co/JCXbvbB/cover.jpg",
          completed: false,
          currentIndex: 0,
          questionPart: [
            {
              id: "part1",
              partContent:
                "<p class='italic'>Read the following passage and mark the letter A, B, C or D on your answer sheet to indicate the correct answer.</p><p><strong>According to all known laws of aviation,</strong> there is no way that a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway.</p>",
              status: "unmake",
              questions: [
                {
                  questionID: 1,
                  status: "unmake",
                  questionValue:
                    "Is the aerial capability of bees dependent on human logic?",
                  isChecked: false,
                  selectedAnswer: 0,
                  correctAnswer: 0,
                  answers: [
                    { answerID: 1, answerValue: "A. Yes" },
                    { answerID: 2, answerValue: "B. No" },
                    { answerID: 3, answerValue: "C. Depends" },
                    { answerID: 4, answerValue: "D. Dude it’s a bee" },
                  ],
                },
                {
                  questionID: 2,
                  status: "unmake",
                  questionValue:
                    "Is the aerial capability of bees dependent on human logic?",
                  isChecked: false,
                  selectedAnswer: 0,
                  correctAnswer: 0,
                  answers: [
                    { answerID: 5, answerValue: "A. Yes" },
                    { answerID: 6, answerValue: "B. No" },
                    { answerID: 7, answerValue: "C. Depends" },
                    { answerID: 8, answerValue: "D. Dude it’s a bee" },
                  ],
                },
                {
                  questionID: 3,
                  status: "unmake",
                  questionValue:
                    "Is the aerial capability of bees dependent on human logic?",
                  isChecked: false,
                  selectedAnswer: 0,
                  correctAnswer: 0,
                  answers: [
                    { answerID: 9, answerValue: "A. Yes" },
                    { answerID: 10, answerValue: "B. No" },
                    { answerID: 11, answerValue: "C. Depends" },
                    { answerID: 12, answerValue: "D. Dude it’s a bee" },
                  ],
                },
              ],
            },
            {
              id: "part2",
              partContent:
                "<p class='italic'>Read the following passage and mark the letter A, B, C or D on your answer sheet to indicate the correct answer.</p><p><strong>According to all known laws of aviation,</strong> there is no way that a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway.</p>",
              status: "unmake",
              questions: [
                {
                  questionID: 4,
                  status: "unmake",
                  questionValue:
                    "Is the aerial capability of bees dependent on human logic?",
                  isChecked: false,
                  selectedAnswer: 0,
                  correctAnswer: 0,
                  answers: [
                    { answerID: 1, answerValue: "A. Yes" },
                    { answerID: 2, answerValue: "B. No" },
                    { answerID: 3, answerValue: "C. Depends" },
                    { answerID: 4, answerValue: "D. Dude it’s a bee" },
                  ],
                },
              ],
            },
          ],
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
    setUnitDetail(id: string | number): void {
      this.unitDetail = this.units.find((data: Unit) => data.id == id) || {};
    },
  },
});
