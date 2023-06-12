import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useUserStore } from "@/stores/user";
import { apertursAccount } from "@/appwrite/account";
import { useAPICallWrapper } from "./useAPICallWrapper";

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
    const user = useUserStore((state) => state.user);

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
            ).then((newUser) => {
                if (newUser) {
                    useUserStore.setState({ user: newUser });
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
                useUserStore.setState({ user: newUser });
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
        if (user) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, [user]);

    return {
        loginWithEmailAndPassword,
        logout,
        signUpUsingEmailAndPassword,
        confirmVerification,
        user,
        isAuthenticated,
        error: APICallError,
        loading: loading,
        success: isAPICallSuccess,
        failure: isAPICallFailure,
    };
};