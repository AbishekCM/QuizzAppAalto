import { sql } from "../database/database.js";


const findRandomQuestion = async (topicID) => {
   const row = await sql`SELECT * FROM questions where topic_id = ${topicID}
 ORDER BY RANDOM()
 LIMIT 1`;

 if (row && row.length > 0) {
    return row[0];
  }
  return false;
};

const addQuizAnswer = async (userID, questionID, AnswerOptionID) => {
  await sql`INSERT INTO question_answers
  (user_id, question_id, question_answer_option_id)
    VALUES (${userID}, ${questionID}, ${AnswerOptionID})`;
};

const findAnswerOption = async (answerOptionID) => {
  const rows = await sql`SELECT * FROM question_answer_options WHERE id = ${answerOptionID}`;
  if (rows && rows.length > 0) {
    return rows[0];
  }
  
  return false;
}

const findCorrectAnswer = async (questionID) => {
  const rows = await sql`SELECT * FROM question_answer_options WHERE question_id = ${questionID} AND is_correct = true`;
  if (rows && rows.length > 0) {
    return rows;
  }
  return false;
}

export {findRandomQuestion, addQuizAnswer, findAnswerOption, findCorrectAnswer}
