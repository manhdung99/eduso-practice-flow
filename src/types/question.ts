import Answer from "./answer";
export default interface Question {
  ID: string;
  Content: string;
  status: string;
  Answers: Array<Answer>;
}
