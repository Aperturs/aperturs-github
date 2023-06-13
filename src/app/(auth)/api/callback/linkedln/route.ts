import { COOKIES } from "@/constants";
import { NextRequest, NextResponse } from "next/server";
import sdk from "node-appwrite";
export async function GET(req: NextRequest) {
  const code = new URLSearchParams(req.url.split("?")[1]).get("code");
  const response = await fetch(
    "https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code=" +
      code +
      "&redirect_uri=" +
      encodeURIComponent(process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URL!) +
      "&client_id=" +
      process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID +
      "&client_secret=" +
      process.env.LINKEDIN_CLIENT_SECRET,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  const data = await response.json();
  const userResponse = await fetch("https://api.linkedin.com/v2/me", {
    headers: {
      Authorization: `Bearer ${data.access_token}`,
      "cache-control": "no-cache",
      "X-Restli-Protocol-Version": "2.0.0",
    },
  }).catch(console.log);
  console.log({ userResponse });
  const user = await userResponse?.json();
  console.log({ data });
  const userId = req.cookies.get(COOKIES.USER_ID);
  console.log({ userId });
  const client = new sdk.Client();
  const functions = new sdk.Functions(client);
  client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECTID!)
    .setKey(process.env.APPWRITE_API_KEY!);

  await functions
    .createExecution(
      "storeLinkedinTokens",
      JSON.stringify({
        access_token: data.access_token,
        refresh_token: data.refresh_token ?? "",
        expires_in: data.expires_in ?? 0,
        refresh_token_expires_in: data.refresh_token_expires_in ?? 0,
        userId: userId?.value,
      })
    )
    .catch(console.log);
  const url = req.nextUrl.clone();
  url.pathname = "/projects";

  return NextResponse.redirect(url);
}
