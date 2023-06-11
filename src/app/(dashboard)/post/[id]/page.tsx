"use client";

import { Descendant } from "slate";
import { Node } from "slate";

import LinkedInPostCreation from "./linkedin-card";
import { Avatar } from "@material-tailwind/react";

const Post = () => {
  const handlePostSubmit = (content: Descendant[]) => {
    const plainText = content.map((node: Node) => Node.string(node)).join("\n");
    console.log("Post content:", plainText);
    // Perform your post creation logic here
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex gap-3">
          <Avatar
            src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80"
            size="lg"
            color="blue"
            className="mb-4"
          />
            <div>
              <div className="text-lg font-bold">John Doe</div>
              <div className="text-sm text-gray-500">@John</div>
            </div>
        </div>

        <LinkedInPostCreation onPostSubmit={handlePostSubmit} />
      </div>
    </div>
  );
};

export default Post;
