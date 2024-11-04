/* eslint-disable react/prop-types */
import { useState } from "react";

function VideoInput({ onSubmit }) {
  const [url, setUrl] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [multipleUrls, setMultipleUrls] = useState("");

  const handleSubmit = (type, value) => {
    if (!value.trim()) {
      alert("Please enter a valid input");
      return;
    }
    onSubmit(value, type);
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
          onChange={(e) => setMultipleUrls(e.target.value)}
          placeholder="Paste Youtube links separated by new lines"
        />
        <button
          onClick={() => handleSubmit("multiple", multipleUrls)}
          className="go-button"
        >
          GO
        </button>
      </div>
    </div>
  );
}

export default VideoInput;
