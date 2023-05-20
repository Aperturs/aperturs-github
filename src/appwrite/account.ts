import { Account, ID } from "appwrite";
import client from "./client";

const account = new Account(client);
const ApertursAccount = {
  async signUpUserUsingEmailAndPassword(
    email: string,
    password: string,
    name?: string
  ) {
    return await account.create(ID.unique(), email, password, name);
  },
  async loginWithEmailAndPassword(email: string, password: string) {
    return await account.createEmailSession(email, password);
  },
  async createPasswordRecoveryLink(email: string) {
    //TODO: Add recovery path
    return await account.createRecovery(email, "");
  },
};
