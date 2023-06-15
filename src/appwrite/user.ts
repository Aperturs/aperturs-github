import { Databases, Functions } from "appwrite";
import { apertursAccount } from "./account";
import client from "./client";
import { UserDoc } from "@/types/user";

const functions = new Functions(client);
const databases = new Databases(client);
type UserUpdateDoc = Partial<UserDoc>;
const apertursUser = {
  async getUser() {
    const execution = await functions.createExecution(
      "getUser",
      JSON.stringify({ userId: (await apertursAccount.getAccount()).$id })
    );
    const user = JSON.parse(execution.response) as UserDoc;
    return user;
  },
  async updateUser(user: UserUpdateDoc) {
    const doc = await databases.updateDocument(
      "aperturs",
      "users",
      (
        await apertursAccount.getAccount()
      ).$id,
      {
        ...user,
      }
    );
    return doc;
  },
};

Object.freeze(apertursUser);

export { apertursUser };
