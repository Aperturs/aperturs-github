"use client"

import { useAccount } from "@/hooks/useAccount";
import { useEffect, lazy } from "react";
import { AiOutlineMail } from "react-icons/ai"
import Lottie from 'react-lottie'
import emailAnimation from "../../../lotties/email.json"
import { useRouter } from "next/navigation";
const LinearGraident = `
linear-gradient(
    345deg,
    hsl(208deg 100% 95%) 0%,
    hsl(208deg 100% 90%) 1%,
    hsl(209deg 100% 86%) 3%,
    hsl(210deg 100% 82%) 5%,
    hsl(211deg 100% 78%) 7%,
    hsl(212deg 100% 74%) 10%,
    hsl(213deg 100% 70%) 13%,
    hsl(214deg 100% 67%) 16%,
    hsl(215deg 100% 64%) 20%,
    hsl(217deg 100% 61%) 25%,
    hsl(219deg 100% 59%) 30%,
    hsl(223deg 100% 59%) 36%,
    hsl(224deg 92% 57%) 43%,
    hsl(224deg 84% 55%) 51%,
    hsl(225deg 78% 53%) 60%,
    hsl(226deg 72% 51%) 69%,
    hsl(226deg 70% 48%) 78%,
    hsl(227deg 71% 46%) 87%,
    hsl(227deg 72% 44%) 93%,
    hsl(228deg 73% 42%) 97%,
    hsl(228deg 74% 40%) 99%,
    hsl(229deg 76% 37%) 100%,
    hsl(229deg 79% 35%) 100%
  );`

export default function Page({ params }: { params: { userId: string } }) {
    const { success, error, confirmVerification, loading, isAuthenticated } = useAccount()
    useEffect(() => {
        confirmVerification()
    }, [])
    const router = useRouter()
    const onGotoProject = () => {
        if (!isAuthenticated) return router.push("/login")
        router.push("/projects")
    }
    return <div className="w-full">
        <div className="w-full text-center  p-12" style={{
            backgroundImage: LinearGraident,
        }}>
            <p className="text-3xl font-bold text-white">Welcome to Aperturs ...</p>
        </div>
        <div className="w-full flex justify-center items-center">
            <Lottie
                options={{
                    loop: true,
                    autoplay: true,
                    animationData: emailAnimation,
                    rendererSettings: {
                        preserveAspectRatio: "xMidYMid slice",
                        progressiveLoad: true
                    }

                }
                }
                height={400}
                width={400}
            />
        </div>
        <div className="w-full flex justify-center items-center mx-auto">
            {loading &&
                <span>
                    <p>
                        Hey there, Wait still
                    </p>

                    <span className="loading loading-bars loading-lg"></span>

                </span>
            }
            {error && <span>
                <p>
                    Hey there, an Error: {error} occured
                </p>
            </span>}
            {success &&
                <span>
                    <p>
                        🙌 Success !!
                    </p>
                    <button className="my-4 btn btn-neutral" onClick={onGotoProject}>Goto Project</button>
                </span>}
        </div>
    </div>;
}

