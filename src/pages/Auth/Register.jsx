import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { Helmet } from "react-helmet";
import toast, { Toaster } from 'react-hot-toast';
import config from "../../helpers/config";
import Cookies from 'js-cookie';

const Register = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  }); 

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // Validate email format
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email, password } = formData;

    if (!name) {
      toast.error("Please enter your name to create an account", {
        theme: "dark",
      });
      return;
    }
     
    document.getElementById("checkname").style.display = "block";

    if (!email) {
      toast.error("Please enter your email", { theme: "dark" });
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email", { theme: "dark" });
      return;
    }
    
    document.getElementById("checkemail").style.display = "block";

    if (!password) {
      toast.error("Please enter your password to create an account", {
        theme: "dark",
      });
      return;
    }

    document.getElementById("checkpass").style.display = "block";

    try {
      setLoading(true);
      const formDataEncoded = new URLSearchParams();
      formDataEncoded.append("name", name);
      formDataEncoded.append("email", email);
      formDataEncoded.append("password", password);

      const response = await axios.post(`${config.BASE_URL}/user/register`, formDataEncoded);

      if (response.status === 200) {
        toast.success("Welcome to blog-app !", { theme: "dark" }); 
        setLoading(false);
        Cookies.set("Codesaarthi-token",  response.data.token, { expires: 30 });
       window.location.href= "/";
      } else {
        toast.error("Failed to register", { theme: "dark" });
        setLoading(false);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("User with this email already exists", { theme: "dark" });
      } else {
        toast.error(
          "Failed to regiter", {
          theme: "dark",
        });
      }
      setLoading(false);
    }
  };

  // login through google function
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const accessToken = tokenResponse.access_token;
      try {
        setLoading(true);

        // Fetch user data from Google API
        const googleResponse = await axios.get("https://www.googleapis.com/oauth2/v2/userinfo", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const userData = googleResponse.data;
        const formDataEncoded = new URLSearchParams();
        formDataEncoded.append("email", userData.email);
        formDataEncoded.append("name", userData.name);
        formDataEncoded.append("username", userData.given_name);
        formDataEncoded.append("image", userData.picture);

        const saveUserDataResponse = await axios.post(
          `${config.BASE_URL}/user/saveuserData`, formDataEncoded);

        if (saveUserDataResponse.data.status === "success") { 
          Cookies.set("Codesaarthi-token", saveUserDataResponse.data.token, { expires: 30 });
          setLoading(false);
         window.location.href = "/";
        } else {
          toast.error("Error saving user data", { theme: "dark" });
          console.log(saveUserDataResponse.data.message);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error during login:", error);
        toast.error("Error during login. Please try again later.", { theme: "dark" });
        setLoading(false);
      }
    },
    onFaliure: (error) => {
      console.error("Error during login:", error);
      toast.error("Error during login. Please try again later.", { theme: "dark" });
      setLoading(false);
    },
  });
 

  return (
    <>
      <Toaster />
      <Helmet>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Blog | codesaarthi - Explore engaging and insightful blogs on a variety of topics including technology, lifestyle, and tutorials." />
    <meta name="keywords" content="blog, codesaarthi, technology, lifestyle, tutorials, articles, insights" />
    <meta name="author" content="Golu Singh" />
    <meta name="robots" content="index, follow" />
    <title>Blog | codesaarthi</title>
    <meta property="og:title" content="Blog | codesaarthi" />
    <meta
      property="og:description"
      content="Discover a wide range of engaging and informative blogs on Blog | codesaarthi. Stay updated with the latest insights and tutorials on various topics."
    />
    <meta
      property="og:image"
      content="https://blog-app-alpha-livid.vercel.app/android-chrome-512x512.png"
    />
    <meta property="og:url" content="https://blog-app-alpha-livid.vercel.app" />
    <meta property="og:type" content="website" />
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:title" content="Blog | codesaarthi" />
    <meta
      property="twitter:description"
      content="Discover a wide range of engaging and informative blogs on Blog | codesaarthi. Stay updated with the latest insights and tutorials on various topics."
    />
    <meta
      property="twitter:image"
      content="https://blog-app-alpha-livid.vercel.app/android-chrome-512x512.png"
    />
    <link
      rel="icon"
      type="image/png"
      href="https://blog-app-alpha-livid.vercel.app/favicon.ico"
      sizes="32x32"
    />
  </Helmet>
       
         <div  className="flex justify-around items-center min-h-screen bg-slate-400 dark:bg-gray-950 text-black dark:text-white" 
          >
            <div className="flex justify-between items-center p-2">
              <div className="md:w-[420px]" >
                <form onSubmit={handleSubmit}>
                  <div>
                    <img 
                    className="mx-auto rounded-full"
                    loading="lazy"
                     src="https://res.cloudinary.com/ducw7orvn/image/upload/v1721941402/logo_dnkgj9.jpg"
                     width={95} alt="Logo" />
                    <h3 className="pt-3 text-center ">
                      Create Account
                    </h3>
                    <br />
                  </div>

                  {/* Name input */}
                  <div className="mb-4"> 
                      <div className="w-full flex">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          className="w-full rounded-lg p-2 bg-slate-100 dark:bg-gray-700"
                          placeholder="Your Name"
                          onChange={handleInputChange}
                        />
                        <i
                          id="checkname"
                          style={{ color: "#79b4e2", display: "none" }}
                          className="fi fi-ss-check-circle text-center ms-2 mt-2"
                        ></i>
                      </div> 
                  </div>

                  {/* Email input */}
                  <div className="mb-4">
                    <div className="flex">
                      <input
                        type="email"
                        id="emailId"
                        name="email"
                        required
                        value={formData.email}
                        className="w-full rounded-lg p-2 bg-slate-100 dark:bg-gray-700"
                        onChange={handleInputChange}
                        placeholder="Email"
                      />
                      <i
                        id="checkemail"
                        style={{ color: "#79b4e2", display: "none" }}
                        className="fi fi-ss-check-circle text-center ms-2 mt-2"
                      ></i>
                    </div>
                  </div>

                  {/* Password input */}
                  <div className="mb-4 position-relative">
                    <div className="flex">
                      <input
                        type={isPasswordVisible ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        className="w-full rounded-lg p-2 bg-slate-100 dark:bg-gray-700"
                        onChange={handleInputChange}
                        placeholder="Password"
                        required
                      />
                      <i
                        id="passwordViewer"
                        onClick={togglePasswordVisibility}
                        className={`fi ${isPasswordVisible ? "fi-ss-eye" : "fi-ss-eye-crossed"
                          } mt-2 ms-2 `}
                        style={{ color: "#703BF7", cursor: "pointer" }}
                      ></i>
                      <i
                        id="checkpass"
                        style={{ color: "#79b4e2", display: "none" }}
                        className="fi fi-ss-check-circle text-center ms-2 mt-2"
                      ></i>
                    </div>
                  </div>

                  {/* Submit button */}
                  {loading ? (
                    <>
                      <button
                        type="button"
                        className="btn btn-block mb-4 text-capitalize py-3"
                        style={{ fontSize: '1rem' }}
                        disabled
                      >
                        Welcome to CodeSaarthi ...
                        <span className="loading loading-spinner loading-md"></span>
                      </button>
                    </>
                  ) : (
                    <button
                      id="login_button"
                      data-mdb-ripple-init
                      type="button"
                      className="btn btn-block mb-4 text-capitalize py-3"
                      style={{ fontSize: '1rem' }}
                      onClick={handleSubmit}
                    >
                      Create Account    <i className="fi fi-rs-sign-out-alt ps-2 pt-2"></i>
                    </button>
                  )}

                  <h3
                    className="text-center mb-3"
                    style={{
                      fontWeight: "light",
                      fontSize: "1rem",
                    }}
                  >
                    - OR -
                  </h3>

                  {/* Google login button */}
                  <div className="text-center mb-2">
                    <div className="flex justify-evenly items-center">
                      <div className="w-full">
                        <button
                          type="button"
                          className="btn btn-block  w-100"
                          onClick={login}
                        >
                          <img
                            src="https://res.cloudinary.com/ducw7orvn/image/upload/v1720990440/search_1_cw9o1p.png"
                            style={{ height: "26px" }}
                            alt="Google Icon"
                          />
                          <span className=" text-capitalize ms-2">
                            Sign Up With Google
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <p>
                      Already have an account?
                      <Link to="/login" style={{ color: "#703BF7" }}>
                        {" "}
                        Log in
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://res.cloudinary.com/dbqq41bpc/image/upload/v1723790526/codesaarthi/test2_dspiw3-removebg-preview_zoglij.png"
                className="max-w-2xl"
                alt="Login Page"
              />
            </div>
          </div>
 
    </>
  );
};

export default Register;

