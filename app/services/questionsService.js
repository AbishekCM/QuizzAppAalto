import { sql } from "../database/database.js";


const addQuestion = async (userID, topicID, questionText) => {
    await sql`INSERT INTO questions
      (user_id, topic_id, question_text)
        VALUES (${userID}, ${topicID}, ${questionText})`;
};

const findAllQuestions = async (topicID) => {
    const rows = await sql`SELECT * FROM questions where topic_id = ${topicID};`;
    return rows;
};

const findQuestion = async (questionID) => {
    const rows = await sql`SELECT * FROM questions WHERE id = ${questionID}`;
    if (rows && rows.length > 0) {
      return rows[0];
    }
    return false;
}

const deleteQuestion = async (questionID) => {
 
    await sql`DELETE FROM questions WHERE id = ${questionID}`;

    //Delete questions answer options for that question
    await sql`DELETE FROM question_answer_options WHERE question_id = ${questionID}`;
    
    //Delete questions answers for that question
    await sql`DELETE FROM question_answers WHERE question_id = ${questionID}`;

};

const findNumberOfRows = async () => {
  const row = await sql`SELECT * FROM questions
ORDER BY RANDOM()
LIMIT 1`;

  return row[0];
  
}

const findTotalQuestionCount = async () => {
  const row = await sql`SELECT COUNT(*) FROM questions`;

if (row && row.length > 0) {
  return row[0].count;
}
return false;
}

export { addQuestion, findAllQuestions, findQuestion, deleteQuestion, findNumberOfRows, findTotalQuestionCount}