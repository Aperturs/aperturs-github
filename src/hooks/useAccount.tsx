"use client"
import { apertursAccount } from "@/appwrite/account"
import { useUserStore } from "@/stores/user"
import { use, useEffect, useMemo, useState } from "react"
import { useAPICallWrapper } from "./useAPICallWrapper"
import { useSearchParams } from "next/navigation"

export const useAccount = () => {
    const { isAPICallFailure, isAPICallLoading, APICallError, isAPICallSuccess, wrapAPICall } = useAPICallWrapper()
    const [loading, setLoading] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const searchParams = useSearchParams()
    const user = useUserStore(state => state.user)

    const loginWithEmailAndPassword = async (email: string, password: string) => {
        setLoading(true)
        await wrapAPICall(async () => apertursAccount.loginWithEmailAndPassword(email, password)).then((newUser) => {
            if (newUser) {
                console.log({ newUser })
                useUserStore.setState({ user: newUser })
                console.log({ user }, "user")
            }
        })
        setLoading(isAPICallLoading)
    }
    const logout = async () => {
        setLoading(true)
        await wrapAPICall(async () => apertursAccount.logout()).then(() => {
            useUserStore.setState({ user: null })
        })
        setLoading(isAPICallLoading)
    }
    const signUpUsingEmailAndPassword = async (email: string, password: string, name: string) => {
        setLoading(true)
        await wrapAPICall(async () => apertursAccount.signUpUserUsingEmailAndPassword(email, password, name)).then((newUser) => {
            useUserStore.setState({ user: newUser })
        })
        setLoading(isAPICallLoading)
    }

    const confirmVerification = async () => {
        setLoading(true)
        const userId = searchParams.get("userId")
        const secret = searchParams.get("secret")
        await wrapAPICall(async () => {
            if (!userId || !secret) return Error("Invalid URL")
            return apertursAccount.verifyUserEmail(userId as string, secret as string)
        })
        setLoading(false)
    }
    useEffect(() => {

        if (user) {
            setIsAuthenticated(true)
        }
        else {
            setIsAuthenticated(false)
        }
    }, [user])
    return {
        loginWithEmailAndPassword,
        signUpUsingEmailAndPassword,
        confirmVerification,
        logout,
        user,
        isAuthenticated,
        error: APICallError,
        loading: loading || isAPICallLoading,
        success: isAPICallSuccess,
        failure: isAPICallFailure
    }
}