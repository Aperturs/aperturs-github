"use client";

import React, { useEffect, useMemo, useState } from "react";
import GithubCard from "./githubcard";
import { Avatar, Button, Chip, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Spinner, Typography } from "@material-tailwind/react";
import { useUser } from "@/hooks/useUser";
import Select, { OptionProps } from 'react-select';


import { useGithub } from "@/hooks/useGithub";
import { Repo } from "@/types/github";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { BsInfoCircle } from "react-icons/bs";
import { useProject } from "@/hooks/useProject";
import toast from "react-hot-toast";
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
const NewRepoFormModal = ({ hasLInkedln }: { hasLInkedln: boolean }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const { user } = useUser()
  const { getRepositories, loading } = useGithub(user?.githubTokens.at(0)?.access_token ?? "")
  const [option, setOption] = useState({} as RepoOptionType);
  const [options, setOptions] = useState([] as RepoOptionType[]);

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
  const [commitsCount, setCommitsCount] = useState(3)

  const { createProject, loading: ProjectLoading, error, success, failure } = useProject()
  useEffect(() => {
    if (failure) {
      toast.error(`Could Not Create  due to the Error , ${error}`)
    }
  }, [failure])
  const onConfirm = async () => {
    let id = ""
    const newProject = await createProject({
      commit_count: commitsCount,
      repo_description: option.value.description,
      repo_id: option.value.id.toString(),
      repo_name: option.value.full_name,
      repo_url: option.value.html_url,
    })
    if (newProject) {
      redirect(`/project/${newProject.$id}/context`)
    }

  }
  return (

    <>

      <button className="px-8 btn-primary btn text-white" onClick={handleOpen}>
        Connect new Repo
      </button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Select your Repo ....</DialogHeader>
        <DialogBody divider>
          {loading && user ? <Spinner className="h-12 w-12" /> :
            <>

              <div className="w-full my-7">
                <Typography variant="small" color="gray" className="flex items-center gap-1 font-normal mt-2">
                  <BsInfoCircle className="w-4 h-4 -mt-px" />
                  Search And Select your Repo
                </Typography>
                <Select
                  formatOptionLabel={RepoOption}
                  value={option}

                  options={options}
                  placeholder="Search And Select your Repo"
                  onChange={value => setOption(value as any)}

                />

                <div className="mt-5">
                  <Input max={"10"} min={"3"} defaultValue={3} value={commitsCount} onChange={(event) => setCommitsCount(parseInt(event.target.value))} type="number" label="Number Of Commits" />
                  <Typography variant="small" color="gray" className="flex items-center gap-1 font-normal mt-2">
                    <BsInfoCircle className="w-4 h-4 -mt-px" />
                    Select How many lastest commits will be taken in consideration before making a post
                  </Typography>
                </div>


              </div>


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

          {
            ProjectLoading ? <Spinner className="h-12 w-12" /> :
              <Button disabled={!(commitsCount >= 3 && option?.value != undefined)} variant="gradient" color="green" onClick={onConfirm}>
                <span>Confirm</span>
              </Button>
          }

        </DialogFooter>
      </Dialog >

    </>
  )

}
const ConnnectionButton = () => {
  const onGithubConnect = () => {
    const redirectUrl = process.env.NODE_ENV == "development" ? "http://localhost:3000/api/callback/github" : "https://app.aperturs.com/api/callback/github"
    console.log("Github Connect")
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUrl)}&scope=${encodeURIComponent("user repo")}`
  }
  const onLinkedLnConnect = () => {

    console.log(" linkedln Connect")
    window.location.href = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID!}&redirect_uri=${process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URL!}&scope=r_liteprofile%20r_emailaddress%20w_member_social`;
  };

  const { user } = useUser()
  console.log({ user }, "user")
  const doesUserHaveGithub = user?.githubTokens ? user.githubTokens.length > 0 : false
  const hasLinkedln = user?.linkedlnTokens.length ? user?.linkedlnTokens.length > 0 : false
  if (!user) return null
  return (<>
    {doesUserHaveGithub ?
      hasLinkedln ? <div className="flex gap-4 items-center">
        <NewRepoFormModal hasLInkedln={hasLinkedln} />
        <div className="flex flex-col gap-4 w-full">
          <div className="badge badge-primary badge-outline">Github connected...</div>
          <div className="badge badge-secondary bg-ghost">LinkedLn Connected...</div>
        </div>
      </div> :

        <div className="flex gap-4 items-center">
          <button className="px-8  btn-primary btn text-white" onClick={onLinkedLnConnect}>
            Connect LinkedLn First
          </button>
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

    refreshUser()

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
