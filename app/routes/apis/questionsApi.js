import * as questionService from "../../services/questionsService.js";
import * as questionAnswerService from "../../services/questionAnswerService.js";
import * as quizService from "../../services/quizService.js";

const getRandomQuestion = async ({ response }) => {

    const randomQuestion =  await questionService.findNumberOfRows();
    if(randomQuestion){
    const questionIdInt = parseInt(randomQuestion.id);
    const questionAnswerOptions = await questionAnswerService.findAllAnswerOptions(questionIdInt);

    const iD = randomQuestion.id;
    const questionText = randomQuestion.question_text;

    for (let i = 0; i < questionAnswerOptions.length; i++) {
        delete questionAnswerOptions[i].id;
        delete questionAnswerOptions[i].is_correct;
    }

    const data = { 
        "questionId": iD,
        "questionText": questionText,
        "answerOptions":questionAnswerOptions,
    }
    

    response.body = data;
}else{
    response.body = {};
}
};

const answerQuestion = async ({ request, response }) => {
    const body = request.body({ type: "json" });
    const document = await body.value;
    const answerOptionIdInt = parseInt(document.optionId);
    const results = await quizService.findAnswerOption(answerOptionIdInt);

    if(results.is_correct == true){
        response.body = {"correct": "true"};
      
    }else{
        response.body = {"correct": "false"};
      
    }

  };
  

export { getRandomQuestion, answerQuestion };
