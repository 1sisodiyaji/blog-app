import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateBlog = ({ id }) => { // Receive the ID as a prop
  const [blogData, setBlogData] = useState({
    title: '',
    content: '',
    description: '',
    tags: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the blog data based on the ID
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/articles/${id}`);
        setBlogData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch blog data');
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

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:8081/articles/update/${id}`, blogData);
      if (response.status === 200) {
        alert('Blog updated successfully');
      }
    } catch (err) {
      setError('Failed to update blog');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Update Blog</h2>
      <div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={blogData.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Description:</label>
        <input
          type="text"
          name="description"
          value={blogData.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Content:</label>
        <textarea
          name="content"
          value={blogData.content}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Tags:</label>
        <input
          type="text"
          name="tags"
          value={blogData.tags.join(', ')} // Display tags as a comma-separated string
          onChange={(e) => setBlogData({ ...blogData, tags: e.target.value.split(',').map(tag => tag.trim()) })}
        />
      </div>
      <button onClick={handleUpdate}>Update Blog</button>
    </div>
  );
};

export default UpdateBlog;
