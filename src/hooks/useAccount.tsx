import { apertursAccount } from "@/appwrite/account"
import { useUserStore } from "@/stores/user"
import { useEffect, useMemo, useState } from "react"
import { useAPICallWrapper } from "./useAPICallWrapper"

export const useAccount = () => {
    const { isAPICallFailure, isAPICallLoading, APICallError, isAPICallSuccess, wrapAPICall } = useAPICallWrapper()
    const [loading, setLoading] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const loginWithEmailAndPassword = (email: string, password: string) => {
        setLoading(isAPICallLoading)
        wrapAPICall(async () => apertursAccount.loginWithEmailAndPassword(email, password)).then((user) => {
            if (user) {
                useUserStore.setState({ user })
            }
        })
        setLoading(isAPICallLoading)
    }
    const logout = () => {
        setLoading(isAPICallLoading)
        wrapAPICall(async () => apertursAccount.logout()).then(() => {
            useUserStore.setState({ user: null })
        })
        setLoading(isAPICallLoading)
    }
    useEffect(() => {
        const unSubsscribeIsAuthenticated = useUserStore.subscribe((user, prevUser) => {
            if (user && !prevUser) {
                setIsAuthenticated(true)
            }
            else if (!user && prevUser) {
                setIsAuthenticated(false)
            }
        })
        return () => {
            unSubsscribeIsAuthenticated()
        }
    }, [])
    return {
        loginWithEmailAndPassword,
        logout,
        isAuthenticated,
        error: APICallError,
        loading: loading || isAPICallLoading,
        success: isAPICallSuccess,
        failure: isAPICallFailure

    }
}