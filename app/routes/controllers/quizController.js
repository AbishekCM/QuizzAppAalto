import * as topicsService from "../../services/topicsService.js";
import * as quizService from "../../services/quizService.js";
import * as questionService from "../../services/questionsService.js";
import * as questionAnswerService from "../../services/questionAnswerService.js";

const showQuiz = async ({ render }) => {

    const data = {
        topics: await topicsService.findAlltopics(),
    }

    render("quizMain.eta", data);
  };
  

  

const getRandomTopicQuestion = async ({ params, response, render }) => {
    const topicID = params.tId;
    const randomQuestion = await quizService.findRandomQuestion(topicID);
    const randomQuestionID = randomQuestion.id

    if(randomQuestion == false){
        const data = {
            question: false
        }
        render("quizQuestions.eta", data);
    }else{
        response.redirect(`/quiz/${topicID}/questions/${randomQuestionID}`);
    }

   
    
  };

const RandomQuestion = async ({ params, render }) => {
    const topicID = params.tId;
    const questionID = params.qId;
    const question = await questionService.findQuestion(questionID);
    const questionText = question.question_text;
    const questionAnswerOptions = await questionAnswerService.findAllAnswerOptions(questionID);

    const data = {
        question: questionText,
        questionAnswerOptions: questionAnswerOptions,
        topicID: topicID,
        questionID: questionID,
    }
    
    render("quizQuestions.eta", data);

  };

  const saveQuizAnswer = async ({ params, response, user }) => {

    const topicID = params.tId;
    const questionID = params.qId;
    const answerOptionID = params.oId;
    const userID = user.id;
    const questionIDInt = parseInt(questionID);
    const answerOptionIDInt = parseInt(answerOptionID);
    const userIDInt = parseInt(userID);

    await quizService.addQuizAnswer(userIDInt, questionIDInt, answerOptionIDInt);

    const results = await quizService.findAnswerOption(answerOptionID);

    if(results.is_correct == true){
        response.redirect(`/quiz/${topicID}/questions/${questionID}/correct`);
    }else{
        response.redirect(`/quiz/${topicID}/questions/${questionID}/incorrect`);
    }

  };


const correctAnswer = async ({ render, params}) => {
    const topicID = params.tId;
    
    const data = {
        results: true,
        topicID: topicID,
    }

    render("quizResults.eta", data);
  };


  
  const incorrectAnswer = async ({ render, params}) => {
    const topicID = params.tId;
    const questionID = params.qId;
    const correctAnswer = await quizService.findCorrectAnswer(questionID);

    
    const data = {
        results: false,
        topicID: topicID,
        correctAnswers: correctAnswer,
    }


    render("quizResults.eta", data);
  };
 

  export { showQuiz, getRandomTopicQuestion, RandomQuestion, saveQuizAnswer, correctAnswer, incorrectAnswer };