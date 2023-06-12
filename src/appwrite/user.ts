import { Functions } from "appwrite";
import { apertursAccount } from "./account";
import client from "./client";
import { UserDoc } from "@/types/user";

const functions = new Functions(client);
const apertursUser = {
  async getUser() {
    const execution = await functions.createExecution(
      "getUser",
      JSON.stringify({ userId: (await apertursAccount.getAccount()).$id })
    );
    const user = JSON.parse(execution.response) as UserDoc;
    return user;
  },
};

Object.freeze(apertursUser);

export { apertursUser };
