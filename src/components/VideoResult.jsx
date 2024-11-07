/* eslint-disable react/prop-types */
import { useState } from "react";
import DownloadProgress from "./DownloadProgress";
import { ExternalLink, Download, Copy, CheckCircle2 } from "lucide-react";
import "./VideoGallery.css";

const API_URL = "https://freetoolserver.org";

const RESOLUTIONS = {
  low: "480p",
  medium: "720p",
  high: "1080p",
};

function VideoResult({ data }) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [activeQuality, setActiveQuality] = useState(null);
  const [error, setError] = useState(null);
  const [selectedForDownload, setSelectedForDownload] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  const handleCopyUrl = (url) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleViewVideo = (url) => {
    window.open(url, "_blank");
  };

  const handleDownload = async (quality) => {
    try {
      setIsDownloading(true);
      setActiveQuality(RESOLUTIONS[quality]);
      setError(null);
      setSelectedForDownload(false);

      const response = await fetch(
        `${API_URL}/download-youtube-video/${data.videoId}/${quality}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${data.title}_${RESOLUTIONS[quality]}.mp4`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setTimeout(() => {
        setIsDownloading(false);
        setActiveQuality(null);
      }, 2000);
    } catch (error) {
      console.error("Download error:", error);
      setError(error);
      setTimeout(() => {
        setIsDownloading(false);
        setActiveQuality(null);
      }, 3000);
    }
  };

  return (
    <div className="video-gallery">
      <div className="video-card">
        <div className="thumbnail-container">
          <img
            src={data.thumbnail}
            alt={data.title}
            className="video-thumbnail"
          />
          <span className="video-duration">{data.duration}</span>
        </div>

        <div className="video-info">
          <div className="video-header">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                data.author
              )}&background=random`}
              alt={data.author}
              className="author-avatar"
            />
            <div className="title-author">
              <h3 className="video-title">{data.title}</h3>
              <div className="channel-info">
                <span className="video-author">{data.author}</span>
              </div>
            </div>
          </div>

          <div className="video-actions">
            <button
              onClick={() => handleCopyUrl(data.url)}
              className="action-button copy-button"
              title="Copy video URL"
            >
              {copiedUrl ? (
                <>
                  <CheckCircle2 />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy />
                  <span>Copy</span>
                </>
              )}
            </button>
            <button
              onClick={() => handleViewVideo(data.url)}
              className="action-button view-button"
              title="Open video in new tab"
            >
              <ExternalLink />
              <span>View</span>
            </button>
            <button
              onClick={() => setSelectedForDownload(true)}
              className="action-button download-button"
              title="Download video"
            >
              <Download />
              <span>Download</span>
            </button>
          </div>

          {selectedForDownload && !isDownloading && (
            <div className="quality-selector">
              <div className="action-buttons">
                <button onClick={() => handleDownload("low")}>480p</button>
                <button onClick={() => handleDownload("medium")}>720p</button>
                <button onClick={() => handleDownload("high")}>1080p</button>
              </div>
              <button
                onClick={() => setSelectedForDownload(false)}
                className="close-button"
              >
                Close
              </button>
            </div>
          )}

          {isDownloading && (
            <DownloadProgress quality={activeQuality} videoTitle={data.title} />
          )}

          {error && (
            <div className="quality-selector">
              <div className="error-message">
                {error.message || "An error occurred during download"}
              </div>
              <button onClick={() => setError(null)} className="close-button">
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VideoResult;
