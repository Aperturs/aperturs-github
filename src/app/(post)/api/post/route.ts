import { NextRequest, NextResponse } from "next/server";
import sdk from "node-appwrite";
import { TokenTextSplitter } from "langchain/text_splitter";
import { LLMChain, loadSummarizationChain } from "langchain/chains";
import { PromptTemplate } from "langchain/prompts";
import { OpenAI } from "langchain/llms/openai";
type ReqType = {
  questions_answers_json_string: string;
  project_id: string;
  openai_token: string;
  commits: string[];
};
export async function POST(req: Request) {
  console.log({ req });
  // console.log(JSON.parse(req.body));
  const json = await req.json();
  console.log({ json });
  const { questions_answers_json_string, project_id, openai_token, commits } =
    json as ReqType;
  console.log(questions_answers_json_string);
  const client = new sdk.Client();
  const functions = new sdk.Functions(client);
  const questions = JSON.parse(questions_answers_json_string);
  const fileName = `${project_id}_context.index`;
  let questions_answers_text =
    "The following are questions and answers related to a project and from this question and answers , a social media post will be generated: \n";
  questions.forEach((question: { answer: string; question: string }) => {
    questions_answers_text += `$ The question is :{question.question} 
             and the answer is ${question.answer} 
             
             `;
  });
  client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECTID!)
    .setKey(process.env.APPWRITE_API_KEY!);

  if (commits) {
    questions_answers_text += `The following are the commits and latest changes related to the project: ,this should also influence if a social media post is made\n`;
    commits.forEach((commit) => {
      questions_answers_text += ` The commit is : ${commit} \n`;
    });
  }

  const model = new OpenAI({
    openAIApiKey: openai_token,
  });

  const textSpliter = new TokenTextSplitter({
    chunkSize: 5,
    chunkOverlap: 0,
    encodingName: "gpt2",
  });
  const docs = await textSpliter.createDocuments([questions_answers_text]);
  const summaryChain = loadSummarizationChain(model, {
    type: "map_reduce",
  });
  const res = await summaryChain.call({
    input_documents: docs,
  });
  const summaryText = res["text"];
  const prompt = PromptTemplate.fromTemplate(
    "Given this summary {summary} , generate a social media post"
  );
  const socialChain = new LLMChain({ llm: model, prompt });
  const finalRes = await socialChain.call({ summary: summaryText });
  const socialMediaPost = finalRes["text"];
  return NextResponse.json(socialMediaPost);
}
