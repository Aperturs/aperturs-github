import { Account, ID } from "appwrite";
import client from "./client";
import { parseUrl } from "next/dist/shared/lib/router/utils/parse-url";
import { verify } from "crypto";

const account = new Account(client);
const apertursAccount = {
  async signUpUserUsingEmailAndPassword(
    email: string,
    password: string,
    name: string
  ) {
    const user = await account.create(ID.unique(), email, password, name);

    await this.loginWithEmailAndPassword(email, password);
    await this.sendVerificationLink(
      `https://${window.location.hostname}/verification/${user?.$id}`
    );

    return user;
  },
  async logout() {
    return await account.deleteSessions();
    // Redirect to the homepage or login page
  },

  async loginWithEmailAndPassword(email: string, password: string) {
    await account.createEmailSession(email, password);
    return await account.get();
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
  async sendVerificationLink(callBackUrl: string) {
    return await account.createVerification(callBackUrl);
  },
  async verifyUserEmail(userId: string, secret: string) {
    return await account.updateVerification(userId, secret);
  },
};
Object.freeze(apertursAccount);

export { apertursAccount };
