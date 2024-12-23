import { Alert, Button, Modal, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Comment from "./Comment";
import { BsExclamationCircle } from "react-icons/bs";

export default function CommentSection({ postId }) {
  // console.log('postId', postId);
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);

  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  // console.log(comments);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/comment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setComment("");
        setCommentError(null);
        setComments([data, ...comments]);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getPostComments/${postId}`);
        // console.log("responce", res);

        if (res.ok) {
          const data = await res.json();
          setComments(data);
          // console.log("data", data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getComments();
  }, [postId]);

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate("/sign-in");
        return;
      }

      const res = await fetch(`/api/comment/likeComment/${commentId}`, {
        method: "PUT",
      });

      if (res.ok) {
        const data = await res.json();
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEdit = async (comment, editedComment) => {
    setComments(
      comments.map((c) =>
        c._id === comment._id ? { ...c, content: editedComment } : c
      )
    );
  };

  const handleDeleteComment = async (commentId) => {

    setShowModal(false);
    try {
      if(!currentUser) {
        navigate('/sign-in');
        return;
      }

      const res = await fetch(`/api/comment/deleteComment/${commentId}`, {
        method: 'DELETE'
      })

       if(res.ok) {
        const data = await res.json();
        setComments(comments.filter((comment) => comment._id !== commentId))
       }
    } catch (error) {
      console.log(error.message);
      
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-3 w-full">
      {currentUser ? (
        <div className="flex items-center gap-1 text-gray-500 text-sm my-5">
          <p>Signed in as:</p>
          <img
            className="h-5 w-5 rounded-full object-cover"
            src={currentUser.profilePicture}
            alt={currentUser.username}
          />
          <Link
            to={"/dashboard?tab=profile"}
            className="text-cyan-500 hover:underline text-xs"
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="text-sm text-teal-500 my-5 flex gap-1">
          You must be signed in to comment.
          <Link className="text-blue-500 hover:underline" to={"/sign-in"}>
            Sign In
          </Link>
        </div>
      )}

      {currentUser && (
        <form
          onSubmit={handleSubmit}
          className="border border-teal-500 rounded-md p-3"
        >
          <Textarea
            rows="3"
            maxLength="200"
            placeholder="Add a comment..."
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className="flex items-center justify-between mt-5">
            <p className="text-gray-500 text-xs">
              {200 - comment.length} characters remaining
            </p>
            <Button outline gradientDuoTone="purpleToBlue" type="submit">
              Submit
            </Button>
          </div>
          {commentError && (
            <Alert color="failure" className="mt-5">
              {commentError}
            </Alert>
          )}
        </form>
      )}
      {comments.length === 0 ? (
        <p className="text-sm my-5">No Comments yet</p>
      ) : (
        <>
          <div className="flex items-center gap-1 text-sm my-5">
            <p>Comments</p>
            <span className="border border-gray-400 py-1 px-2 rounded-sm">
              {comments.length}
            </span>
          </div>
          {comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              onLike={handleLike}
              onEdit={handleEdit}
              onDelete={(commentId) => {
                setShowModal(true);
                setCommentToDelete(commentId);
              }}
            />
          ))}
        </>
      )}

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <BsExclamationCircle className="w-14 h-14 text-gray-400 dark:text-gray-200 mb-3 mx-auto" />
            <h3 className="text-lg text-gray-500 dark:text-gray-400 mb-5">
              Are you sure you want to delete this comment
            </h3>

            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => handleDeleteComment(commentToDelete)}>
                Yes I&apos;m sure
              </Button>
              <Button onClick={() => setShowModal(false)}>Cancel</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
