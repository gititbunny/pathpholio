import { Link } from "react-router-dom";
import { supabase } from "../supabase";

export default function Header({ session }) {
  return (
    <header style={{ textAlign: "center", marginBottom: "10px" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img
          src="/logo.png"
          alt="Pathpholio Logo"
          style={{ width: "96px", height: "auto" }}
        />
      </div>
      <h1 style={{ fontSize: "40px" }}>Pathpholio</h1>
      <h2 style={{ fontSize: "22px", color: "var(--accent)" }}>
        Job Application Tracker
      </h2>
      <p>
        Track applications, deadlines, and interviews — synced across devices.
      </p>
      {!session ? (
        <Link to="/auth" className="btn" style={{ marginTop: "8px" }}>
          Sign in
        </Link>
      ) : (
        <button
          className="btn"
          style={{ marginTop: "8px" }}
          onClick={() => supabase.auth.signOut()}
        >
          Sign out
        </button>
      )}
    </header>
  );
}
