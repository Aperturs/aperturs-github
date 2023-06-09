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

  const database = new sdk.Databases(client);

  const payload =
    req.payload ||
    "No payload provided. Add custom data when executing function.";
  console.log({ payload }, " before payload");

  const {
    access_token,
    refresh_token,
    expires_in,
    refresh_token_expires_in,
    userId,
  } = JSON.parse(req.payload);
  console.log("\n\n");
  console.log(JSON.parse(req.payload), "json json json");
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
  const documentID = uid(15);

  console.log({ documentID }, "documentID documentID documentID");

  const userDoc = await database.getDocument("aperturs", "users", userId);
  console.log({ userDoc }, "userDoc userDoc userDoc");

  const newUserDocument = await database.updateDocument(
    "aperturs",
    "users",
    userId,
    {
      linkedlnTokens: [...userDoc.linkedlnTokens, documentID],
    }
  );
  console.log({ newUserDocument }, "new document new document new document");

  const document = await database.createDocument(
    "aperturs",
    "linkedlnTokens",
    documentID,
    {
      access_token,
      refresh_token,
      expires_in,
      refresh_token_expires_in,
      userId,
    }
  );

  res.json({
    document,
  });
};
