import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import config from '../../helpers/config';
import Cookies from 'js-cookie';
import Share from '../../helpers/Share';
import { toast, Toaster } from 'react-hot-toast';
import CreateBlog from '../../components/CreateBlogs';
import UpdateBlog from '../../components/UpdateBlog';
import FormattedDate from '../../helpers/FormateDate';
import { Helmet } from 'react-helmet';

const ProfilePage = () => {
  const [profile, setProfile] = useState({});
  const [blogs, setBlogs] = useState([]);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const token = Cookies.get('Codesaarthi-token');

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const res = await axios.get(`${config.BASE_URL}/user/profile`, {
          headers: {
            'Authorization': `${token}`
          }
        });
        setProfile(res.data.user);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    const fetchUserBlogs = async () => {
      try {

        const res = await axios.get(`${config.BASE_URL}/articles/getbyidAuthor`, {
          headers: {
            'Authorization': `${token}`
          }
        });
        console.log(res.data);
        setBlogs(res.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchProfileData();
    fetchUserBlogs();
  }, [editing , token]);

  const handleUpdateProfile = async () => {
    try {
      const res = await axios.put(`${config.BASE_URL}/user/update`, {
        name: name,
      }, {
        headers: {
          'Authorization': `${token}`
        }
      });

      if (res.status === 200) {
        setEditing(false);
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error("Failed to update profile");
    }
  };

  const handleDeleteProfile = async () => {
    try {
      await axios.delete(`${config.BASE_URL}/user/delete`,
        {
          headers: {
            'Authorization': `${token}`
          }
        });
      toast.success("Profile deleted successfully");
      Cookies.remove('Codesaarthi-token');
      navigate('/login');
    } catch (error) {
      console.error('Error deleting profile:', error);
      toast.error("Failed to delete profile");
    }
  };

  const handleUpdateBlog = (id) => {
    navigate(`/update-blog/${id}`); // Navigate to blog update page
  };

  const handleDeleteBlog = async (id) => {
    try {
      const response = await axios.delete(`${config.BASE_URL}/articles/delete/${id}`, {
        headers: {
          'Authorization': `${token}`
        }
      });
      if (response.status === 200) {
        toast.success("Blog deleted successfully");
        setBlogs(blogs.filter(blog => blog._id !== id));
      } else {
        toast.error("Failed to delete blog");
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };
  const handleEditMode = () => {
    setEditing(!editing);
  };

  return (
    <>
      <Toaster />
      <Helmet>
        <title>Profile | Blog | codesaarthi</title>
        <meta name="description" content="View and manage your user profile on Blog | codesaarthi. Update personal information, view your posts, and manage settings." />
        <meta name="keywords" content="user profile, account settings, Blog | codesaarthi" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://blog-app-alpha-livid.vercel.app/profile" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:title" content="User Profile | Blog | codesaarthi" />
        <meta property="og:description" content="View and manage your user profile on Blog | codesaarthi. Update personal information, view your posts, and manage settings." />
        <meta property="og:image" content="https://blog-app-alpha-livid.vercel.app/android-chrome-512x512.png" />
        <meta property="og:url" content="https://blog-app-alpha-livid.vercel.app/profile" />
        <meta property="og:type" content="website" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="User Profile | Blog | codesaarthi" />
        <meta property="twitter:description" content="View and manage your user profile on Blog | codesaarthi. Update personal information, view your posts, and manage settings." />
        <meta property="twitter:image" content="https://blog-app-alpha-livid.vercel.app/android-chrome-512x512.png" />
        
        <link rel="icon" type="image/png" href="https://blog-app-alpha-livid.vercel.app/favicon.ico" sizes="32x32" />
      </Helmet>
      <div className="min-h-screen bg-slate-400 dark:bg-gray-950 text-black dark:text-white flex flex-col justify-center items-center py-8 px-1">

        {editing ?
          <div className="w-96 rounded-md p-4 bg-slate-200 dark:bg-gray-700 space-y-10">
            <div className='flex justify-center items-center flex-col'>
              <input type="text" value={name ? name : profile.name}
                onChange={(e) => setName(e.target.value)}
                className='w-full p-2 bg-slate-300 dark:bg-gray-600 ' />
            </div>
            <div className='flex justify-between items-baseline'>
              <button className='bg-red-400 px-4 py-2 rounded-xl text-white' onClick={handleEditMode}>Cancel <i className="fi fi-sr-trash-xmark"></i>  </button>
              <button className='bg-green-400 px-4 py-2 rounded-xl text-white' onClick={handleUpdateProfile}>Update <i className="fi fi-ss-check-circle"></i></button>
            </div>
            <div className='w-full '> <Share url={`${window.location.origin}/profile/${profile.slug}`} /></div>

          </div>
          :
          <div className="md:w-96 w-full  rounded-md p-2 bg-slate-200 dark:bg-gray-700 space-y-10">
            <div className='flex justify-center items-center flex-col'>
              <h2 className='text-2xl ps-5'>{profile.name}</h2>
              <p>Email: {profile.email}</p>
            </div>
            <div className='flex justify-between items-baseline'>
              <button className='bg-orange-400 px-4 py-2 rounded-xl text-white' onClick={handleEditMode}>Update Profile <i className="fi fi-sr-pen-clip"></i> </button>
              <button className='bg-red-400 px-4 py-2 rounded-xl text-white' onClick={() => document.getElementById('delete').showModal()}>Delete Profile <i className="fi fi-sr-trash-xmark"></i></button>
            </div>

            <div className='w-full flex items-center space-x-3'>
              <div>  <Share url={`${window.location.origin}/profile/${profile.slug}`} /></div>
              <p className='inline '>Thanks For using Hope You liked it!!</p>
            </div>

          </div>
        }


        <div className="md:w-[900px]">

          <button className='btn btn-block my-3' onClick={() => document.getElementById('createBlog').showModal()}  > Create Your Own Blog  </button>

          <div className="flex  flex-wrap ">
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <div key={blog._id} className=" w-full m-2 card bg-slate-200 dark:bg-gray-700  shadow-xl">
                  <figure>
                    <img
                      src={blog.image}
                      alt={blog.title}
                      loading='lazy'
                      className='md:h-96 h-48 w-full'
                    />
                  </figure>
                  <div className="card-body">
                    <Link to={`/blog/${blog.slug}`}><h2 className="card-title text-sm">{blog.title}</h2></Link>

                    <p className='text-xs'>{blog.description}</p>
                    <Link to={`/profile/${blog.idAuthor.slug}`}> <p className="font-bold">Author: {blog.idAuthor.name && blog.idAuthor.name}</p></Link>
                    <div className='flex justify-between items-center my-2'>
                      <div>
                        <p className="flex  space-y-1 flex-wrap space-x-1 md:w-2/3  w-44 ">
                          Tags: {blog.tags.map((tag, index) => (
                            <span key={index} className="md:px-3 md:py-1 p-1 bg-green-400 rounded-lg md:justify-center">
                              {tag}
                            </span>
                          ))}
                        </p>
                      </div>
                      <div>
                        <FormattedDate date={blog.date} />
                      </div>
                    </div>

                    <div className='flex justify-between items-baseline'>
                      <button className='bg-orange-400 px-4 py-2 rounded-xl text-white' onClick={() => document.getElementById(`update${blog._id}`).showModal()}>Update Blog <i className="fi fi-sr-pen-clip"></i> </button>
                      <dialog id={`update${blog._id}`} className="modal ">
                        <div className="modal-box p-4 space-y-6">
                          <UpdateBlog id={blog._id} />
                          <div className='flex justify-between items-stretch '>
                            <button className="btn-cancel btn bg-green-100 text-black " onClick={() => document.getElementById(`update${blog._id}`).close()}>Cancel</button>
                            <button className="btn-confirm btn bg-orange-400 text-white " onClick={() => handleUpdateBlog(blog._id)}>Update <i className="fi fi-sr-trash-xmark"></i> </button>
                          </div>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                          <button>close</button>
                        </form>
                      </dialog>


                      <button className='bg-red-400 px-4 py-2 rounded-xl text-white' onClick={() => document.getElementById(`${blog._id}`).showModal()}>Delete Blogs <i className="fi fi-sr-trash-xmark"></i></button>

                      <dialog id={`${blog._id}`} className="modal ">
                        <div className="modal-box p-4 space-y-6">
                          <h3 className="font-bold text-lg text-white">Are you sure you want to delete This Post!</h3>
                          <div className='flex justify-between items-stretch '>
                            <button className="btn-cancel btn bg-green-100 text-black " onClick={() => document.getElementById(`${blog._id}`).close()}>Cancel</button>
                            <button className="btn-confirm btn bg-red-400 text-white " onClick={() => handleDeleteBlog(blog._id)}>Delete <i className="fi fi-sr-trash-xmark"></i> </button>
                          </div>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                          <button>close</button>
                        </form>
                      </dialog>

                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No blogs available.</p>
            )}
          </div>
        </div>
      </div>






      <dialog id="delete" className="modal ">
        <div className="modal-box p-4 space-y-6">
          <h3 className="font-bold text-lg">Are you sure you want to delete !</h3>
          <div className='flex justify-between items-stretch '>
            <button className="btn-cancel btn bg-green-100 text-black " onClick={() => document.getElementById('delete').close()}>Cancel</button>
            <button className="btn-confirm btn bg-red-400 text-white " onClick={handleDeleteProfile}>Delete <i className="fi fi-sr-trash-xmark"></i> </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>


      <dialog id="createBlog" className="modal ">
        <div className="modal-box p-4 space-y-6">
          <CreateBlog />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default ProfilePage;
