import { Databases, ID, Models } from "appwrite";
import client from "./client";
import { DATABASES } from "../constants";
const databases = new Databases(client);
export type GithubToken = {
  access_token: string;
  refress_token: string;
  expires_in: number;
  refresh_token_expires_in: number;
  updated_at: number;
};
export type Project = {
  githubToken?: GithubToken;
};
export type ProjectDocument = Project | Models.Document;

const apertursDatabases = {
  async createProject(project: Project): Promise<ProjectDocument> {
    const document = await databases.createDocument(
      DATABASES.APERTURS_DATABASE_ID,
      DATABASES.PROJECTS_COLLECTION_ID,
      ID.unique(),
      project
    );
    return document;
  },
};
Object.freeze(apertursDatabases);

export { apertursDatabases };
