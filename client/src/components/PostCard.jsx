import React from 'react'
import { Link } from 'react-router-dom'

export default function PostCard({ post }) {

    // console.log('post', post);
    
  return (
    <div className='group relative w-full border h-[340px] overflow-hidden rounded-lg sm:w-[430px] border-teal-500 hover:border-2 transition-all'>
      <Link to={`/post/${post.slug}`}>
        <img src={post.image} alt={post.slug} className='h-[260px] w-full object-cover group-hover:h-[200px] transition-all duration-300 z-20' />
      </Link>

      <div className='p-3 flex flex-col gap-2'>
        <p className='text-lg font-semibold line-clamp-2'>{post.title}</p>
        <span className='text-sm italic'>{post.category}</span>

        <Link className='z-10 group-hover:bottom-0 absolute left-0 right-0 bottom-[-200px] border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2' to={`/post/${post.slug}`}>
            Read article
        </Link>
      </div>
    </div>
  )
}
 