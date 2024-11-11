// import React from 'react'
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashProfile from '../components/DashProfile';
import DashSidebar from '../components/DashSidebar';
import DashPosts from '../components/DashPosts';
import DashUsers from '../components/DashUsers';
import DashComment from '../components/DashComment';

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    // console.log(tabFromUrl);
    if(tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search])
  return (
    <div className='flex flex-col md:flex-row min-h-screen'>
      <div className='md:w-56'>
        <DashSidebar />
      </div>
      {/* Profile */}
      {tab === 'profile' && <DashProfile />}
      {/* Posts */}
      {tab === 'posts' && <DashPosts />}
      {/* Users */}
      {tab === 'users' && <DashUsers />}
      {/* Comments */}
      {tab === 'comments' && <DashComment />}
    </div>
  )
}
