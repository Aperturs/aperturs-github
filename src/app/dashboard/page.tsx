"use client";

import React from "react";
import GithubCard from "./githubcard";
import { Button, Typography } from "@material-tailwind/react";

const page = () => {
  return (
    <div className="w-full py-12 sm:px-28 px-10">
      <div className="w-full flex mb-6 justify-between">
        <Typography variant="h3" className="">
          Your Connected Repositories
        </Typography>
        <button className="px-8  btn-primary btn text-white">
          Connect a new repository
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
