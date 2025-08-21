import { Link } from "react-router-dom";
import { supabase } from "../supabase";

export default function Header({ session }) {
  return (
    <header style={{ textAlign: "center", marginBottom: "10px" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img
          src="/logo.png"
          alt="Pathpholio Logo"
          style={{ width: "150px", height: "auto", marginBottom: "0px" }}
        />
      </div>
      <h1 style={{ fontSize: "50px", marginTop: "5px", marginBottom: "-30px" }}>
        Pathpholio
      </h1>
      <h2
        style={{
          fontSize: "30px",
          marginBottom: "0px",
          color: "var(--accent)",
        }}
      >
        Job Application Tracker
      </h2>
      <p style={{ fontSize: "20px", marginTop: "5px" }}>
        Keep track of your job applications, deadlines, and interviews.
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
