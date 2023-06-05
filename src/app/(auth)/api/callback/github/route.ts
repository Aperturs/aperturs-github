import { COOKIES } from "@/constants";
import { NextRequest, NextResponse } from "next/server";
import sdk from "node-appwrite";
export async function GET(req: NextRequest) {
  const code = new URLSearchParams(req.url.split("?")[1]).get("code");
  const response = await fetch(
    `https://github.com/login/oauth/access_token?client_id=${process.env
      .NEXT_PUBLIC_GITHUB_CLIENT_ID!}&client_secret=${
      process.env.GITHUB_CLIENT_SECRET
    }&code=${code}`,
    {
      headers: {
        Accept: "application/json",
      },
      method: "POST",
    }
  );
  const data = await response.json();
  const userResponse = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `token ${data.access_token}`,
    },
  });
  const user = await userResponse.json();
  console.log({ data });
  const userId = req.cookies.get(COOKIES.USER_ID);
  console.log({ userId });
  const client = new sdk.Client();
  const functions = new sdk.Functions(client);
  client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECTID!)
    .setKey(process.env.APPWRITE_API_KEY!);
  await functions.createExecution(
    "storeGithubTokens",
    JSON.stringify({
      accessToken: data.access_token,
      refresh_token: "",
      expires_in: 0,
      refresh_token_expeires_in: 0,
      userId: userId?.value,
    })
  );

  return NextResponse.json({ user });
}
