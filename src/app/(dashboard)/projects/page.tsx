"use client";

import React from "react";
import GithubCard from "./githubcard";
import { Button, Typography } from "@material-tailwind/react";


const page = () => {
  const onGithubConnect = () => {
    const redirectUrl = process.env.NODE_ENV == "development" ? "http://localhost:3000/api/callback/github" : "https://app.aperturs.com/api/callback/github"
    console.log("Github Connect")
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUrl)}&scope=${encodeURIComponent("user repo")}`
  }

  return (
    <div className="w-full py-12 ">
      <div className="w-full flex mb-6 justify-between">
        <Typography variant="h3" className="">
          Your Connected Repositories
        </Typography>
        <button className="px-8  btn-primary btn text-white" onClick={onGithubConnect}>
          Connect new Repo
        </button>
    

      </div>
      <div className="flex flex-row gap-4">
        <GithubCard
          repoName="repoName"
          repoDescription="repoDescription"
          lastUpdated="lastUpdated"
          repoImage="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80"
        />
      </div>
    </div>
  );
};

export default page;
