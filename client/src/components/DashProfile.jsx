import { Alert, Button, Modal, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signoutSuccess,
  updateFailure,
  updateStart,
  updateSuccess,
} from "../redux/user/userslice";
import { BsExclamationCircle } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function DashProfile() {
  const dispatch = useDispatch();
  const { currentUser, error, loading } = useSelector((state) => state.user);
  console.log(currentUser);
  

  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false); // This is the setter
  const [userUpdateSuccess, setUserUpdateSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFromData] = useState({});

  const filePickerRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = () => {
    setImageFileUploading(true); // Correct setter usage
    setImageFileUploadError(null);

    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          "Fail to Upload image (File must be less than 2MB)"
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false); // Reset state after failure
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFromData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false); // Reset state after success
        });
      }
    );
  };

  const handleChange = (e) => {
    setFromData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);

    if (Object.keys(formData).length === 0 && !imageFileUrl) {
      setUpdateUserError("No changes made");
      return;
    }

    if (imageFileUploading) {
      setUpdateUserError("Please wait for the image to upload");
      return;
    }

    try {
      dispatch(updateStart());
      const response = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUserUpdateSuccess("User's Profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch(deleteUserFailure(data));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });

      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto w-full p-3">
      <h1 className="text-3xl text-center font-semibold my-7">Profile</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUploadProgress / 100
                  })`,
                },
              }}
            />
          )}

          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="User"
            className={`w-full h-full rounded-full object-cover border-8 border-gray-300 ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              "opacity-60"
            }`}
          />
        </div>
        {imageFileUploadError && (
          <Alert color="failure">{imageFileUploadError}</Alert>
        )}

        <TextInput
          onChange={handleChange}
          type="text"
          id="username"
          placeholder="Username"
          defaultValue={currentUser.username}
        />
        <TextInput
          onChange={handleChange}
          type="email"
          id="email"
          placeholder="Email"
          defaultValue={currentUser.email}
        />
        <TextInput
          onChange={handleChange}
          type="password"
          id="password"
          placeholder="Password"
        />

        <Button type="submit" gradientDuoTone="purpleToBlue" outline disabled={loading || imageFileUploading}>
          {loading ? 'Loading...' : 'Update'}
        </Button>

        {currentUser.isAdmin && (
          <Link to={"/create-post"}>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              className="w-full"
            >
              Create a Post
            </Button>
          </Link>
        )}
      </form>

      <div className="flex justify-between mt-5 text-red-600">
        <span onClick={() => setShowModal(true)} className="cursor-pointer">
          Delete Account
        </span>
        <span onClick={handleSignout} className="cursor-pointer">
          Sign Out
        </span>
      </div>

      {userUpdateSuccess && (
        <Alert color="success" className="mt-5">
          {userUpdateSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert color="failure" className="mt-5">
          {updateUserError}
        </Alert>
      )}
      {error && (
        <Alert color="failure" className="mt-5">
          {error}
        </Alert>
      )}

      <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <BsExclamationCircle className="h-14 w-14 mx-auto text-gray-400 dark:text-gray-200 mb-4" />
            <h3 className="mb-5 text-gray-500 dark:text-gray-400 text-lg">
              Are you sure you want to delete your account?
            </h3>

            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteUser}>
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
