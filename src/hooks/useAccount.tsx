import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAccountStore } from "@/stores/account";
import { apertursAccount } from "@/appwrite/account";
import { useAPICallWrapper } from "./useAPICallWrapper";
import { useUserStore } from "@/stores/user";
import { useUser } from "./useUser";
import { apertursUser } from "@/appwrite/user";

/**
 * Represents the useAccount hook.
 */
export const useAccount = () => {
    const {
        isAPICallFailure,
        isAPICallLoading,
        APICallError,
        isAPICallSuccess,
        wrapAPICall,
    } = useAPICallWrapper();


    const [loading, setLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const searchParams = useSearchParams();
    const account = useAccountStore((state) => state.account);

    /**
     * Logs in a user with the provided email and password.
     * @param email - The user's email.
     * @param password - The user's password.
     */
    const loginWithEmailAndPassword = async (
        email: string,
        password: string
    ): Promise<void> => {
        setLoading(true);
        try {
            await wrapAPICall(async () =>
                apertursAccount.loginWithEmailAndPassword(email, password)
            ).then(async (newUser) => {
                if (newUser) {

                    const user = await wrapAPICall(async () => apertursUser.getUser())
                    if (user) {
                        useAccountStore.setState({ account: newUser });
                        useUserStore.setState({ user });
                    }

                }
            });
        } catch (e) {
            throw e;
        }
        finally {
            setLoading(false);
        }
    };

    /**
     * Logs out the current user.
     */
    const logout = async (): Promise<void> => {
        setLoading(true);
        try {
            await wrapAPICall(async () => apertursAccount.logout()).then(() => {
                useAccountStore.setState({ account: null });
                useUserStore.setState({ user: null });
            });
        }
        catch (e) {
            throw e;
        }
        finally {
            setLoading(false);
        }
    };

    /**
     * Signs up a new user with the provided email, password, and name.
     * @param email - The user's email.
     * @param password - The user's password.
     * @param name - The user's name.
     */
    const signUpUsingEmailAndPassword = async (
        email: string,
        password: string,
        name: string
    ): Promise<void> => {
        setLoading(true);
        try {
            await wrapAPICall(async () =>
                apertursAccount.signUpUserUsingEmailAndPassword(email, password, name)
            ).then((newUser) => {
                useAccountStore.setState({ account: newUser });
            });
        }
        catch (err) {
            throw err;
        }
        finally {
            setLoading(false);
        }
    };

    /**
     * Verifies the user's email using the verification URL parameters.
     */
    const confirmVerification = async (): Promise<void> => {
        setLoading(true);
        try {
            const userId = searchParams.get("userId");
            const secret = searchParams.get("secret");
            await wrapAPICall(async () => {
                if (!userId || !secret) return Error("Invalid URL");
                return apertursAccount.verifyUserEmail(userId as string, secret as string);
            });
        } catch (err) {
            throw err;
        }
        finally {


            setLoading(false);
        }
    };

    useEffect(() => {
        if (account) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, [account]);

    return {
        loginWithEmailAndPassword,
        logout,
        signUpUsingEmailAndPassword,
        confirmVerification,
        account,
        isAuthenticated,
        error: APICallError,
        loading: loading,
        success: isAPICallSuccess,
        failure: isAPICallFailure,
    };
};