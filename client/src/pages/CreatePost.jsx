import { Button, FileInput, Select, TextInput } from 'flowbite-react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function CreatePost() {


  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
        <h1 className='text-3xl my-7 font-semibold text-center'>Create a Post</h1>
        <form className='flex flex-col gap-4'>
            <div className='flex flex-col sm:flex-row gap-4 justify-between'>
                <TextInput type='text' placeholder='Title' required id='title' className='flex-1' />
                <Select>
                  <option value='uncategorized'>Select a Category</option>
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

            <div className='flex items-center justify-between gap-4 border-4 border-teal-500 border-dotted p-3'>
              <FileInput type='file' accept='image/*' />
              <Button type='button' gradientDuoTone='purpleToBlue' size='sm' outline>Upload</Button>
            </div>
            <ReactQuill theme="snow" placeholder='Write something ...' className='h-72 mb-12' required />
            <Button type='submit' gradientDuoTone='purpleToPink'>Publish</Button>
        </form>
    </div>
  )
}
