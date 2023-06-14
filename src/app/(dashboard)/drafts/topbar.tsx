'use client'

import { useRouter } from 'next/navigation'

const TopBar = () => {

    const router = useRouter()

  return (
    <div className='sm:flex my-4 w-full justify-between'>
    <h1 className='sm:text-3xl sm:ml-4 text-lg font-semibold'>
      Posts
    </h1>
    <button className='btn btn-primary text-white px-6'
    onClick={() => {
      router.push('/newpost')
    }}
    >
      New Post
    </button>
  </div>
  )
}

export default TopBar
