import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Fetch user profile data
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('http://localhost:8081/users/profile');
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    // Fetch user blogs
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:8081/users/blogs');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchProfileData();
    fetchBlogs();
  }, []);

  return (
    <div className="view-profile-container">
      <h2>User Profile</h2>
      {profileData ? (
        <div className="profile-card">
          <p><strong>Name:</strong> {profileData.name}</p>
          <p><strong>Email:</strong> {profileData.email}</p>
          <p><strong>Joined:</strong> {new Date(profileData.joinedDate).toLocaleDateString()}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}

      <h2>Posted Blogs</h2>
      {blogs.length > 0 ? (
        <div className="blogs-list">
          {blogs.map((blog) => (
            <div key={blog._id} className="blog-card">
              <h3>{blog.title}</h3>
              <p>{blog.description}</p>
              <p><strong>Posted on:</strong> {new Date(blog.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No blogs posted yet.</p>
      )}
    </div>
  );
};

export default ViewProfile;
