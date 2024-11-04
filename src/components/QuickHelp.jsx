function QuickHelp() {
  return (
    <div className="quick-help">
      <h2>Quick Help</h2>
      <div className="help-content">
        <h3>How to use:</h3>
        <p>1. Enter a YouTube URL or search term</p>
        <p>2. Click the GO button</p>
        <p>3. Select your preferred download quality</p>

        <h3>Quick Tip:</h3>
        <p>Replace YouTube with collectyoutube in the URL:</p>
        <p>
          <strong>Original:</strong> https://www.youtube.com/watch?v=39439jfn
        </p>
        <p>
          <strong>Modified:</strong>{" "}
          https://www.collectyoutube.com/watch?v=39439jfn
        </p>
      </div>
    </div>
  );
}

export default QuickHelp;
