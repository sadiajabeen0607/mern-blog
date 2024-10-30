import { Alert, Button, Textarea } from 'flowbite-react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function CommentSection({postId}) {
  // console.log('postId', postId);

  const { currentUser } = useSelector((state) => state.user);

  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState(null);

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/comment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({content: comment, postId, userId: currentUser._id})
      });
  
      const data = await res.json();
  
      if(res.ok) {
        setComment('');
        setCommentError(null);
      }
      
    } catch (error) {
      setCommentError(error.message);
    }

  }

  return (
    <div className='max-w-2xl mx-auto p-3 w-full'>
      {currentUser ? (
        <div className='flex items-center gap-1 text-gray-500 text-sm my-5'>
          <p>Signed in as:</p>
          <img className='h-5 w-5 rounded-full object-cover' src={currentUser.profilePicture} alt={currentUser.username} />
          <Link to={'/dashboard?tab=profile'} className='text-cyan-500 hover:underline text-xs'>
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className='text-sm text-teal-500 my-5 flex gap-1'>
          You must be signed in to comment.
          <Link className='text-blue-500 hover:underline' to={'/sign-in'}>
            Sign In
          </Link>
        </div>
      )}

      {currentUser && (
        <form onSubmit={handleSubmit} className='border border-teal-500 rounded-md p-3'>
          <Textarea rows='3' maxLength='200' placeholder='Add a comment...' onChange={(e) => setComment(e.target.value)} value={comment} />
          <div className='flex items-center justify-between mt-5'>
            <p className='text-gray-500 text-xs'>{200 - comment.length} characters remaining</p>
            <Button outline gradientDuoTone='purpleToBlue' type='submit'>Submit</Button>
          </div>
          {commentError && (
            <Alert color='failure' className='mt-5'>{commentError}</Alert>
          )} 
        </form>
      )}
    </div>
  )
}
 