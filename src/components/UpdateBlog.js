import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../helpers/config';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';

const UpdateBlog = ({ id }) => {  
  const [blogData, setBlogData] = useState({
    title: '',
    content: '',
    description: '',
    tags: [],
    image: '', // New state for the image URL
  });
  const [loading, setLoading] = useState(true); 
  const [imageFile, setImageFile] = useState(null); // State to hold the selected image file
  const [newTag, setNewTag] = useState(''); // State for the new tag input

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${config.BASE_URL}/articles/getByid/${id}`); 
        setBlogData(response.data);
        setLoading(false);
      } catch (err) {
        toast.error('Failed to fetch blog data');
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData({
      ...blogData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleAddTag = () => {
    if (newTag && !blogData.tags.includes(newTag)) {
      setBlogData((prevData) => ({
        ...prevData,
        tags: [...prevData.tags, newTag],
      }));
      setNewTag(''); // Clear the input after adding the tag
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setBlogData((prevData) => ({
      ...prevData,
      tags: prevData.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = Cookies.get('Codesaarthi-token');
  
      const updatedBlogData = {
        title: blogData.title,
        description: blogData.description,
        content: blogData.content,
        tags: blogData.tags,
        image: blogData.image, 
      };
  
      console.log('Updated Blog Data: ', updatedBlogData); 
  
      const response = await axios.put(`${config.BASE_URL}/articles/update/${id}`, updatedBlogData, {
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (response.status === 200) {
        toast.success('Blog updated successfully!');
        document.getElementById(`update${id}`).close()
      }
    } catch (error) {
      toast.error('Failed to update blog.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center text-white">Loading...</div>; 

  return (
    <>  
      <div className="bg-slate-200 dark:bg-gray-700 p-6 rounded-lg shadow-md max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Update Blog</h2>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-gray-700 dark:text-gray-200">
              Title:
              <input
                type="text"
                name="title"
                value={blogData.title}
                onChange={handleChange}
                className="form-input mt-1 block w-full p-2 border rounded-md bg-gray-100 dark:bg-gray-800 dark:text-white"
                placeholder="Enter blog title"
                required
              />
            </label>
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 dark:text-gray-200">
              Description:
              <input
                type="text"
                name="description"
                value={blogData.description}
                onChange={handleChange}
                className="form-input mt-1 block w-full p-2 border rounded-md bg-gray-100 dark:bg-gray-800 dark:text-white"
                placeholder="Enter blog description"
                required
              />
            </label>
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 dark:text-gray-200">
              Content:
              <textarea
                name="content"
                value={blogData.content}
                onChange={handleChange}
                className="form-textarea mt-1 block w-full p-2 border rounded-md bg-gray-100 dark:bg-gray-800 dark:text-white"
                placeholder="Enter blog content"
                required
              />
            </label>
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 dark:text-gray-200">
              Tags:
              <div className="flex space-x-2 mt-2">
                {blogData.tags.map((tag, index) => (
                  <div key={index} className="flex items-center space-x-1 bg-blue-500 text-white px-2 py-1 rounded-full">
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="focus:outline-none"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex mt-2 space-x-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="form-input flex-grow p-2 border rounded-md bg-gray-100 dark:bg-gray-800 dark:text-white"
                  placeholder="Add a new tag"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600"
                >
                  Add Tag
                </button>
              </div>
            </label>
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 dark:text-gray-200">
              Image:
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                className="form-input mt-1 block w-full p-2 border rounded-md bg-gray-100 dark:bg-gray-800 dark:text-white"
              />
            </label>
            {blogData.image && (
              <div className="mt-4">
                <img src={blogData.image} alt="Blog" className="w-full h-auto rounded-md" />
              </div>
            )}
          </div>

          <button
            onClick={handleUpdate}
            className="btn btn-primary w-full py-2 mt-4 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
          >
            Update Blog
          </button>
        </div>
      </div>
    </>
  );
};

export default UpdateBlog;
