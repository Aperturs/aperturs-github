const sdk = require("node-appwrite");

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
  const { userId } = JSON.parse(req.payload);
  console.log({ userId }, "userId userId userId");
  const userDoc = await database.getDocument("aperturs", "users", userId);
  const { githubTokens, linkedlnTokens, projects, ...rest } = userDoc;
  let finalJson = { ...rest };
  console.log({ userDoc }, "this is the user doc");
  console.log({ githubTokens }, "these are the github tokens");
  const githubTokensPromises = githubTokens.map(async (tokenId) => {
    console.log("this is token id", tokenId);
    return await database.getDocument("aperturs", "githubTokens", tokenId);
  });
  const githubTokensJsons = await Promise.all(githubTokensPromises);
  console.log({ githubTokensJsons }, "this is github tokens jsons");
  finalJson.githubTokens = githubTokensJsons;
  console.log({ linkedlnTokens }, "these are the linkedln tokens");

  const linkedlnTokensPromises = linkedlnTokens.map(async (tokenId) => {
    return await database.getDocument("aperturs", "linkedlnTokens", tokenId);
  });

  const projectsPromises = projects.map(async (id) => {
    return await database.getDocument("aperturs", "projects", id);
  });
  const linkedlnTokensJsons = await Promise.all(linkedlnTokensPromises);
  const projectsPromisesJsons = await Promise.all(projectsPromises);
  console.log({ linkedlnTokensJsons }, "this is linkedln tokens jsons");
  finalJson.linkedlnTokens = linkedlnTokensJsons;
  finalJson.projects = projectsPromisesJsons;
  return res.json(finalJson);
};
