"use client"

import { useAccount } from "@/hooks/useAccount";
import { useEffect } from "react";

export default function Page({ params }: { params: { userId: string } }) {
    const { success, error, confirmVerification, loading } = useAccount()
    useEffect(() => {
        confirmVerification()
    }, [])
    return <div>
        Verfication about to start
        {error && <div>{error}</div>}
        {success && <div>Success</div>}
        {loading && <div>Loading....</div>}
    </div>;
}