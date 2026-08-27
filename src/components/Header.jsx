import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase.js";

export default function Header({ session }) {
  const navigate = useNavigate();

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate("/");
  }

  return (
    <header className="dashboard-header">
      <Link to="/" className="dashboard-brand">
        <img src="/logo.png" alt="" />
        <span>Pathpholio</span>
      </Link>

      <div className="dashboard-header-actions">
        {session?.user?.email && (
          <span className="dashboard-user-email">
            {session.user.email}
          </span>
        )}

        <button
          type="button"
          className="dashboard-signout"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>
    </header>
  );
}