import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

const Cookie = () => {
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    // Set cookie or localStorage to remember user consent
    localStorage.setItem('cookieAccepted', 'true');
    setAccepted(true);
  };

  const handleReject = () => {
    // Handle rejection (e.g., set a different cookie or localStorage value)
    localStorage.setItem('cookieAccepted', 'false');
    setAccepted(true);
  };

  return (
    <>
      <Helmet>
        <title>Cookie Policy | Blog | codesaarthi</title>
        <meta name="description" content="Cookie policy for Blog | codesaarthi. Learn how we use cookies to enhance your experience on our site." />
        <meta name="keywords" content="cookie policy, cookies, Blog | codesaarthi" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Cookie Policy | Blog | codesaarthi" />
        <meta property="og:description" content="Cookie policy for Blog | codesaarthi. Learn how we use cookies to enhance your experience on our site." />
        <meta property="og:image" content="https://blog-app-alpha-livid.vercel.app/img/cookie-policy-image.jpg" />
        <meta property="og:url" content="https://blog-app-alpha-livid.vercel.app/cookie-policy" />
        <meta property="og:type" content="website" />
        <link rel="icon" type="image/png" href="https://blog-app-alpha-livid.vercel.app/img/favicon.ico" sizes="32x32" />
      </Helmet>

      <div className="cookie-policy-container">
        <h1 className="cookie-policy-title">Cookie Policy</h1>
        <p>
          At Blog | codesaarthi, we use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By continuing to use our site, you agree to our use of cookies.
        </p>
        <p>
          You can choose to accept or reject cookies. If you choose to reject cookies, some parts of our site may not function properly.
        </p>
        {!accepted ? (
          <div className="cookie-actions">
            <button onClick={handleAccept} className="cookie-button">Accept</button>
            <button onClick={handleReject} className="cookie-button">Reject</button>
          </div>
        ) : (
          <p className="cookie-accepted">Thank you for your consent.</p>
        )}
      </div>
    </>
  );
};

export default Cookie;
