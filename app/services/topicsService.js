import { sql } from "../database/database.js";

const findAlltopics = async () => {
  const rows = await sql`SELECT * FROM topics ORDER BY name ASC;`;
  return rows;
};

const addTopic = async (userID, topicName) => {
  await sql`INSERT INTO topics
      (user_id, name)
        VALUES (${userID}, ${topicName})`;
};

const deleteTopic = async (topicID) => {
  // Get question ID from questions table for all questions related to topic
  const getQuestionID =
    await sql`SELECT id FROM questions WHERE topic_id = ${topicID}`;

  if (getQuestionID && getQuestionID.length > 0) {
    const questionID = getQuestionID[0].id;

    //Delete questions answers for that topic
    await sql`DELETE FROM question_answers WHERE question_id = ${questionID}`;

    //Delete questions answer options for that topic
    await sql`DELETE FROM question_answer_options WHERE question_id = ${questionID}`;

    console.log("works");
  }

  //Delete questions for that topic
  await sql`DELETE FROM questions WHERE topic_id = ${topicID}`;

  //Delete topic
  await sql`DELETE FROM topics WHERE id = ${topicID}`;
};

const findTotalTopicCount = async () => {
  const row = await sql`SELECT COUNT(*) FROM topics`;

  if (row && row.length > 0) {
    return row[0].count;
  }
  return false;
};

export { addTopic, deleteTopic, findAlltopics, findTotalTopicCount };
