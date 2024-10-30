import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import CommentSection from "../components/CommentSection";

export default function PostPage() {
  const [post, setPost] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  // console.log('post', post);
  

  const { postSlug } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);

        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);

        const data = await res.json();

        if (!res.ok) {
          setLoading(false);
          setError(true);
          return;
        } else {
          setLoading(false);
          setError(false);
          setPost(data.posts[0]);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
        console.log(error);
      }
    };
    fetchPost();
  }, [postSlug]);

  return (
    <main>
      {loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <Spinner size="xl" />
        </div>
      ) : (
        <div className="p-3 flex flex-col min-h-screen min-w-6xl mx-auto">
            <h1 className="p-3 font-serif text-3xl lg:text-4xl max-w-2xl mx-auto mt-10 text-center">{post && post.title}</h1>

            <Link to={`/search?category=${post && post.category}`} className="self-center mt-5">
                <Button color='gray' pill size={'xs'}>{post && post.category}</Button>
            </Link>

            <img src={post && post.image} alt={post && post.title} className="mt-10 object-cover max-h-[600px] w-full max-w-2xl mx-auto" />

            <div className="flex justify-between p-3 border-b border-slate-400 max-w-2xl mx-auto w-full text-xs">
                <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
                <span className="italic">{post && (post.content.length / 1000).toFixed(0)} mins read</span>
            </div>

            <div className="p-3 max-w-2xl w-full mx-auto post-content" dangerouslySetInnerHTML={{ __html: post && post.content }}></div>
            <div className="max-w-4xl mx-auto w-full p-3">
              <CallToAction />
            </div>
      
            <CommentSection postId={post._id}  />
        </div>
      )}
    </main>
  );
}
