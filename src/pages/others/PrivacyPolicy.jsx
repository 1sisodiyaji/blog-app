import React from 'react';
import { Helmet } from 'react-helmet';

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Blog | codesaarthi</title>
        <meta name="description" content="Privacy policy for Blog | codesaarthi. Understand how we collect, use, and protect your personal information." />
        <meta name="keywords" content="privacy policy, data protection, Blog | codesaarthi" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Privacy Policy | Blog | codesaarthi" />
        <meta property="og:description" content="Privacy policy for Blog | codesaarthi. Understand how we collect, use, and protect your personal information." />
        <meta property="og:image" content="https://blog-app-alpha-livid.vercel.app/img/privacy-policy-image.jpg" />
        <meta property="og:url" content="https://blog-app-alpha-livid.vercel.app/privacy-policy" />
        <meta property="og:type" content="website" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Privacy Policy | Blog | codesaarthi" />
        <meta property="twitter:description" content="Privacy policy for Blog | codesaarthi. Understand how we collect, use, and protect your personal information." />
        <meta property="twitter:image" content="https://blog-app-alpha-livid.vercel.app/img/privacy-policy-image.jpg" />
        <link rel="icon" type="image/png" href="https://blog-app-alpha-livid.vercel.app/img/favicon.ico" sizes="32x32" />
      </Helmet>

      <div className="privacy-policy-container">
        <h1 className="privacy-policy-title">Privacy Policy</h1>
        <p>
          Welcome to Blog | codesaarthi. This privacy policy outlines how we collect, use, and protect your personal information when you visit our website.
        </p>
        <h2>Information We Collect</h2>
        <p>
          We may collect personal information such as your name, email address, and other contact details when you use our website or services.
        </p>
        <h2>How We Use Your Information</h2>
        <p>
          The information we collect may be used to improve our website, respond to inquiries, and provide personalized content. We do not sell or share your personal information with third parties.
        </p>
        <h2>Data Security</h2>
        <p>
          We implement security measures to protect your personal information from unauthorized access, use, or disclosure. However, please note that no method of transmission over the internet is completely secure.
        </p>
        <h2>Your Rights</h2>
        <p>
          You have the right to access, correct, or delete your personal information. If you have any concerns about your data, please contact us.
        </p>
        <h2>Changes to This Privacy Policy</h2>
        <p>
          We may update this privacy policy from time to time. We encourage you to review this page periodically for any changes.
        </p>
        <h2>Contact Us</h2>
        <p>
          If you have any questions about this privacy policy, please contact us at <a href="mailto:support@codesaarthi.com">support@codesaarthi.com</a>.
        </p>
      </div>
    </>
  );
};

export default PrivacyPolicy;
