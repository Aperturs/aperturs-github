const sdk = require("node-appwrite");
const llms = require("langchain/llms");
const { TokenTextSplitter } = require("langchain/text_splitter");
const { HNSWLib } = require("langchain/vectorstores");
const { OpenAIEmbeddings } = require("langchain/embeddings");
const fetch = require("node-fetch");
const {
  Blob,
  blobFrom,
  blobFromSync,
  File,
  fileFrom,
  fileFromSync,
  FormData,
  Headers,
  Request,
  Response,
} = require("node-fetch");

const structuredClone = require("@ungap/structured-clone");
if (!("structuredClone" in globalThis)) {
  globalThis.structuredClone = structuredClone;
}

if (!globalThis.fetch) {
  globalThis.fetch = fetch;
  globalThis.Headers = Headers;
  globalThis.Request = Request;
  globalThis.Response = Response;
}

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
  const storage = new sdk.Storage(client);

  // You can remove services you don't use

  const database = new sdk.Databases(client);

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
  console.log(req.variables["APPWRITE_FUNCTION_EVENT_DATA"]);
  const { questions_answers_json_string, project_id, openai_token } =
    JSON.parse(req.payload);
  const questions = JSON.parse(questions_answers_json_string);
  let questions_answers_text =
    "The following are questions and answers related to a project and from this question and answers , a social media post will be generated: \n";

  questions.forEach((question) => {
    questions_answers_text += `$ The question is :{question.question} 
         and the answer is ${question.answer} 
         
         `;
  });
  const fileName = `${project_id}_context.index`;
  const model = llms.OpenAI({
    openAIApiKey: openai_token,
  });
  const textSpliter = new TokenTextSplitter({
    chunkSize: 5,
    chunkOverlap: 0,
    encodingName: "gpt2",
  });
  const docs = await textSpliter.createDocuments([questions_answers_text]);

  const contextVector = await HNSWLib.fromTexts(docs, new OpenAIEmbeddings());

  contextVector.save(fileName);
  const file = await storage.createFile("context_vector", fileName, fileName);
};
