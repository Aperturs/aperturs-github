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
  const questions_answers_json = [
    {
      question: "What inspired you to start this project?",
      description:
        "We want to know what motivated you to create this project. Is there a story behind it? Did you identify a problem that needed to be solved? Share your inspiration and what led you to start this project.",
      answer: "",
    },
    {
      question:
        "What are some of the key challenges you faced while developing this project?",
      description:
        "We understand that developing a project can come with its own set of challenges. We want to know what specific challenges you faced while developing this project. Did you encounter any technical issues? How did you overcome them?",
      answer: "",
    },
    {
      question: "What are some of the unique features of this project?",
      description:
        "We want to know what sets your project apart from others. What are some of the unique features that you have included? What makes your project stand out?",
      answer: "",
    },
    {
      question: "Who do you see as the primary users of this project?",
      description:
        "We want to know who your project is intended for. Who are the primary users? What needs does your project solve for them?",
      answer: "",
    },
    {
      question: "What was your process for testing and quality assurance?",
      description:
        "We want to know how you ensured your project was of high quality. What was your testing process like? What tools did you use to ensure quality?",
      answer: "",
    },
    {
      question:
        "What was your biggest learning experience while working on this project?",
      description:
        "We want to know what you learned while working on this project. Did you learn any new skills? Did you encounter any surprises? Share your biggest learning experience.",
      answer: "",
    },
    {
      question: "What was your deployment strategy for this project?",
      description:
        "We want to know how you deployed your project. What was your strategy like? Did you use any specific tools or services?",
      answer: "",
    },
    {
      question:
        "What are some of the risks associated with this project, and how did you mitigate them?",
      description:
        "We want to know what risks you identified while working on this project. How did you mitigate them? What steps did you take to ensure the success of the project?",
      answer: "",
    },
    {
      question: "What is your vision for the future of this project?",
      description:
        "We want to know what your plans are for the future of this project. Do you plan to add more features? Are there any improvements you would like to make?",
      answer: "",
    },
    {
      question:
        "What was the most exciting part of working on this project for you?",
      description:
        "We want to know what you enjoyed the most while working on this project. Was there a specific feature or aspect that you found particularly exciting? Share your experience with us.",
      answer: "",
    },
  ];
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
