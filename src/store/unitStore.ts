import { defineStore } from "pinia";
import axios from "axios";
import Chapter from "@/types/chapter";
import Lesson from "@/types/lesson";
import OldAnswer from "@/types/oldAnswer";

export const useUnitStore = defineStore("unitStore", {
  state: () => ({
    chapters: [] as Chapter[],
    lessonDetail: {} as Lesson,
    questions: [],
    lessons: [] as Lesson[],
    lessonQuestion: [],
    oldAnswer: [] as OldAnswer[],
    courseID: "",
    theoryData: [],
    LessonImage: "",
    chapterTitle: "",
  }),
  actions: {
    setCourseID(id) {
      this.courseID = id;
    },
    async getLessons(id: string | number): Promise<void> {
      const url =
        process.env.VUE_APP_BASE_URL +
        process.env.VUE_APP_GET_LESSONS +
        `${id}`;
      await axios.get(url).then((response) => {
        if (response.data.Code == 200) {
          this.lessons = response.data.Data.Lessons;
          this.chapters = response.data.Data.Chapters;
          this.LessonImage =
            "https://static.eduso.vn" + response.data.Data.Image;
          const currentChapter = response.data.Data.Chapters.find(
            (chapter) => chapter.CourseID == id
          );
          this.chapters = this.chapters.map((chapter) => {
            chapter = {
              ...chapter,
              totalQuestions: 0,
              completeQuestion: 0,
              correctQuestion: 0,
            };
            this.lessons
              .filter((lesson) => lesson.ChapterID == chapter.ID)
              .forEach((lesson) => {
                chapter.totalQuestions += lesson.TotalQuestions;
                chapter.completeQuestion += lesson.CompleteQuestions;
                chapter.correctQuestion += lesson.PassQuestions;
              });
            return chapter;
          });
          if (currentChapter != null) {
            this.chapterTitle = currentChapter.Name;
          }
        }
      });
    },
    async setLessonDetail(id: string | number): Promise<void> {
      const url =
        process.env.VUE_APP_BASE_URL +
        process.env.VUE_APP_GET_LESSON_DETAILS +
        `${id}`;
      await axios.get(url).then((response) => {
        if (response.data.Code == 200) {
          this.lessonDetail = response.data.Data;
        }
      });
    },
    setLessonQuestion(id: string | number) {
      const url =
        process.env.VUE_APP_BASE_URL +
        process.env.VUE_APP_GET_QUESTION_PRACTICE +
        `${id}`;
      return axios
        .get(url)
        .then((response) => {
          if (response.data.Code === 200) {
            let data = response.data.Data;
            data = data.filter(
              (data) => data.Questions.length > 0 && data.Type != "ESSAY"
            );
            return data;
          } else {
            return []; // Or handle error case accordingly
          }
        })
        .catch((error) => {
          // Handle any error that occurs during the request
          console.error(error);
          return []; // Or handle error case accordingly
        });
    },
    setTheoryData(id: string | number) {
      const url =
        process.env.VUE_APP_BASE_URL +
        process.env.VUE_APP_GET_QUESTION_PRACTICE +
        `${id}`;
      return axios
        .get(url)
        .then((response) => {
          if (response.data.Code === 200) {
            const data = response.data.Data ? response.data.Data : [];
            this.theoryData = data.filter(
              (data) =>
                data.Type == "DOC" ||
                data.Type == "AUDIO" ||
                data.Type == "VOCAB"
            );
          }
        })
        .catch((error) => {
          // Handle any error that occurs during the request
          console.error(error);
          return []; // Or handle error case accordingly
        });
    },
    getQuestion(id): void {
      const url =
        process.env.VUE_APP_BASE_URL +
        process.env.VUE_APP_GET_QUESTION_PRACTICE +
        `${id}`;
      axios.get(url).then((response) => {
        if (response.data.Code === 200) {
          this.questions = [];
          const partQuestion = response.data.Data;
          partQuestion.forEach((data) => {
            this.questions = [...this.questions, ...data.Questions];
          });
        }
      });
    },
    getOldAnswer(id): void {
      const url =
        process.env.VUE_APP_BASE_URL +
        process.env.VUE_APP_GET_QUESTION_PRACTICE +
        `${id}`;
      axios.get(url).then((response) => {
        if (response.data.Code === 200) {
          this.oldAnswer = response.data.Old ? response.data.Old : [];
        }
      });
    },
    async updateAnswer(answers): Promise<void> {
      const url =
        process.env.VUE_APP_BASE_URL + process.env.VUE_APP_UPDATE_ANSWER;
      await axios.post(url, answers).then((response) => {
        console.log(response);
      });
    },
    redoPart(partID): void {
      const url = process.env.VUE_APP_BASE_URL + process.env.VUE_APP_REDO_PART;
      axios.post(url, partID).then((response) => {
        console.log(response);
      });
    },
    async redoLesson(partID): Promise<void> {
      const url =
        process.env.VUE_APP_BASE_URL + process.env.VUE_APP_REDO_LESSON;
      await axios.post(url, partID).then((response) => {
        console.log(response);
      });
    },
  },
});
