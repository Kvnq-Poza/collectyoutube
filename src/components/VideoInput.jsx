/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from "react";

function VideoInput({ onSubmit }) {
  const [url, setUrl] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [multipleUrls, setMultipleUrls] = useState("");
  const [multipleUrlsError, setMultipleUrlsError] = useState("");

  const validateMultipleUrls = (urls) => {
    const urlList = urls
      .trim()
      .split("\n")
      .filter((url) => url.trim());
    if (urlList.length > 10) {
      setMultipleUrlsError("Maximum 10 URLs allowed");
      return false;
    }
    setMultipleUrlsError("");
    return true;
  };

  const validateUrl = (input) => {
    const youtubeRegex =
      /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)[\w-]+$/;
    return youtubeRegex.test(input);
  };

  const handleSubmit = useCallback(
    (type, value) => {
      if (!value.trim()) {
        alert("Please enter a valid input");
        return;
      }

      if (type === "url" && !validateUrl(value)) {
        alert("Please enter a valid YouTube URL");
        return;
      }

      if (type === "multiple" && !validateMultipleUrls(value)) {
        return;
      }

      onSubmit(value, type);
    },
    [onSubmit]
  );

  useEffect(() => {});

  const handleMultipleUrlsChange = (e) => {
    const urls = e.target.value;
    setMultipleUrls(urls);
    validateMultipleUrls(urls);
  };

  return (
    <div className="video-input">
      <h2>To download Youtube Videos, choose anyone:</h2>

      <div className="input-group">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter Youtube URL"
        />
        <button onClick={() => handleSubmit("url", url)} className="go-button">
          GO
        </button>
      </div>

      <div className="input-group">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter Search Term"
        />
        <button
          onClick={() => handleSubmit("search", searchTerm)}
          className="go-button"
        >
          GO
        </button>
      </div>

      <div className="input-group">
        <textarea
          value={multipleUrls}
          onChange={handleMultipleUrlsChange}
          placeholder="Paste Youtube links separated by new lines (maximum 10 URLs)"
          className={multipleUrlsError ? "error" : ""}
        />
        {multipleUrlsError && (
          <div
            className="error-message"
            style={{ color: "red", fontSize: "0.8rem" }}
          >
            {multipleUrlsError}
          </div>
        )}
        <button
          onClick={() => handleSubmit("multiple", multipleUrls)}
          className="go-button"
          disabled={!!multipleUrlsError}
        >
          GO
        </button>
      </div>
    </div>
  );
}

export default VideoInput;
