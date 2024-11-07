function Help() {
  return (
    <div className="help-page">
      <h1>Help & FAQ</h1>

      <section className="help-section">
        <h2>How to Download Videos</h2>
        <ol>
          <li>
            <h3>Method 1: Direct URL</h3>
            <p>
              Enter the YouTube video URL in the first input field and click
              &quot;GO&quot;
            </p>
          </li>
          <li>
            <h3>Method 2: Search</h3>
            <p>
              Enter keywords to search for videos, then select the one you want
              to download
            </p>
          </li>
          <li>
            <h3>Method 3: Multiple URLs</h3>
            <p>
              Paste multiple YouTube URLs (one per line) to download several
              videos
            </p>
          </li>
        </ol>
      </section>

      <section className="help-section">
        <h2>Quick URL Trick</h2>
        <p>
          Simply replace &quot;youtube.com&quot; with
          &quot;collectyoutube.com&quot; in any YouTube URL to automatically
          start the download:
        </p>
        <div className="example">
          <p>Original: https://www.youtube.com/watch?v=xxxxx</p>
          <p>Modified: https://www.collectyoutube.com/watch?v=xxxxx</p>
        </div>
      </section>

      <section className="help-section">
        <h2>Download Quality</h2>
        <ul>
          <li>
            <strong>High Quality:</strong> Best available resolution (typically
            1080p or higher)
          </li>
          <li>
            <strong>Medium Quality:</strong> 720p resolution
          </li>
          <li>
            <strong>Low Quality:</strong> 480p resolution
          </li>
        </ul>
      </section>

      <section className="help-section">
        <h2>Troubleshooting</h2>
        <ul>
          <li>
            <strong>Video won&apos;t download?</strong>
            <p>
              Make sure the URL is correct and the video is publicly available
            </p>
          </li>
          <li>
            <strong>Download too slow?</strong>
            <p>
              Try selecting a lower quality or checking your internet connection
            </p>
          </li>
          <li>
            <strong>Error messages?</strong>
            <p>
              Most errors will display a message explaining the issue. If
              you&apos;re still stuck, try refreshing the page
            </p>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default Help;
