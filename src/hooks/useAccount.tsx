import { apertursAccount } from "@/appwrite/account"
import { useUserStore } from "@/stores/user"
import { useState } from "react"
import { useAPICallWrapper } from "./useAPICallWrapper"

export const useAccount = () => {
    const { isAPICallFailure, isAPICallLoading, APICallError, isAPICallSuccess, wrapAPICall } = useAPICallWrapper()
    const [loading, setLoading] = useState(false)
    const loginWithEmailAndPassword = (email: string, password: string) => {
        setLoading(isAPICallLoading)
        wrapAPICall(async () => apertursAccount.loginWithEmailAndPassword(email, password)).then((user) => {
            if (user) {
                useUserStore.setState({ user })
            }
        })
        setLoading(isAPICallLoading)
    }
    return {
        loginWithEmailAndPassword,
        error: APICallError,
        loading: loading || isAPICallLoading,
        success: isAPICallSuccess,
        failure: isAPICallFailure
    }
}