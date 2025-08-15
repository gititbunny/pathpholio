import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [mode, setMode] = useState("signin");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!ignore && session) navigate("/");
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) navigate("/");
    });

    return () => {
      ignore = true;
      subscription.unsubscribe();
    };
  }, [navigate]);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password: pw,
        });
        if (error) throw error;
        navigate("/");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password: pw,
        });
        if (error) throw error;
        alert(
          "Check your inbox to verify your email (if confirmations are on). Then sign in."
        );
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="card"
      style={{
        marginTop: "20px",
        maxWidth: "520px",
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <h2>{mode === "signin" ? "Sign in" : "Create account"}</h2>

      <form onSubmit={submit}>
        <label>Email</label>
        <input
          className="input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
        />

        <label>Password</label>
        <input
          className="input"
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          placeholder="••••••••"
          required
        />

        <button className="btn" disabled={loading} type="submit">
          {loading ? "..." : mode === "signin" ? "Sign in" : "Sign up"}
        </button>
      </form>

      <p style={{ marginTop: "8px" }}>
        {mode === "signin" ? "No account?" : "Have an account?"}{" "}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setMode(mode === "signin" ? "signup" : "signin");
          }}
        >
          {mode === "signin" ? "Sign up" : "Sign in"}
        </a>
      </p>
    </div>
  );
}
