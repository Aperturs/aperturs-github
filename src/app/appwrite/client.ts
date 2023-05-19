import { Client } from "appwrite";

if (!process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT) {
  throw Error("NEXT_PUBLIC_APPWRITE_ENDPOINT ENV NOT FOUND");
}
if (!process.env.NEXT_PUBLIC_APPWRITE_PROJECTID) {
  throw Error("NEXT_PUBLIC_APPWRITE_PROJECTID Env not found");
}
const client = new Client();
client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT);
export default client;
