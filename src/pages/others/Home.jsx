import React, { useState, useEffect } from 'react'
import config from '../../helpers/config';
import axios from 'axios';
import { Link } from 'react-router-dom'
import TruncateText from '../../helpers/TruncateText';
import FormattedDate from '../../helpers/FormateDate';
import Share from '../../helpers/Share';
import {Toaster} from "react-hot-toast";
const Home = () => {
  const [Blogs, setBlogs] = useState([]);
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${config.BASE_URL}/articles/all`);
        console.log("Fetched blogs:", response.data);
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);


  const getGridSpan = (index) => {
    switch (index) {
      case 0:
      case 1:
      case 2:
        return 'lg:col-span-1';
      case 3:
      case 4:
        return 'lg:col-span-2';
      case 5:
      case 6:
      case 7:
        return 'lg:col-span-1';
      case 8:
      case 9:
        return 'lg:col-span-2';
      case 10:
      case 11:
      case 12:
        return 'lg:col-span-1';
      case 13:
      case 14:
        return 'lg:col-span-2';
      default:
        return 'lg:col-span-1';
    }
  };

  

  return (
    <>
    <Toaster/>
  <div className='bg-slate-400 dark:bg-gray-950 text-black dark:text-white min-h-screen'>
  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 p-4">
    {Blogs.length > 0 ? (
      Blogs.map((blog, index) => (
        <div
          key={blog._id}
          className={`card bg-slate-200 dark:bg-gray-700 shadow-xl ${
            getGridSpan(index)
          }`}
        >
          <figure>
            <img
              src={blog.image}
              alt={blog.title}
              loading='lazy'
              className='h-48 w-full md:h-80 object-cover'
            />
          </figure>
          <div className="card-body">
            <Link to={`/blog/${blog.slug}`}><h2 className="card-title text-sm"><TruncateText text={blog.title} maxLength={100}/></h2></Link>
            <p className='text-xs'><TruncateText text={blog.description} maxLength={200}/> </p>

            <div className='flex justify-between items-center'>
            <div>
            <p className="space-x-3">
              Tags: {blog.tags.map((tag, index) => (
                <span key={index} className="px-4 py-2 bg-green-400 rounded-lg">
                  {tag}
                </span>
              ))} 
            </p>
            </div>
            <div><Share url = {`${window.location.origin}/blog/${blog.slug}`}/></div>
            
            </div>
            <div className='flex justify-between align-baseline'>
            <Link to = {`/profile/${blog.idAuthor.slug}`}><p className="font-bold">Author: {blog.idAuthor.name && blog.idAuthor.name}</p></Link>
         
            <FormattedDate date={blog.date}/>
            </div> 
          </div>
        </div>  
      ))
    ) : (
      <p>No blogs available.</p>
    )}
  </div>
</div>


    </>
  )
}

export default Home