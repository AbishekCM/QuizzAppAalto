import { sql } from "../database/database.js";

const addAnswerOption = async (questionID, answer, isCorrect) => {
    await sql`INSERT INTO question_answer_options
      (question_id, option_text, is_correct)
        VALUES (${questionID}, ${answer}, ${isCorrect})`;
};

const findAllAnswerOptions = async (questionID) => {
    const rows = await sql`SELECT * FROM question_answer_options where question_id = ${questionID};`;
    return rows;
};

const deleteAnswerOption = async (answerOptionID) => {
 
      await sql`DELETE FROM question_answer_options WHERE id = ${answerOptionID}`;
  
};

const findTotalQuestionAnswerCount = async () => {
  const row = await sql`SELECT COUNT(*) FROM question_answers`;

if (row && row.length > 0) {
  return row[0].count;
}
return false;
}

export{ addAnswerOption, findAllAnswerOptions, deleteAnswerOption, findTotalQuestionAnswerCount }