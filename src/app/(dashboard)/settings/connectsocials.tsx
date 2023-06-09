"use client";
import { IoIosAddCircle } from "react-icons/io";
import { FaFacebookSquare, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";
import { useRouter } from "next/navigation";

const ConnectSocials = () => {
  return (
    <div className="boxShadowCust  mt-[10vh] h-[50vh] w-[95%] rounded-xl p-6">
      {/* <h1 className='text-5xl font-medium text-gray-600'>Connect Socials</h1> */}
      <div className="mt-4 flex flex-col">
        <h2 className="text-3xl font-bold">Connect your socials</h2>
        <div className="mt-4 flex gap-4">
          <AddSocial />
        </div>
      </div>
    </div>
  );
};

const AddSocial = () => {
  return (
    <div>
      <label htmlFor="my-modal-3" className="btn-primary btn gap-2 text-white">
        <IoIosAddCircle className="text-2xl" />
        Add Socials
      </label>

      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="my-modal-3"
            className="btn-sm btn-circle btn absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Add Socials to Aperturs</h3>
          <Socials />
        </div>
      </div>
    </div>
  );
};

const Socials = () => {
  const router = useRouter();
  const onGithubConnect = () => {
    const redirectUrl = process.env.NODE_ENV == "development" ? "http://localhost:3000/api/callback/github" : "https://app.aperturs.com/api/callback/github"
    console.log("Github Connect")
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUrl)}&scope=${encodeURIComponent("user repo")}`
  }
  const onLinkedLnConnect = () => {

    console.log(" linkedln Connect")
    window.location.href = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID!}&redirect_uri=${process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URL!}&scope=r_liteprofile%20r_emailaddress%20w_member_social`;
  };

  return (
    <div className="grid grid-cols-3 py-4 gap-4">
      <button
        className="btn hover:bg-primary hover:text-white hover:border-0  gap-2"
        onClick={() => router.push("/socials/twitter")}
      >
        <AiOutlineTwitter className="text-2xl " />
        <p>Twitter</p>
      </button>
      <button className="btn hover:bg-primary hover:text-white hover:border-0  gap-2"
      onClick={onLinkedLnConnect}
      >
        <FaLinkedinIn className="text-2xl " />
        <p>Linkedin</p>
      </button>
      <button className="btn hover:bg-primary hover:text-white hover:border-0  gap-2"
      onClick={onGithubConnect}
      >
        <FaGithub className="text-2xl " />
        <p>Github</p>
      </button>
    </div>
  );
};

export default ConnectSocials;
