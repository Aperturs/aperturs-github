import { useState } from "react";
import { useAPICallWrapper } from "./useAPICallWrapper";
import { useUserStore } from "@/stores/user";
import { apertursUser } from "@/appwrite/user";

export const useUser = () => {
    const {
        isAPICallFailure,
        isAPICallLoading,
        APICallError,
        isAPICallSuccess,
        wrapAPICall,
    } = useAPICallWrapper();


    const [loading, setLoading] = useState(false);
    const user = useUserStore((state) => state.user);

    const refreshUser = async () => {
        setLoading(true);
        try {
            const user = await wrapAPICall(async () => apertursUser.getUser())
            useUserStore.setState({ user });
        } catch (e) {
            throw e;
        }
        finally {
            setLoading(false);
        }
    }

    return { user, refreshUser, loading, failure: isAPICallFailure, error: APICallError, success: isAPICallSuccess }
}