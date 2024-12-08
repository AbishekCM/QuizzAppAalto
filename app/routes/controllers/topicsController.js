import * as topicsService from "../../services/topicsService.js";
import { validasaur } from "../../deps.js";

const topicValidationRules = {
  topic: [validasaur.required, validasaur.minLength(1)],
};

const showTopics = async ({render, user}) => {

    const data = {
        topics: await topicsService.findAlltopics(),
        admin: false,
        topic: "",

    }


    if(user.admin == true){
        data.admin = true;
    }

   
    render("topics.eta", data);
};

const getData = async (request) => {
    const body = request.body({ type: "form" });
    const params = await body.value;
    
    
    return {
      topic: params.get("name"),
      topics: await topicsService.findAlltopics(),
      admin: false,
    };
  };

const addTopic = async ({ request, response, user, render }) => {

    const topicData = await getData(request);

    const [passes, errors] = await validasaur.validate(
        topicData,
        topicValidationRules,
      );

      if(user.admin == true){
        topicData.admin = true;
    }

      if (!passes) {
        
        topicData.validationErrors = errors;
        render("topics.eta", topicData);
      } else {
        const topic = topicData.topic;
        const userID = user.id;
        await topicsService.addTopic(userID, topic);
        response.redirect("/topics");
       
    
    }
 
 
};

const deleteTopic = async ({ params, response }) => {
  const topicID = params.id;
  const topicIDInt = parseInt(topicID);
  await topicsService.deleteTopic(topicIDInt);

  response.redirect("/topics");
};

export { showTopics, addTopic, deleteTopic  };