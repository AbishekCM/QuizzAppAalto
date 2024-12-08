import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as registrationController from "./controllers/registrationController.js";
import * as loginController from "./controllers/loginController.js";
import * as topicsController from "./controllers/topicsController.js";
import * as topicquestionController from "./controllers/topicsQuestionsController.js";
import * as questionAnswersController from "./controllers/questionAnswersController.js"
import * as quizController from "./controllers/quizController.js"

import * as questionsApi from "./apis/questionsApi.js";

const router = new Router();

router.get("/api/questions/random", questionsApi.getRandomQuestion);
router.post("/api/questions/answer", questionsApi.answerQuestion); 

router.get("/quiz/:tId/questions/:qId/incorrect", quizController.incorrectAnswer);
router.get("/quiz/:tId/questions/:qId/correct", quizController.correctAnswer);
router.post("/quiz/:tId/questions/:qId/options/:oId", quizController.saveQuizAnswer);
router.get("/quiz/:tId/questions/:qId", quizController.RandomQuestion);
router.get("/quiz/:tId", quizController.getRandomTopicQuestion);
router.get("/quiz", quizController.showQuiz);

router.get("/topics/:id/questions/:qId", questionAnswersController.showPage);
router.post("/topics/:id/questions/:qId/options", questionAnswersController.addAnswer);
router.post("/topics/:tId/questions/:qId/options/:oId/delete", questionAnswersController.deleteAnswerOption);
router.post("/topics/:tId/questions/:qId/delete", questionAnswersController.deleteQuestion);

router.get("/topics/:id", topicquestionController.ShowQuestions);
router.post("/topics/:id/questions", topicquestionController.addQuestion);

router.post("/topics/:id/delete", topicsController.deleteTopic);

router.get("/topics", topicsController.showTopics);
router.post("/topics", topicsController.addTopic);

router.get("/auth/login", loginController.showLoginForm);
router.post("/auth/login", loginController.processLogin);

router.get("/auth/register", registrationController.showRegistrationForm);
router.post("/auth/register", registrationController.registerUser);

router.get("/", mainController.showMain);


export { router };
