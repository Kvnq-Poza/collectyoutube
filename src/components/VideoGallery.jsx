/* eslint-disable react/prop-types */

import { ExternalLink, Download, Copy, CheckCircle2 } from "lucide-react";
import "./VideoGallery.css";
import { useEffect, useState } from "react";
import DownloadProgress from "./DownloadProgress";

const formatDuration = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  }
  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
};

const API_URL = "https://freetoolserver.org";

const formatViewCount = (count) => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M views`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K views`;
  }
  return `${count} views`;
};

const RESOLUTIONS = {
  low: "480p",
  medium: "720p",
  high: "1080p",
};

const VideoGallery = ({ videos }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [downloadingVideo, setDownloadingVideo] = useState(null);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (downloadingVideo) {
        event.preventDefault();
        event.returnValue = ""; // Most browsers display a default confirmation dialog
      }
    };

    if (downloadingVideo) {
      window.addEventListener("beforeunload", handleBeforeUnload);
    } else {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    }

    // Cleanup the event listener when the component unmounts or downloadingVideo changes
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [downloadingVideo]);

  const handleCopyUrl = (url, videoId) => {
    navigator.clipboard.writeText(url);
    setCopiedId(videoId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleViewVideo = (url) => {
    window.open(url, "_blank");
  };

  const handleDownloadVideo = async (videoId, quality, title) => {
    setSelectedVideo(null);
    setDownloadingVideo({ id: videoId, quality, title });

    try {
      const response = await fetch(
        `${API_URL}/download-youtube-video/${videoId}/${quality}`,
        { method: "GET" }
      );

      if (!response.ok) throw new Error("Download failed");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${title}_${RESOLUTIONS[quality]}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error:", error);
      alert("Failed to download video. Please try again.");
    } finally {
      setDownloadingVideo(null);
    }
  };

  return (
    <div className="video-gallery">
      {videos.map((video) => (
        <div key={video.id} className="video-card">
          <div className="thumbnail-container">
            <img
              src={video.thumbnails[video.thumbnails.length - 1].url}
              alt={video.title}
              className="video-thumbnail"
            />
            <span className="video-duration">
              {formatDuration(video.duration)}
            </span>
            <span className="view-count">
              {formatViewCount(video.view_count)}
            </span>
          </div>

          <div className="video-info">
            <div className="video-header">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  video.uploader
                )}&background=random`}
                alt={video.uploader}
                className="author-avatar"
              />
              <div className="title-author">
                <h3 className="video-title">{video.title}</h3>
                <div className="channel-info">
                  <span className="video-author">{video.uploader}</span>
                  {video.channel_is_verified && (
                    <CheckCircle2 className="verified-badge" />
                  )}
                </div>
              </div>
            </div>

            <div className="video-actions">
              <button
                onClick={() => handleCopyUrl(video.url, video.id)}
                className="action-button copy-button"
                title="Copy video URL"
              >
                {copiedId === video.id ? (
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
                onClick={() => handleViewVideo(video.url)}
                className="action-button view-button"
                title="Open video in new tab"
              >
                <ExternalLink />
                <span>View</span>
              </button>
              <button
                onClick={() => setSelectedVideo(video.id)}
                className="action-button download-button"
                title="Download video"
              >
                <Download />
                <span>Download</span>
              </button>
            </div>

            {selectedVideo === video.id && (
              <div className="quality-selector">
                <div className="action-buttons">
                  <button
                    onClick={() =>
                      handleDownloadVideo(video.id, "low", video.title)
                    }
                  >
                    480p
                  </button>
                  <button
                    onClick={() =>
                      handleDownloadVideo(video.id, "medium", video.title)
                    }
                  >
                    720p
                  </button>
                  <button
                    onClick={() =>
                      handleDownloadVideo(video.id, "high", video.title)
                    }
                  >
                    1080p
                  </button>
                </div>
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="close-button"
                >
                  Close
                </button>
              </div>
            )}

            {downloadingVideo?.id === video.id && (
              <DownloadProgress
                quality={downloadingVideo.quality}
                videoTitle={downloadingVideo.title}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoGallery;
