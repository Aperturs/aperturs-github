import { useState } from "react";
import { useAPICallWrapper } from "./useAPICallWrapper";
import { useUserStore } from "@/stores/user";
import { apertursUser } from "@/appwrite/user";
import { Octokit } from "octokit"
type VisibilityType = "all" | "public" | "private" | undefined
export const useGithub = (token: string) => {
    const {
        isAPICallFailure,
        isAPICallLoading,
        APICallError,
        isAPICallSuccess,
        wrapAPICall,
    } = useAPICallWrapper();
    const octokit = new Octokit({
        auth: token,
    })

    const [loading, setLoading] = useState(false);

    const getRepositories = async (visibility: VisibilityType = "all") => {
        return wrapAPICall(async () => await octokit.rest.repos.listForAuthenticatedUser({
            visibility: visibility,
            sort: "updated"
        })
        )
    }
    return {
        getRepositories,
        loading: isAPICallLoading,
        failure: isAPICallFailure,
        error: APICallError,
        success: isAPICallSuccess

    }


}