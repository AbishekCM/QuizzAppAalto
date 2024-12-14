import * as questionAnswerService from "../../services/questionAnswerService.js";
import * as questionService from "../../services/questionsService.js";
import * as topicsService from "../../services/topicsService.js";

const showMain = async ({ render }) => {
  const data = {
    topics: await topicsService.findTotalTopicCount(),
    questions: await questionService.findTotalQuestionCount(),
    questionsAnswered: await questionAnswerService
      .findTotalQuestionAnswerCount(),
  };
  console.log(data);
  render("main.eta", data);
};

export { showMain };
