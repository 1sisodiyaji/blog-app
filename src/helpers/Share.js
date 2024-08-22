import React from "react";
import toast from "react-hot-toast";

const Share = ({url}) => {
  const copyLink = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.success("Link copied successfully!");
      })
      .catch(() => {
        toast.error("Failed to copy the link.");
      });
  };

  const shareOnWhatsApp = () => {
    window.open(
      `https://api.whatsapp.com/send?text=Check this out: ${url}`,
      "_blank"
    );
  };

  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      "_blank"
    );
  };

  return (
    <> 
      <details className="dropdown  dropdown-end">
        <summary className="btn m-1">Share <i className="fi fi-sr-share"></i> </summary>
        <ul className="menu dropdown-content bg-slate-200 dark:bg-gray-700 rounded-box z-[1] w-52 p-2 shadow-lg space-y-2">
          <button onClick={copyLink} className="share-button">
            Copy Link
          </button>
          <button onClick={shareOnWhatsApp} className="share-button">
            WhatsApp
          </button>
          <button onClick={shareOnLinkedIn} className="share-button">
            LinkedIn
          </button>
        </ul>
      </details>
    </>
  );
};

export default Share;
