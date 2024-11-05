import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          &copy; {new Date().getFullYear()} CollectYoutube.com - All rights
          reserved
        </p>
        <div className="footer-links">
          <Link to="/help">Help</Link>
          <Link to="/grow-youtube">Grow Your YouTube Channel</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
