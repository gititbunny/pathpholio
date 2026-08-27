import { Link } from "react-router-dom";
import "../styles/not-found.css";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="not-found-content">
        <img src="/logo.png" alt="" />

        <p className="not-found-code">404</p>

        <h1>Looks like this path went off track.</h1>

        <p>
          The page you’re looking for doesn’t exist or may have been moved.
        </p>

        <Link to="/" className="not-found-button">
          Back to Pathpholio
        </Link>
      </div>
    </main>
  );
}