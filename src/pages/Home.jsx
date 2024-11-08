import { useEffect, useState } from "react";
import VideoInput from "../components/VideoInput";
import QuickHelp from "../components/QuickHelp";
import VideoResult from "../components/VideoResult";
import VideoGallery from "../components/VideoGallery";

import { useLocation } from "react-router-dom";

const API_URL = "https://freetoolserver.org";

function Home() {
  const [loading, setLoading] = useState(false);
  const [videoData, setVideoData] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [error, setError] = useState(null);

  const location = useLocation();

  const validateUrl = (input) => {
    const youtubeRegex =
      /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)[\w-]+$/;
    return youtubeRegex.test(input);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const videoParam = urlParams.get("v");
    if (videoParam) {
      const videoUrl = `https://www.youtube.com/watch?v=${videoParam}`;
      if (validateUrl(videoUrl)) {
        handleVideoFetch(videoUrl, "url");
        setVideoUrl(videoUrl);
      }
    }
  }, [location.search]);

  const handleVideoFetch = async (url, type) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/video-info`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url, type }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch video data");
      }

      const data = await response.json();

      // Handle different response types
      if (type === "search" && data.videos) {
        // Search query results -> Use VideoGallery
        setVideoData({ type: "search", videos: data.videos });
      } else if (type === "multiple" && data.videos) {
        // Multiple URLs results -> Use multiple VideoResults
        setVideoData({ type: "multiple", videos: data.videos });
      } else {
        // Single URL result -> Use single VideoResult
        setVideoData({ type: "single", ...data });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    if (loading) {
      return <div className="loading">Loading...</div>;
    }

    if (error) {
      return <div className="error">{error}</div>;
    }

    if (!videoData) {
      return <QuickHelp />;
    }

    switch (videoData.type) {
      case "search":
        return <VideoGallery videos={videoData.videos} />;
      case "multiple":
        return (
          <>
            {videoData.videos.map((video) => (
              <VideoResult key={video.videoId} data={video} />
            ))}
          </>
        );
      case "single":
        return <VideoResult data={videoData} />;
      default:
        return <QuickHelp />;
    }
  };

  return (
    <main className="home">
      <div className="content-wrapper">
        <div className="input-section">
          <VideoInput onSubmit={handleVideoFetch} videoUrl={videoUrl} />
        </div>
        <div className="result-section">{renderContent()}</div>
      </div>
    </main>
  );
}

export default Home;
