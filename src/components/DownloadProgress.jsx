/* eslint-disable react/prop-types */

import "./DownloadProgress.css";

function DownloadProgress({ quality, videoTitle }) {
  return (
    <div className="download-progress-container">
      <div className="progress-header">
        <span className="progress-title">
          Downloading {quality} - {videoTitle}...
        </span>
      </div>

      <div className="progress-bar-container">
        <div className="progress-bar">
          <div className="progress-circle"></div>
        </div>
      </div>
    </div>
  );
}

export default DownloadProgress;
