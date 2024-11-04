/* eslint-disable react/prop-types */
import { useState } from "react";
import DownloadProgress from "./DownloadProgress";

const API_URL = "https://freetoolserver.org";

function VideoResult({ data }) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState(null);
  const [activeQuality, setActiveQuality] = useState(null);
  const [error, setError] = useState(null);

  const handleDownload = async (quality) => {
    try {
      setIsDownloading(true);
      setActiveVideoId(data.videoId);
      setActiveQuality(quality);
      setError(null);

      // Trigger the download
      const response = await fetch(
        `${API_URL}/download-youtube-video/${data.videoId}/${quality}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Handle the file download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${data.title}_${quality}.mp4`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Download error:", error);
      setError(error);
      handleDownloadError(error);
    }
  };

  const handleDownloadComplete = () => {
    setTimeout(() => {
      setIsDownloading(false);
      setActiveVideoId(null);
      setActiveQuality(null);
    }, 2000);
  };

  const handleDownloadError = (error) => {
    setError(error);
    setTimeout(() => {
      setIsDownloading(false);
      setActiveVideoId(null);
      setActiveQuality(null);
    }, 3000);
  };

  const getQualityFormat = (quality) => {
    return data.formats.find((format) => format.quality === quality);
  };

  return (
    <div className="video-result">
      <div className="video-info">
        <img src={data.thumbnail} alt={data.title} className="thumbnail" />
        <div className="video-details">
          <h3>{data.title}</h3>
          <p className="video-author">
            <strong>Author:</strong> {data.author}
          </p>
          <p>
            <strong>Duration:</strong> {data.duration}
          </p>
        </div>
      </div>

      <div className="download-section">
        {isDownloading ? (
          <DownloadProgress
            videoId={activeVideoId}
            quality={activeQuality}
            onComplete={handleDownloadComplete}
            onError={handleDownloadError}
          />
        ) : (
          <div className="download-buttons">
            {["high", "medium", "low"].map((quality) => {
              const format = getQualityFormat(quality);
              return (
                <button
                  key={quality}
                  onClick={() => handleDownload(quality)}
                  className="download-button"
                >
                  Download {quality.charAt(0).toUpperCase() + quality.slice(1)}
                  {format?.filesize && (
                    <span className="file-size-tag">{format.filesize}</span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {error && (
          <div className="error-message">
            {error.message || "An error occurred during download"}
          </div>
        )}
      </div>
    </div>
  );
}

export default VideoResult;
