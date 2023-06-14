const sdk = require("node-appwrite");
const uid = require("tiny-uid");
/*
  'req' variable has:
    'headers' - object with request headers
    'payload' - request body data as a string
    'variables' - object with function variables

  'res' variable has:
    'send(text, status)' - function to return text response. Status code defaults to 200
    'json(obj, status)' - function to return JSON response. Status code defaults to 200

  If an error is thrown, a response with code 500 will be returned.
*/

module.exports = async function (req, res) {
  const client = new sdk.Client();

  // You can remove services you don't use

  if (
    !req.variables["APPWRITE_FUNCTION_ENDPOINT"] ||
    !req.variables["APPWRITE_FUNCTION_API_KEY"]
  ) {
    console.warn(
      "Environment variables are not set. Function cannot use Appwrite SDK."
    );
  } else {
    client
      .setEndpoint(req.variables["APPWRITE_FUNCTION_ENDPOINT"])
      .setProject(req.variables["APPWRITE_FUNCTION_PROJECT_ID"])
      .setKey(req.variables["APPWRITE_FUNCTION_API_KEY"])
      .setSelfSigned(true);
  }

  const database = new sdk.Databases(client);
  const {
    userId,
    commit_count,
    repo_name,
    repo_description,
    repo_url,
    repo_id,
  } = JSON.parse(req.payload);
  console.log(
    { userId, repo_name, repo_description, repo_id, repo_url },
    "userId userId userId"
  );
  const questions_answers_json = {
    "What inspired you to start this project?": null,
    "What are some of the key challenges you faced while developing this project?":
      null,
    "What are some of the unique features of this project?": null,
    "Who do you see as the primary users of this project?": null,
    "What was your process for testing and quality assurance?": null,
    "What was your biggest learning experience while working on this project?":
      null,
    "What was your deployment strategy for this project?": null,
    "What are some of the risks associated with this project, and how did you mitigate them?":
      null,
    "What is your vision for the future of this project?": null,
    "What was the most exciting part of working on this project for you?": null,
  };
  const projectID = uid(15);
  const questions_answers_json_string = JSON.stringify(questions_answers_json);
  const userDoc = await database.getDocument("aperturs", "users", userId);
  console.log({ userDoc }, "userDoc userDoc userDoc");

  const newUserDocument = await database.updateDocument(
    "aperturs",
    "users",
    userId,
    {
      projects: [...userDoc.projects, projectID],
    }
  );
  const projectDoc = await database.createDocument(
    "aperturs",
    "projects",
    projectID,
    {
      user_id: userId,
      repo_name,
      repo_description,
      repo_url,
      repo_id,
      questions_answers_json_string,

      commit_count,
    }
  );
  console.log({ projectDoc }, "projectDoc projectDoc projectDoc");
  res.json({
    projectDoc,
  });
};
