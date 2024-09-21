// import React from 'react'
import { Alert, Button, TextInput } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function DashProfile() {

    const { currentUser } = useSelector((state) => state.user);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    // console.log(imageFileUploadProgress, imageFileUploadError);
    

    const filePickerRef = useRef();

    const handleImageChange = (e) => {
      const file = e.target.files[0];

      if(file) {
        setImageFile(file);
        setImageFileUrl(URL.createObjectURL(file));
      }
    }
    // console.log(imageFile, imageFileUrl);

    useEffect(() => {
      if(imageFile) {
        uploadImage();
      }
    }, [imageFile]);

    const uploadImage = () => {
      // console.log('Uploading image...');

      setImageFileUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + imageFile.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);
      uploadTask.on(
        'state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes *100);
          setImageFileUploadProgress(progress.toFixed(0));
        }, 
        (error) => {
          setImageFileUploadError('Fail to Upload image (File must be less than 2MB)');
          setImageFileUploadProgress(null);
          setImageFile(null);
          setImageFileUrl(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageFileUrl(downloadURL);
          })
        }
      )
      
    }

  return (
    <div className='max-w-lg mx-auto w-full p-3'>
      <h1 className='text-3xl text-center font-semibold my-7'>Profile</h1>

      <form className='flex flex-col gap-4'>
        <input type="file" accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden />
        <div className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full' onClick={() => filePickerRef.current.click()}>

          {imageFileUploadProgress && (
            <CircularProgressbar value={imageFileUploadProgress || 0} text={`${imageFileUploadProgress}%`} strokeWidth={5}
            styles={{
              root: {
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0
              },
              path: {
                stroke: `rgba(62, 152, 199, ${imageFileUploadProgress / 100})`
              },
            }} />
          )}


          <img src={imageFileUrl ||currentUser.profilePicture} alt="User" className={`w-full h-full rounded-full object-cover border-8 border-gray-300 ${imageFileUploadProgress && imageFileUploadProgress < 100 && 'opacity-60'}`} />
        </div>
        {imageFileUploadError && (

          <Alert color='failure'>{imageFileUploadError}</Alert>
        )}

        <TextInput type='text' id='username' placeholder='Username' defaultValue={currentUser.username} />
        <TextInput type='email' id='email' placeholder='Email' defaultValue={currentUser.email} />
        <TextInput type='password' id='password' placeholder='Password' />

        <Button type='submit' gradientDuoTone='purpleToBlue' outline>Update</Button>
      </form>

      <div className='flex justify-between mt-5 text-red-600'>
        <span className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}
