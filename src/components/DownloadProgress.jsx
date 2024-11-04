/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";
import "./DownloadProgress.css";

const API_URL = "https://freetoolserver.org";

function DownloadProgress({ videoId, quality, onComplete, onError }) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("downloading");
  const [downloadInfo, setDownloadInfo] = useState({
    totalSize: "",
    downloaded: "",
    speed: "",
    eta: null,
  });
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;
  const POLLING_INTERVAL = 1000;

  useEffect(() => {
    let intervalId;
    let failedRequests = 0;

    const checkProgress = async () => {
      try {
        const response = await fetch(`${API_URL}/download-progress/${videoId}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Reset failed requests on successful response
        failedRequests = 0;

        if (data.status === "error") {
          setStatus("error");
          if (onError) onError(new Error(data.error || "Download failed"));
          clearInterval(intervalId);
          return;
        }

        if (data.status === "complete") {
          setProgress(100);
          setStatus("complete");
          if (onComplete) onComplete();
          clearInterval(intervalId);
          return;
        }

        // Update progress information
        setProgress(data.progress);
        setDownloadInfo({
          totalSize: data.totalSize,
          downloaded: data.downloaded,
          speed: data.speed,
          eta: data.eta,
        });
        setStatus(data.status);
      } catch (error) {
        console.error("Error checking progress:", error);
        failedRequests++;

        if (failedRequests >= MAX_RETRIES) {
          setStatus("error");
          if (onError) onError(error);
          clearInterval(intervalId);
        }
      }
    };

    // Start polling
    intervalId = setInterval(checkProgress, POLLING_INTERVAL);
    checkProgress(); // Initial check

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [videoId, quality, onComplete, onError]);

  const formatTimeRemaining = (seconds) => {
    if (!seconds || seconds === "Unknown") return "Calculating...";
    if (seconds < 60) return `${Math.round(seconds)}s`;
    if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = Math.round(seconds % 60);
      return `${minutes}m ${remainingSeconds}s`;
    }
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className={`download-progress-container ${status}`}>
      <div className="progress-header">
        <span className="progress-title">
          {status === "downloading"
            ? "Downloading..."
            : status === "complete"
            ? "Download Complete!"
            : "Download Failed"}
        </span>
        <div className="progress-info">
          {downloadInfo.totalSize && (
            <span className="file-size">{downloadInfo.totalSize}</span>
          )}
          {downloadInfo.speed && status === "downloading" && (
            <span className="download-speed">{downloadInfo.speed}</span>
          )}
        </div>
      </div>

      <div className="progress-bar-container">
        <div
          className={`progress-bar ${status}`}
          style={{ width: `${progress}%` }}
        >
          <div className="progress-glow"></div>
        </div>
        <span className="progress-text">
          {Math.round(progress)}%
          {downloadInfo.eta &&
            status === "downloading" &&
            ` • ${formatTimeRemaining(downloadInfo.eta)} remaining`}
        </span>
      </div>

      {status === "error" && (
        <div className="error-message">Download failed. Please try again.</div>
      )}
    </div>
  );
}

export default DownloadProgress;
