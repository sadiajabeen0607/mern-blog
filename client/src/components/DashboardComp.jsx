import { Button, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function DashboardComp() {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [posts, setPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [comments, setComments] = useState([]);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers?limit=5`);
        const data = await res.json();

        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?limit=5`);
        const data = await res.json();

        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/getComments?limit=5`);
        const data = await res.json();

        if (res.ok) {
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser.isAdmin) {
      fetchUsers();
      fetchPosts();
      fetchComments();
    }
  }, [currentUser]);

  // console.log('posts', posts);
  // console.log('users', users);
  // console.log('comments', comments);

  return (
    <div className="p-3 md:mx-auto">
      <div className="flex flex-wrap gap-4 justify-center">
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">Total Users</h3>
              <p className="text-2xl">{totalUsers}</p>
            </div>
            <HiOutlineUserGroup className="bg-teal-500 text-white text-5xl rounded-full p-3 shadow-lg" />
          </div>
          <div className="text-sm flex gap-2">
            {lastMonthUsers > 0 ? (
              <span className="text-green-500 flex items-center">
                <HiArrowNarrowUp />
                {lastMonthUsers}
              </span>
            ) : (
              <span className="text-red-500">0</span>
            )}

            <span className="text-gray-500">Last Month</span>
          </div>
        </div>

        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">
                Total Comments
              </h3>
              <p className="text-2xl">{totalComments}</p>
            </div>
            <HiAnnotation className="bg-indigo-500 text-white text-5xl rounded-full p-3 shadow-lg" />
          </div>
          <div className="text-sm flex gap-2">
            {lastMonthComments > 0 ? (
              <span className="text-green-500 flex items-center">
                <HiArrowNarrowUp />
                {lastMonthComments}
              </span>
            ) : (
              <span className="text-red-500">0</span>
            )}
            <span className="text-gray-500">Last Month</span>
          </div>
        </div>

        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">Total Posts</h3>
              <p className="text-2xl">{totalPosts}</p>
            </div>
            <HiDocumentText className="bg-lime-500 text-white text-5xl rounded-full p-3 shadow-lg" />
          </div>
          <div className="text-sm flex gap-2">
            {lastMonthPosts > 0 ? (
              <span className="text-green-500 flex items-center">
                <HiArrowNarrowUp />
                {lastMonthPosts}
              </span>
            ) : (
              <span className="text-red-500">0</span>
            )}

            <span className="text-gray-500">Last Month</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 py-3 mx-auto justify-center">
        {/* Recent Users */}
        <div className="flex flex-col shadow-md dark:bg-gray-800 p-3 rounded-md w-full md:w-auto">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Users</h1>
            <Button outline gradientDuoTone={"purpleToPink"}>
              <Link to={"/dashboard?tab=users"}>See all</Link>
            </Button>
          </div>

          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>User Image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
            </Table.Head>

            {users &&
              users.map((user) => (
                <Table.Body key={user._id} className="divide-y">
                  <Table.Row className="bg-white dark:bg-gray-800 dark:border-gray-700">
                    <Table.Cell>
                      <img
                        src={user.profilePicture}
                        alt={user.username}
                        className="w-10 h-10 rounded-full bg-gray-500"
                      />
                    </Table.Cell>
                    <Table.Cell>{user.username}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>

        {/* Recent Comments */}
        <div className="flex flex-col shadow-md dark:bg-gray-800 p-3 rounded-md w-full md:w-auto">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Comments</h1>
            <Button outline gradientDuoTone={"purpleToPink"}>
              <Link to={"/dashboard?tab=comments"}>See all</Link>
            </Button>
          </div>

          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Comment content</Table.HeadCell>
              <Table.HeadCell>Linkes</Table.HeadCell>
            </Table.Head>

            {comments &&
              comments.map((comment) => (
                <Table.Body key={comment._id} className="divide-y">
                  <Table.Row className="bg-white dark:bg-gray-800 dark:border-gray-700">
                    <Table.Cell className="w-96">
                      <p className="line-clamp-2">{comment.content}</p>
                    </Table.Cell>
                    <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>

        {/* Recent Posts */}
        <div className="flex flex-col shadow-md dark:bg-gray-800 p-3 rounded-md w-full md:w-auto">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Posts</h1>
            <Button outline gradientDuoTone={"purpleToPink"}>
              <Link to={"/dashboard?tab=posts"}>See all</Link>
            </Button>
          </div>

          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Post Image</Table.HeadCell>
              <Table.HeadCell>Post Title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
            </Table.Head>

            {posts &&
              posts.map((post) => (
                <Table.Body key={post._id} className="divide-y">
                  <Table.Row className="bg-white dark:bg-gray-800 dark:border-gray-700">
                    <Table.Cell>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-14 h-10 rounded-md bg-gray-500"
                      />
                    </Table.Cell>
                    <Table.Cell className="w-96">{post.title}</Table.Cell>
                    <Table.Cell className="w-5">{post.category}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
      </div>
    </div>
  );
}
