export default interface Unit {
  id: string | number;
  unitTitle: string;
  chapterTitle: string;
  chapterDescription: string;
  numberQuestion: number;
  numberQuestionComplete: number;
  currentIndex: number;
  url: string;
  questionPart: Array<any>;
}
