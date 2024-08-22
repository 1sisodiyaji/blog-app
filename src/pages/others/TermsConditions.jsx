import React from 'react';
import { Helmet } from 'react-helmet';

const TermsConditions = () => {
  return (
    <>
      <Helmet>
        <title>Terms and Conditions | Blog | codesaarthi</title>
        <meta name="description" content="Terms and Conditions for Blog | codesaarthi. Read about the rules and guidelines for using our website and services." />
        <meta name="keywords" content="terms and conditions, Blog | codesaarthi" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Terms and Conditions | Blog | codesaarthi" />
        <meta property="og:description" content="Terms and Conditions for Blog | codesaarthi. Read about the rules and guidelines for using our website and services." />
        <meta property="og:image" content="https://blog-app-alpha-livid.vercel.app/img/terms-conditions-image.jpg" />
        <meta property="og:url" content="https://blog-app-alpha-livid.vercel.app/terms-conditions" />
        <meta property="og:type" content="website" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Terms and Conditions | Blog | codesaarthi" />
        <meta property="twitter:description" content="Terms and Conditions for Blog | codesaarthi. Read about the rules and guidelines for using our website and services." />
        <meta property="twitter:image" content="https://blog-app-alpha-livid.vercel.app/img/terms-conditions-image.jpg" />
        <link rel="icon" type="image/png" href="https://blog-app-alpha-livid.vercel.app/img/favicon.ico" sizes="32x32" />
      </Helmet>

      <div className="terms-conditions-container">
        <h1 className="terms-conditions-title">Terms and Conditions</h1>
        <p>
          Welcome to Blog | codesaarthi. By accessing or using our website, you agree to be bound by the following terms and conditions.
        </p>
        <h2>1. Acceptance of Terms</h2>
        <p>
          By using our website, you agree to comply with and be bound by these terms and conditions. If you do not agree to these terms, please do not use our website.
        </p>
        <h2>2. Use of the Website</h2>
        <p>
          You agree to use our website for lawful purposes only. You may not use the website in any way that could damage, disable, overburden, or impair it.
        </p>
        <h2>3. User Content</h2>
        <p>
          You are responsible for any content you post on our website. By posting content, you grant us a non-exclusive, royalty-free, perpetual, and worldwide license to use, reproduce, and distribute your content.
        </p>
        <h2>4. Intellectual Property</h2>
        <p>
          All content on our website, including text, graphics, logos, and images, is the property of Blog | codesaarthi or its licensors and is protected by intellectual property laws.
        </p>
        <h2>5. Limitation of Liability</h2>
        <p>
          We are not liable for any direct, indirect, incidental, or consequential damages arising from your use of our website. Your use of the website is at your own risk.
        </p>
        <h2>6. Changes to the Terms</h2>
        <p>
          We reserve the right to modify these terms and conditions at any time. Any changes will be posted on this page, and your continued use of the website constitutes your acceptance of the revised terms.
        </p>
        <h2>7. Governing Law</h2>
        <p>
          These terms and conditions are governed by and construed in accordance with the laws of [Your Country/State]. Any disputes arising from these terms will be subject to the exclusive jurisdiction of the courts in [Your Country/State].
        </p>
        <h2>8. Contact Us</h2>
        <p>
          If you have any questions about these terms and conditions, please contact us at <a href="mailto:support@codesaarthi.com">support@codesaarthi.com</a>.
        </p>
      </div>
    </>
  );
};

export default TermsConditions;
