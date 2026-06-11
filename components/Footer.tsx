export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p className="footer-name">anomalihaus</p>
        <p className="footer-meta">
          Atlanta, Georgia ·{" "}
          <a href="mailto:alexander@anomalihaus.com">
            alexander@anomalihaus.com
          </a>
        </p>
        <p className="footer-year">© {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
