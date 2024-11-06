/* eslint-disable react/prop-types */
import { useState } from "react";
import DownloadProgress from "./DownloadProgress";

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

  console.log(data);

  const handleDownload = async (quality) => {
    try {
      setIsDownloading(true);
      setActiveQuality(RESOLUTIONS[quality]);
      setError(null);

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
          <DownloadProgress quality={activeQuality} videoTitle={data.title} />
        ) : (
          <div className="download-buttons">
            {Object.keys(RESOLUTIONS).map((quality) => (
              <button
                key={quality}
                onClick={() => handleDownload(quality)}
                className="download-button"
              >
                Download {RESOLUTIONS[quality]}
              </button>
            ))}
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
