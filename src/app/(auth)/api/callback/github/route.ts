import { NextResponse } from "next/server";
export async function GET(req: Request) {
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

  return NextResponse.json({ user });
}
