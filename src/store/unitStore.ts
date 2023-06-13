import { defineStore } from "pinia";
import Unit from "@/types/unit";

export const useUnitStore = defineStore("unitStore", {
  state: () => ({
    units: [] as Unit[],
    unitDetail: {} as Unit,
    questions: [],
  }),
  actions: {
    getUnits(): void {
      const data = [
        {
          id: 1,
          unitTitle: "Bài 1: Mức độ nhận biết",
          chapterTitle: "Chương 1 - Tìm từ được gạch chân phát âm khác",
          chapterDescription: "Bài 1 - Mức độ nhận biết 1 ",
          numberQuestion: 8,
          numberQuestionComplete: 0,
          numberQuestionCorrect: 0,
          currentQuestion: 0,
          url: "https://i.ibb.co/JCXbvbB/cover.jpg",
          completed: false,
          currentIndex: 0,
          questionPart: [
            {
              id: "part1",
              type: "QUIZ1",
              partContent:
                "<p class='italic'>Read the following passage and mark the letter A, B, C or D on your answer sheet to indicate the correct answer.</p><p><strong>According to all known laws of aviation,</strong> there is no way that a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway.</p>",
              status: "unmake",
              questions: [
                {
                  questionID: 1,
                  status: "unmake",
                  questionValue:
                    "Is the aerial capability of bees dependent on human logic?",
                  selectedAnswer: [],
                  correctAnswer: [1, 2],
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
                  selectedAnswer: [],
                  correctAnswer: [6],
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
                  selectedAnswer: [],
                  correctAnswer: [12],
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
              type: "QUIZ1",
              partContent:
                "<p class='italic'>Read the following passage and mark the letter A, B, C or D on your answer sheet to indicate the correct answer.</p><p><strong>According to all known laws of aviation,</strong> there is no way that a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway.</p>",
              status: "unmake",
              questions: [
                {
                  questionID: 4,
                  status: "unmake",
                  questionValue:
                    "Is the aerial capability of bees dependent on human logic?",
                  selectedAnswer: [],
                  correctAnswer: [3],
                  answers: [
                    { answerID: 1, answerValue: "A. Yes" },
                    { answerID: 2, answerValue: "B. No" },
                    { answerID: 3, answerValue: "C. Depends" },
                    { answerID: 4, answerValue: "D. Dude it’s a bee" },
                  ],
                },
                {
                  questionID: 5,
                  status: "unmake",
                  questionValue:
                    "Is the aerial capability of bees dependent on human logic?",
                  selectedAnswer: [],
                  correctAnswer: [5],
                  answers: [
                    { answerID: 5, answerValue: "A. Yes" },
                    { answerID: 6, answerValue: "B. No" },
                    { answerID: 7, answerValue: "C. Depends" },
                    { answerID: 8, answerValue: "D. Dude it’s a bee" },
                  ],
                },
              ],
            },
            {
              id: "part3",
              type: "QUIZ1",
              partContent:
                "<p class='italic'>Read the following passage and mark the letter A, B, C or D on your answer sheet to indicate the correct answer.</p><p><strong>According to all known laws of aviation,</strong> there is no way that a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway.</p>",
              status: "unmake",
              questions: [
                {
                  questionID: 6,
                  status: "unmake",
                  questionValue:
                    "Is the aerial capability of bees dependent on human logic?",
                  selectedAnswer: [],
                  correctAnswer: [2],
                  activeLink: false,
                  answers: [
                    { answerID: 1, answerValue: "A. Yes" },
                    { answerID: 2, answerValue: "B. No" },
                    { answerID: 3, answerValue: "C. Depends" },
                    { answerID: 4, answerValue: "D. Dude it’s a bee" },
                  ],
                },
              ],
            },
            {
              id: "part4",
              type: "QUIZ1",
              partContent:
                "<p class='italic'>Read the following passage and mark the letter A, B, C or D on your answer sheet to indicate the correct answer.</p><p><strong>According to all known laws of aviation,</strong> there is no way that a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway.</p>",
              status: "unmake",
              questions: [
                {
                  questionID: 7,
                  status: "unmake",
                  questionValue:
                    "Is the aerial capability of bees dependent on human logic?",
                  selectedAnswer: [],
                  correctAnswer: [3],
                  answers: [
                    { answerID: 1, answerValue: "A. Yes" },
                    { answerID: 2, answerValue: "B. No" },
                    { answerID: 3, answerValue: "C. Depends" },
                    { answerID: 4, answerValue: "D. Dude it’s a bee" },
                  ],
                },
                {
                  questionID: 8,
                  status: "unmake",
                  questionValue:
                    "Is the aerial capability of bees dependent on human logic?",
                  selectedAnswer: [],
                  correctAnswer: [7],
                  answers: [
                    { answerID: 5, answerValue: "A. Yes" },
                    { answerID: 6, answerValue: "B. No" },
                    { answerID: 7, answerValue: "C. Depends" },
                    { answerID: 8, answerValue: "D. Dude it’s a bee" },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 2,
          unitTitle: "Bài 2: Mức độ nhận biết",
          chapterTitle: "Chương 2 - Điền từ thích hợp vào chỗ trống",
          chapterDescription: "Bài 2 - Mức độ nhận biết 1 ",
          numberQuestion: 3,
          numberQuestionComplete: 0,
          numberQuestionCorrect: 0,
          currentQuestion: 0,
          url: "https://i.ibb.co/JCXbvbB/cover.jpg",
          completed: false,
          currentIndex: 0,
          questionPart: [
            {
              id: "part1",
              type: "QUIZ2",
              partContent:
                '<p style="text-align: center;">Complete the conversations using the words in parentheses and the first conditional.</p>\n',
              status: "unmake",
              questions: [
                {
                  questionID: 1,
                  status: "unmake",
                  questionValue: "",
                  Description:
                    '<p style="text-align: center;"><strong>THE GREAT BRITISH SEASIDE</strong></p>\n\n<p>What (<span style="color:#c0392b;"><strong>1</strong></span>) <fillquiz><input class="fillquiz" type="text"></fillquiz> the phrase \'the great British seaside\' bring to mind? Most people, if asked to respond (<span style="color:#c0392b;"><strong>2</strong></span>) <fillquiz><input class="fillquiz" type="text"></fillquiz> the top of their heads, associate (<span style="color:#c0392b;"><strong>3</strong></span>) <fillquiz><input class="fillquiz" type="text"></fillquiz> on holiday to places such as Blackpool or Torquay with poor weather, old, faded attractions and a low standard of accommodation. These days, when people are more likely to go abroad to (<span style="color:#c0392b;"><strong>4</strong></span>) <fillquiz><input class="fillquiz" type="text"></fillquiz> the sights, traditional British seaside towns (<span style="color:#c0392b;"><strong>5</strong></span>) <fillquiz><input class="fillquiz" type="text"></fillquiz> suffering from an image problem. Now, finally, some of the resorts (<span style="color:#c0392b;"><strong>6</strong></span>) <fillquiz><input class="fillquiz" type="text"></fillquiz>  decided to bring their images up to date in the hope that a (<span style="color:#c0392b;"><strong>7</strong></span>) <fillquiz><input class="fillquiz" type="text"></fillquiz> of direction will bring back the tourists. Many will need a lot of convincing, but those that (<span style="color:#c0392b;"><strong>8</strong></span>) <fillquiz><input class="fillquiz" type="text"></fillquiz> come will find that today\'s Blackpool differs quite a bit (<span style="color:#c0392b;"><strong>9</strong></span>) <fillquiz><input class="fillquiz" type="text"></fillquiz>  the picture postcard past.<br>\nAfter years of neglect, Blackpool has to work hard to catch (<span style="color:#c0392b;"><strong>10</strong></span>) <fillquiz><input class="fillquiz" type="text"></fillquiz> with foreign destinations but that\'s precisely what it (<span style="color:#c0392b;"><strong>11</strong></span>) <fillquiz><input class="fillquiz" type="text"></fillquiz> doing. It\'s the first time so much (<span style="color:#c0392b;"><strong>12</strong></span>) <fillquiz><input class="fillquiz" type="text"></fillquiz>  happened to improve the place in such a short time. A massive building project, including a new casino and indoor entertainment centre, (<span style="color:#c0392b;"><strong>13</strong></span>) <fillquiz><input class="fillquiz" type="text"></fillquiz> that rainy days are no longer a problem.<br>\nAnd it appears (<span style="color:#c0392b;"><strong>14</strong></span>) <fillquiz><input class="fillquiz" type="text"></fillquiz>  be working. As the tourists start to make (<span style="color:#c0392b;"><strong>15</strong></span>) <fillquiz><input class="fillquiz" type="text"></fillquiz> the bright lights of Blackpool once again, it seems that the great British seaside has a bright future ahead.</p>\n',
                  answers: [
                    {
                      answerID: 1,
                      answerValue: "a",
                      currentAnswer: "",
                      status: "unmake",
                    },
                    {
                      answerID: 2,
                      answerValue: "a",
                      currentAnswer: "",
                      status: "unmake",
                    },
                    {
                      answerID: 3,
                      answerValue: "a",
                      currentAnswer: "",
                      status: "unmake",
                    },
                    {
                      answerID: 4,
                      answerValue: "a",
                      currentAnswer: "",
                      status: "unmake",
                    },
                    {
                      answerID: 5,
                      answerValue: "a",
                      currentAnswer: "",
                      status: "unmake",
                    },
                    {
                      answerID: 6,
                      answerValue: "a",
                      currentAnswer: "",
                      status: "unmake",
                    },
                    {
                      answerID: 7,
                      answerValue: "a",
                      currentAnswer: "",
                      status: "unmake",
                    },
                    {
                      answerID: 8,
                      answerValue: "a",
                      currentAnswer: "",
                      status: "unmake",
                    },
                    {
                      answerID: 9,
                      answerValue: "a",
                      currentAnswer: "",
                      status: "unmake",
                    },
                    {
                      answerID: 10,
                      answerValue: "a",
                      currentAnswer: "",
                      status: "unmake",
                    },
                    {
                      answerID: 11,
                      answerValue: "a",
                      currentAnswer: "",
                      status: "unmake",
                    },
                    {
                      answerID: 12,
                      answerValue: "a",
                      currentAnswer: "",
                      status: "unmake",
                    },
                    {
                      answerID: 13,
                      answerValue: "a",
                      currentAnswer: "",
                      status: "unmake",
                    },
                    {
                      answerID: 14,
                      answerValue: "a",
                      currentAnswer: "",
                      status: "unmake",
                    },
                    {
                      answerID: 15,
                      answerValue: "a",
                      currentAnswer: "",
                      status: "unmake",
                    },
                  ],
                },
              ],
            },
            {
              id: "part2",
              partContent:
                '<p style="text-align: center;">Complete the conversations using the words in parentheses and the first conditional.</p>\n',
              status: "unmake",
              type: "QUIZ2",
              questions: [
                {
                  questionID: 2,
                  status: "unmake",
                  questionValue:
                    "Is the aerial capability of bees dependent on human logic?",
                  Description:
                    '<p><span style="color:#c0392b;"><strong>2</strong></span>. I\'ve always wanted to be a travel <fillquiz><input class="fillquiz" type="text"></fillquiz> (<strong>photograph</strong>) and take pictures of exotic places.</p>',
                  answers: [
                    {
                      answerID: 16,
                      answerValue: "a",
                      currentAnswer: "",
                      status: "unmake",
                    },
                  ],
                },
                {
                  questionID: 3,
                  status: "unmake",
                  questionValue:
                    "Is the aerial capability of bees dependent on human logic?",
                  Description:
                    '<p><span style="color:#c0392b;"><strong>3</strong></span>. I\'ve always wanted to be a travel <fillquiz><input class="fillquiz" type="text"></fillquiz> (<strong>photograph</strong>) and take pictures of exotic places.</p>',
                  answers: [
                    {
                      answerID: 17,
                      answerValue: "a",
                      currentAnswer: "",
                      status: "unmake",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 3,
          unitTitle: "Bài 2: Mức độ nhận biết",
          chapterTitle: "Chương 2 - Điền từ thích hợp vào chỗ trống",
          chapterDescription: "Bài 2 - Mức độ nhận biết 1 ",
          numberQuestion: 3,
          numberQuestionComplete: 0,
          numberQuestionCorrect: 0,
          currentQuestion: 0,
          url: "https://i.ibb.co/JCXbvbB/cover.jpg",
          completed: false,
          currentIndex: 0,
          questionPart: [
            {
              id: "part1",
              type: "QUIZ3",
              partContent:
                '<p style="text-align: center;">Complete the conversations using the words in parentheses and the first conditional.</p>\n',
              status: "unmake",
              questions: [
                {
                  questionID: 1,
                  status: "unmake",
                  questionValue: "",
                  Description:
                    '<p style="text-align: center;"><strong>THE GREAT BRITISH SEASIDE</strong></p>\n\n<p>What (<span style="color:#c0392b;"><strong>1</strong></span>) <selectquiz><select class="selectquiz" ></select></selectquiz> the phrase \'the great British seaside\' bring to mind? Most people, if asked to respond (<span style="color:#c0392b;"><strong>2</strong></span>) <selectquiz><select class="selectquiz"></select></selectquiz> the top of their heads, associate (<span style="color:#c0392b;"><strong>3</strong></span>) <selectquiz><select class="selectquiz" ></select></selectquiz> on holiday to places such as Blackpool or Torquay with poor weather, old, faded attractions and a low standard of accommodation. These days, when people are more likely to go abroad to (<span style="color:#c0392b;"><strong>4</strong></span>) <selectquiz><select class="selectquiz" ></select></selectquiz> the sights, traditional British seaside towns (<span style="color:#c0392b;"><strong>5</strong></span>) <selectquiz><select class="selectquiz" ></select></selectquiz> suffering from an image problem. Now, finally, some of the resorts (<span style="color:#c0392b;"><strong>6</strong></span>) <selectquiz><select class="selectquiz" ></select></selectquiz>  decided to bring their images up to date in the hope that a (<span style="color:#c0392b;"><strong>7</strong></span>) <selectquiz><select class="selectquiz" ></select></selectquiz> of direction will bring back the tourists. Many will need a lot of convincing, but those that (<span style="color:#c0392b;"><strong>8</strong></span>) <selectquiz><select class="selectquiz" ></select></selectquiz> come will find that today\'s Blackpool differs quite a bit (<span style="color:#c0392b;"><strong>9</strong></span>) <selectquiz><select class="selectquiz" ></select></selectquiz>  the picture postcard past.<br>\nAfter years of neglect, Blackpool has to work hard to catch (<span style="color:#c0392b;"><strong>10</strong></span>) <selectquiz><select class="selectquiz"></select></selectquiz> with foreign destinations but that\'s precisely what it (<span style="color:#c0392b;"><strong>11</strong></span>) <selectquiz><select class="selectquiz" ></select></selectquiz> doing. It\'s the first time so much (<span style="color:#c0392b;"><strong>12</strong></span>) <selectquiz><select class="selectquiz" ></select></selectquiz>  happened to improve the place in such a short time. A massive building project, including a new casino and indoor entertainment centre, (<span style="color:#c0392b;"><strong>13</strong></span>) <selectquiz><select class="selectquiz"></select></selectquiz> that rainy days are no longer a problem.<br>\nAnd it appears (<span style="color:#c0392b;"><strong>14</strong></span>) <selectquiz><select class="selectquiz" ></select></selectquiz>  be working. As the tourists start to make (<span style="color:#c0392b;"><strong>15</strong></span>) <selectquiz><select class="selectquiz" ></select></selectquiz> the bright lights of Blackpool once again, it seems that the great British seaside has a bright future ahead.</p>\n',
                  answers: [
                    {
                      answerID: 1,
                      answerValue: "value2",
                      optionValue: ["value1", "value2", "value3"],
                      currentAnswer: "",
                      status: "unmake",
                    },
                    {
                      answerID: 2,
                      answerValue: "value1",
                      optionValue: ["value1", "value2", "value3"],
                      currentAnswer: "",
                      status: "unmake",
                    },
                    {
                      answerID: 3,
                      answerValue: "value2",
                      optionValue: ["value1", "value2", "value3"],
                      currentAnswer: "",
                      status: "unmake",
                    },
                    {
                      answerID: 4,
                      answerValue: "value2",
                      optionValue: ["value1", "value2", "value3"],
                      currentAnswer: "",
                      status: "unmake",
                    },
                    {
                      answerID: 5,
                      answerValue: "value2",
                      optionValue: ["value1", "value2", "value3"],
                      currentAnswer: "",
                      status: "unmake",
                    },
                    {
                      answerID: 6,
                      answerValue: "value2",
                      optionValue: ["value1", "value2", "value3"],
                      currentAnswer: "",
                      status: "unmake",
                    },
                    {
                      answerID: 7,
                      answerValue: "value2",
                      optionValue: ["value1", "value2", "value3"],
                      currentAnswer: "",
                      status: "unmake",
                    },
                    {
                      answerID: 8,
                      answerValue: "value2",
                      optionValue: ["value1", "value2", "value3"],
                      currentAnswer: "",
                      status: "unmake",
                    },
                    {
                      answerID: 9,
                      answerValue: "value2",
                      optionValue: ["value1", "value2", "value3"],
                      currentAnswer: "",
                      status: "unmake",
                    },
                    {
                      answerID: 10,
                      answerValue: "value2",
                      optionValue: ["value1", "value2", "value3"],
                      currentAnswer: "",
                      status: "unmake",
                    },
                    {
                      answerID: 11,
                      answerValue: "value2",
                      optionValue: ["value1", "value2", "value3"],
                      currentAnswer: "",
                      status: "unmake",
                    },
                    {
                      answerID: 12,
                      answerValue: "value2",
                      optionValue: ["value1", "value2", "value3"],
                      currentAnswer: "",
                      status: "unmake",
                    },
                    {
                      answerID: 13,
                      answerValue: "value2",
                      optionValue: ["value1", "value2", "value3"],
                      currentAnswer: "",
                      status: "unmake",
                    },
                    {
                      answerID: 14,
                      answerValue: "value2",
                      optionValue: ["value1", "value2", "value3"],
                      currentAnswer: "",
                      status: "unmake",
                    },
                    {
                      answerID: 15,
                      answerValue: "value2",
                      optionValue: ["value1", "value2", "value3"],
                      currentAnswer: "",
                      status: "unmake",
                    },
                  ],
                },
              ],
            },
            {
              id: "part2",
              partContent:
                '<p style="text-align: center;">Complete the conversations using the words in parentheses and the first conditional.</p>\n',
              status: "unmake",
              type: "QUIZ3",
              questions: [
                {
                  questionID: 2,
                  status: "unmake",
                  questionValue:
                    "Is the aerial capability of bees dependent on human logic?",
                  Description:
                    '<p><span style="color:#c0392b;"><strong>2</strong></span>. I\'ve always wanted to be a travel <selectquiz><select class="selectquiz" ></select></selectquiz> (<strong>photograph</strong>) and take pictures of exotic places.</p>',
                  answers: [
                    {
                      answerID: 16,
                      answerValue: "value2",
                      optionValue: ["value1", "value2", "value3"],
                      currentAnswer: "",
                      status: "unmake",
                    },
                  ],
                },
                {
                  questionID: 3,
                  status: "unmake",
                  questionValue:
                    "Is the aerial capability of bees dependent on human logic?",
                  Description:
                    '<p><span style="color:#c0392b;"><strong>3</strong></span>. I\'ve always wanted to be a travel <selectquiz><select class="selectquiz" ></select></selectquiz> (<strong>photograph</strong>) and take pictures of exotic places.</p>',
                  answers: [
                    {
                      answerID: 17,
                      answerValue: "value2",
                      optionValue: ["value1", "value2", "value3"],
                      currentAnswer: "",
                      status: "unmake",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 4,
          unitTitle: "Bài 2: Mức độ nhận biết",
          chapterTitle: "Chương 2 - Điền từ thích hợp vào chỗ trống",
          chapterDescription: "Bài 2 - Mức độ nhận biết 1 ",
          numberQuestion: 7,
          numberQuestionComplete: 0,
          numberQuestionCorrect: 0,
          currentQuestion: 0,
          url: "https://i.ibb.co/JCXbvbB/cover.jpg",
          completed: false,
          currentIndex: 0,
          questionPart: [
            {
              id: "part1",
              type: "QUIZ1",
              partContent:
                "<p class='italic'>Read the following passage and mark the letter A, B, C or D on your answer sheet to indicate the correct answer.</p><p><strong>According to all known laws of aviation,</strong> there is no way that a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway.</p>",
              status: "unmake",
              questions: [
                {
                  questionID: 1,
                  status: "unmake",
                  questionValue:
                    "Is the aerial capability of bees dependent on human logic?",
                  selectedAnswer: [],
                  correctAnswer: [3],
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
                  selectedAnswer: [],
                  correctAnswer: [5],
                  answers: [
                    { answerID: 5, answerValue: "A. Yes" },
                    { answerID: 6, answerValue: "B. No" },
                    { answerID: 7, answerValue: "C. Depends" },
                    { answerID: 8, answerValue: "D. Dude it’s a bee" },
                  ],
                },
              ],
            },
            {
              id: "part2",
              type: "QUIZ1",
              partContent:
                "<p class='italic'>Read the following passage and mark the letter A, B, C or D on your answer sheet to indicate the correct answer.</p><p><strong>According to all known laws of aviation,</strong> there is no way that a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway.</p>",
              status: "unmake",
              questions: [
                {
                  questionID: 3,
                  status: "unmake",
                  questionValue:
                    "Is the aerial capability of bees dependent on human logic?",
                  selectedAnswer: [],
                  correctAnswer: [11, 12],
                  activeLink: false,
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
              id: "part3",
              partContent:
                '<p style="text-align: center;">Complete the conversations using the words in parentheses and the first conditional.</p>\n',
              status: "unmake",
              type: "QUIZ3",
              questions: [
                {
                  questionID: 4,
                  status: "unmake",
                  questionValue:
                    "Is the aerial capability of bees dependent on human logic?",
                  Description:
                    '<p><span style="color:#c0392b;"><strong>2</strong></span>. I\'ve always wanted to be a travel <selectquiz><select class="selectquiz" ></select></selectquiz> (<strong>photograph</strong>) and take pictures of exotic places.</p>',
                  answers: [
                    {
                      answerID: 13,
                      answerValue: "value2",
                      optionValue: ["value1", "value2", "value3"],
                      currentAnswer: "",
                      status: "unmake",
                    },
                  ],
                },
                {
                  questionID: 5,
                  status: "unmake",
                  questionValue:
                    "Is the aerial capability of bees dependent on human logic?",
                  Description:
                    '<p><span style="color:#c0392b;"><strong>3</strong></span>. I\'ve always wanted to be a travel <selectquiz><select class="selectquiz" ></select></selectquiz> (<strong>photograph</strong>) and take pictures of exotic places.</p>',
                  answers: [
                    {
                      answerID: 14,
                      answerValue: "value2",
                      optionValue: ["value1", "value2", "value3"],
                      currentAnswer: "",
                      status: "unmake",
                    },
                  ],
                },
              ],
            },
            {
              id: "part4",
              partContent:
                '<p style="text-align: center;">Complete the conversations using the words in parentheses and the first conditional.</p>\n',
              status: "unmake",
              type: "QUIZ2",
              questions: [
                {
                  questionID: 6,
                  status: "unmake",
                  questionValue:
                    "Is the aerial capability of bees dependent on human logic?",
                  Description:
                    '<p><span style="color:#c0392b;"><strong>2</strong></span>. I\'ve always wanted to be a travel <fillquiz><input class="fillquiz" type="text"></fillquiz> (<strong>photograph</strong>) and take pictures of exotic places.</p>',
                  answers: [
                    {
                      answerID: 15,
                      answerValue: "a",
                      currentAnswer: "",
                      status: "unmake",
                    },
                  ],
                },
                {
                  questionID: 7,
                  status: "unmake",
                  questionValue:
                    "Is the aerial capability of bees dependent on human logic?",
                  Description:
                    '<p><span style="color:#c0392b;"><strong>3</strong></span>. I\'ve always wanted to be a travel <fillquiz><input class="fillquiz" type="text"></fillquiz> (<strong>photograph</strong>) and take pictures of exotic places.</p>',
                  answers: [
                    {
                      answerID: 16,
                      answerValue: "a",
                      currentAnswer: "",
                      status: "unmake",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ];
      this.units = data;
    },
    setUnitDetail(id: string | number): void {
      this.unitDetail = this.units.find((data: Unit) => data.id == id) || {};
    },
    getQuestion(): void {
      for (let i = 0; i < this.unitDetail.questionPart.length; i++) {
        this.questions = [
          ...this.questions,
          ...this.unitDetail.questionPart[i].questions,
        ];
      }
    },
  },
});
