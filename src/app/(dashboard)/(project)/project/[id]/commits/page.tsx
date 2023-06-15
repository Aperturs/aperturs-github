"use client"
import React, { use, useEffect, useState } from 'react'
import CommitsTable from './CommitsTable'
import { useGithub } from '@/hooks/useGithub'
import { useUser } from '@/hooks/useUser'
import { useParams } from 'next/navigation'
import { useProject } from '@/hooks/useProject'
import { CommitRoot } from '@/types/github'
import { Spinner } from '@/components'

export interface TableRow {
  id: number;
  message: string;
  author: string;
  date: string;
}

const CommitsPage = () => {
  const { id } = useParams()
  const { project } = useProject(id)
  const { user } = useUser()
  const { getCommits, loading } = useGithub(user?.githubTokens.at(0)?.access_token ?? "")

  if (!project) return <Spinner  />
  const [commits, setCommits] = useState([] as CommitRoot[])
  const [tableRows, setTableRows] = useState([] as TableRow[])
  useEffect(() => {
    const [owner, repo] = project.repo_name.split("/");
    getCommits(owner, repo).then((res) => {
      if (res) {
        const newTablesRows = res.data.map((commit, index) => {
          return {
            id: index,
            author: commit.committer?.name ?? "",
            message: commit.commit.message,
            date: Intl.DateTimeFormat("en", {
              dateStyle: "short",
            }).format(new Date(commit.commit.committer?.date ?? ""))
          } as TableRow
        })
        setTableRows(newTablesRows)
      }
    })
  }, [])
  
  return (
    <div>
      {loading ?<Spinner  /> : <CommitsTable rows={tableRows} />}
    </div>
  )
}

export default CommitsPage