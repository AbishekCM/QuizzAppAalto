import * as questionsService from "../../services/questionsService.js";
import { validasaur } from "../../deps.js";

const questionValidationRules = {
  question: [validasaur.required, validasaur.minLength(1)],
};

const ShowQuestions = async ({ render, params }) => {
  const topicID = params.id;
  const data = {
    topicID: topicID,
    question: "",
    questions: await questionsService.findAllQuestions(topicID),
  };

  render("topicQuestions.eta", data);
};

const getData = async (request) => {
  const body = request.body({ type: "form" });
  const params = await body.value;

  return {
    question: params.get("question_text"),
    topicID: "",
  };
};

const addQuestion = async ({ request, response, user, render, params }) => {
  const questionData = await getData(request);
  const topicID = params.id;
  const topicIDInt = parseInt(topicID);

  const [passes, errors] = await validasaur.validate(
    questionData,
    questionValidationRules,
  );

  if (!passes) {
    questionData.validationErrors = errors;
    questionData.topicID = topicID;
    questionData.questions = await questionsService.findAllQuestions(topicID);
    render("topicQuestions.eta", questionData);
  } else {
    const userID = user.id;
    const question = questionData.question;
    await questionsService.addQuestion(userID, topicIDInt, question);
    response.redirect(`/topics/${topicID}`);
  }
};

export { addQuestion, getData, ShowQuestions };
