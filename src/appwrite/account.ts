import { Account, ID } from "appwrite";
import client from "./client";
import { parseUrl } from "next/dist/shared/lib/router/utils/parse-url";
import { verify } from "crypto";

const account = new Account(client);
const apertursAccount = {
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
  async changePasswordFromRecoveryLink(
    userId: string,
    secret: string,
    password: string
  ) {
    return await account.updateRecovery(userId, secret, password, password);
  },
  async sendVerificationLink() {
    //TODO: Add verification path
    return await account.createVerification("");
  },
  async verifyUserEmail(userId: string, secret: string) {
    return await account.updateVerification(userId, secret);
  },
};
Object.freeze(apertursAccount);

export { apertursAccount };
