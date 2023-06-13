import PostCard from "@/app/(dashboard)/drafts/postcard";
import React from "react";

const ProjectPosts = () => {
  return (
    <div>
      <div className="flex flex-col  items-center ">
        <div className="sm:flex my-4 w-full justify-between">
          <h1 className="sm:text-3xl sm:ml-4 text-lg font-semibold">Posts</h1>
          <button className="btn btn-primary text-white px-6">New Post</button>
        </div>
        <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-col-1 gap-6">
          <PostCard id={1} />
          <PostCard id={2} />
          <PostCard id={3} />
        </div>
      </div>
    </div>
  );
};

export default ProjectPosts;
