export default interface Lesson {
  ID: string | number;
  currentIndex: number;
  TotalQuestions: number;
  CompleteQuestions: number;
  numberQuestionCorrect: number;
  currentQuestion: number;
  Title: string;
  completed: boolean;
  questionPart: Array<any>;
  PassQuestions: number;
  ChapterID: number | string;
}
