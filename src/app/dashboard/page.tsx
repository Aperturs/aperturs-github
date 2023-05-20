'use client'

import React from "react";
import GithubCard from "./githubcard";
import { Typography } from "@material-tailwind/react";

const page = () => {
  return (
    <div className="w-full py-12 sm:px-20 px-10">
      <Typography variant="h2" className='mb-4'>Your Connected Repositories</Typography>
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
