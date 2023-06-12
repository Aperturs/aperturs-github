"use client";

import React, { useEffect, useMemo, useState } from "react";
import GithubCard from "./githubcard";
import { Avatar, Button, Chip, Dialog, DialogBody, DialogFooter, DialogHeader, Spinner, Typography } from "@material-tailwind/react";
import { useUser } from "@/hooks/useUser";
import Select, { OptionProps } from 'react-select';


import { useGithub } from "@/hooks/useGithub";
import { Repo } from "@/types/github";
type RepoOptionType = {
  value: Repo,
  label: string
}
const RepoOption = ({ label, value }: RepoOptionType) => {
  return (
    <div className="w-full">
      {value && <>
        <div className="flex items-center justify-between">
          <Avatar src={value.owner.avatar_url} alt="avatar" variant="square" />
          <p className="text-black  font-bold">
            {label}
          </p>
          <p>
            Owner : {value.owner.type}
          </p>
          <div className="flex">
            <Chip variant="ghost" value={value.visibility} />
          </div>
        </div>
      </>}
    </div>
  )
}
const NewRepoFormModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const { user } = useUser()
  const { getRepositories, loading } = useGithub(user?.githubTokens.at(0)?.access_token ?? "")
  const [option, setOption] = useState({} as RepoOptionType);
  const [options, setOptions] = useState([] as RepoOptionType[])
  useEffect(() => {
    getRepositories().then((res) => {
      const repos = res?.data as Repo[]
      const repoOptions: RepoOptionType[] = repos.map((repo) => {
        return {
          value: repo,
          label: repo.full_name
        } as RepoOptionType
      })
      setOptions(repoOptions)
    })
  }, [])

  return (

    <>
      <button className="px-8 btn-primary btn text-white" onClick={handleOpen}>
        Connect new Repo
      </button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Select your Repo ....</DialogHeader>
        <DialogBody divider>
          {loading ? <Spinner className="h-12 w-12" /> :
            <div className="w-full">
              <Select
                formatOptionLabel={RepoOption}
                value={option}
                options={options}
                onChange={value => setOption(value as any)}

              />
            </div>}

        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}
const ConnnectionButton = () => {
  const onGithubConnect = () => {
    const redirectUrl = process.env.NODE_ENV == "development" ? "http://localhost:3000/api/callback/github" : "https://app.aperturs.com/api/callback/github"
    console.log("Github Connect")
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUrl)}&scope=${encodeURIComponent("user repo")}`
  }
  const onNewRepoClick = () => {

  }
  const { user } = useUser()
  console.log({ user }, "user")
  const doesUserHaveGithub = user?.githubTokens ? user.githubTokens.length > 0 : false
  return (<>
    {doesUserHaveGithub ?

      <div className="flex gap-4 items-center">
        <NewRepoFormModal />

        <div className="badge badge-primary badge-outline">Github is connected...</div>

      </div>
      : <button className="px-8  btn-primary btn text-white" onClick={onGithubConnect}>
        Connect Github First
      </button>}

  </>)
}
const page = () => {

  return (
    <div className="w-full py-12 ">
      <div className="w-full flex mb-6 justify-between">
        <Typography variant="h3" className="">
          Your Connected Repositories
        </Typography>
        <ConnnectionButton />



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
