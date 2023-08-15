export default interface OldAnswer {
  AnswerID: string;
  AnswerValue: string;
  QuestionID: string | number;
  RealAnswerID: string;
  RealAnswerValue: string;
  TypePart: string;
  Media: {
    Extension: string;
    Path: string;
  };
}
