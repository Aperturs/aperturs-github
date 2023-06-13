"use client";

import React, { useEffect, useMemo, useState } from "react";
import GithubCard from "./githubcard";
import { Avatar, Button, Chip, Dialog, DialogBody, DialogFooter, DialogHeader, Spinner, Typography } from "@material-tailwind/react";
import { useUser } from "@/hooks/useUser";
import Select, { OptionProps } from 'react-select';


import { useGithub } from "@/hooks/useGithub";
import { Repo } from "@/types/github";
import { useRouter, useSearchParams } from "next/navigation";
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
  const [count, setCount] = useState(0)

  return (

    <>
      <button className="px-8 btn-primary btn text-white" onClick={handleOpen}>
        Connect new Repo
      </button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Select your Repo ....</DialogHeader>
        <DialogBody divider>
          {loading ? <Spinner className="h-12 w-12" /> :
            <>
              {count == 0 &&
                <div className="w-full">
                  <Select
                    formatOptionLabel={RepoOption}
                    value={option}
                    options={options}
                    onChange={value => setOption(value as any)}

                  />
                  <button className="px-8 btn-primary btn text-white" onClick={handleOpen}>
                    Connect Linkedln ...
                  </button>


                </div>
              }
              {count == 1 &&
                <div className="w-full">
                  <div>

                  </div>
                </div>}


            </>}

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
          <>
            {
              count !== 2 ? <Button variant="gradient" color="green" onClick={() => setCount(count + 1)}>
                <span>Next</span>
              </Button> : <Button variant="gradient" color="green" onClick={handleOpen}>
                <span>Confirm</span>
              </Button>
            }
          </>

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

        <div className="badge badge-primary badge-outline">Git connected..</div>

      </div>
      : <button className="px-8  btn-primary btn text-white" onClick={onGithubConnect}>
        Connect Github First
      </button>}

  </>)
}
const page = () => {
  const searchParams = useSearchParams()
  const { refreshUser } = useUser()
  useEffect(() => {
    const isRefreshUser = searchParams.get("refreshUser")
    if (isRefreshUser) {
      refreshUser()
    }
  }, [])
  return (
    <div className="w-full py-12 ">
      <div className="w-full md:flex mb-6 justify-between">
        <h3 className="lg:text-2xl sm:text-xl text-lg font-bold ">
          Your Connected Repositories
        </h3>
        <ConnnectionButton />
      </div>
      <div className="grid xl:grid-cols-4 sm:grid-cols-2 grid-col-1 gap-6">
        <GithubCard
          repoName="repoName"
          repoDescription="repoDescription"
          lastUpdated="lastUpdated"
        />
                <GithubCard
          repoName="repoName"
          repoDescription="repoDescription"
          lastUpdated="lastUpdated"
        />
                <GithubCard
          repoName="repoName"
          repoDescription="repoDescription"
          lastUpdated="lastUpdated"
        />
                <GithubCard
          repoName="repoName"
          repoDescription="repoDescription"
          lastUpdated="lastUpdated"
        />      
      </div>
    </div>
  );
};

export default page;
