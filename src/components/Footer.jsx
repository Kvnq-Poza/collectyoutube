function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          &copy; {new Date().getFullYear()} CollectYoutube.com - All rights
          reserved
        </p>
        <div className="footer-links">
          <a href="/help">Help</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
