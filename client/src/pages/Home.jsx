import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts`);

        const data = await res.json();

        if (res.ok) {
          setPosts(data.posts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <div className="max-w-[85rem] mx-auto flex flex-col gap-6 p-28 px-3">
        <h1 className="font-bold text-3xl lg:text-6xl text-center mb-4">Welcome to my Blog</h1>
        <p className="text-gray-500 text-xs sm:text-sm text-center">
          Dive into a world of knowledge, wellness, and creativity with our
          diverse range of topics. Whether you&apos;re seeking tips for a
          healthier lifestyle, delicious recipes to try, fresh insights into
          science and nature, or a dose of motivation to fuel your day, our blog
          has something for everyone. Discover articles that inspire, entertain,
          and empower you—whether you&apos;re passionate about gaming, love
          exploring new fitness routines, or simply crave fresh perspectives on
          life. Join our community of curious minds and take a journey through
          content crafted to enrich every aspect of your life. Explore, enjoy,
          and elevate your everyday!
        </p>
        <Link
          to="/search"
          className="text-xs sm:text-sm text-teal-500 font-bold hover:underline text-center"
        >
          View all posts
        </Link>
      </div>

      <div className="flex flex-col p-3 max-w-[85rem] mx-auto py-7 gap-8 items-center justify-center">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-center font-semibold text-2xl">Recent Posts</h2>

            <div className="flex flex-wrap gap-4">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            
            <Link to='/search' className="text-lg text-center text-teal-500 hover:underline">View all posts</Link>
          </div>
        )}
      </div>
    </div>
  );
}
