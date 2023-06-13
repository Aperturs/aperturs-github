import { Databases, Functions } from "appwrite";
import { apertursAccount } from "./account";
import client from "./client";
import { UserDoc } from "@/types/user";

export type CreateProjectProp = Omit<
  Project,
  "user_id" | "questions_answers_json_string"
>;
const functions = new Functions(client);
const databases = new Databases(client);
const apertursProject = {
  async createProject(project: CreateProjectProp) {
    const execution = await functions.createExecution(
      "createProject",
      JSON.stringify({
        userId: (await apertursAccount.getAccount()).$id,
        ...project,
      })
    );
    return execution;
  },
  async updateContext(
    questions_answers_json_string: string,
    projectId: string
  ) {
    await databases.updateDocument("aperturs", "projects", projectId, {
      questions_answers_json_string,
    });
  },
};

Object.freeze(apertursProject);

export { apertursProject };
