import React from 'react'
import PostCard from './postcard'
import TopBar from './topbar'

const Posts = () => {


  return (
    <div className='flex flex-col  items-center '>
   <TopBar />
    <div className='grid xl:grid-cols-3 sm:grid-cols-2 grid-col-1 gap-6'>
        <PostCard  id={1}/>
        <PostCard  id={2}/>
        <PostCard  id={3}/>
    </div>
    </div>

  )
}

export default Posts
