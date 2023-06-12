import { Account, ID, Models } from "appwrite";
import client from "./client";
import { deleteCookie, setCookie } from "cookies-next";
import { COOKIES } from "@/constants";

const account = new Account(client);
type User = Models.User<Models.Preferences>;
/**
 * User object.
 * @typedef {Object} User
 * @property {string} $id - The user's ID.
 */

/**
 * Authentication class for handling user sign up, login, and account management using Appwrite.
 * @typedef {Object} ApertursAccount
 * @property {Function} signUpUserUsingEmailAndPassword - Signs up a user using email and password.
 * @property {Function} logout - Logs out the current user.
 * @property {Function} loginWithEmailAndPassword - Logs in a user using email and password.
 * @property {Function} createPasswordRecoveryLink - Creates a password recovery link for the user.
 * @property {Function} changePasswordFromRecoveryLink - Changes the user's password using a recovery link.
 * @property {Function} sendVerificationLink - Sends a verification link to the user's email.
 * @property {Function} verifyUserEmail - Verifies the user's email using a verification secret.
 */

/**
 * Authentication class for handling user sign up, login, and account management using Appwrite.
 * @type {ApertursAccount}
 */
const apertursAccount = {
  /**
   * Signs up a user using email and password.
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   * @param {string} name - The user's name.
   * @returns {Promise<User>} - The user object.
   */
  async signUpUserUsingEmailAndPassword(
    email: string,
    password: string,
    name: string
  ): Promise<User> {
    const user = await account.create(ID.unique(), email, password, name);

    await this.loginWithEmailAndPassword(email, password);
    await this.sendVerificationLink(
      `${process.env.NEXT_PUBLIC_EMAIL_VERIFCATION_URL}/${user?.$id}`
    );
    return user;
  },

  /**
   * Logs out the current user.
   * @returns {Promise<{}>}
   */
  async logout(): Promise<{}> {
    deleteCookie(COOKIES.SESSION_ID);
    deleteCookie(COOKIES.USER_ID);
    return await account.deleteSessions();
    // Redirect to the homepage or login page
  },

  /**
   * Logs in a user using email and password.
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   * @returns {Promise<User>} - The user object.
   */
  async loginWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<User> {
    const session = await account.createEmailSession(email, password);
    const user = await account.get();
    setCookie(COOKIES.SESSION_ID, session.$id);
    setCookie(COOKIES.USER_ID, user.$id);
    return user;
  },

  /**
   * Creates a password recovery link for the user.
   * @param {string} email - The user's email.
   * @returns {Promise<Models.Token>} - The recovery token.
   */
  async createPasswordRecoveryLink(email: string): Promise<Models.Token> {
    //TODO: Add recovery path
    return await account.createRecovery(email, "");
  },

  /**
   * Changes the user's password using a recovery link.
   * @param {string} userId - The user's ID.
   * @param {string} secret - The recovery secret.
   * @param {string} password - The new password.
   * @returns {Promise<Models.Token>}
   */
  async changePasswordFromRecoveryLink(
    userId: string,
    secret: string,
    password: string
  ): Promise<Models.Token> {
    return await account.updateRecovery(userId, secret, password, password);
  },

  /**
   * Sends a verification link to the user's email.
   * @param {string} callBackUrl - The verification callback URL.
   * @returns {Promise<Models.Token>}
   */
  async sendVerificationLink(callBackUrl: string): Promise<Models.Token> {
    return await account.createVerification(callBackUrl);
  },

  /**
   * Verifies the user's email using a verification secret.
   * @param {string} userId - The user's ID.
   * @param {string} secret - The verification secret.
   * @returns {Promise<Models.Token>}
   */
  async verifyUserEmail(userId: string, secret: string): Promise<Models.Token> {
    return await account.updateVerification(userId, secret);
  },
  /**
   * Gets the user's account.
   * @returns {Promise<Models.User<Models.Preferences>>}
   */
  async getAccount(): Promise<Models.User<Models.Preferences>> {
    return await account.get();
  },
};

Object.freeze(apertursAccount);

export { apertursAccount };
