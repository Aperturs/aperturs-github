'use client'

import { Descendant } from 'slate';
import LinkedInPostCreation from './linkedin-card';

const Post = () => {

    const handlePostSubmit = (content: Descendant[]) => {
        console.log("Post content:", content);
        // Perform your post creation logic here
      };

  return (
    <div className="container mx-auto p-4">
              <LinkedInPostCreation onPostSubmit={handlePostSubmit}
              />


  </div>
  )
}

export default Post
