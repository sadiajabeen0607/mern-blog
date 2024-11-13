import { Button, Select, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    sort: 'asc',
    category: 'uncategorized',
  });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const useParams = new URLSearchParams(location.search);
    const searchTermFromUrl = useParams.get('searchTerm');
    const sortFromUrl = useParams.get('sort');
    const categoryFromUrl = useParams.get('category');

    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData((prevData) => ({
        ...prevData,
        searchTerm: searchTermFromUrl || prevData.searchTerm,
        sort: sortFromUrl || prevData.sort,
        category: categoryFromUrl || prevData.category,
      }));
    }

    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = useParams.toString();
      try {
        const res = await fetch(`/api/post/getposts?${searchQuery}`);
        if (res.ok) {
          const data = await res.json();
          setPosts(data.posts);
          setShowMore(data.posts.length === 9);
        } else {
          console.error('Failed to fetch posts');
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setSidebarData((prevData) => ({
      ...prevData,
      [id]: value || (id === 'sort' ? 'desc' : 'uncategorized'),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', sidebarData.searchTerm);
    urlParams.set('sort', sidebarData.sort);
    urlParams.set('category', sidebarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const startIndex = posts.length;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    try {
      const res = await fetch(`/api/post/getposts?${searchQuery}`);
      if (res.ok) {
        const data = await res.json();
        setPosts((prevPosts) => [...prevPosts, ...data.posts]);
        setShowMore(data.posts.length === 9);
      } else {
        console.error('Failed to fetch more posts');
      }
    } catch (error) {
      console.error('Error fetching more posts:', error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          {/* Search input field */}
          <div className="flex items-center gap-2">
            <label className="font-semibold whitespace-nowrap">Search Term:</label>
            <TextInput
              type="text"
              placeholder="Search..."
              id="searchTerm"
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>

          {/* Sort input field */}
          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <Select id="sort" onChange={handleChange} value={sidebarData.sort}>
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </Select>
          </div>

          {/* Category input field */}
          <div className="flex items-center gap-2">
            <label className="font-semibold">Category:</label>
            <Select id="category" onChange={handleChange} value={sidebarData.category}>
              <option value="uncategorized">Uncategorized</option>
              <option value="health&wellness">Health & Wellness</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="food&cooking">Food & Cooking</option>
              <option value="education">Education</option>
              <option value="entertainment">Entertainment</option>
              <option value="motivation&self-help">Motivation & Self-Help</option>
              <option value="science&nature">Science & Nature</option>
              <option value="sports&fitness">Sports & Fitness</option>
              <option value="gaming">Gaming</option>
            </Select>
          </div>

          <Button type="submit" outline gradientDuoTone="purpleToPink">
            Apply Filters
          </Button>
        </form>
      </div>

      {/* right panel */}
      <div className="w-full">
        <h1 className="text-3xl font-semibold sm:border-b border-gray-500 mt-5 p-3">Posts results</h1>

        <div className="flex flex-wrap gap-4 p-7">
          {!loading && posts.length === 0 && (
            <p className="text-xl text-gray-500">No posts found</p>
          )}

          {loading && <p className="text-gray-500 text-xl">Loading...</p>}

          {!loading && posts && posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}

          {showMore && (
            <button
              className="text-teal-500 text-lg hover:underline p-7 w-full"
              onClick={handleShowMore}
              disabled={loading}
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
