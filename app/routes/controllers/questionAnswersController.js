import * as questionsService from "../../services/questionsService.js";
import * as questionAnswerService from "../../services/questionAnswerService.js";
import { validasaur } from "../../deps.js";

const answerValidationRules = {
  answer: [validasaur.required, validasaur.minLength(1)],
};

const showPage = async ({ render, params }) => {

  const questionID = params.qId;
  const topicID = params.id;
  const questionIDInt = parseInt(questionID);

  const question = await questionsService.findQuestion(questionID);
  const questionTitle = question.question_text;
  const allQuestionAnswerOptions = await questionAnswerService.findAllAnswerOptions(questionIDInt);
  
  const data = {
    questionTitle: questionTitle,
    questionId: questionID,
    allQuestionAnswerOptions: allQuestionAnswerOptions,
    topicId: topicID,
    answer: ""
  }
    render("questionAnswers.eta", data);
  };


const getData = async (request) => {

  const body = request.body({ type: "form" });
  const params = await body.value;
  if(params.get("is_correct") == null){
    return {
      answer: params.get("option_text"),
      is_correct: false,
    };
  }else{
    return {
      answer: params.get("option_text"),
      is_correct: true,
    };
  }


};

const addAnswer = async ({ request, response, render, params }) => {

  const answerData = await getData(request);
  const questionID = params.qId;
  const topicID = params.id;
  const questionIDInt = parseInt(questionID);
 

  
  const [passes, errors] = await validasaur.validate(
       answerData,
       answerValidationRules,
     );
  

       if (!passes) {
            answerData.validationErrors = errors;
           render("questionAnswers.eta", answerData);
       } else {
          
           const answerOption = answerData.answer;
           const isCorrect = answerData.is_correct;
           await questionAnswerService.addAnswerOption(questionIDInt, answerOption, isCorrect);
           response.redirect(`/topics/${topicID}/questions/${questionID}`);
          
       }


};

const deleteAnswerOption = async ({ params, response }) => {
  
  const topicID = params.tId;
  const questionID = params.qId;
  const answerOptionID = params.oId;

  await questionAnswerService.deleteAnswerOption(answerOptionID);
 
  response.redirect(`/topics/${topicID}/questions/${questionID}`);

  
};

const deleteQuestion = async ({ params, response }) => {
  
  const topicID = params.tId;
  const questionID = params.qId;

  await questionsService.deleteQuestion(questionID);
 
  response.redirect(`/topics/${topicID}`);

  
};


export { showPage, addAnswer, deleteAnswerOption, deleteQuestion };