import { useState } from 'react';
import toast from "react-hot-toast";

const FileUploading = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('http://localhost:4000/api/uploadImage/image', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Image uploaded successfully:', data.image);
        toast.success(data.message);
      } else {
        toast.error(response.data.message);
        console.error('Failed to upload image:', response.statusText);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.error('Error uploading image:', error.message);
    }
  };

  return (
    <section className='file-upload'>
      <div className="upload">
        <form onSubmit={handleSubmit}>
          <h1>React File Upload</h1>
          <input type="file" onChange={handleFileChange} />
          <button type="submit">Upload</button>
        </form>
      </div>
    </section>
  );
};

export default FileUploading;
