import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';
import config from '../helpers/config';

const CreateBlog = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

  // Handle changes in form inputs
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle tag input changes
  const handleTagChange = (e) => setTagInput(e.target.value);

  // Handle tag addition on Enter key press
  const handleTagKeyPress = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
      e.preventDefault(); // Prevent form submission on Enter
    }
  };

  // Remove a tag
  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = Cookies.get('Codesaarthi-token');

      const blogData = {
        title,
        description,
        content, 
        tags,
        image, // This will be the base64 string of the image
      };

      console.log('Blog Data: ', blogData); // Debug: Inspect the blog data

      const response = await axios.post(`${config.BASE_URL}/articles/createarticle`, blogData, {
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'application/json' 
        }
      });

      if (response.status === 200) {
        toast.success('Blog created successfully!');
        setTitle('');
        setDescription('');
        setContent('');
        setImage(null);
        setTags([]);
      }
      document.getElementById('createBlog').close()
    } catch (error) {
      toast.error('Failed to create blog.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster />

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-slate-200 dark:bg-gray-700 text-black dark:text-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Create Blog</h2>

        <label className="block mb-4">
          <span>Title</span>
          <input
            name="title"
            value={title}
            onChange={handleTitleChange}
            className="form-input mt-1 block w-full p-2 bg-slate-100 rounded-md dark:bg-gray-100 text-black"
            placeholder="Enter blog title"
            required
          />
        </label>

        <label className="block mb-4">
          <span>Description</span>
          <textarea
            name="description"
            value={description}
            onChange={handleDescriptionChange}
            className="form-textarea mt-1 block w-full p-2 bg-slate-100 rounded-md dark:bg-gray-100 text-black"
            placeholder="Enter blog description"
            required
          />
        </label>

        <label className="block mb-4">
          <span>Content</span>
          <textarea
            name="content"
            value={content}
            onChange={handleContentChange}
            className="form-textarea mt-1 block w-full p-2 bg-slate-100 rounded-md dark:bg-gray-100 text-black"
            placeholder="Enter blog content"
            required
          />
        </label>

        <label className="block mb-4">
          <span>Image</span>
          <input
            type='file'
            name="image"
            onChange={handleImageChange}
            className="form-input mt-1 block w-full"
            accept="image/*" 
          />
        </label>

        <label className="block mb-4">
          <span>Tags (press Enter to add)</span>
          <input
            value={tagInput}
            onChange={handleTagChange}
            onKeyPress={handleTagKeyPress}
            className="form-input mt-1 block w-full p-2 bg-slate-100 rounded-md dark:bg-gray-100 text-black"
            placeholder="Enter tags and press Enter"
          />
          <div className="mt-2">
            {tags.map((tag, index) => (
              <span key={index} className="inline-block bg-blue-200 text-blue-700 px-2 py-1 rounded-full text-sm mr-2 mt-2">
                {tag} <button type="button" onClick={() => removeTag(index)}>×</button>
              </span>
            ))}
          </div>
        </label>

        <button
          type="submit"
          className="btn btn-primary w-full py-2 mt-4"
        >
          {loading ? <>Creating<span className="loading loading-spinner loading-md"></span></> : 'Create Blog'}
        </button>
      </form>
    </>
  );
};

export default CreateBlog;
