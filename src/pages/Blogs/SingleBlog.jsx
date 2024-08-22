import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import config from '../../helpers/config';
import FormattedDate from '../../helpers/FormateDate';
import Share from '../../helpers/Share';
import { Helmet } from 'react-helmet';

const SingleBlog = () => {
  const { slug } = useParams(); 
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${config.BASE_URL}/articles/getbyslug/${slug}`);
        console.log(response);
        setBlog(response.data[0]);  
      } catch (error) {
        setError('Error fetching blog data');
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <> 
      {blog && (
        <Helmet>
          <title>{blog.title} | Blog | codesaarthi</title>
          <meta name="description" content={blog.description} />
          <meta name="keywords" content={`${blog.tags ? blog.tags.join(', ') : 'blog, codesaarthi'}`} />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href={`https://blog-app-alpha-livid.vercel.app/blog/${blog.slug}`} />
          
          {/* Open Graph / Facebook */}
          <meta property="og:title" content={`${blog.title} | Blog | codesaarthi`} />
          <meta property="og:description" content={blog.description} />
          <meta property="og:image" content={blog.image || 'https://blog-app-alpha-livid.vercel.app/img/default-image.jpg'} />
          <meta property="og:url" content={`https://blog-app-alpha-livid.vercel.app/blog/${blog.slug}`} />
          <meta property="og:type" content="article" />
          
          {/* Twitter */}
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:title" content={`${blog.title} | Blog | codesaarthi`} />
          <meta property="twitter:description" content={blog.description} />
          <meta property="twitter:image" content={blog.image || 'https://blog-app-alpha-livid.vercel.app/img/default-image.jpg'} />
        </Helmet>
      )}
      
    <div className='bg-slate-400 dark:bg-gray-950 text-black dark:text-white min-h-screen'>
    <div className="max-w-4xl mx-auto px-4 py-8  ">
      {blog ? (
        <div className="bg-slate-200 dark:bg-gray-700 shadow-lg rounded-lg overflow-hidden">
          <div className='flex justify-between items-center p-1'>
          <h1 className="text-3xl font-bold text-center mb-4">{blog.title}</h1>
          <div>
          <Share url={`${window.location.origin}/blog/${blog.slug}`}/>
          </div> 
          </div>
          {blog.image && (
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-auto object-cover mb-4"
              style={{ maxHeight: '500px' }} // Adjust image styling as needed
            />
          )}
          <div className="p-6">
            <p className="text-lg font-medium mb-2">{blog.description}</p>
            <p className="text-base mb-4 bg-gray-300 p-1">{blog.content}</p>
            <div className='flex justify-between items-center'>
            <Link to = {`/profile/${blog.idAuthor.slug}`}><p className="text-sm text-gray-600 mb-4">Author: <span className='underline'> {blog.idAuthor.name}</span></p></Link>
           
           <FormattedDate date={blog.date}/>
            </div> 
            <p className="text-sm text-gray-600">
              Tags: {blog.tags && Array.isArray(blog.tags) ? (
                blog.tags.map((tag, index) => (
                  <span key={index} className="bg-green-400 text-black py-2 px-4 rounded-full mr-2">
                    {tag}
                  </span>
                ))
              ) : (
                <span>No tags available</span>
              )}
            </p> 
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">No blog found</p>
      )}
    </div>
    </div>
    </>
    
  );
};

export default SingleBlog;
