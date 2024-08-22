 import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import config from '../../helpers/config';
import Share from '../../helpers/Share';
import FormattedDate from '../../helpers/FormateDate';
import { Helmet } from 'react-helmet';
import { Toaster } from 'react-hot-toast';
const ViewProfile = () => {
  const { slug } = useParams(); 
  const [profile, setProfile] = useState({});
  const [blogs, setBlogs] = useState([]);
  const [id,setId] =  useState('');

  useEffect(() => {
    const fetchProfileData = async () => {
      try { 
        const res = await axios.get(`${config.BASE_URL}/user/getbyslug/${slug}`);
 
        setProfile(res.data.user[0]);
        setId(res.data.user[0]._id)
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    const fetchUserBlogs = async () => {
      try { 
        const res = await axios.get(`${config.BASE_URL}/articles/getbyUserSlug/${id}`);
        setBlogs(res.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchProfileData();
    fetchUserBlogs();
  }, [slug , id]);

  return (
    <>
      <Toaster />
      <Helmet>
        <title>{`${profile.name} | Blog | codesaarthi`}</title>
        <meta name="description" content={`View the profile and blogs of ${profile.name} on Blog | codesaarthi.`} />
        <meta name="keywords" content={`${profile.name}, user profile, Blog | codesaarthi`} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://blog-app-alpha-livid.vercel.app/profile/${slug}`} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:title" content={`${profile.name} | Blog | codesaarthi`} />
        <meta property="og:description" content={`View the profile and blogs of ${profile.name} on Blog | codesaarthi.`} />
        <meta property="og:image" content="https://blog-app-alpha-livid.vercel.app/android-chrome-512x512.png" />
        <meta property="og:url" content={`https://blog-app-alpha-livid.vercel.app/profile/${slug}`} />
        <meta property="og:type" content="website" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={`${profile.name} | Blog | codesaarthi`} />
        <meta property="twitter:description" content={`View the profile and blogs of ${profile.name} on Blog | codesaarthi.`} />
        <meta property="twitter:image" content="https://blog-app-alpha-livid.vercel.app/android-chrome-512x512.png" />
        
        <link rel="icon" type="image/png" href="https://blog-app-alpha-livid.vercel.app/favicon.ico" sizes="32x32" />
      </Helmet>
      <div className="min-h-screen bg-slate-400 dark:bg-gray-950 text-black dark:text-white flex flex-col justify-center items-center py-8 px-1">
        <div className="md:w-96 w-full rounded-md p-2 bg-slate-200 dark:bg-gray-700 space-y-10">
          <div className='flex justify-center items-center flex-col'>
            <h2 className='text-2xl ps-5'>{profile.name}</h2>
            <p>Email: {profile.email}</p>
          </div>
          <div className='w-full flex items-center space-x-3'>
            <div>  <Share url={`${window.location.origin}/profile/${profile.slug}`} /></div>
            <p className='inline '>Thanks For visiting this profile!!</p>
          </div>
        </div>

        <div className="md:w-[900px]">
          <div className="flex flex-wrap ">
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <div key={blog._id} className="w-full m-2 card bg-slate-200 dark:bg-gray-700 shadow-xl">
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
                    <Link to={`/profile/${blog.idAuthor.slug}`}> <p className="font-bold">Author: {blog.idAuthor.name}</p></Link>
                    <div className='flex justify-between items-center my-2'>
                      <div>
                        <p className="space-x-3">
                          Tags: {blog.tags.map((tag, index) => (
                            <span key={index} className="px-4 py-2 bg-green-400 rounded-lg">
                              {tag}
                            </span>
                          ))}
                        </p>
                      </div>
                      <div>
                        <FormattedDate date={blog.date} />
                      </div>
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
    </>
  );
};

export default ViewProfile;
