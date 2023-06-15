import { Models } from "appwrite";
declare type GithubToken = {
  access_token: string;
  refress_token?: string;
  expires_in?: number;
  refresh_token_expires_in?: number;
  userId: string;
};

declare type LinkedLnToken = {
  expiers_in: number;
  access_token: string;
  refresh_token?: string;
  userId: string;
  refresh_token_expires_in?: number;
};
declare type Project = {
  repo_name: string;
  repo_description: string;
  repo_url: string;
  repo_id: string;
  user_id: string;
  questions_answers_json_string: string;
  commit_count: number;
};
declare interface ProjectDoc extends Models.Document, Project {}
declare interface LinkedLnTokenDoc extends Models.Document, LinkedLnToken {}
declare interface GithubTokenDoc extends GithubToken, Models.Document {}
declare interface UserDoc extends Models.Document {
  projects: ProjectDoc[];
  githubTokens: GithubTokenDoc[];
  linkedlnTokens: LinkedLnTokenDoc[];
  openai_token: string;
}

type UserAccount = Models.User<Models.Preferences>;
